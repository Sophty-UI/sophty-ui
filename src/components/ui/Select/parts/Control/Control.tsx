import clsx from 'clsx';
import { ChangeEvent, createRef, FC, useEffect, useState } from 'react';

import Icon from '../../../Select/parts/Icon';
import { useSelectionChangeContext, useSelectionLabelContext } from '../../contexts/SelectionContext';
import styles from './style.module.scss';

export interface IControlEvents {
  onFilter?: (searchString: string) => void;
}

export interface IControlProps extends IControlEvents {
  allowClear: boolean;
  disabled: boolean;
  editable: boolean;
  loading: boolean;
  open: boolean;
  placeholder?: string;
}

const Control: FC<IControlProps> = ({
  placeholder,
  allowClear,
  editable: isEditable,
  open: isOpen,
  disabled: isDisabled,
  loading: isLoading,
  ...events
}) => {
  const [value, setValue] = useState('');
  const ref = createRef<HTMLInputElement>();
  const handleSelectionChange = useSelectionChangeContext();
  const label = useSelectionLabelContext();

  useEffect(() => {
    if (ref.current) ref.current.focus();
    if (!isOpen) setValue('');
  }, [ref.current, isOpen]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setValue(target.value);
    events.onFilter?.(target.value);
  };

  const handleClear = (): void => {
    if (value) setValue('');
    else if (label) handleSelectionChange();
  };

  return (
    <div className={styles.control} aria-haspopup="listbox">
      {isEditable && isOpen ? (
        <input
          ref={ref}
          className={styles.input}
          type="search"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          placeholder={label ?? placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <span
          className={clsx(styles.label, isEditable && styles.editable, (isDisabled || !label) && styles.placeholder)}
        >
          {label ?? placeholder}
        </span>
      )}

      <Icon
        allowClear={allowClear && (!!label || !!value)}
        open={isOpen}
        loading={isLoading}
        disabled={isDisabled}
        onClear={handleClear}
      />
    </div>
  );
};

export default Control;
