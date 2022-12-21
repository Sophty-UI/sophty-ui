import { IDistance, ILength, IPercentage } from './css';

export type IFlexGap = number | IDistance<ILength | IPercentage>;
export type IFlexAlign = 'start' | 'center' | 'end';
export type IFlexJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
