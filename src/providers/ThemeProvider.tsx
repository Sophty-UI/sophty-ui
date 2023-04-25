import { FC, ReactNode, useEffect, useMemo } from 'react';
import ThemeContext from '~/contexts/ThemeContext';

import defaultTheme, { ITheme } from '../theme';

export interface IThemeProviderProps {
  children?: ReactNode;
  theme?: Partial<ITheme>;
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children, theme: outerTheme = {} }) => {
  const theme = useMemo(() => ({ ...defaultTheme, ...outerTheme }), [outerTheme]);

  useEffect(() => {
    Object.entries(theme).forEach(([property, variants]) => {
      Object.entries(variants).forEach(([variant, value]) => {
        if (typeof value !== 'function') document.documentElement.style.setProperty(`--${property}-${variant}`, value);
      });
    });
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
