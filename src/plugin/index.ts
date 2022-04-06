import { AcceptedPlugin, PluginCreator } from 'postcss';
import postcssNested from 'postcss-nested';

import Context from './core/Context';
import AtRule from './processors/atRuleProcessor';
import Once from './processors/onceProcessor';
import { IConfig } from './types';

const plugin: PluginCreator<Partial<IConfig>> = (options?: Partial<IConfig>) => {
  const context = new Context({ ...options, prefix: options?.prefix ?? 's', plugin: 'sophty-ui' });

  return {
    postcssPlugin: context.plugin,
    prepare: () =>
      Object.entries({ Once, AtRule }).reduce((processors, [name, fn]) => ({ ...processors, [name]: fn(context) }), {}),
  };
};

plugin.postcss = true;

// TODO: custom nesting
export default (options?: Partial<IConfig>): AcceptedPlugin[] => [plugin(options), postcssNested];
