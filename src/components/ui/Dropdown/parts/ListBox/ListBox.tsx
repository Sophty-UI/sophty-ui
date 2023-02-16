import clsx from 'clsx';
import { ChangeEvent, createRef, FC, useEffect, useState } from 'react';

import ClearIcon from '../../../../icons/ClearIcon';
import SpinIcon from '../../../../icons/SpinIcon';
import SwitchArrowIcon from '../../../../icons/SwitchArrowIcon';
import { useSelectionChangeContext, useSelectionLabelContext } from '../../contexts/SelectionContext';
import styles from './style.module.scss';

export interface IListBoxEvents {
  onFilter?: (searchString: string) => void;
}

export interface IListBoxProps extends IListBoxEvents {
  allowClear: boolean;
  disabled: boolean;
  editable: boolean;
  loading: boolean;
  open: boolean;
  placeholder?: string;
}

const ListBox: FC<IListBoxProps> = ({
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
    <div className={styles.listbox} aria-haspopup="listbox">
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
        <span className={clsx(styles.label, (isDisabled || !label) && styles.placeholder)}>{label ?? placeholder}</span>
      )}

      {isLoading ? (
        <SpinIcon disabled={isDisabled} />
      ) : (
        <>
          {allowClear && (!!label || !!value) ? (
            <ClearIcon onClear={handleClear} disabled={isDisabled} />
          ) : (
            <SwitchArrowIcon status={isOpen} disabled={isDisabled} />
          )}
        </>
      )}
    </div>
  );
};

export default ListBox;
