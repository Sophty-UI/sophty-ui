import clsx from 'clsx';
import { createRef, FC, MouseEvent, ReactNode, TouchEvent, useCallback, useEffect, useState } from 'react';

import { DropdownProvider } from './contexts/DropdownContext';
import Control, { IControlEvents } from './parts/Control';
import Icon from './parts/Icon';
import Menu, { IMenuProps } from './parts/Menu';
import styles from './style.module.scss';
import { IDropdownChangeEvent } from './types/events';

export interface IDropdownEvents extends IControlEvents {
  onChange?: IDropdownChangeEvent;
  onFocus?: (focus: boolean) => void;
}

export interface IDropdownProps extends Omit<IMenuProps, keyof IDropdownEvents>, IDropdownEvents {
  allowClear?: boolean;
  closeAfterChange?: boolean;
  closeIcon?: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  editable?: boolean;
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
  loading,
  openIcon,
  type = 'select',
  placeholder = '',
  closeAfterChange = true,
  editable = true,
  disabled: isDisabled,
  ...events
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const refDropbox = createRef<HTMLDivElement>();
  const refInput = createRef<HTMLInputElement>();
  const isSelect = type === 'select';
  const isEditable = isSelect && !isDisabled && editable;

  useEffect(() => {
    const handleDocumentClick = ({ target }: Event): void => {
      if (!!target && !refDropbox.current?.contains(target as Node) && isOpen) setIsOpen(false);
    };

    document.addEventListener('click', handleDocumentClick, false);
    document.addEventListener('touchend', handleDocumentClick, false);

    return () => {
      document.removeEventListener('click', handleDocumentClick, false);
      document.removeEventListener('touchend', handleDocumentClick, false);
    };
  });

  const handleMouseDown = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
    if (isSelect && allowClear) {
      events.onFocus?.(isOpen);

      if (
        ((event.type === 'mousedown' && (event as MouseEvent<HTMLDivElement>).button === 0) ||
          event.type === 'touchend') &&
        !loading
      ) {
        event.stopPropagation();
        event.preventDefault();

        if (!isDisabled) {
          const open = !isOpen;

          setIsOpen(open);

          if (refInput.current && open) {
            refInput.current.focus();
            setSearchValue(undefined);
          } else {
            setSearchValue(selectedLabel);
          }
        }
      }
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

    if (!isSelect && !isDisabled) setIsOpen(state => !state);
  };

  const handleClear = (event: MouseEvent<HTMLElement>): void => {
    setSelectedValue(undefined);
    setSelectedLabel(undefined);

    event.stopPropagation();
    event.preventDefault();
  };

  const handleSearch = (value: string): void => {
    setSearchValue(value);
    events.onSearch?.(value);
  };

  return (
    <div
      ref={refDropbox}
      className={clsx(
        className,
        styles.dropdown,
        isDisabled && styles.disabled,
        isOpen && styles.open,
        isSelect ? styles.select : styles.menu,
        isHovered && styles.hovered
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div
        className={styles.control}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        aria-haspopup="listbox"
      >
        <Control
          ref={refInput}
          value={isOpen ? searchValue : selectedLabel}
          disabled={isDisabled}
          editable={isEditable}
          onSearch={handleSearch}
          open={isOpen}
          placeholder={isEditable && isOpen ? selectedLabel : selectedLabel ?? placeholder}
        />

        <Icon
          // FIXME: searchIcon if has searchValue
          loading={loading}
          open={isOpen}
          clearable={isSelect && allowClear && isHovered && !isOpen && !!selectedValue}
          disabled={isDisabled}
          openIcon={openIcon}
          closeIcon={closeIcon}
          onClear={handleClear}
        />
      </div>
      <Menu open={isOpen}>
        <DropdownProvider selectedValue={selectedValue} searchValue={searchValue} handler={handleChange}>
          {children}
        </DropdownProvider>
      </Menu>
    </div>
  );
};

export default Dropdown;
