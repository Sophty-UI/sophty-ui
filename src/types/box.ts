import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type IDetailedProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;
export type IDetailedButtonProps<T = HTMLButtonElement> = DetailedHTMLProps<ButtonHTMLAttributes<T>, T>;
export type IContainerProps = { children: ReactNode | ReactNode[] };
export type IBoxProps<T = HTMLDivElement> = IDetailedProps<T> & IContainerProps;
