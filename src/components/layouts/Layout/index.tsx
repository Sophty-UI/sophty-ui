import clsx from 'clsx';
import { Children, forwardRef, isValidElement, useMemo } from 'react';

import createTemplate from '~/helpers/grid/createTemplate';
import parseGap from '~/helpers/grid/parseGap';
import { IFlexBox } from '~/types/box';
import { ITrackBreadth } from '~/types/style';

import styles from './style.scss';

export interface ILayoutProps extends IFlexBox {
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

export default forwardRef<HTMLDivElement, ILayoutProps>(
  ({ className, children, template, style, gap, ...props }, ref) => {
    const _style = useMemo(() => {
      const rows = new Map<string, ITrackBreadth>();
      const cols = new Map<string, ITrackBreadth>();

      Children.forEach(children, child => {
        if (child && isValidElement(child) && typeof child.props === 'object' && 'area' in child.props) {
          const { width, height } = child.props;

          rows.set(child.props.area, typeof height === 'number' ? `${height}px` : height);
          cols.set(child.props.area, typeof width === 'number' ? `${width}px` : width);
        }
      });

      return { gridTemplate: createTemplate({ template, rows, cols }), gridGap: parseGap(gap) };
    }, [children, template, gap]);

    return (
      <div {...props} ref={ref} className={clsx(className, styles.layout)} style={{ ...style, ..._style }}>
        {children}
      </div>
    );
  }
);
