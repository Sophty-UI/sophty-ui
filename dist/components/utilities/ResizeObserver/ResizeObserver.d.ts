import { ReactElement, Ref } from 'react';
export interface IResizeObserverNodeSize {
    height: number;
    offsetHeight: number;
    offsetWidth: number;
    width: number;
}
export interface IResizeObserverProps {
    children: ReactElement<HTMLElement> & {
        ref?: Ref<HTMLElement>;
    };
    onResize?: (size: IResizeObserverNodeSize, element: HTMLElement) => void;
}
declare const ResizeObserver: ({ children, ...events }: IResizeObserverProps) => ReactElement<IResizeObserverProps>;
export default ResizeObserver;
