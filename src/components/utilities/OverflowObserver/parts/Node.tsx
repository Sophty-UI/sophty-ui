import clsx from 'clsx';
import { Key, ReactElement, useEffect } from 'react';

import { IComponentType } from '../../../../types/component';
import ResizeObserver from '../../ResizeObserver';
import styles from '../style.module.scss';

export interface INodeCallbacks<T> {
  register: (key?: Key, width?: number) => void;
  render: (item: T) => ReactElement;
}

export interface INodeProps<T> extends INodeCallbacks<T> {
  component?: IComponentType;
  display: boolean;
  id?: Key;
  node: T;
  order: number;
}

function Node<T>({
  node,
  id,
  order,
  display,
  component: Component = 'div',
  ...callbacks
}: INodeProps<T>): ReactElement {
  useEffect(() => () => callbacks.register(id), []);

  return (
    <ResizeObserver onResize={({ offsetWidth }) => callbacks.register(id, offsetWidth)}>
      <Component
        className={clsx(styles.node, !display && styles.hidden)}
        style={display ? { order } : undefined}
        aria-hidden={display ? undefined : true}
      >
        {callbacks.render(node)}
      </Component>
    </ResizeObserver>
  );
}

export default Node;
