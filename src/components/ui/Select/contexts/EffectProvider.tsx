import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { IContainerProps } from '../../../../types/box';

export const EffectIndexContext = createContext<IEffectProviderProps['index']>(undefined);
export const EffectChangeContext = createContext<IEffectProviderProps['onChange']>(undefined);
export const EffectRegisterContext = createContext<IEffectProviderProps['onRegister']>(undefined);

export interface IEffectProviderEvents {
  onChange?: (step: number) => void;
  onRegister?: (value: string, label: string) => number;
  onSelect?: (value: string, label: string) => void;
}

export interface IEffectProviderProps extends IEffectProviderEvents, IContainerProps {
  index?: number;
  open: boolean;
}

const registerOption = (): [IEffectProviderEvents['onRegister'], [string, string][]] => {
  const options: [string, string][] = [];

  return [
    (value: string, label: string) => {
      const index = options.findIndex(([option]) => option === value);

      return index >= 0 ? index : options.push([value, label]) - 1;
    },
    options,
  ];
};

const EffectProvider: FC<IEffectProviderProps> = ({ open, children, ...events }) => {
  const [index, setIndex] = useState(0);
  const [handleRegister, options] = useMemo(registerOption, [children]);
  const handleChange = useCallback((value: number) => setIndex(value), [children]);

  useEffect(() => {
    const listener = (event: KeyboardEvent): void => {
      if (open) {
        if (event.key === 'ArrowDown') setIndex(i => Math.min(i + 1, options.length - 1));
        else if (event.key === 'ArrowUp') setIndex(i => Math.max(0, i - 1));
        else if (event.key === 'Enter') {
          const [value, label] = options[index] ?? [];

          if (value !== undefined && label !== undefined) events.onSelect?.(value, label);
        }
      }
    };

    document.addEventListener('keydown', listener, false);

    return () => {
      document.removeEventListener('keydown', listener, false);
    };
  }, [children, open, index]);

  return (
    <EffectIndexContext.Provider value={index}>
      <EffectChangeContext.Provider value={handleChange}>
        <EffectRegisterContext.Provider value={handleRegister}>{children}</EffectRegisterContext.Provider>
      </EffectChangeContext.Provider>
    </EffectIndexContext.Provider>
  );
};

export const useEffectIndexContext = (): IEffectProviderProps['index'] => useContext(EffectIndexContext);
export const useEffectChangeContext = (): IEffectProviderProps['onChange'] => useContext(EffectChangeContext);
export const useEffectRegisterContext = (): IEffectProviderProps['onRegister'] => useContext(EffectRegisterContext);

export default EffectProvider;
