import clsx from 'clsx';
import { MouseEvent, TouchEvent } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { toBooleanish } from '../../../../../utils/type';
import useDropdownContext from '../../contexts/DropdownContext';
import useGroupContext from '../../contexts/GroupContext';
import styles from './style.module.scss';

export interface IOptionProps extends IBoxProps<HTMLLIElement> {
  disabled?: boolean;
  label?: string;
  value: string;
}

const Option = ({ value, label, disabled, className, children, ...props }: IOptionProps) => {
  const [selectedValue, handler] = useDropdownContext();
  const [isInDisabledGroup] = useGroupContext();
  const isSelected = selectedValue === value;
  const isDisabled = isInDisabledGroup ?? disabled;

  const handleChange = (event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
    if (!isDisabled) {
      handler?.(value, typeof children === 'string' ? children : label ?? value, event);

      if (event.type === 'touchend') props.onTouchEnd?.(event as TouchEvent<HTMLLIElement>);
      if (event.type === 'click') props.onClick?.(event as MouseEvent<HTMLLIElement>);

      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <li
      {...props}
      className={clsx(className, styles.option, isSelected && styles.selected, isDisabled && styles.disabled)}
      onTouchEnd={handleChange}
      onClick={handleChange}
      role="option"
      aria-selected={toBooleanish(!!isSelected)}
      tabIndex={-1}
    >
      {children ?? label ?? value}
    </li>
  );
};

export default Option;
