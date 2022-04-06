import { AtRule, Helpers, Root } from 'postcss';

import Context from './core/Context';

export interface IConfig {
  plugin: string;
  prefix: string;
}

export interface IPluginProcessors {
  AtRule: (context: Context) => {
    [name: string]: (atRule: AtRule, helper: Helpers) => Promise<void> | void;
  };
  Once: (context: Context) => (root: Root, helper: Helpers) => Promise<void> | void;
}
