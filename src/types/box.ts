import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { IGap } from './resolution';

export type IContainer = { children?: ReactNode | ReactNode[] };
export type IBox<T = HTMLDivElement> = DetailedHTMLProps<HTMLAttributes<T>, T> & IContainer;
export type IFlexBox = IBox & { gap?: IGap | [IGap, IGap] };
