import { FC } from 'react';

import { default as DropdownBase } from './Dropdown';
import { default as Group, IGroupProps } from './parts/Group';
import { default as Option, IOptionProps } from './parts/Option';

export type IDropdownProps = typeof DropdownBase & {
  Group: FC<IGroupProps>;
  Option: FC<IOptionProps>;
};

const Dropdown = DropdownBase as IDropdownProps;

Dropdown.Option = Option;
Dropdown.Group = Group;

export default Dropdown;
