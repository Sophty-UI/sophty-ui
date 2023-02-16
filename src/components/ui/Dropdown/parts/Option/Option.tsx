import clsx from 'clsx';
import { FC, MouseEvent, TouchEvent } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { preventEvent } from '../../../../../utils/events';
import { toBooleanish } from '../../../../../utils/type';
import { useSelectionChangeContext, useSelectionValueContext } from '../../contexts/SelectionContext';
import styles from './style.module.scss';

export interface IOptionProps extends IBoxProps<HTMLLIElement> {
  disabled?: boolean;
  label: string;
  selected?: boolean;
  value: string;
}

const Option: FC<IOptionProps> = ({ value, label, disabled, className, children, ...props }) => {
  const handleSelectionChange = useSelectionChangeContext();
  const isSelected = useSelectionValueContext() === value;

  const handleChange = (event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
    if (!disabled) {
      handleSelectionChange(value, label);

      if (event.type === 'touchend') props.onTouchEnd?.(event as TouchEvent<HTMLLIElement>);
      if (event.type === 'click') props.onClick?.(event as MouseEvent<HTMLLIElement>);

      preventEvent(event);
    }
  };

  return (
    <li
      {...props}
      className={clsx(className, styles.option, isSelected && styles.selected, disabled && styles.disabled)}
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
