import { Key, ReactElement } from 'react';
import { IBoxProps } from '../../../../types/box';
import { ITrackBreadth } from '../../../../types/css';
export interface IAreaProps extends IBoxProps {
    area?: Key;
    height?: ITrackBreadth | number;
    key: string;
    semantic?: 'div' | 'aside' | 'footer' | 'header' | 'main' | 'nav' | 'section';
    width?: ITrackBreadth | number;
}
declare const Area: ({ area, height, width, children, style, semantic, ...props }: IAreaProps) => ReactElement<IAreaProps>;
export default Area;
