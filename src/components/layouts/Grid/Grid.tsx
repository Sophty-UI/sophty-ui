import clsx from 'clsx';
import { Children, cloneElement, ForwardedRef, forwardRef, ReactElement, useMemo } from 'react';

import useResolution from '../../../hooks/useResolution';
import { IBoxProps } from '../../../types/box';
import { calcSpan } from '../../../utils/flex';
import { IGridItemProps } from './parts/GridItem';
import styles from './style.module.scss';

export interface IGridProps extends IBoxProps<ReactElement<IGridItemProps>> {
  columns?: number;
}

// TODO: offset - to push or pull columns
const Grid = (
  { children, className, columns = 12, ...props }: IGridProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement<IGridProps> => {
  const resolution = useResolution();
  const body = useMemo(() => {
    const columnEnd = columns + 1;
    let prevPosition = 1;

    return Children.map(children, child => {
      const columnStart = prevPosition;
      const span = calcSpan(child.props.span, resolution, columns);

      prevPosition = prevPosition + span >= columnEnd ? 1 : prevPosition + span;

      return cloneElement(child, { columnStart, columnEnd, span });
    });
  }, [children, resolution, columns]);

  return (
    <div {...props} ref={ref} className={clsx(className, styles.grid)}>
      {body}
    </div>
  );
};

export default forwardRef<HTMLDivElement, IGridProps>(Grid);
