export namespace CSSDataType {
  export type Length =
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

  export type Percentage = '%';
  export type Flex = 'fr';
  export type Distance<T extends string> = `${number}${T}`;

  export type TrackBreadth = Distance<Length | Flex | Percentage> | 'auto' | 'max-content' | 'min-content' | 'none';
}
