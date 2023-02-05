import { ReactElement } from 'react';

import { default as DropdownBase } from './Dropdown';
import { default as Group, IGroupProps } from './parts/Group';
import { default as Option, IOptionProps } from './parts/Option';

export type IDropdownProps = typeof DropdownBase & {
  Group: (props: Omit<IGroupProps, 'area'>) => ReactElement<IGroupProps> | null;
  Option: (props: Omit<IOptionProps, 'area'>) => ReactElement<IOptionProps>;
};

const Dropdown = DropdownBase as IDropdownProps;

Dropdown.Option = Option;
Dropdown.Group = Group;

export default Dropdown;
