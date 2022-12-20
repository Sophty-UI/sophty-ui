import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode } from 'react';

import useResolution from '../../../hooks/useResolution';
import { Resolution } from '../../../types/resolution';
import styles from './style.module.scss';

export interface IContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

const MODIFICATIONS: { [key in Resolution]?: string } = {
  [Resolution.SuperLarge]: styles.super,
  [Resolution.ExtraLarge]: styles.extra,
  [Resolution.Large]: styles.large,
  [Resolution.Medium]: styles.medium,
  [Resolution.Small]: styles.small,
};

const Container = ({ className, children, ...props }: IContainerProps): ReactElement => {
  const resolution = useResolution();

  return (
    <div {...props} className={clsx(className, styles.container, MODIFICATIONS[resolution])}>
      {children}
    </div>
  );
};

export default Container;
