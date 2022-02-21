import { Declaration } from 'postcss';

import { IPluginOptions } from '../types';

export const create = (options: {
  name: string[] | string;
  prefix: IPluginOptions['prefix'];
  value: string;
}): Declaration => {
  const name = `--${options.prefix}-${Array.isArray(options.name) ? options.name.join('-') : options.name}`;

  return new Declaration({ prop: name, value: `var(${name}, ${options.value})` });
};
