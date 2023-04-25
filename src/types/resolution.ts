import { IDistance, ILength, IPercentage } from './style';

export enum Resolution {
  SuperLarge = 'sl',
  ExtraLarge = 'xl',
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
  ExtraSmall = 'xs',
}

export type IGap = number | IDistance<ILength | IPercentage>;
export type ISpan = number | { [key in Resolution]?: number };
