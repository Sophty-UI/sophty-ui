import { promises as fs } from 'fs';
import path from 'path';
import { PluginCreator } from 'postcss';
import { fileURLToPath } from 'url';

import pkg from '../../package.json';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const plugin: PluginCreator<undefined | {}> = (options = {}) => {
  // eslint-disable-next-line no-console
  console.log('1111', options, dirname);

  return {
    postcssPlugin: 'sophty-ui',
    prepare: () => ({
      Once: async (root, helper) => {
        const styles = await fs.readFile(path.join(dirname, '../theme/preflight/preflight.css'), 'utf-8');
        const { nodes } = helper.postcss.parse(styles);

        root.append(
          // FIXME: add on top
          helper.postcss.comment({ text: `! sophty-ui v${pkg.version} | ${pkg.license} License | ${pkg.homepage}` }),
          ...nodes
        );
      },
    }),
  };
};

plugin.postcss = true;

export default plugin;
