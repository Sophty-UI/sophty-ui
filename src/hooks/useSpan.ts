import { useMemo } from 'react';
import { ISpan } from '~/types/resolution';

import useResolution from './useResolution';

const useSpan = (span?: ISpan): number => {
  const { breakpoint, resolutions } = useResolution();

  return useMemo(() => {
    let currentSpan: number | undefined;

    if (typeof span === 'object') {
      currentSpan = span[breakpoint];

      if (currentSpan === undefined) {
        const breakpoints = [...resolutions].reverse();
        let currentBreakpoint;

        while (!currentSpan && breakpoints.length) {
          if ((currentBreakpoint = breakpoints.pop())) currentSpan = span[currentBreakpoint];
        }
      }
    } else currentSpan = span;

    return Math.max(currentSpan ?? 0, 0);
  }, [breakpoint, resolutions, span]);
};

export default useSpan;
