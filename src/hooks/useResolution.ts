import { useEffect, useMemo, useState } from 'react';
import { Resolution } from '~/types/resolution';

import useTheme from './useTheme';

const RESOLUTIONS = Object.values(Resolution);

const useResolution = (): { breakpoint: Resolution; resolutions: Resolution[] } => {
  const { breakpoint } = useTheme();
  const medias = useMemo(() => RESOLUTIONS.map(item => window.matchMedia(breakpoint.up(item))), [breakpoint]);
  const [matches, setMatches] = useState(medias.map(media => media.matches));

  useEffect(() => {
    const callbacks = medias.map((media, i) => {
      const callback = (): void => setMatches(state => state.map((value, j) => (i === j ? media.matches : value)));

      media.addEventListener('change', callback);

      return () => media.removeEventListener('change', callback);
    });

    return () => callbacks.forEach(callback => callback());
  }, [medias, setMatches]);

  return useMemo(() => {
    const index = matches.findIndex(Boolean);

    return {
      breakpoint: RESOLUTIONS[index] ?? Resolution.ExtraSmall,
      resolutions: RESOLUTIONS.slice(index, RESOLUTIONS.length),
    };
  }, matches);
};

export default useResolution;
