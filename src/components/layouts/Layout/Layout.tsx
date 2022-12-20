import clsx from 'clsx';
import { Children, cloneElement, DetailedHTMLProps, HTMLAttributes, ReactElement, useMemo } from 'react';

import { CSSDataType } from '../../../typings/css';
import { getGridTemplate } from '../../../utils/css';
import { IAreaProps } from './parts/Area';
import styles from './style.module.scss';

export type ILayoutGapProp = number | CSSDataType.Distance<CSSDataType.Length | CSSDataType.Percentage>;

export interface ILayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactElement<IAreaProps> | ReactElement<IAreaProps>[];
  /**
   * Sets the gaps (gutters) between rows and columns.
   *
   * @example For example `gap={[10, '2em']}` set:
   * ```css
   *   row-gap: 10px;
   *   column-gap: 2em;
   * ```
   */
  gap?: ILayoutGapProp | [ILayoutGapProp, ILayoutGapProp];
  /**
   * Layout template
   *
   * @example Grid layout example:
   * ```js
   * [
   *   ['header', 'header', 'header'],
   *   ['nav', 'main', 'main'],
   *   ['nav', 'footer', 'footer'],
   * ]
   * ```
   */
  template: string[][];
}

const Layout = ({ className, children, template, style = {}, gap, ...props }: ILayoutProps): ReactElement => {
  const [body, gridTemplate] = useMemo(() => {
    const rows = new Map<string, CSSDataType.TrackBreadth>();
    const cols = new Map<string, CSSDataType.TrackBreadth>();

    return [
      Children.map(children, child => {
        const { width, height } = child.props;

        if (typeof child.key !== 'string') throw new Error('Layout.Area key is required!');

        if (height) rows.set(child.key, typeof height === 'number' ? `${height}px` : height);
        if (width) cols.set(child.key, typeof width === 'number' ? `${width}px` : width);

        return cloneElement(child, { area: child.key });
      }),
      getGridTemplate({ template, rows, cols }),
    ];
  }, [children, template]);

  return (
    <div
      {...props}
      className={clsx(className, styles.layout)}
      style={{
        ...style,
        gridTemplate,
        gap:
          gap &&
          (Array.isArray(gap) ? gap : [gap, gap])
            .map(value => (typeof value === 'number' ? `${value}px` : value))
            .join(' '),
      }}
    >
      {body}
    </div>
  );
};

export default Layout;
