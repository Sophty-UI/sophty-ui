import { ReactElement, ReactNode } from 'react';

import styles from './style.module.scss';

export interface IArrowProps {
  closeArrow?: ReactNode;
  open?: boolean;
  openArrow?: ReactNode;
}

const Arrow = ({ open, openArrow, closeArrow }: IArrowProps): ReactElement => {
  const openIcon = openArrow ?? <span aria-hidden="true" className={styles.open} />;
  const closeIcon = closeArrow ?? <span aria-hidden="true" className={styles.close} />;

  return (open ? closeIcon : openIcon) as ReactElement;
};

export default Arrow;
