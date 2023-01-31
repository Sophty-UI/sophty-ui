import { IDistance, ILength, IPercentage } from './css';
import { Resolution } from './resolution';
export type IFlexGap = number | IDistance<ILength | IPercentage>;
export type IFlexSpan = number | {
    [key in Resolution]?: number;
};
export type IFlexAlign = 'start' | 'center' | 'end';
export type IFlexJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
