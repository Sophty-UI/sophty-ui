import { Container, Document, Root, Rule } from 'postcss';

import { IConfig } from '../types';
import Definition from './Definition';

export class Context {
  readonly definitions = new Map<string, Definition>();
  readonly plugin: string;
  readonly prefix: string;

  constructor(config: IConfig) {
    this.plugin = config.plugin;
    this.prefix = config.prefix;
  }

  find(rule: Rule): Definition {
    let node: Container | Document | undefined = rule;
    let definition: Definition | undefined;

    while ((node = node?.parent) && !(node instanceof Root)) {
      if (node instanceof Rule) definition = this.definitions.get(node.selector);
    }

    definition = definition ? definition.clone(rule.selector) : new Definition(rule.selector);
    this.definitions.set(rule.selector, definition);

    return definition;
  }
}

export default Context;
