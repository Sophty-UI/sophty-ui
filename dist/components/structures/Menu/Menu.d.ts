import { MouseEvent, ReactElement } from 'react';
import { IDetailedProps } from '../../../types/box';
import { IMenuItemProps } from './parts/Item';
export interface IMenuEvents {
    onSelect?: (id: string, event: MouseEvent<HTMLLIElement>) => void;
}
export interface IMenuProps extends Omit<IDetailedProps<HTMLUListElement>, 'children' | 'onSelect'>, IMenuEvents {
    items: Omit<IMenuItemProps, 'onClick' | 'selected'>[];
    mode?: 'vertical' | 'horizontal';
    selectedId?: string;
}
declare const Menu: ({ selectedId, className, items, onSelect, mode, ...props }: IMenuProps) => ReactElement<IMenuProps>;
export default Menu;
