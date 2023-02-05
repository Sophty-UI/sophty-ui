import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type IDetailedProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;
export type IDetailedButtonProps<T = HTMLButtonElement> = DetailedHTMLProps<ButtonHTMLAttributes<T>, T>;
export type IBoxProps<T = ReactNode, E = HTMLDivElement> = IDetailedProps<E> & { children: T | T[] };
