import clsx from 'clsx';
import { ForwardedRef, forwardRef, useMemo } from 'react';

import useResolution from '../../../hooks/useResolution';
import { IBoxProps } from '../../../types/box';
import { IFlexWrap } from '../../../types/css';
import { IFlexAlign, IFlexGap, IFlexJustify } from '../../../types/flex';
import { Resolution } from '../../../types/resolution';
import { parseGap } from '../../../utils/flex';
import styles from './style.module.scss';

export interface IRowProps extends IBoxProps {
  align?: IFlexAlign | { [key in Resolution]?: IFlexAlign };
  direction?: 'row' | 'column';
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
  justify?: IFlexJustify | { [key in Resolution]?: IFlexJustify };
  wrap?: boolean | IFlexWrap;
}

const ALIGN_MAP = {
  none: undefined,
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

const Row = (
  {
    children,
    style,
    className,
    gap,
    align,
    justify = 'space-evenly',
    direction = 'row',
    wrap = true,
    ...props
  }: IRowProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const resolution = useResolution();
  const flexStyles = useMemo(
    () => ({
      alignItems: ALIGN_MAP[(typeof align === 'string' ? align : (align ?? {})[resolution]) ?? 'none'],
      justifyContent: typeof justify === 'string' ? justify : (justify ?? {})[resolution],
      flexFlow: `${direction} ${wrap === true ? 'wrap' : wrap || 'nowrap'}`,
      gap: parseGap(gap),
    }),
    [resolution, gap, align, justify, direction, wrap]
  );

  return (
    <div {...props} ref={ref} className={clsx(className, styles.row)} style={{ ...style, ...flexStyles }}>
      {children}
    </div>
  );
};

export default forwardRef<HTMLDivElement, IRowProps>(Row);
