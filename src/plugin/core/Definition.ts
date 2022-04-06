import { Declaration } from 'postcss';

import Variable from './Variable';

export class Definition {
  readonly selector: string;

  #variables: Map<string, Variable>;

  constructor(selector: string, variables?: [string, Variable][]) {
    this.selector = selector;
    this.#variables = new Map(variables ?? []);
  }

  clone(selector: string): Definition {
    return this.selector === selector ? this : new Definition(selector, [...this.#variables.entries()]);
  }

  declare(name: string, value: string, prefix = this.#variables.get(name)?.prefix ?? this.selector): Declaration {
    const variable = new Variable({ name, value, prefix, isDeclaration: this.#variables.has(name) });

    this.#variables.set(name, variable);

    return new Declaration({ prop: variable.prop, value: variable.value });
  }
}

export default Definition;
