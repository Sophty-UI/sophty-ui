import clsx from 'clsx';
import { forwardRef } from 'react';

import useResolution from '~/hooks/useResolution';
import { IBox } from '~/types/box';

import styles from './style.scss';

export default forwardRef<HTMLDivElement, IBox>(({ className, children, ...props }, ref) => {
  const { breakpoint } = useResolution();

  return (
    <div {...props} ref={ref} className={clsx(className, styles.container, styles[breakpoint])}>
      {children}
    </div>
  );
});
