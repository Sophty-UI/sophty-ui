import { LoadingIcon } from '@sophty-ui/icons';
import clsx from 'clsx';
import { createRef, MouseEvent, ReactElement, ReactNode, TouchEvent, useEffect, useState } from 'react';

import Arrow from './parts/Arrow';
import Clear from './parts/Clear';
import Menu, { IMenuProps } from './parts/Menu';
import { IOptionsEvents } from './parts/Option';
import styles from './style.module.scss';

export interface IDropdownEvents extends IOptionsEvents {
  onFocus?: (focus: boolean) => void;
}

export interface IDropdownProps extends Omit<IMenuProps, keyof IDropdownEvents>, IDropdownEvents {
  allowClear?: boolean;
  closeAfterChange?: boolean;
  closeArrow?: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  openArrow?: ReactNode;
  placeholder?: string;
  type?: 'select' | 'menu';
}

const Dropdown = ({
  allowClear,
  children,
  className,
  closeArrow,
  defaultValue,
  disabled,
  loading,
  openArrow,
  type = 'select',
  placeholder = '',
  closeAfterChange = true,
  ...events
}: IDropdownProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(placeholder);
  const ref = createRef<HTMLDivElement>();
  const isSelect = type === 'select';

  useEffect(() => {
    const handleDocumentClick = ({ target }: Event): void => {
      if (!!target && !ref.current?.contains(target as Node) && isOpen) setIsOpen(false);
    };

    document.addEventListener('click', handleDocumentClick, false);
    document.addEventListener('touchend', handleDocumentClick, false);

    return () => {
      document.removeEventListener('click', handleDocumentClick, false);
      document.removeEventListener('touchend', handleDocumentClick, false);
    };
  });

  const handleMouseDown = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
    events.onFocus?.(isOpen);

    if (
      ((event.type === 'mousedown' && (event as MouseEvent<HTMLDivElement>).button === 0) ||
        event.type === 'touchend') &&
      !loading
    ) {
      event.stopPropagation();
      event.preventDefault();

      if (!disabled) setIsOpen(state => !state);
    }
  };

  const handleChange = (
    value: string,
    label: string,
    event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>
  ): void => {
    if (value !== selectedValue) {
      setSelectedValue(value);
      setSelectedLabel(label);

      events.onChange?.(value, label, event);

      if (closeAfterChange) setIsOpen(false);
    }
  };

  const handleMouseEnter = (): void => setIsHovered(true);
  const handleMouseLeave = (): void => setIsHovered(false);

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        styles.dropdown,
        isOpen && styles.dropdownOpen,
        isSelect ? styles.dropdownSelect : styles.dropdownMenu,
        loading && styles.dropdownLoading
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx(styles.control, disabled && styles.disabled)}
        onMouseDown={isSelect && allowClear ? handleMouseDown : undefined}
        onTouchEnd={isSelect && allowClear ? handleMouseDown : undefined}
        aria-haspopup="listbox"
      >
        {isSelect && (
          <span className={clsx(selectedLabel ? styles.label : styles.placeholder)}>
            {selectedLabel ?? placeholder}
          </span>
        )}
        <div className={styles.icon}>
          {loading ? <LoadingIcon spin /> : <Arrow open={isOpen} openArrow={openArrow} closeArrow={closeArrow} />}
          {
            // TODO: isSelect && allowClear && isHovered - show Clear else show Arrows
            // TODO: Icon container to component? with arrows and clear icons?
            isSelect && allowClear && isHovered && <Clear />
          }
        </div>
      </div>
      <Menu open={isOpen} defaultValue={defaultValue} selectedValue={selectedValue} onChange={handleChange}>
        {children}
      </Menu>
    </div>
  );
};

export default Dropdown;
