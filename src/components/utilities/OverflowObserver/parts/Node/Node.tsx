import clsx from 'clsx';
import { CSSProperties, FC, ForwardRefExoticComponent, Key, useEffect } from 'react';

import ResizeObserver from '../../../ResizeObserver';
import styles from './style.module.scss';

export interface INodeEvents {
  onRegister: (key?: Key, width?: number) => void;
}

export interface INodeBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface INodeProps extends INodeEvents {
  component: ForwardRefExoticComponent<INodeBaseProps>;
  display: boolean;
  id?: Key;
  order: number;
  properties?: INodeBaseProps;
}

const Node: FC<INodeProps> = <T extends INodeBaseProps>({
  properties,
  id,
  order,
  display,
  component: Component,
  ...events
}: INodeProps) => {
  useEffect(() => () => events.onRegister(id), []);

  return (
    <ResizeObserver onResize={({ offsetWidth }) => events.onRegister(id, offsetWidth)}>
      <Component
        {...(properties ?? ({} as T))}
        className={clsx(styles.node, !display && styles.hidden)}
        style={display ? { order } : undefined}
        aria-hidden={display ? undefined : 'true'}
      />
    </ResizeObserver>
  );
};

export default Node;
