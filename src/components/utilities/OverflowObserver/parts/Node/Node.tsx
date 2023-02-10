import clsx from 'clsx';
import { FC, ForwardRefExoticComponent, Key, useEffect } from 'react';

import ResizeObserver from '../../../ResizeObserver';
import styles from './style.module.scss';

export interface INodeEvents {
  onRegister: (key?: Key, width?: number) => void;
}

export interface INodeProps extends INodeEvents {
  component: ForwardRefExoticComponent<any>;
  display: boolean;
  id?: Key;
  order: number;
  properties?: any;
}

const Node: FC<INodeProps> = ({ id, order, display, component: Component, properties = {}, ...events }) => {
  useEffect(() => () => events.onRegister(id), []);

  return (
    <ResizeObserver onResize={({ offsetWidth }) => events.onRegister(id, offsetWidth)}>
      <Component
        {...properties}
        className={clsx(styles.node, !display && styles.hidden)}
        style={display ? { order } : undefined}
        aria-hidden={display ? undefined : 'true'}
      />
    </ResizeObserver>
  );
};

export default Node;
