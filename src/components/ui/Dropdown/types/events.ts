import { MouseEvent, TouchEvent } from 'react';

export type IDropdownChangeEvent = (
  value: string,
  label: string,
  event: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>
) => void;
