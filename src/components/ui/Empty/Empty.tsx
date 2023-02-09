import clsx from 'clsx';

import styles from './style.module.scss';

export interface IEmptyProps {
  className?: string;
}

// TODO: add Icon
const Empty = ({ className }: IEmptyProps) => (
  <div className={clsx(className, styles.container)}>
    <div className={styles.icon}></div>
    <span className={styles.description}></span>
  </div>
);

export default Empty;
