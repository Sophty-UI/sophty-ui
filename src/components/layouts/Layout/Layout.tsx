import clsx from 'clsx';
import { Children, cloneElement, DetailedHTMLProps, HTMLAttributes, ReactElement, useMemo } from 'react';

import { CSSDataType } from '../../../typings/css';
import { getGridTemplate } from '../../../utils/css';
import { IAreaProps } from '../Area/Area';
import styles from './style.module.scss';

export interface ILayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactElement<IAreaProps> | ReactElement<IAreaProps>[];
  template: string[][];
}

const Layout = ({ className, children, template, style = {}, ...props }: ILayoutProps): ReactElement => {
  const [body, gridTemplate] = useMemo(() => {
    const rows = new Map<string, CSSDataType.TrackBreadth>();
    const cols = new Map<string, CSSDataType.TrackBreadth>();

    return [
      Children.map(children, child => {
        const { width, height } = child.props;

        if (typeof child.key !== 'string') throw new Error('Layout.Area key is required!');

        if (height) rows.set(child.key, typeof height === 'number' ? `${height}px` : height);
        if (width) cols.set(child.key, typeof width === 'number' ? `${width}px` : width);

        return cloneElement(child, { _area: child.key });
      }),
      getGridTemplate({ template, rows, cols }),
    ];
  }, [children, template]);

  return (
    <div {...props} className={clsx(className, styles.layout)} style={{ ...style, gridTemplate }}>
      {body}
    </div>
  );
};

export default Layout;
