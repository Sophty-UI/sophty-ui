import { createContext, ReactElement, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';
import { IDropdownChangeEvent } from '../types/events';

export const DropdownChangeContext = createContext<IDropdownChangeEvent | undefined>(undefined);
export const DropdownSelectedValueContext = createContext<string | undefined>(undefined);

export interface IDropdownProviderProps extends IContainerProps {
  value?: string;
  handler?: IDropdownChangeEvent;
}

export const DropdownProvider = ({ value, handler, children }: IDropdownProviderProps): ReactElement => (
  <DropdownSelectedValueContext.Provider value={value}>
    <DropdownChangeContext.Provider value={handler}>{children}</DropdownChangeContext.Provider>
  </DropdownSelectedValueContext.Provider>
);

const useDropdownContext = (): [IDropdownProviderProps['value'], IDropdownProviderProps['handler']] => [
  useContext(DropdownSelectedValueContext),
  useContext(DropdownChangeContext),
];

export default useDropdownContext;
