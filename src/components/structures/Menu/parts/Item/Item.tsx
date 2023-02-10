import clsx from 'clsx';
import { forwardRef, ForwardRefRenderFunction, MouseEvent, ReactNode } from 'react';

import { IDetailedProps } from '../../../../../types/box';
import styles from './style.module.scss';

export interface IItemEvents {
  onClick: (event: MouseEvent<HTMLLIElement>, id: string) => void;
}

export interface IItemProps extends Omit<IDetailedProps<HTMLLIElement>, keyof IItemEvents>, IItemEvents {
  disabled?: boolean;
  icon?: ReactNode;
  id: string;
  label?: string;
  selected?: boolean;
}

const Item: ForwardRefRenderFunction<HTMLLIElement, IItemProps> = (
  { className, children, disabled, id, label, onClick, selected, role = 'menu-item', ...props },
  ref
) => {
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
      {children ?? label}
    </li>
  );
};

export default forwardRef(Item);
