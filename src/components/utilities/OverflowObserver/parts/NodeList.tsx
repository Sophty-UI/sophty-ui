import { Key, ReactElement, useCallback } from 'react';

import { IComponentType } from '../../../../types/component';
import Node, { INodeCallbacks } from './Node';

export interface INodeListGetters<T> extends INodeCallbacks<T> {
  getKey: (item: T) => Key;
}

export interface INodeListProps<T, E = unknown> extends INodeListGetters<T> {
  component?: IComponentType<E>;
  count?: number;
  items: T[];
}

function NodeList<T>({ items, count = 0, component, ...callbacks }: INodeListProps<T>): ReactElement {
  const renderCallback = useCallback(callbacks.render, [callbacks.render]);
  const keyCallback = useCallback(callbacks.getKey, [callbacks.getKey]);

  return (
    <>
      {items.map((item, index) => {
        const key = keyCallback(item);

        return (
          <Node<T>
            display={index <= count}
            uid={key}
            item={item}
            key={key}
            order={index}
            register={callbacks.register}
            render={renderCallback}
            component={component}
          />
        );
      })}
    </>
  );
}

export default NodeList;
