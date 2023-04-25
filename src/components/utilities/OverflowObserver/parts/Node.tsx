import clsx from 'clsx';
import { ForwardRefExoticComponent, Key, ReactElement, RefAttributes, useEffect } from 'react';

import { IBox } from '~/types/box';
import ResizeObserver from '~/utilities/ResizeObserver';

import styles from '../style.scss';

export interface INodeEvents {
  onRegister: (id?: Key, width?: number) => void;
}

export interface INodeProps<T, P> extends Omit<IBox<T>, 'id'>, INodeEvents {
  component: ForwardRefExoticComponent<Pick<P, keyof P> & RefAttributes<T>>;
  display: boolean;
  id?: Key;
  order: number;
  properties?: Omit<P, 'ref' | 'children'>;
}

const Node = <T, P = unknown>({
  id,
  order,
  display,
  component: Component,
  properties = {} as Pick<P, keyof P>,
  children,
  ...events
}: INodeProps<T, P>): ReactElement<P> => {
  useEffect(() => () => events.onRegister(id), []);

  return (
    <ResizeObserver onResize={({ offsetWidth }) => events.onRegister(id, offsetWidth)}>
      <Component
        {...(properties as Pick<P, keyof P>)}
        className={clsx(styles.node, !display && styles.hidden)}
        style={display ? { order } : undefined}
        aria-hidden={display ? undefined : 'true'}
      >
        {children}
      </Component>
    </ResizeObserver>
  );
};

export default Node;
