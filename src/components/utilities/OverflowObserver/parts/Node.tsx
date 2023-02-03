import clsx from 'clsx';
import { CSSProperties, ForwardRefExoticComponent, Key, ReactElement, useEffect } from 'react';

import ResizeObserver from '../../ResizeObserver';
import styles from '../style.module.scss';

export interface INodeCallbacks {
  register: (key?: Key, width?: number) => void;
}

export interface INodeProps<T> extends INodeCallbacks {
  component: ForwardRefExoticComponent<T>;
  display: boolean;
  id?: Key;
  order: number;
  properties?: T;
}

export interface INodeExtendProps {
  'aria-hidden'?: boolean | 'true' | 'false';
  className?: string;
  style?: CSSProperties;
}

function Node<T extends INodeExtendProps>({
  properties,
  id,
  order,
  display,
  component: Component,
  ...callbacks
}: INodeProps<T>): ReactElement {
  useEffect(() => () => callbacks.register(id), []);

  return (
    <ResizeObserver onResize={({ offsetWidth }) => callbacks.register(id, offsetWidth)}>
      <Component
        {...(properties ?? ({} as T))}
        className={clsx(styles.node, !display && styles.hidden)}
        style={display ? { order } : undefined}
        aria-hidden={display ? undefined : true}
      />
    </ResizeObserver>
  );
}

export default Node;
