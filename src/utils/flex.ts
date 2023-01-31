import { IFlexGap, IFlexSpan } from '../types/flex';
import { Resolution, RESOLUTIONS } from '../types/resolution';

export const parseGap = (gap: IFlexGap | [IFlexGap, IFlexGap] | undefined): string | undefined => {
  let result;

  if (gap !== undefined) {
    result = (Array.isArray(gap) ? gap : [gap, gap])
      .map(value => (typeof value === 'number' ? `${value}px` : value))
      .join(' ');
  }

  return result;
};

export const parseFlex = (flex?: number | string): string | undefined => {
  if (typeof flex === 'number') return `${flex} ${flex} auto`;
  if (flex && /^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;

  return flex;
};

export const calcSpan = (span: IFlexSpan, resolution: Resolution, size: number): number => {
  const breakpoint = RESOLUTIONS.findIndex(item => item === resolution);
  const resolutions = RESOLUTIONS.slice(0, breakpoint);

  let value: number | undefined;

  if (typeof span === 'object') {
    value = span[resolution];

    while (!value && resolutions.length) value = span[resolutions.pop() ?? Resolution.ExtraSmall];
  } else value = span;

  return Math.min(value ?? size, size);
};
