import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import path from 'path';
import { OutputBundle, RollupOptions } from 'rollup';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

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
    postcss({
      use: ['sass'],
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    }),
    typescript({ include: ['src/**/*'], exclude: [] }),
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
    replace({
      preventAssignment: true,
      'process.browser': true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    copy({
      targets: [{ src: 'src/theme/assets/*.css', dest: 'dist/theme/' }],
    }),
  ],
} as RollupOptions;
