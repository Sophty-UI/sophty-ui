import { useContext } from 'react';

import ThemeContext from '../contexts/ThemeContext';
import { ITheme } from '../theme';

const useTheme = (): ITheme => useContext(ThemeContext);

export default useTheme;
