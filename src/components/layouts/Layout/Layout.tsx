import clsx from 'clsx';
import { Children, cloneElement, ForwardedRef, forwardRef, isValidElement, ReactElement, useMemo } from 'react';

import { IBoxProps } from '../../../types/box';
import { ITrackBreadth } from '../../../types/css';
import { IFlexGap } from '../../../types/flex';
import { parseGap } from '../../../utils/flex';
import { IAreaProps } from './parts/Area';
import { IAreaPrivateProps } from './parts/Area/Area';
import styles from './style.module.scss';
import { grid } from './utils/grid';

export interface ILayoutProps extends IBoxProps {
  /**
   * Sets the gaps (gutters) between rows and columns.
   *
   * @example For example `gap={[10, '2em']}` set:
   * ```css
   *   row-gap: 10px;
   *   column-gap: 2em;
   * ```
   */
  gap?: IFlexGap | [IFlexGap, IFlexGap];
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

const Layout = (
  { className, children, template, style = {}, gap, ...props }: ILayoutProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement<ILayoutProps> => {
  const [body, gridTemplate] = useMemo(() => {
    const rows = new Map<string, ITrackBreadth>();
    const cols = new Map<string, ITrackBreadth>();

    return [
      Children.map(children, child => {
        if (!child || !isValidElement(child)) return undefined;

        const { width, height } = child.props;

        if (typeof child.key !== 'string') throw new Error('Layout.Area key is required!');
        if (height) rows.set(child.key, typeof height === 'number' ? `${height}px` : height);
        if (width) cols.set(child.key, typeof width === 'number' ? `${width}px` : width);

        return cloneElement(child as ReactElement<IAreaProps & IAreaPrivateProps>, { _area: child.key });
      }),
      grid({ template, rows, cols }),
    ];
  }, [children, template]);

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(className, styles.layout)}
      style={{ ...style, gridTemplate, gap: parseGap(gap) }}
    >
      {body}
    </div>
  );
};

export default forwardRef<HTMLDivElement, ILayoutProps>(Layout);
