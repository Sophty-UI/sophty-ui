import clsx from 'clsx';
import { MouseEvent, ReactElement, useCallback, useState } from 'react';

import { IDetailedProps } from '../../../types/box';
import MenuItem, { IMenuItemProps } from './parts/Item';
import styles from './style.module.scss';

export interface IMenuEvents {
  onSelect?: (id: string, event: MouseEvent<HTMLLIElement>) => void;
}

export interface IMenuProps extends Omit<IDetailedProps<HTMLUListElement>, 'children' | 'onSelect'>, IMenuEvents {
  items: Omit<IMenuItemProps, 'onClick' | 'selected'>[];
  mode?: 'vertical' | 'horizontal';
  selectedId?: string;
}

const Menu = ({
  selectedId,
  className,
  items,
  onSelect,
  mode = 'horizontal',
  ...props
}: IMenuProps): ReactElement<IMenuProps> => {
  const [selected, setSelected] = useState<string | undefined>(selectedId);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>, id: string) => {
      setSelected(id);

      if (onSelect) onSelect(id, event);
    },
    [items]
  );

  return (
    <ul {...props} className={clsx(className, styles.menu, styles[mode])}>
      {items.map(item => (
        <MenuItem key={item.id} {...item} selected={selected === item.id} onClick={handleClick} />
      ))}
    </ul>
  );
};

export default Menu;
