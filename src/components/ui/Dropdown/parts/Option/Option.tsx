import clsx from 'clsx';
import { FC, MouseEvent, TouchEvent, useMemo } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { preventEvent } from '../../../../../utils/events';
import { toBooleanish } from '../../../../../utils/type';
import { useEffectChangeContext, useEffectIndexContext, useEffectRegisterContext } from '../../contexts/EffectProvider';
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
  const registerEffect = useEffectRegisterContext();
  const changeEffect = useEffectChangeContext();
  const activeIndex = useEffectIndexContext();
  const index = useMemo(() => registerEffect?.(value, label) ?? 0, [value, label]);

  const handleChange = (event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
    if (!disabled) {
      handleSelectionChange(value, label);

      if (event.type === 'touchend') props.onTouchEnd?.(event as TouchEvent<HTMLLIElement>);
      if (event.type === 'click') props.onClick?.(event as MouseEvent<HTMLLIElement>);
    }

    preventEvent(event);
  };

  const handleMouseEnter = (): void => {
    if (!disabled) changeEffect?.(index);
  };

  const handleMouseMove = (): void => {
    if (!disabled && activeIndex !== index) changeEffect?.(index);
  };

  return (
    <li
      {...props}
      className={clsx(
        className,
        styles.option,
        isSelected && styles.selected,
        disabled && styles.disabled,
        index === activeIndex && styles.hover
      )}
      onTouchEnd={handleChange}
      onClick={handleChange}
      role={disabled ? 'none' : 'option'}
      aria-selected={toBooleanish(!!isSelected)}
      aria-disabled={toBooleanish(!!disabled)}
      tabIndex={-1}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      {children ?? label}
    </li>
  );
};

export default Option;
