import { FC } from 'react';

import { default as GridBase } from './Grid';
import { default as Item, IItemProps } from './parts/Item';

export type IGridProps = typeof GridBase & {
  Item: FC<Omit<IItemProps, 'columnStart' | 'columnEnd'>>;
};

const Grid = GridBase as IGridProps;

Grid.Item = Item;

export default Grid;
