import clsx from 'clsx';
import { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react';

import useResolution from '../../../hooks/useResolution';
import { IBoxProps } from '../../../types/box';
import { IFlexSpan } from '../../../types/flex';
import { calcSpan, parseFlex } from '../../../utils/flex';
import styles from './style.module.scss';

export interface IColProps extends IBoxProps {
  flex?: number | string;
  grow?: boolean;
  span?: IFlexSpan;
}

const GRID_SIZE = (styles.size && parseInt(styles.size, 10)) || 0;

const Col: ForwardRefRenderFunction<HTMLDivElement, IColProps> = (
  { span, flex, grow, children, className, style, ...props }: IColProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const resolution = useResolution();
  const spanIndex = !flex && span !== undefined ? calcSpan(span, resolution, GRID_SIZE) : undefined;

  return spanIndex === 0 ? null : (
    <div
      {...props}
      ref={ref}
      className={clsx(
        className,
        styles.col,
        grow && styles.grow,
        spanIndex && styles[`span${spanIndex}` as keyof typeof styles]
      )}
      style={{ ...style, flex: parseFlex(flex) }}
    >
      {children}
    </div>
  );
};

export default forwardRef(Col);
