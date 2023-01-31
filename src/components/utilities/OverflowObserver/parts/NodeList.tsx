import { Key, ReactElement, useCallback } from 'react';

import { IComponentType } from '../../../../types/component';
import Node from './Node';

export interface INodeListGetters<T> {
  register: (key?: Key, width?: number) => void;
  render: (item: T) => ReactElement;
}

export interface INodeListProps<T> extends INodeListGetters<T> {
  component?: IComponentType;
  count?: number;
  nodes: [Key, T][];
}

function NodeList<T>({ nodes, count = 0, component, ...callbacks }: INodeListProps<T>): ReactElement {
  const renderCallback = useCallback(callbacks.render, [callbacks.render]);

  return (
    <>
      {nodes.map(([id, node], index) => (
        <Node<T>
          display={index <= count}
          id={id}
          node={node}
          key={id}
          order={index}
          register={callbacks.register}
          render={renderCallback}
          component={component}
        />
      ))}
    </>
  );
}

export default NodeList;
