import { FC } from 'react';

import { default as Group, IGroupProps } from './parts/Group';
import { default as Option, IOptionProps } from './parts/Option';
import { default as SelectBase } from './Select';

export type ISelectProps = typeof SelectBase & {
  Group: FC<IGroupProps>;
  Option: FC<IOptionProps>;
};

const Select = SelectBase as ISelectProps;

Select.Option = Option;
Select.Group = Group;

export default Select;
