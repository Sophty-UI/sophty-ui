import { createContext, FC, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';
import { IDropdownChangeEvent } from '../types/events';

export const DropdownChangeContext = createContext<IDropdownChangeEvent | undefined>(undefined);
export const DropdownSelectedValueContext = createContext<string | undefined>(undefined);
export const DropdownSearchValueContext = createContext<string | undefined>(undefined);

export interface IDropdownProviderProps extends IContainerProps {
  handler?: IDropdownChangeEvent;
  searchValue?: string;
  selectedValue?: string;
}

export const DropdownProvider: FC<IDropdownProviderProps> = ({ selectedValue, searchValue, handler, children }) => (
  <DropdownSelectedValueContext.Provider value={selectedValue}>
    <DropdownSearchValueContext.Provider value={searchValue}>
      <DropdownChangeContext.Provider value={handler}>{children}</DropdownChangeContext.Provider>
    </DropdownSearchValueContext.Provider>
  </DropdownSelectedValueContext.Provider>
);

const useDropdownContext = (): [
  IDropdownProviderProps['selectedValue'],
  IDropdownProviderProps['searchValue'],
  IDropdownProviderProps['handler']
] => [
  useContext(DropdownSelectedValueContext),
  useContext(DropdownSearchValueContext),
  useContext(DropdownChangeContext),
];

export default useDropdownContext;
