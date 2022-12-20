import { ReactElement } from 'react';

import { default as GridBase } from './Grid';
import { default as GridItem, IGridItemProps } from './parts/GridItem';

export type IGridProps = typeof GridBase & {
  Item: (props: Omit<IGridItemProps, 'columnStart' | 'columnEnd'>) => ReactElement;
};

const Grid = GridBase as IGridProps;

Grid.Item = GridItem;

export default Grid;
