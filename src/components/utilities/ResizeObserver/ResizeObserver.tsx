import { cloneElement, FC, ReactElement, Ref, RefAttributes, useCallback, useEffect, useMemo, useRef } from 'react';

import { IContainerProps } from '../../../types/box';
import { composeRef } from '../../../utils/ref';
import { observe, unobserve } from './utils/observer';

export interface ISize {
  height: number;
  offsetHeight: number;
  offsetWidth: number;
  width: number;
}

export interface IResizeObserverEvents {
  onResize?: (size: ISize, element: HTMLElement) => void;
}

export interface IResizeObserverProps extends IContainerProps, IResizeObserverEvents {
  children: ReactElement<HTMLElement> & { ref?: Ref<HTMLElement> };
}

const ResizeObserver: FC<IResizeObserverProps> = ({ children, ...events }) => {
  const nodeRef = useRef<HTMLElement>(null);
  const sizeRef = useRef({ width: -1, height: -1, offsetWidth: -1, offsetHeight: -1 });
  const mergedRef = useMemo(() => composeRef<HTMLElement>(children.ref ?? null, nodeRef), [children.ref, nodeRef]);

  const handleResize = useCallback(
    (target: HTMLElement) => {
      const { onResize } = events;
      const { width, height } = target.getBoundingClientRect();
      const { offsetWidth, offsetHeight } = target;

      if (
        sizeRef.current.width !== width ||
        sizeRef.current.height !== height ||
        sizeRef.current.offsetWidth !== offsetWidth ||
        sizeRef.current.offsetHeight !== offsetHeight
      ) {
        sizeRef.current = { width, height, offsetWidth, offsetHeight };

        // defer the callback but not defer to next frame
        // eslint-disable-next-line promise/catch-or-return, promise/prefer-await-to-then
        if (onResize) Promise.resolve().then(() => onResize({ ...sizeRef.current }, target));
      }
    },
    [events]
  );

  useEffect(() => {
    const node = observe(nodeRef, handleResize);

    return () => unobserve(node, handleResize);
  }, [nodeRef.current]);

  return <>{cloneElement<HTMLElement & RefAttributes<HTMLElement>>(children, { ref: mergedRef })}</>;
};

export default ResizeObserver;
