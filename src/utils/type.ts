import { Booleanish } from '../types/base';

export const toBooleanish = (value: boolean): Booleanish => value.toString() as Booleanish;
