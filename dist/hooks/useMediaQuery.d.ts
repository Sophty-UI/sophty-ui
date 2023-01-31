import { ITheme } from '../theme';
declare function useMediaQuery(query: string | ((theme: ITheme) => string)): boolean;
export default useMediaQuery;
