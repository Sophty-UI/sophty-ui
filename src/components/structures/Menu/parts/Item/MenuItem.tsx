import clsx from 'clsx';
import { ForwardedRef, forwardRef, MouseEvent, ReactElement, ReactNode } from 'react';

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

const MenuItem = (
  { className, disabled, id, label, onClick, selected, role = 'menu-item', ...props }: IMenuItemProps,
  ref: ForwardedRef<HTMLLIElement>
): ReactElement<IMenuItemProps> => {
  const handleClick = (event: MouseEvent<HTMLLIElement>): void => onClick(event, id);

  return (
    <li
      {...props}
      ref={ref}
      key={id}
      role={role}
      className={clsx(className, styles.item, disabled && styles.disabled, selected && styles.selected)}
      onClick={handleClick}
    >
      {label}
    </li>
  );
};

export default forwardRef<HTMLLIElement, IMenuItemProps>(MenuItem);
