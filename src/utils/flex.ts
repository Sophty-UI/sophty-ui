import { IFlexGap } from '../types/flex';

export const getGap = (gap: IFlexGap | [IFlexGap, IFlexGap] | undefined): string | undefined => {
  let result;

  if (gap !== undefined) {
    result = (Array.isArray(gap) ? gap : [gap, gap])
      .map(value => (typeof value === 'number' ? `${value}px` : value))
      .join(' ');
  }

  return result;
};
