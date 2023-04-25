import { FC } from 'react';

import Container from './parts/Container';
import Item, { IItemProps } from './parts/Item';

export type IGridProps = typeof Container & {
  Item: FC<IItemProps>;
};

const Grid = Container as IGridProps;

Grid.Item = Item;

export default Grid;
