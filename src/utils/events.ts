import { SyntheticEvent } from 'react';

export const preventEvent = (event: SyntheticEvent): void => {
  event.stopPropagation();
  event.preventDefault();
};
