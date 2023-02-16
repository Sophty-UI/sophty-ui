import { FC } from 'react';

import { IBoxProps } from '../../../../../types/box';
import styles from './style.module.scss';

export interface IGroupProps extends IBoxProps<HTMLLIElement> {
  disabled?: boolean;
  title?: string;
}

const Group: FC<IGroupProps> = ({ title, children }) => (
  <li className={styles.group} role="presentation" tabIndex={-1}>
    <span role="presentation" className={styles.title}>
      {title}
    </span>
    <ul className={styles.body} role="group">
      {children}
    </ul>
  </li>
);

export default Group;
