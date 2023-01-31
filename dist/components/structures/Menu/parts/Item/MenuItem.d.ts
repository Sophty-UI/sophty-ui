import { MouseEvent, ReactElement, ReactNode } from 'react';
import { IDetailedProps } from '../../../../../types/box';
export interface IMenuItemEvents {
    onClick: (event: MouseEvent<HTMLLIElement>, id: string) => void;
}
export interface IMenuItemProps extends Omit<IDetailedProps<HTMLLIElement>, 'onClick' | 'children'>, IMenuItemEvents {
    disabled?: boolean;
    icon?: ReactNode;
    id: string;
    label?: string;
    selected?: boolean;
}
declare const MenuItem: ({ className, disabled, id, label, onClick, selected, role, ...props }: IMenuItemProps) => ReactElement<IMenuItemProps>;
export default MenuItem;
