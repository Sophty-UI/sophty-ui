import clsx from 'clsx';
import { ChangeEvent, forwardRef, ForwardRefRenderFunction, useEffect, useState } from 'react';

import styles from './style.module.scss';

export interface IControlEvents {
  onSearch: (value: string) => void;
}

export interface IControlProps extends IControlEvents {
  disabled?: boolean;
  editable?: boolean;
  open?: boolean;
  placeholder?: string;
  value?: string;
}

const Control: ForwardRefRenderFunction<HTMLInputElement, IControlProps> = (
  { value, editable, placeholder, disabled, open, ...events },
  ref
) => {
  const [inputValue, setInputValue] = useState(value ?? '');
  const className = clsx(
    styles.control,
    editable ? styles.input : styles.label,
    !inputValue && (!editable || open) && styles.placeholder,
    disabled && styles.disabled,
    open && styles.open
  );

  useEffect(() => {
    if (value !== inputValue) setInputValue(value ?? '');
  }, [value]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    events.onSearch(target.value);
    setInputValue(target.value);
  };

  return editable ? (
    <input
      ref={ref}
      className={className}
      type="search"
      autoComplete="off"
      role="combobox"
      aria-autocomplete="list"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  ) : (
    <span className={className}>{value ?? placeholder}</span>
  );
};

export default forwardRef(Control);
