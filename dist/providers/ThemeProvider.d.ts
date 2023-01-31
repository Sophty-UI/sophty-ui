import { ReactElement, ReactNode } from 'react';
import { ITheme } from '../theme';
export interface IThemeProviderProps {
    children?: ReactNode;
    theme: Partial<ITheme>;
}
declare const ThemeProvider: ({ children, theme: localTheme }: IThemeProviderProps) => ReactElement<IThemeProviderProps>;
export default ThemeProvider;
