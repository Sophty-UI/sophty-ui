import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type IBoxProps<T = ReactNode> = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: T | T[];
};
