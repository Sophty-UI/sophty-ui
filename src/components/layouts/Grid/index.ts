import { ReactElement } from 'react';

import { default as GridBase } from './Grid';
import { default as Item, IItemProps } from './parts/Item';

export type IGridProps = typeof GridBase & {
  Item: (props: Omit<IItemProps, 'columnStart' | 'columnEnd'>) => ReactElement;
};

const Grid = GridBase as IGridProps;

Grid.Item = Item;

export default Grid;
