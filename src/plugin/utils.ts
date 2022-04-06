import { AtRule } from 'postcss';

import { IConfig } from './types';

export const error = (msg: string, node: AtRule, { plugin }: IConfig): never => {
  throw node.error(msg, { plugin });
};
