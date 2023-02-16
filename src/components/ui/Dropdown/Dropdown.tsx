import { FC, useCallback, useState } from 'react';

import SelectionProvider from './contexts/SelectionContext';
import Control, { IControlProps } from './parts/Control';

export interface IDropdownEvents {
  onChange?: (value?: string, label?: string) => void;
}

export interface IDropdownProps extends IDropdownEvents, Omit<IControlProps, keyof IDropdownEvents> {}

const Dropdown: FC<IDropdownProps> = ({ onChange, children, ...props }) => {
  const [selection, setSelection] = useState<{ label?: string; value?: string }>({});

  const handleSelectionChange = useCallback(
    (value?: string, label?: string): void => {
      setSelection({ value, label });
      onChange?.(value, label);
    },
    [children, onChange]
  );

  return (
    <SelectionProvider value={selection.value} label={selection.label} onChange={handleSelectionChange}>
      <Control {...props}>{children}</Control>
    </SelectionProvider>
  );
};

export default Dropdown;
