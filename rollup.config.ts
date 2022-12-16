import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import path from 'path';
import { OutputBundle, RollupOptions } from 'rollup';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', '@sophty-ui/icons', 'clsx', 'react/jsx-runtime'],
  output: [
    {
      exports: 'named',
      dir: './dist/',
      format: 'esm',
      sourcemap: 'inline',
      preserveModules: true,
      preserveModulesRoot: 'src',
      paths: {
        src: path.resolve(__dirname, './src'),
      },
    },
  ],
  plugins: [
    resolve({ browser: true }),
    postcss({ modules: true, use: ['sass'] }),
    commonjs(),
    typescript({ include: ['src/**/*'], exclude: ['src/docs/**/*'] }),
    (() => ({
      name: 'fix-external-path',
      generateBundle(_, bundle: OutputBundle): void {
        let bundlePath, newPath;

        [...Object.entries(bundle)].forEach(([fileName, chunkInfo]) => {
          if (fileName.includes('node_modules')) {
            chunkInfo.fileName = fileName.replace(/node_modules/g, 'external');
            delete bundle[fileName];
            bundle[fileName] = chunkInfo;
          }

          if ('code' in chunkInfo && chunkInfo.imports.some(imports => imports.includes('node_modules'))) {
            const magicString = new MagicString(chunkInfo.code);

            walk(this.parse(chunkInfo.code, { ecmaVersion: 'latest', sourceType: 'module' }), {
              enter({ callee, arguments: args = [], source, type }) {
                if (
                  ['ImportDeclaration', 'CallExpression'].includes(type) &&
                  (source?.type === 'Literal' || (callee?.type === 'Identifier' && callee?.name === 'require'))
                ) {
                  const { value, start, end } = args[0] ?? source ?? {};

                  if (value?.includes('node_modules')) {
                    bundlePath = path.join(path.dirname(fileName), value).replace(/node_modules/g, 'external');
                    newPath = path.relative(path.dirname(chunkInfo.fileName), bundlePath);

                    magicString.overwrite(start, end, /^\.{1,2}\//gm.test(newPath) ? `'${newPath}'` : `'./${newPath}'`);
                  }
                }
              },
            });

            chunkInfo.map = magicString.generateMap();
            chunkInfo.code = magicString.toString();
          }
        });
      },
    }))(),
  ],
} as RollupOptions;
