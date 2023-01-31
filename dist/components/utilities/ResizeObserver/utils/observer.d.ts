import { RefObject } from 'react';
export declare const observe: ({ current: node }: RefObject<HTMLElement>, callback: (element: HTMLElement) => void) => HTMLElement | null;
export declare const unobserve: (node: HTMLElement | null, callback: (element: HTMLElement) => void) => void;
