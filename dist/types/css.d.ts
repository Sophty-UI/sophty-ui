export type ILength = 'cap' | 'ch' | 'em' | 'ic' | 'lh' | 'rem' | 'rlh' | 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax' | 'cqw' | 'cqh' | 'cqi' | 'cqb' | 'cqmin' | 'cqmax' | 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt';
export type IPercentage = '%';
export type IFlex = 'fr';
export type IDistance<T extends string> = `${number}${T}`;
export type ITrackBreadth = IDistance<ILength | IFlex | IPercentage> | 'auto' | 'max-content' | 'min-content' | 'none';
export type IFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
