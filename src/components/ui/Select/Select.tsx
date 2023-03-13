import { FC, useCallback, useState } from 'react';

import { IBoxProps } from '../../../types/box';
import SelectionProvider from './contexts/SelectionContext';
import { IControlProps } from './parts/Control';
import ListBox from './parts/ListBox';

export interface ISelectEvents {
  onChange?: (value?: string, label?: string) => void;
  onFocus?: (focus: boolean) => void;
}

export type ISelectProps = Omit<IBoxProps, keyof ISelectEvents> & Partial<IControlProps> & ISelectEvents;

const Dropdown: FC<ISelectProps> = ({ onChange, children, ...props }) => {
  const [selection, setSelection] = useState<{ label?: string; value?: string }>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectionChange = useCallback(
    (value?: string, label?: string): void => {
      setSelection({ value, label });
      onChange?.(value, label);
      setIsOpen(false);
    },
    [children, onChange]
  );

  return (
    <SelectionProvider value={selection.value} label={selection.label} onChange={handleSelectionChange}>
      <ListBox {...props} open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </ListBox>
    </SelectionProvider>
  );
};

export default Dropdown;
