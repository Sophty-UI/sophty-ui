import { ComponentType as ComponentTypeBase, FC, ForwardRefExoticComponent, ReactHTML } from 'react';

export type IComponentType =
  | ComponentTypeBase<unknown>
  | ForwardRefExoticComponent<unknown>
  | FC<unknown>
  | keyof ReactHTML;
