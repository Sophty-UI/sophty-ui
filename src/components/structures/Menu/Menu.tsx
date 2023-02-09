import clsx from 'clsx';
import { MouseEvent, useCallback, useState } from 'react';

import { IDetailedProps } from '../../../types/box';
import OverflowObserver from '../../utilities/OverflowObserver';
import Item, { IItemProps } from './parts/Item';
import styles from './style.module.scss';

export interface IMenuEvents {
  onSelect?: (id: string, event: MouseEvent<HTMLLIElement>) => void;
}

export interface IMenuProps extends Omit<IDetailedProps<HTMLUListElement>, 'children' | 'onSelect'>, IMenuEvents {
  items: Omit<IItemProps, 'selected'>[];
  mode?: 'vertical' | 'horizontal';
  selectedId?: string;
}

const Menu = ({ selectedId, className, items, onSelect, mode = 'horizontal', ...props }: IMenuProps) => {
  const [selected, setSelected] = useState<string | undefined>(selectedId);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>, id: string) => {
      setSelected(id);

      if (onSelect) onSelect(id, event);
    },
    [items]
  );

  return (
    <OverflowObserver
      {...props}
      component="ul"
      className={clsx(className, styles.menu, styles[mode])}
      nodes={items.map(item => ({ ...item, selected: selected === item.id, onClick: handleClick }))}
      options={{ node: { component: Item } }}
    />
  );
};

export default Menu;
