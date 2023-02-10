import { createContext, FC, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';
import { IDropdownChangeEvent } from '../types/events';

export const DropdownChangeContext = createContext<IDropdownChangeEvent | undefined>(undefined);
export const DropdownSelectedValueContext = createContext<string | undefined>(undefined);

export interface IDropdownProviderProps extends IContainerProps {
  handler?: IDropdownChangeEvent;
  value?: string;
}

export const DropdownProvider: FC<IDropdownProviderProps> = ({ value, handler, children }) => (
  <DropdownSelectedValueContext.Provider value={value}>
    <DropdownChangeContext.Provider value={handler}>{children}</DropdownChangeContext.Provider>
  </DropdownSelectedValueContext.Provider>
);

const useDropdownContext = (): [IDropdownProviderProps['value'], IDropdownProviderProps['handler']] => [
  useContext(DropdownSelectedValueContext),
  useContext(DropdownChangeContext),
];

export default useDropdownContext;
