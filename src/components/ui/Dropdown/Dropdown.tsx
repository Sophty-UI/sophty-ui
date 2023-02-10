import clsx from 'clsx';
import { createRef, FC, MouseEvent, ReactNode, TouchEvent, useCallback, useEffect, useState } from 'react';

import { DropdownProvider } from './contexts/DropdownContext';
import Icon from './parts/Icon';
import Menu, { IMenuProps } from './parts/Menu';
import styles from './style.module.scss';
import { IDropdownChangeEvent } from './types/events';

export interface IDropdownEvents {
  onChange?: IDropdownChangeEvent;
  onFocus?: (focus: boolean) => void;
}

export interface IDropdownProps extends Omit<IMenuProps, keyof IDropdownEvents>, IDropdownEvents {
  allowClear?: boolean;
  closeAfterChange?: boolean;
  closeIcon?: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  openIcon?: ReactNode;
  placeholder?: string;
  type?: 'select' | 'menu';
}

const Dropdown: FC<IDropdownProps> = ({
  allowClear,
  children,
  className,
  closeIcon,
  defaultValue,
  disabled,
  loading,
  openIcon,
  type = 'select',
  placeholder = '',
  closeAfterChange = true,
  ...events
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
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

  const handleChange = useCallback(
    (value: string, label: string, event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
      if (value !== selectedValue) {
        setSelectedValue(value);
        setSelectedLabel(label);
        setIsHovered(state => !state);

        events.onChange?.(value, label, event);

        if (closeAfterChange) setIsOpen(false);
      }
    },
    [events.onChange, closeAfterChange]
  );

  const handleHover = (): void => {
    setIsHovered(state => !state);

    if (!isSelect && !disabled) setIsOpen(state => !state);
  };

  const handleClear = (event: MouseEvent<HTMLElement>): void => {
    setSelectedValue(undefined);
    setSelectedLabel(undefined);

    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        styles.dropdown,
        disabled && styles.dropdownDisabled,
        isOpen && styles.dropdownOpen,
        isSelect ? styles.dropdownSelect : styles.dropdownMenu
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div
        className={styles.control}
        onMouseDown={isSelect && allowClear ? handleMouseDown : undefined}
        onTouchEnd={isSelect && allowClear ? handleMouseDown : undefined}
        aria-haspopup="listbox"
      >
        {isSelect && (
          <span className={clsx(styles.label, !selectedLabel && styles.placeholder)}>
            {selectedLabel ?? placeholder}
          </span>
        )}
        <Icon
          loading={loading}
          open={isOpen}
          clearable={isSelect && allowClear && isHovered && !!selectedValue}
          disabled={disabled}
          openIcon={openIcon}
          closeIcon={closeIcon}
          onClear={handleClear}
        />
      </div>
      <Menu open={isOpen}>
        <DropdownProvider value={selectedValue} handler={handleChange}>
          {children}
        </DropdownProvider>
      </Menu>
    </div>
  );
};

export default Dropdown;
