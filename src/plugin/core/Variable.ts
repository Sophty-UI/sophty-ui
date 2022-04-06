export interface IVariableOptions {
  isDeclaration?: boolean;
  name: string;
  prefix: string;
  value: string;
}

export class Variable {
  #isDeclaration: boolean;
  readonly name: string;
  readonly prefix: string;
  #value: string;

  constructor({ name, value, prefix, isDeclaration }: IVariableOptions) {
    this.prefix = prefix;
    this.name = name;
    this.#value = value;
    this.#isDeclaration = !!isDeclaration;
  }

  get prop(): string {
    return `--${this.prefix.replace(/[#.]/g, '').replace(/[:_]/g, '-')}-${this.name}`;
  }

  get value(): string {
    return this.#isDeclaration ? this.#value : `var(${this.prop}, ${this.#value})`;
  }
}

export default Variable;
