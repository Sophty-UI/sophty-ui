import clsx from 'clsx';
import { FC, Key, MouseEvent, TouchEvent, useEffect } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { toBooleanish } from '../../../../../utils/type';
import useDropdownContext from '../../contexts/DropdownContext';
import useGroupContext from '../../contexts/GroupContext';
import styles from './style.module.scss';

export interface IOptionProps extends IBoxProps<HTMLLIElement> {
  _key?: Key;
  disabled?: boolean;
  key: Key;
  label?: string;
  value: string;
}

const Option: FC<IOptionProps> = ({ _key, value, label, disabled, className, children, ...props }) => {
  const [defaultValue, selectedValue, searchValue, onChange] = useDropdownContext();
  const [isGroupDisabled, onFilter] = useGroupContext();
  const isSelected = selectedValue === value;
  const isDisabled = isGroupDisabled ?? disabled;
  const isVisible =
    !searchValue ||
    (!isDisabled && (typeof children === 'string' ? children : label ?? value).indexOf(searchValue) >= 0);

  useEffect(() => {
    if (_key) onFilter?.(_key, !isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (defaultValue === value) onChange?.(defaultValue, typeof children === 'string' ? children : label ?? value);
  }, [defaultValue, value]);

  const handleChange = (event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
    if (!isDisabled) {
      onChange?.(value, typeof children === 'string' ? children : label ?? value);

      if (event.type === 'touchend') props.onTouchEnd?.(event as TouchEvent<HTMLLIElement>);
      if (event.type === 'click') props.onClick?.(event as MouseEvent<HTMLLIElement>);

      event.stopPropagation();
      event.preventDefault();
    }
  };

  return isVisible ? (
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
  ) : null;
};

export default Option;
