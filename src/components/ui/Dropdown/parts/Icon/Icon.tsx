import { ArrowDownIcon, ArrowUpIcon, CrossIcon, LoadingIcon } from '@sophty-ui/icons';
import clsx from 'clsx';
import { FC, MouseEvent, ReactNode } from 'react';

import styles from './style.module.scss';

export interface IIconEvents {
  onClear: (event: MouseEvent<HTMLElement>) => void;
}

export interface IIconProps extends IIconEvents {
  clearable?: boolean;
  closeIcon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  open?: boolean;
  openIcon?: ReactNode;
}

const Icon: FC<IIconProps> = ({
  open,
  openIcon,
  closeIcon,
  loading = false,
  clearable = false,
  disabled = false,
  ...events
}) => {
  const arrow = open ? closeIcon ?? <ArrowUpIcon /> : openIcon ?? <ArrowDownIcon />;
  const icon = loading ? <LoadingIcon spin /> : arrow;

  return (
    <div className={clsx(styles.icon, disabled && styles.disabled)} aria-hidden="true">
      {clearable ? <CrossIcon className={styles.clear} onMouseDown={events.onClear} /> : icon}
    </div>
  );
};

export default Icon;
