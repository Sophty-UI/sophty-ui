import autoprefixer from 'autoprefixer';
import { promises as fs } from 'fs';
import path from 'path';
import { AcceptedPlugin, PluginCreator } from 'postcss';
import postcssNested from 'postcss-nested';
import { fileURLToPath } from 'url';
import * as Tree from './utils/tree';
import * as Variables from './utils/variables';

import pkg from '../../package.json';
import { IPluginOptions } from './types';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const comment = `! sophty-ui v${pkg.version} | ${pkg.license} License | ${pkg.homepage}`;

const PREFIX = 's';

const plugin: PluginCreator<Partial<IPluginOptions>> = (options?: Partial<IPluginOptions>) => {
  const config: IPluginOptions = { ...options, prefix: options?.prefix ?? PREFIX };

  return {
    postcssPlugin: 'sophty-ui',
    prepare: () => ({
      Once: async (root, { postcss }) => {
        const styles = await fs.readFile(path.join(dirname, '../theme/preflight/preflight.css'), 'utf-8');
        const nodes = [
          postcss.comment({ text: comment }),
          postcss.comment({ text: '! purgecss start ignore' }),
          ...postcss.parse(styles).nodes,
          postcss.comment({ text: '! purgecss end ignore' }),
        ];

        if (root.first) {
          root.insertBefore(root.first, nodes);
        } else {
          root.append(...nodes);
        }
      },
      AtRule: {
        set: rule => {
          const { name, value }: { name?: string; value?: string } =
            /\((?<name>[a-z]+) *, *(?<value>$|#[\da-z]+)\)/g.exec(rule.params)?.groups ?? {};

          if (name && value) {
            rule.replaceWith(Variables.create({ prefix: config.prefix, value, name: [Tree.selector(rule), name] }));
          } else {
            // TODO: output error
          }
        },
      },
    }),
  };
};

plugin.postcss = true;

export default (options?: Partial<IPluginOptions>): AcceptedPlugin[] => [postcssNested, plugin(options), autoprefixer];
