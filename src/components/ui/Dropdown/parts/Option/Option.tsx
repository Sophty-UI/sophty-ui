import clsx from 'clsx';
import { MouseEvent, ReactElement, ReactNode, TouchEvent } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { toBooleanish } from '../../../../../utils/type';
import styles from './style.module.scss';

export type IOptionChild = ReactElement<IOptionProps, typeof Option>;

export interface IOptionsEvents {
  onChange?: (value: string, label: string, event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>) => void;
}

export interface IOptionProps extends Omit<IBoxProps<ReactNode, HTMLLIElement>, keyof IOptionsEvents>, IOptionsEvents {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value: string;
}

const Option = ({
  value,
  label,
  selected,
  disabled,
  className,
  children,
  onChange,
  ...props
}: IOptionProps): ReactElement => {
  const handleChange = (event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
    if (!disabled) {
      onChange?.(value, typeof children === 'string' ? children : label ?? value, event);

      if (event.type === 'touchend') props.onTouchEnd?.(event as TouchEvent<HTMLLIElement>);
      if (event.type === 'click') props.onClick?.(event as MouseEvent<HTMLLIElement>);

      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <li
      {...props}
      className={clsx(className, styles.option, selected && styles.selected, disabled && styles.disabled)}
      onTouchEnd={handleChange}
      onClick={handleChange}
      role="option"
      aria-selected={toBooleanish(!!selected)}
      tabIndex={-1}
    >
      {children ?? label ?? value}
    </li>
  );
};

export default Option;
