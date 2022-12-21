import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactElement } from 'react';

import { IBoxProps } from '../../../types/box';
import styles from './style.module.scss';

export interface IColProps extends IBoxProps {
  flex?: number | string;
  span?: number;
}

const parseFlex = (flex?: number | string): string | undefined => {
  if (typeof flex === 'number') return `${flex} ${flex} auto`;
  if (flex && /^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;

  return flex;
};

const parseSpan = (span: number): string | undefined => {
  const key = `span${Math.min(span, parseInt(styles.size, 10))}`;

  return key in styles ? styles[key as keyof typeof styles] : undefined;
};

const Col = (
  { span = 1, flex, children, className, style, ...props }: IColProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement => (
  <div
    {...props}
    ref={ref}
    className={clsx(className, styles.col, !flex && parseSpan(span))}
    style={{ ...style, flex: parseFlex(flex) }}
  >
    {children}
  </div>
);

export default forwardRef<HTMLDivElement, IColProps>(Col);
