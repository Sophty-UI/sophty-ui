import { AtRule, Declaration, Rule } from 'postcss';

import { IPluginProcessors } from '../types';
import { error } from '../utils';

const processor: IPluginProcessors['AtRule'] = context => ({
  bind: (atRule: AtRule): void => {
    const { parent: rule } = atRule;

    if (rule instanceof Rule) {
      const definition = context.find(rule);
      const declarations = atRule.params
        .replace(/\(|\)/g, '')
        .split(',')
        .reduce((acc, str) => {
          const { name, value } = /(?<name>[a-z-]+) *: *(?<value>$|#?[\da-z]+)/g.exec(str)?.groups ?? {};

          if (name && value) acc.push(definition.declare(name, value));
          else error('Unexpected variable at @bind!', atRule, context);

          return acc;
        }, [] as Declaration[]);

      if (declarations.length) {
        atRule.replaceWith(...declarations);
      } else {
        atRule.remove();
      }
    } else error('Unexpected @bind definition!', atRule, context);
  },
});

export default processor;
