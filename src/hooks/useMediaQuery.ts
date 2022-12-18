import { useEffect, useState } from 'react';

import { ITheme } from '../theme';
import useTheme from './useTheme';

function useMediaQuery(query: string | ((theme: ITheme) => string)): boolean {
  const getMatch = (): MediaQueryList => window.matchMedia(typeof query === 'function' ? query(theme) : query);
  const theme = useTheme();
  const [match, setMatch] = useState(getMatch().matches);

  const handleChange = (): void => setMatch(getMatch().matches);

  useEffect(() => {
    const matchMedia = getMatch();

    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return match;
}

export default useMediaQuery;
