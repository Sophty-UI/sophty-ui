import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { IBoxProps } from '../../../../../types/box';
import Empty from '../../../Empty';
import styles from './style.module.scss';

export interface IMenuProps extends IBoxProps {
  open?: boolean;
}

const Menu: FC<IMenuProps> = ({ children, className, open }) => {
  const [isOpenBefore, setIsOpenBefore] = useState(false);

  useEffect(() => {
    if (open && !isOpenBefore) setIsOpenBefore(true);
  }, [open]);

  return isOpenBefore ? (
    <div className={clsx(className, styles.menu, open ? styles.visible : styles.hidden)} aria-expanded="true">
      {children ? (
        <ul className={styles.list} tabIndex={0} role="menu">
          {children}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  ) : null;
};

export default Menu;
