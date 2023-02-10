import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type IDetailedProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

export type IContainerProps = { children: ReactNode | ReactNode[] };
export type IBoxProps<T = HTMLDivElement> = IDetailedProps<T> & IContainerProps;
