import { IFlexGap, IFlexSpan } from '../types/flex';
import { Resolution } from '../types/resolution';
export declare const parseGap: (gap: IFlexGap | [IFlexGap, IFlexGap] | undefined) => string | undefined;
export declare const parseFlex: (flex?: number | string) => string | undefined;
export declare const calcSpan: (span: IFlexSpan, resolution: Resolution, size: number) => number;
