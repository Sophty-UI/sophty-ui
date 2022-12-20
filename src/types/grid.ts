import { Resolution } from './resolution';

export const GRID_COLUMNS_SIZE = 12;

export type IGridSpan = {
  [key in Resolution]?: number;
};
