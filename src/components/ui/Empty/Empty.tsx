import clsx from 'clsx';
import { FC } from 'react';

import styles from './style.module.scss';

export interface IEmptyProps {
  className?: string;
}

// TODO: add Icon
const Empty: FC<IEmptyProps> = ({ className }) => (
  <div className={clsx(className, styles.container)}>
    <div className={styles.icon}></div>
    <span className={styles.description}></span>
  </div>
);

export default Empty;
