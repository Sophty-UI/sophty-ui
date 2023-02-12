import clsx from 'clsx';
import { createRef, FC, MouseEvent, ReactNode, TouchEvent, useCallback, useEffect, useState } from 'react';

import { DropdownProvider, IDropdownProviderEvents } from './contexts/DropdownContext';
import Control, { IControlEvents } from './parts/Control';
import Icon from './parts/Icon';
import Menu, { IMenuProps } from './parts/Menu';
import styles from './style.module.scss';

export interface IDropdownEvents extends IDropdownProviderEvents, IControlEvents {
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
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const refDropbox = createRef<HTMLDivElement>();
  const isSelect = type === 'select';
  const isEditable = isSelect && !isDisabled && editable;

  useEffect(() => {
    const listener = ({ target }: Event): void => {
      if (!target || !refDropbox.current?.contains(target as Node)) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', listener, false);
    document.addEventListener('touchstart', listener, false);

    return () => {
      document.removeEventListener('mousedown', listener, false);
      document.removeEventListener('touchstart', listener, false);
    };
  });

  const handleActivate = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
    if (isSelect && allowClear) {
      if (
        ((event.type === 'mouseup' && (event as MouseEvent<HTMLDivElement>).button === 0) ||
          event.type === 'touchend') &&
        !loading
      ) {
        event.stopPropagation();
        event.preventDefault();

        if (!isDisabled) {
          const open = !isOpen;

          if (open) setSearchValue(undefined);
          else setSearchValue(selectedLabel);

          setIsOpen(open);

          events.onFocus?.(open);
        }
      }
    }
  };

  const handleChange = useCallback(
    (value: string, label: string): void => {
      if (value !== selectedValue) {
        setSelectedValue(value);
        setSelectedLabel(label);
        setIsHovered(state => !state);

        events.onChange?.(value, label);

        if (closeAfterChange) {
          setIsOpen(false);
          events.onFocus?.(false);
        }
      }
    },
    [events.onChange, closeAfterChange]
  );

  const handleHover = (event: MouseEvent): void => {
    setIsHovered(event.type === 'mouseenter');

    if (!isSelect && !isDisabled) {
      const open = !isOpen;

      events.onFocus?.(open);
      setIsOpen(open);
    }
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
      <div className={styles.control} onMouseUp={handleActivate} onTouchEnd={handleActivate} aria-haspopup="listbox">
        <Control
          value={isOpen ? searchValue : selectedLabel}
          disabled={isDisabled}
          editable={isEditable}
          onSearch={handleSearch}
          open={isOpen}
          placeholder={selectedLabel ?? placeholder}
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
        <DropdownProvider
          selectedValue={selectedValue}
          searchValue={searchValue}
          defaultValue={defaultValue}
          onChange={handleChange}
        >
          {children}
        </DropdownProvider>
      </Menu>
    </div>
  );
};

export default Dropdown;
