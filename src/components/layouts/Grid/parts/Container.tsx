import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import parseGap from '~/helpers/grid/parseGap';
import useSpan from '~/hooks/useSpan';
import { IFlexBox } from '~/types/box';
import { ISpan } from '~/types/resolution';

import styles from '../style.scss';

interface IContainerProps extends IFlexBox {
  columns: ISpan;
  rows?: ISpan;
}

const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ children, className, style, columns, rows, gap, ...props }, ref) => {
    const rowSpan = useSpan(rows);
    const colSpan = useSpan(columns);
    const _style = useMemo(
      () => ({
        ...style,
        gridGap: parseGap(gap),
        gridTemplateRows: rowSpan ? `repeat(${rowSpan}, 1fr)` : 'auto',
        gridTemplateColumns: `repeat(${colSpan || 1}, minmax(0, 1fr))`,
      }),
      [rowSpan, colSpan, gap]
    );

    return (
      <div {...props} ref={ref} className={clsx(className, styles.container)} style={{ ...style, ..._style }}>
        {children}
      </div>
    );
  }
);

export default Container;
