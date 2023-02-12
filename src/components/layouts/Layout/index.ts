import { FC } from 'react';

import { default as LayoutBase } from './Layout';
import { default as Area, IAreaProps } from './parts/Area';

export type ILayoutProps = typeof LayoutBase & {
  Area: FC<Omit<IAreaProps, 'area'>>;
};

const Layout = LayoutBase as ILayoutProps;

Layout.Area = Area;

export default Layout;
