import { IGap } from '~/types/resolution';

const calc = (gap?: string | number, invert = false): string | undefined => {
  if (gap === undefined) return gap;

  const sign = invert ? '-' : '';

  return typeof gap === 'number' ? `${sign}${(gap / 2).toFixed(2)}px` : `calc(${sign}${gap} / 2)`;
};

const parseGap = (gap?: IGap | [IGap, IGap]): [IGap | undefined, string | undefined, string | undefined] => {
  const [rowGap, colGap] = Array.isArray(gap) ? gap : [gap, gap];

  return [rowGap, calc(colGap), calc(colGap, true)];
};

export default parseGap;
