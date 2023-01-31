import { ReactElement } from 'react';
import { IBoxProps } from '../../../../types/box';
import { IFlexSpan } from '../../../../types/flex';
export interface IGridItemProps extends IBoxProps {
    columnEnd?: number;
    columnStart?: number;
    span?: IFlexSpan;
}
declare const GridItem: ({ children, style, columnStart, columnEnd, span, ...props }: IGridItemProps) => ReactElement<IGridItemProps>;
export default GridItem;
