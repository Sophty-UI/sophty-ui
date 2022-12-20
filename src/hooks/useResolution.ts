import { useMemo } from 'react';

import { Resolution } from '../types/resolution';
import useMediaQuery from './useMediaQuery';

function useResolution(): Resolution {
  const isSuperLarge = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.SuperLarge));
  const isExtraLarge = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.ExtraLarge));
  const isLarge = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.Large));
  const isMedium = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.Medium));
  const isSmall = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.Small));
  const resolution: Resolution = useMemo(
    () =>
      [
        isSuperLarge && Resolution.SuperLarge,
        isExtraLarge && Resolution.ExtraLarge,
        isLarge && Resolution.Large,
        isMedium && Resolution.Medium,
        isSmall && Resolution.Small,
      ].find(value => !!value) || Resolution.ExtraSmall,
    [isSuperLarge, isExtraLarge, isLarge, isMedium, isSmall]
  );

  return resolution;
}

export default useResolution;
