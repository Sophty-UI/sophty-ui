import { createContext, FC, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';

export const SelectionValueContext = createContext<ISelectionProviderProps['value']>(undefined);
export const SelectionLabelContext = createContext<ISelectionProviderProps['label']>(undefined);
export const SelectionChangeContext = createContext<ISelectionProviderProps['onChange']>(undefined);

export interface ISelectionProviderEvents {
  onChange?: (value?: string, label?: string) => void;
}

export interface ISelectionProviderProps extends ISelectionProviderEvents, IContainerProps {
  label?: string;
  value?: string;
}

const SelectionProvider: FC<ISelectionProviderProps> = ({ children, value, label, ...events }) => (
  <SelectionValueContext.Provider value={value}>
    <SelectionLabelContext.Provider value={label}>
      <SelectionChangeContext.Provider value={events.onChange}>{children}</SelectionChangeContext.Provider>
    </SelectionLabelContext.Provider>
  </SelectionValueContext.Provider>
);

export const useSelectionValueContext = (): ISelectionProviderProps['value'] => useContext(SelectionValueContext);
export const useSelectionLabelContext = (): ISelectionProviderProps['label'] => useContext(SelectionLabelContext);
export const useSelectionChangeContext = (): NonNullable<ISelectionProviderEvents['onChange']> =>
  useContext(SelectionChangeContext) as ReturnType<typeof useSelectionChangeContext>;

export default SelectionProvider;
