import { ReactElement } from 'react';
import { default as LayoutBase } from './Layout';
import { IAreaProps } from './parts/Area';
export type ILayoutProps = typeof LayoutBase & {
    Area: (props: Omit<IAreaProps, 'area'>) => ReactElement<IAreaProps>;
};
declare const Layout: ILayoutProps;
export default Layout;
