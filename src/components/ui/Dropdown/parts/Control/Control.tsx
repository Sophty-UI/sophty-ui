import clsx from 'clsx';
import { createRef, FC, MouseEvent, TouchEvent, useEffect, useState } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { DropdownType } from '../../types/enums';
import ListBox from '../ListBox';
import { IListBoxEvents, IListBoxProps } from '../ListBox/ListBox';
import Menu from '../Menu';
import styles from './style.module.scss';

export interface IControlEvents extends IListBoxEvents {
  onFocus?: (focus: boolean) => void;
}

// TODO: keyboard events (up, down, enter)
// FIXME: fix close after click on disabled option
// FIXME: menu type
export interface IControlProps extends Omit<IBoxProps, keyof IControlEvents>, Partial<IListBoxProps>, IControlEvents {
  type?: DropdownType;
}

const Control: FC<IControlProps> = ({
  className,
  children,
  placeholder,
  disabled: isDisabled = false,
  loading: isLoading = false,
  editable: isEditable = false,
  allowClear = false,
  type = DropdownType.Select,
  ...events
}) => {
  const ref = createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const isSelect = type === DropdownType.Select;

  useEffect(() => {
    const listener = ({ target }: Event): void => {
      if (isOpen && (!target || !ref.current?.contains(target as Node))) {
        setIsOpen(false);
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
      isSelect &&
      !isLoading &&
      !isDisabled &&
      ((event.type === 'mouseup' && (event as MouseEvent<HTMLDivElement>).button === 0) || event.type === 'touchend')
    ) {
      const focus = !isOpen;

      setIsOpen(focus);
      events.onFocus?.(focus);
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleHover = (event: MouseEvent): void => {
    const hover = event.type === 'mouseenter';

    setIsHover(hover);

    if (!isSelect && !isDisabled) setIsOpen(hover);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        styles.control,
        isSelect ? styles.select : styles.menu,
        isDisabled && styles.disabled,
        isOpen && styles.open
      )}
      onMouseUp={handleActivate}
      onTouchEnd={handleActivate}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <ListBox
        placeholder={placeholder}
        open={isOpen}
        disabled={isDisabled}
        editable={!isDisabled && isEditable}
        allowClear={allowClear && isHover}
        loading={isLoading}
        onFilter={events.onFilter}
      />

      <Menu open={isOpen}>{children}</Menu>
    </div>
  );
};

export default Control;
