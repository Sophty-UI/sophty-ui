import { cloneElement, FC, ReactElement, Ref, RefAttributes, useCallback, useEffect, useMemo, useRef } from 'react';

import ObserverTools from '~/tools/observer';
import RefTools from '~/tools/ref';
import { IContainer } from '~/types/box';

export interface ISize {
  height: number;
  offsetHeight: number;
  offsetWidth: number;
  width: number;
}

export interface IResizeObserverEvents {
  onResize?: (size: ISize, element: HTMLElement) => void;
}

export interface IResizeObserverProps extends IContainer, IResizeObserverEvents {
  children: ReactElement<HTMLElement> & { ref?: Ref<HTMLElement> };
}

const ResizeObserver: FC<IResizeObserverProps> = ({ children, ...events }) => {
  const nodeRef = useRef<HTMLElement>(null);
  const sizeRef = useRef({ width: -1, height: -1, offsetWidth: -1, offsetHeight: -1 });
  const mergedRef = useMemo(
    () => RefTools.compose<HTMLElement>(children.ref ?? null, nodeRef),
    [children.ref, nodeRef]
  );

  const handleResize = useCallback(
    (target: HTMLElement) => {
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
        if (events.onResize) Promise.resolve().then(() => events.onResize?.({ ...sizeRef.current }, target));
      }
    },
    [events.onResize]
  );

  useEffect(() => {
    const node = ObserverTools.observe(nodeRef, handleResize);

    return () => ObserverTools.unobserve(node, handleResize);
  }, [nodeRef.current]);

  return <>{cloneElement<HTMLElement & RefAttributes<HTMLElement>>(children, { ref: mergedRef })}</>;
};

export default ResizeObserver;
