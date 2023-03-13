import clsx from 'clsx';
import { createRef, FC, MouseEvent, TouchEvent, useCallback, useEffect, useState } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { useSelectionChangeContext } from '../../contexts/SelectionContext';
import Control, { IControlProps } from '../Control';
import Menu from '../Menu';
import styles from './style.module.scss';

export interface IListBoxEvents {
  onFocus?: (focus: boolean) => void;
  onOpenChange: (open: boolean) => void;
}

export type IListBoxProps = Omit<IBoxProps, keyof IListBoxEvents> & Partial<IControlProps> & IListBoxEvents;

const ListBox: FC<IListBoxProps> = ({
  className,
  children,
  placeholder,
  disabled: isDisabled = false,
  loading: isLoading = false,
  editable: isEditable = false,
  open: isOpen = false,
  allowClear = false,
  ...events
}) => {
  const ref = createRef<HTMLDivElement>();
  const [isHover, setIsHover] = useState(false);
  const handleSelectionChange = useSelectionChangeContext();

  useEffect(() => {
    const listener = ({ target }: Event): void => {
      if (isOpen && (!target || !ref.current?.contains(target as Node))) {
        events.onOpenChange(false);
        events.onFocus?.(false);
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
    if (
      !isLoading &&
      !isDisabled &&
      ((event.type === 'mouseup' && (event as MouseEvent<HTMLDivElement>).button === 0) || event.type === 'touchend')
    ) {
      const role = (event.target as Element).attributes.getNamedItem('role')?.value;

      if (role !== 'presentation' && role !== 'none') {
        const focus = !isOpen;

        events.onOpenChange(focus);
        events.onFocus?.(focus);
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const handleHover = useCallback((event: MouseEvent): void => setIsHover(event.type === 'mouseenter'), [setIsHover]);

  const handleSelect = useCallback(
    (value: string, label: string): void => {
      handleSelectionChange(value, label);
      events.onOpenChange(false);
    },
    [handleSelectionChange]
  );

  return (
    <div
      ref={ref}
      className={clsx(className, styles.listbox, isDisabled && styles.disabled, isOpen && styles.open)}
      onMouseUp={handleActivate}
      onTouchEnd={handleActivate}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Control
        placeholder={placeholder}
        open={isOpen}
        disabled={isDisabled}
        editable={!isDisabled && isEditable}
        allowClear={allowClear && isHover}
        loading={isLoading}
        onFilter={events.onFilter}
      />

      <Menu open={isOpen} onSelect={handleSelect}>
        {children}
      </Menu>
    </div>
  );
};

export default ListBox;
