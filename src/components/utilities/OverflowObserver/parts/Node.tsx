import clsx from 'clsx';
import { Key, ReactElement, useEffect } from 'react';

import { IComponentType } from '../../../../types/component';
import ResizeObserver from '../../ResizeObserver';
import styles from '../style.module.scss';

export interface INodeCallbacks<T> {
  register: (key?: Key, width?: number) => void;
  render: (item: T) => ReactElement;
}

export interface INodeProps<T, E = unknown> extends INodeCallbacks<T> {
  component?: IComponentType<E>;
  display: boolean;
  item: T;
  order: number;
  uid?: Key;
}

function Node<T>({
  item,
  uid,
  order,
  display,
  component: Component = 'div',
  ...callbacks
}: INodeProps<T>): ReactElement {
  useEffect(() => () => callbacks.register(uid), []);

  return (
    <ResizeObserver onResize={({ offsetWidth }) => callbacks.register(uid, offsetWidth)}>
      <Component
        className={clsx(styles.node, !display && styles.hidden)}
        style={display ? { order } : undefined}
        aria-hidden={display ? undefined : true}
      >
        {callbacks.render(item)}
      </Component>
    </ResizeObserver>
  );
}

export default Node;
