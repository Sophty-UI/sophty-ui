export type ILength =
  // Relative length units based on font
  | 'cap'
  | 'ch'
  | 'em'
  | 'ic'
  | 'lh'
  | 'rem'
  | 'rlh'
  // Relative length units based on viewport
  | 'vh'
  | 'vw'
  | 'vi'
  | 'vb'
  | 'vmin'
  | 'vmax'
  // Container query length units
  | 'cqw'
  | 'cqh'
  | 'cqi'
  | 'cqb'
  | 'cqmin'
  | 'cqmax'
  // Absolute length units
  | 'px'
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pc'
  | 'pt';

export type IPercentage = '%';
export type IFlexLength = 'fr';
export type IDistance<T extends string> = `${number}${T}`;
export type ITrackBreadth =
  | IDistance<ILength | IFlexLength | IPercentage>
  | 'auto'
  | 'max-content'
  | 'min-content'
  | 'none';
