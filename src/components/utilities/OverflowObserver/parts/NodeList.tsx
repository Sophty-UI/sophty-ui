import { ForwardRefExoticComponent, Key, ReactElement } from 'react';

import Node, { INodeExtendProps } from './Node';

export interface INodeListGetters {
  register: (key?: Key, width?: number) => void;
}

export interface INodeListProps<T> extends INodeListGetters {
  component: ForwardRefExoticComponent<T>;
  count?: number;
  nodes: [Key, T][];
}

function NodeList<T extends INodeExtendProps>({
  nodes,
  count = 0,
  component,
  ...callbacks
}: INodeListProps<T>): ReactElement {
  return (
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
}

export default NodeList;
