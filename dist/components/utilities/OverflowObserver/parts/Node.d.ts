import { CSSProperties, Key, ReactElement } from 'react';
export interface INodeRenderProps {
    'aria-hidden'?: true;
    style: CSSProperties;
}
export interface INodeGetters<T> {
    register: (key: Key, width: number | null) => void;
    render: (item: T, props: INodeRenderProps) => ReactElement<HTMLElement>;
}
export interface INodeProps<T> extends INodeGetters<T> {
    display: boolean;
    id: Key;
    item: T;
    order: number;
}
declare function Node<T>({ item, id, order, display, ...callbacks }: INodeProps<T>): ReactElement;
export default Node;
