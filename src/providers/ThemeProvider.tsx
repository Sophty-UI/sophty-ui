import { ReactElement, ReactNode, useMemo } from 'react';

import ThemeContext from '../contexts/ThemeContext';
import useTheme from '../hooks/useTheme';
import { ITheme } from '../theme';

export interface IThemeProviderProps {
  children?: ReactNode;
  theme: Partial<ITheme>;
}

const ThemeProvider = ({ children, theme: localTheme }: IThemeProviderProps): ReactElement<IThemeProviderProps> => {
  const outerTheme = useTheme();
  // TODO: deep merge
  const theme = useMemo(() => ({ ...outerTheme, ...localTheme }), [localTheme, outerTheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;