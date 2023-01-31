import { Key, ReactElement } from 'react';
import { INodeGetters } from './Node';
export interface INodeListGetters<T> extends INodeGetters<T> {
    getKey: (item: T) => Key;
}
export interface INodeListProps<T> extends INodeListGetters<T> {
    count: number;
    items: T[];
}
declare function NodeList<T>({ items, count, ...callbacks }: INodeListProps<T>): ReactElement;
export default NodeList;
