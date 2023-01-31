import { ReactElement } from 'react';
import { default as GridBase } from './Grid';
import { IGridItemProps } from './parts/GridItem';
export type IGridProps = typeof GridBase & {
    Item: (props: Omit<IGridItemProps, 'columnStart' | 'columnEnd'>) => ReactElement;
};
declare const Grid: IGridProps;
export default Grid;
