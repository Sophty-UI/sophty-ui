import { FC, ReactNode } from 'react';

export interface IDropdownEvents {}

export interface IDropdownProps extends IDropdownEvents {
  children: ReactNode;
}

// TODO: Portal
// TODO: Position (topLeft, top, topRight, ...)
// TODO: AutoPosition
// TODO: Arrow/Without Arrow

// Dropdown.Target?
// Dropdown.Content?

const Dropdown: FC<IDropdownProps> = ({ children }) => {
  console.log('empty');

  return <div>{children}</div>;
};

export default Dropdown;
