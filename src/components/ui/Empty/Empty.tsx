import clsx from 'clsx';
import { ReactElement } from 'react';

import styles from './style.module.scss';

export interface IEmptyProps {
  className?: string;
}

// TODO: add Icon
const Empty = ({ className }: IEmptyProps): ReactElement => (
  <div className={clsx(className, styles.container)}>
    <div className={styles.icon}></div>
    <span className={styles.description}></span>
  </div>
);

export default Empty;
