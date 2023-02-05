import clsx from 'clsx';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { IBoxProps } from '../../../../../types/box';
import Empty from '../../../Empty';
import Option, { IOptionChild, IOptionsEvents } from '../Option';
import styles from './style.module.scss';

export interface IMenuProps extends Omit<IBoxProps<IOptionChild>, keyof IOptionsEvents>, IOptionsEvents {
  defaultValue?: string;
  open?: boolean;
  selectedValue?: string;
}

const Menu = ({
  children,
  className,
  defaultValue,
  open,
  selectedValue,
  ...events
}: IMenuProps): ReactElement | null => {
  const options = useMemo(
    () =>
      Children.map(children, child =>
        cloneElement(child, {
          onChange: events.onChange,
          ...(child.type.name === Option.name ? { selected: child.props.value === selectedValue } : { selectedValue }),
        })
      ),
    [children, selectedValue, defaultValue]
  );

  return open ? (
    <div className={clsx(className, styles.container)} aria-expanded="true">
      {options ? (
        <ul className={styles.menu} tabIndex={0} role="menu">
          {options}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  ) : null;
};

export default Menu;
