import clsx from 'clsx';
import { HTMLAttributes, Key, ReactElement, useLayoutEffect, useMemo, useState } from 'react';

import { IComponentType } from '../../../types/component';
import ResizeObserver from '../ResizeObserver';
import Node from './parts/Node';
import NodeList from './parts/NodeList';
import styles from './style.module.scss';

export interface IOverflowEvents {
  onVisibleNodesChange?: (count: number) => void;
}

export interface IOverflowCallbacks<T> {
  render: (item: T) => ReactElement;
}

export interface IOverflowProps<T, E> extends HTMLAttributes<E>, IOverflowEvents, IOverflowCallbacks<T> {
  /** @default div */
  component?: IComponentType;
  nodes: T[];
  options?: {
    /** @default div */
    component?: IComponentType;
    /** @default id */
    field?: keyof T;
    /** @default 10 */
    width?: number;
  };
}

function Overflow<T, E = unknown>({
  component: Component = 'div',
  nodes,
  render,
  ...props
}: IOverflowProps<T, E>): ReactElement {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [nodesWidths, setNodesWidths] = useState(new Map<Key, number>());
  const [prevRestWidth, setPrevRestWidth] = useState(0);
  const [restWidth, setRestWidth] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>();
  const [restReady, setRestReady] = useState(false);
  const options: Required<typeof props.options> = {
    component: 'div',
    field: 'id' as keyof T,
    width: 10,
    ...props.options,
  };

  const mergedNodes = useMemo((): [Key, T][] => {
    const list = nodes.length ? nodes.slice(0, Math.min(nodes.length, (containerWidth ?? 0) / options.width)) : nodes;

    return list.map((node, index) => [((options && node[options.field]) ?? index) as Key, node]);
  }, [nodes, options.field, options.width, containerWidth]);

  const omittedNodes = useMemo(
    () => (nodes.length ? nodes.slice((displayCount ?? 0) + 1) : nodes.slice(mergedNodes.length)),
    [nodes, mergedNodes, displayCount]
  );

  const resizeHandler = (_: unknown, element: HTMLElement): void => {
    setContainerWidth(element.clientWidth);
  };

  const registerRestHandler = (_: unknown, width?: number): void => {
    if (width) setRestWidth(width);

    setPrevRestWidth(restWidth);
  };

  const registerNodeHandler = (key?: React.Key, width?: number): void => {
    setNodesWidths(origin => {
      const clone = new Map(origin);

      if (key !== undefined) {
        if (width === undefined) clone.delete(key);
        else clone.set(key, width);
      }

      return clone;
    });
  };

  useLayoutEffect(() => {
    if (containerWidth && Math.max(prevRestWidth, restWidth) && mergedNodes) {
      let nextDisplayCount: number | undefined;
      let isReady = true;

      // When data count change to 0, reset this since not loop will reach
      if (mergedNodes.length) {
        const lastNodeIndex = mergedNodes.length - 1;
        const [lastNodeId] = mergedNodes[lastNodeIndex] ?? [];
        const lastNodeWidth = (lastNodeId !== undefined && nodesWidths.get(lastNodeId)) || 0;
        let totalWidth = 0;
        let currentNodeId;
        let currentNodeWidth;
        let i = 0;

        while (i < mergedNodes.length && nextDisplayCount === undefined) {
          [currentNodeId] = mergedNodes[i] ?? [];
          currentNodeWidth = (currentNodeId !== undefined && nodesWidths.get(currentNodeId)) || undefined;

          // Since data not ready
          if (currentNodeWidth !== undefined) {
            // Find best match
            totalWidth += currentNodeWidth;

            if (
              // Only one means `totalWidth` is the final width
              (lastNodeIndex === 0 && totalWidth <= (containerWidth ?? 0)) ||
              // Last two width will be the final width
              (i === lastNodeIndex - 1 && totalWidth + lastNodeWidth <= (containerWidth ?? 0))
            ) {
              // Additional check if match the end
              nextDisplayCount = lastNodeIndex;
            } else if (totalWidth + Math.max(prevRestWidth, restWidth) > (containerWidth ?? 0)) {
              // Can not hold all the content to show rest
              nextDisplayCount = i - 1;
            }
          } else {
            nextDisplayCount = i - 1;
            isReady = false;
          }

          i++;
        }
      } else nextDisplayCount = 0;

      if (nextDisplayCount !== undefined && displayCount !== nextDisplayCount) {
        setDisplayCount(nextDisplayCount);

        if (isReady) {
          setRestReady(nextDisplayCount < nodes.length - 1);
          props.onVisibleNodesChange?.(nextDisplayCount);
        }
      }
    }
  }, [containerWidth, nodesWidths, restWidth, mergedNodes]);

  return (
    <ResizeObserver onResize={resizeHandler}>
      {
        <Component className={clsx(props.className, styles.container)} style={props.style}>
          <NodeList
            nodes={mergedNodes}
            render={render}
            count={displayCount}
            register={registerNodeHandler}
            component={options.component}
          />
          <Node
            node="..."
            order={(displayCount ?? 0) + 1}
            register={registerRestHandler}
            display={restReady && !!omittedNodes.length}
            render={node => <div>{node}</div>}
            component={options.component}
          />
        </Component>
      }
    </ResizeObserver>
  );
}

export default Overflow;
