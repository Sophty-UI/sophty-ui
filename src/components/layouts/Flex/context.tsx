import { createContext, FC, useContext } from 'react';

import { IProvider } from '~/types/provider';

const Context = createContext<string | undefined>(undefined);

export const useRelativeContext = (): string | undefined => useContext(Context);
export const Provider: FC<IProvider<string | undefined>> = ({ value, children }) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
