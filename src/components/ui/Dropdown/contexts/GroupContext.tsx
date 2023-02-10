import { createContext, FC, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';

export const GroupContext = createContext<boolean | undefined>(undefined);

export interface IGroupProviderProps extends IContainerProps {
  disabled?: boolean;
}

export const GroupProvider: FC<IGroupProviderProps> = ({ disabled, children }) => (
  <GroupContext.Provider value={disabled}>{children}</GroupContext.Provider>
);

const useGroupContext = (): [IGroupProviderProps['disabled']] => [useContext(GroupContext)];

export default useGroupContext;
