import { jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import ThemeContext from '../contexts/ThemeContext.js';
import useTheme from '../hooks/useTheme.js';

const ThemeProvider = ({ children, theme: localTheme }) => {
    const outerTheme = useTheme();
    const theme = useMemo(() => ({ ...outerTheme, ...localTheme }), [localTheme, outerTheme]);
    return jsx(ThemeContext.Provider, { value: theme, children: children });
};

export { ThemeProvider as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhlbWVQcm92aWRlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVycy9UaGVtZVByb3ZpZGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6WyJfanN4Il0sIm1hcHBpbmdzIjoiOzs7OztBQVdNLE1BQUEsYUFBYSxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBdUIsS0FBdUM7QUFDaEgsSUFBQSxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUU5QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsVUFBVSxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRTFGLE9BQU9BLEdBQUEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFBLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQSxRQUFBLEVBQUcsUUFBUSxFQUFBLENBQXlCLENBQUM7QUFDakY7Ozs7In0=
