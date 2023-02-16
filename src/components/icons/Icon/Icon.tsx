import clsx from 'clsx';
import { FC } from 'react';

import { IContainerProps } from '../../../types/box';
import styles from './style.module.scss';

export interface IIconProps {
  disabled?: boolean;
}

const Icon: FC<IIconProps & IContainerProps> = ({ children, disabled }) => (
  <div className={clsx(styles.icon, disabled && styles.disabled)} aria-hidden="true">
    {children}
  </div>
);

export default Icon;
