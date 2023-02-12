import { createContext, FC, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';

export const DropdownChangeContext = createContext<IDropdownProviderEvents['onChange'] | undefined>(undefined);
export const DropdownSelectedValueContext = createContext<string | undefined>(undefined);
export const DropdownDefaultValueContext = createContext<string | undefined>(undefined);
export const DropdownSearchValueContext = createContext<string | undefined>(undefined);

export interface IDropdownProviderEvents {
  onChange?: (value: string, label: string) => void;
}

export interface IDropdownProviderProps extends IDropdownProviderEvents, IContainerProps {
  defaultValue?: string;
  searchValue?: string;
  selectedValue?: string;
}

export const DropdownProvider: FC<IDropdownProviderProps> = ({
  selectedValue,
  defaultValue,
  searchValue,
  onChange,
  children,
}) => (
  <DropdownDefaultValueContext.Provider value={defaultValue}>
    <DropdownSelectedValueContext.Provider value={selectedValue}>
      <DropdownSearchValueContext.Provider value={searchValue}>
        <DropdownChangeContext.Provider value={onChange}>{children}</DropdownChangeContext.Provider>
      </DropdownSearchValueContext.Provider>
    </DropdownSelectedValueContext.Provider>
  </DropdownDefaultValueContext.Provider>
);

const useDropdownContext = (): [
  IDropdownProviderProps['defaultValue'],
  IDropdownProviderProps['selectedValue'],
  IDropdownProviderProps['searchValue'],
  IDropdownProviderProps['onChange']
] => [
  useContext(DropdownDefaultValueContext),
  useContext(DropdownSelectedValueContext),
  useContext(DropdownSearchValueContext),
  useContext(DropdownChangeContext),
];

export default useDropdownContext;
