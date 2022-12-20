import clsx from 'clsx';
import { Children, cloneElement, DetailedHTMLProps, HTMLAttributes, ReactElement, useMemo } from 'react';

import useResolution from '../../../hooks/useResolution';
import { GRID_COLUMNS_SIZE } from '../../../types/grid';
import { Resolution, RESOLUTIONS } from '../../../types/resolution';
import { IGridItemProps } from './parts/GridItem';
import styles from './style.module.scss';

export interface IGridProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactElement<IGridItemProps> | ReactElement<IGridItemProps>[];
  columns?: number;
}

const Grid = ({ children, className, columns = GRID_COLUMNS_SIZE, ...props }: IGridProps): ReactElement => {
  const activeResolution = useResolution();
  const body = useMemo(() => {
    const breakpoint = RESOLUTIONS.findIndex(resolution => resolution === activeResolution);
    const breakpoints = RESOLUTIONS.slice(0, breakpoint);
    const columnEnd = columns + 1;
    let prevPosition = 1;

    return Children.map(children, child => {
      const resolutions = [...breakpoints];
      const columnStart = prevPosition;
      let { span } = child.props;
      let value: number | undefined;

      if (typeof span === 'object') {
        value = span[activeResolution];

        while (!value && resolutions.length) value = span[resolutions.pop() ?? Resolution.ExtraSmall];
      } else value = span;

      span = Math.min(value ?? columns, columns);
      prevPosition = prevPosition + span >= columnEnd ? 1 : prevPosition + span;

      return cloneElement(child, { columnStart, columnEnd, span });
    });
  }, [children, activeResolution, columns]);

  return (
    <div {...props} className={clsx(className, styles.grid)}>
      {body}
    </div>
  );
};

export default Grid;
