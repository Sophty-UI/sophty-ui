import clsx from 'clsx';
import {
  Children,
  cloneElement,
  forwardRef,
  ForwardRefRenderFunction,
  isValidElement,
  ReactElement,
  useMemo,
} from 'react';

import useResolution from '../../../hooks/useResolution';
import { IBoxProps } from '../../../types/box';
import { calcSpan } from '../../../utils/flex';
import { IItemPrivateProps, IItemProps } from './parts/Item';
import styles from './style.module.scss';

export interface IGridProps extends IBoxProps {
  columns?: number;
}

// TODO: offset - to push or pull columns
const Grid: ForwardRefRenderFunction<HTMLDivElement, IGridProps> = (
  { children, className, columns = 12, ...props },
  ref
) => {
  const resolution = useResolution();
  const body = useMemo(() => {
    const _columnEnd = columns + 1;
    let prevPosition = 1;

    return Children.map(children, child => {
      if (!child || !isValidElement(child)) return undefined;

      const span = calcSpan(child.props.span, resolution, columns);
      const item = cloneElement(child as ReactElement<IItemProps & IItemPrivateProps>, {
        _columnStart: prevPosition,
        _columnEnd,
        span,
      });

      prevPosition = prevPosition + span >= _columnEnd ? 1 : prevPosition + span;

      return item;
    });
  }, [children, resolution, columns]);

  return (
    <div {...props} ref={ref} className={clsx(className, styles.grid)}>
      {body}
    </div>
  );
};

export default forwardRef(Grid);
