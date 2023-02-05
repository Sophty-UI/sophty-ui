import { ForwardRefExoticComponent, Key, ReactElement } from 'react';

import { IOverflowNodeProps } from '../types/node';
import Node from './Node';

export interface INodeListGetters {
  register: (key?: Key, width?: number) => void;
}

export interface INodeListProps<T> extends INodeListGetters {
  component: ForwardRefExoticComponent<T>;
  count?: number;
  nodes: [Key, T][];
}

const NodeList = <T extends IOverflowNodeProps>({
  nodes,
  count = 0,
  component,
  ...callbacks
}: INodeListProps<T>): ReactElement => (
  <>
    {nodes.map(([id, node], index) => (
      <Node
        component={component}
        display={index <= count}
        id={id}
        key={id}
        order={index}
        properties={node}
        register={callbacks.register}
      />
    ))}
  </>
);

export default NodeList;
