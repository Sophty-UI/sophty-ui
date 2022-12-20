import { ReactElement } from 'react';

import { default as LayoutBase } from './Layout';
import { default as Area, IAreaProps } from './parts/Area';

export type ILayoutProps = typeof LayoutBase & {
  Area: (props: Omit<IAreaProps, 'area'>) => ReactElement;
};

const Layout = LayoutBase as ILayoutProps;

Layout.Area = Area;

export default Layout;
