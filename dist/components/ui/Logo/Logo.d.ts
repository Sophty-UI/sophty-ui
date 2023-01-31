import { MouseEventHandler, ReactElement } from 'react';
import { IBaseProps } from '../../../types/base';
export interface ILogoEvents {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}
export interface ILogoProps extends IBaseProps, ILogoEvents {
    alt?: string;
    href?: string;
    name?: string;
    src?: string;
}
declare const Logo: ({ className, alt, href, src, name, ...events }: ILogoProps) => ReactElement<ILogoProps>;
export default Logo;
