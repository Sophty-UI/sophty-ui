import clsx from 'clsx';
import { FC } from 'react';

import { IBoxProps } from '../../../../../types/box';
import Empty from '../../../Empty';
import styles from './style.module.scss';

export interface IMenuProps extends IBoxProps {
  open?: boolean;
}

const Menu: FC<IMenuProps> = ({ children, className, open }) =>
  open ? (
    <div className={clsx(className, styles.container)} aria-expanded="true">
      {children ? (
        <ul className={styles.menu} tabIndex={0} role="menu">
          {children}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  ) : null;

export default Menu;
