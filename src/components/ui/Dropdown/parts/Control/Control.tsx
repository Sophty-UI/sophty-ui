import clsx from 'clsx';
import { ChangeEvent, createRef, FC, useEffect, useState } from 'react';

import styles from './style.module.scss';

export interface IControlEvents {
  onSearch?: (value: string) => void;
}

export interface IControlProps extends IControlEvents {
  disabled?: boolean;
  editable?: boolean;
  open?: boolean;
  placeholder?: string;
  value?: string;
}

const Control: FC<IControlProps> = ({ value, editable, placeholder, disabled, open, ...events }) => {
  const [inputValue, setInputValue] = useState(value ?? '');
  const ref = createRef<HTMLInputElement>();
  // const className = clsx((!value || (!editable && open)) && styles.placeholder);

  useEffect(() => {
    if (value !== inputValue) setInputValue(value ?? '');
  }, [value]);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current, open]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    events.onSearch?.(target.value);
    setInputValue(target.value);
  };

  return (
    <>
      {editable && (
        <input
          ref={ref}
          className={clsx(styles.control, styles.input, open ? styles.visible : styles.hidden)}
          type="search"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
      )}
      <span
        className={clsx(
          styles.control,
          styles.label,
          (editable && !open) || !editable ? styles.visible : styles.hidden,
          (disabled || !value) && styles.placeholder
        )}
      >
        {value ?? placeholder}
      </span>
    </>
  );

  /*
  return editable && open ? (
    <input
      className={className}
      type="search"
      autoComplete="off"
      role="combobox"
      aria-autocomplete="list"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      autoFocus
    />
  ) : (
    <span className={className}>{value ?? placeholder}</span>
  );
  */
};

export default Control;
