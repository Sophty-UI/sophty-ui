import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import parseFlex from '~/helpers/flex/parseFlex';
import useSpan from '~/hooks/useSpan';
import { IBox } from '~/types/box';
import { ISpan } from '~/types/resolution';

import { useRelativeContext } from '../context';

import styles from '../style.scss';

export interface IColProps extends IBox {
  flex?: number | string;
  grow?: boolean;
  span?: ISpan;
}

export default forwardRef<HTMLDivElement, IColProps>(
  ({ span, flex, grow, children, className, style, ...props }, ref) => {
    const padding = useRelativeContext();
    const colSpan = useSpan(span);
    const [_class, _style] = useMemo(() => {
      const size = (styles.size && parseInt(styles.size, 10)) || 0;
      const variant = Math.max(0, Math.min(!flex && colSpan !== undefined ? colSpan ?? size : size, size));

      return [clsx(styles[`span${variant}` as keyof typeof styles], grow && styles.grow), { flex: parseFlex(flex) }];
    }, [colSpan, flex, grow]);

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, styles.col, _class)}
        style={{ ...style, ..._style, paddingLeft: padding, paddingRight: padding }}
      >
        {children}
      </div>
    );
  }
);
