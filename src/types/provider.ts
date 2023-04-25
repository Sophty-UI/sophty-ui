import { IContainer } from './box';

export interface IProvider<T> extends IContainer {
  value?: T;
}
