import clsx from 'clsx';
import { CSSProperties, forwardRef, useMemo } from 'react';

import parseGap from '~/helpers/flex/parseGap';
import { IFlexBox } from '~/types/box';

import { Provider } from '../context';

import styles from '../style.scss';

export interface IRowProps extends IFlexBox {
  reverse?: boolean;
}

const Row = forwardRef<HTMLDivElement, IRowProps>(
  ({ children, style, className, gap, reverse = false, ...props }, ref) => {
    const [_style, _context] = useMemo((): [CSSProperties, string | undefined] => {
      const [rowGap, colGap, margin] = parseGap(gap);

      return [
        { flexWrap: `wrap${reverse ? '-reverse' : ''}`, rowGap, marginLeft: margin, marginRight: margin },
        colGap,
      ];
    }, [gap, reverse]);

    return (
      <div {...props} ref={ref} className={clsx(className, styles.row)} style={{ ...style, ..._style }}>
        <Provider value={_context}>{children}</Provider>
      </div>
    );
  }
);

export default Row;
