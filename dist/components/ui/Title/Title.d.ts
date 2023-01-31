import { ReactElement } from 'react';
import { IDetailedProps } from '../../../types/box';
declare enum HeadingType {
    H1 = 1,
    H2 = 2,
    H3 = 3,
    H4 = 4,
    H5 = 5,
    H6 = 6
}
export interface ITitleProps extends IDetailedProps<HTMLHeadingElement> {
    level?: HeadingType;
}
declare const Title: ({ level, children, ...props }: ITitleProps) => ReactElement<ITitleProps>;
export default Title;
