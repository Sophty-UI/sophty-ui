import clsx from 'clsx';
import { MouseEvent, ReactElement, ReactNode } from 'react';

import { IDetailedProps } from '../../../../../types/box';
import styles from './style.module.scss';

export interface IMenuItemEvents {
  onClick: (event: MouseEvent<HTMLLIElement>, id: string) => void;
}

export interface IMenuItemProps extends Omit<IDetailedProps<HTMLLIElement>, 'onClick' | 'children'>, IMenuItemEvents {
  disabled?: boolean;
  icon?: ReactNode;
  id: string;
  label?: string;
  selected?: boolean;
}

const MenuItem = ({
  className,
  disabled,
  id,
  label,
  onClick,
  selected,
  role = 'menu-item',
  ...props
}: IMenuItemProps): ReactElement<IMenuItemProps> => {
  const handleClick = (event: MouseEvent<HTMLLIElement>): void => onClick(event, id);

  return (
    <li
      key={id}
      {...props}
      role={role}
      className={clsx(className, styles.item, disabled && styles.disabled, selected && styles.selected)}
      onClick={handleClick}
    >
      {label}
    </li>
  );
};

export default MenuItem;
