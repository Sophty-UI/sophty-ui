import { IGap } from '~/types/resolution';

const parseGap = (gap?: IGap | [IGap, IGap]): string | undefined => {
  if (gap === undefined) return gap;

  return [...(Array.isArray(gap) ? gap : [gap, gap])]
    .reverse()
    .map(value => (typeof value === 'number' ? `${value}px` : value))
    .join(' ');
};

export default parseGap;
