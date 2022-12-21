import clsx from 'clsx';
import { Children, cloneElement, ForwardedRef, forwardRef, ReactElement, useMemo } from 'react';

import { IBoxProps } from '../../../types/box';
import { ITrackBreadth } from '../../../types/css';
import { IFlexGap } from '../../../types/flex';
import { getGap } from '../../../utils/flex';
import { IAreaProps } from './parts/Area';
import styles from './style.module.scss';

const minmax = (list: ITrackBreadth[]): string => (list.length > 1 ? `minmax(${list.join(', ')})` : list[0] ?? 'auto');
const getGridTemplate = (options: {
  cols: Map<string, ITrackBreadth>;
  rows: Map<string, ITrackBreadth>;
  template: string[][];
}): string => {
  const colWidths = new Map<number, Set<ITrackBreadth>>();
  const [rowsTemplate, colsCount] = options.template.reduce(
    ([template, length], row) => {
      const rowHeights = row.reduce<ITrackBreadth[]>((acc, key, colIndex) => {
        const height = options.rows.get(key);
        const widths = options.cols.get(key);

        if (height && !acc.includes(height)) acc.push(height);
        if (widths) colWidths.set(colIndex, (colWidths.get(colIndex) ?? new Set()).add(widths));

        return acc;
      }, []);

      return [`${template} \n "${row.join(' ')}" ${minmax(rowHeights)}`, Math.max(length, row.length)];
    },
    ['', 0] as [string, number]
  );

  return [
    rowsTemplate,
    [...new Array(colsCount)].reduce<string>(
      (acc, _, index) => `${acc} ${minmax([...(colWidths.get(index)?.values() ?? [])])}`,
      ''
    ),
  ].join(' / ');
};

export interface ILayoutProps extends IBoxProps<ReactElement<IAreaProps>> {
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
): ReactElement => {
  const [body, gridTemplate] = useMemo(() => {
    const rows = new Map<string, ITrackBreadth>();
    const cols = new Map<string, ITrackBreadth>();

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
      ref={ref}
      className={clsx(className, styles.layout)}
      style={{ ...style, gridTemplate, gap: getGap(gap) }}
    >
      {body}
    </div>
  );
};

export default forwardRef<HTMLDivElement, ILayoutProps>(Layout);
