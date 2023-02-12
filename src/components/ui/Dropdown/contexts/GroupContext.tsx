import { createContext, FC, Key, useContext } from 'react';

import { IContainerProps } from '../../../../types/box';

export const GroupFilterContext = createContext<IGroupProviderEvents['onFilter'] | undefined>(undefined);
export const GroupContext = createContext<boolean | undefined>(undefined);

export interface IGroupProviderEvents {
  onFilter?: (key: Key, filter: boolean) => void;
}

export interface IGroupProviderProps extends IGroupProviderEvents, IContainerProps {
  disabled?: boolean;
}

export const GroupProvider: FC<IGroupProviderProps> = ({ disabled, onFilter, children }) => (
  <GroupFilterContext.Provider value={onFilter}>
    <GroupContext.Provider value={disabled}>{children}</GroupContext.Provider>
  </GroupFilterContext.Provider>
);

const useGroupContext = (): [IGroupProviderProps['disabled'], IGroupProviderEvents['onFilter']] => [
  useContext(GroupContext),
  useContext(GroupFilterContext),
];

export default useGroupContext;
