import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { IBoxProps } from '../../../../../types/box';
import Empty from '../../../Empty';
import EffectProvider from '../../contexts/EffectProvider';
import styles from './style.module.scss';

export interface IMenuEvents {
  onSelect: (value: string, label: string) => void;
}

export interface IMenuProps extends Omit<IBoxProps, keyof IMenuEvents>, IMenuEvents {
  open?: boolean;
}

const Menu: FC<IMenuProps> = ({ children, className, open = false, ...events }) => {
  const [isOpenBefore, setIsOpenBefore] = useState(false);

  useEffect(() => {
    if (open && !isOpenBefore) setIsOpenBefore(true);
  }, [open]);

  return isOpenBefore ? (
    <div className={clsx(className, styles.menu, open ? styles.visible : styles.hidden)} aria-expanded="true">
      {children ? (
        <ul className={styles.list} tabIndex={0} role="menu">
          <EffectProvider open={open} onSelect={events.onSelect}>
            {children}
          </EffectProvider>
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  ) : null;
};

export default Menu;
