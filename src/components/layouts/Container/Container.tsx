import clsx from 'clsx';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import useResolution from '../../../hooks/useResolution';
import { IBoxProps } from '../../../types/box';
import { Resolution } from '../../../types/resolution';
import styles from './style.module.scss';

const MODIFICATIONS: { [key in Resolution]?: string } = {
  [Resolution.SuperLarge]: styles.super,
  [Resolution.ExtraLarge]: styles.extra,
  [Resolution.Large]: styles.large,
  [Resolution.Medium]: styles.medium,
  [Resolution.Small]: styles.small,
};

const Container: ForwardRefRenderFunction<HTMLDivElement, IBoxProps> = ({ className, children, ...props }, ref) => {
  const resolution = useResolution();

  return (
    <div {...props} ref={ref} className={clsx(className, styles.container, MODIFICATIONS[resolution])}>
      {children}
    </div>
  );
};

export default forwardRef(Container);
