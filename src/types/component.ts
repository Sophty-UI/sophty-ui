import { ComponentType as ComponentTypeBase, FC, ForwardRefExoticComponent, ReactHTML } from 'react';

export type IComponentType<T = HTMLElement> =
  | ComponentTypeBase<T>
  | ForwardRefExoticComponent<T>
  | FC<T>
  | keyof ReactHTML;
