import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode } from 'react';

import { useMediaQuery } from '../../../hooks';
import styles from './style.module.scss';

export interface IContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

const Container = ({ className, children, ...props }: IContainerProps): ReactElement => {
  const modification = [
    useMediaQuery(({ breakpoints }) => breakpoints.up('sl')) && styles.super,
    useMediaQuery(({ breakpoints }) => breakpoints.up('xl')) && styles.extra,
    useMediaQuery(({ breakpoints }) => breakpoints.up('lg')) && styles.large,
    useMediaQuery(({ breakpoints }) => breakpoints.up('md')) && styles.medium,
    useMediaQuery(({ breakpoints }) => breakpoints.up('sm')) && styles.small,
  ].find(value => !!value);

  return (
    <div {...props} className={clsx(className, styles.container, modification)}>
      {children}
    </div>
  );
};

export default Container;
