import clsx from 'clsx';
import {
    ForwardRefExoticComponent, HTMLAttributes, Key, ReactElement, useLayoutEffect, useMemo, useState,
} from 'react';

import ResizeObserver from '../ResizeObserver';
import Node, { INodeExtendProps } from './parts/Node';
import NodeList from './parts/NodeList';
import Rest from './parts/Rest';
import styles from './style.module.scss';

export interface IOverflowEvents {
  onVisibleNodesChange?: (count: number) => void;
}

export interface IOverflowNodeOptions<T> {
  component: ForwardRefExoticComponent<T>;
  /** @default id */
  field?: keyof Omit<T, 'ref'>;
  /** @default 10 */
  width?: number;
}

export interface IOverflowOptions<T> {
  node: IOverflowNodeOptions<T>;
}

export interface IOverflowProps<T, E> extends HTMLAttributes<E>, IOverflowEvents {
  component: keyof React.ReactHTML;
  nodes: Omit<T, 'ref'>[];
  options: IOverflowOptions<T>;
}

function Overflow<T extends INodeExtendProps, E = unknown>({
  component: Component,
  nodes,
  options,
  ...props
}: IOverflowProps<T, E>): ReactElement {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [nodesWidths, setNodesWidths] = useState(new Map<Key, number>());
  const [prevRestWidth, setPrevRestWidth] = useState(0);
  const [restWidth, setRestWidth] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>();
  const [restReady, setRestReady] = useState(false);
  const node: Required<IOverflowNodeOptions<T>> = {
    field: 'id' as keyof Omit<T, 'ref'>,
    width: 10,
    ...options.node,
  };

  const mergedNodes = useMemo((): [Key, T][] => {
    const list = nodes.length ? nodes.slice(0, Math.min(nodes.length, (containerWidth ?? 0) / node.width)) : nodes;

    return list.map((item, index) => [(item[node.field] ?? index) as Key, item as T]);
  }, [nodes, node.field, node.width, containerWidth]);

  const omittedNodes = useMemo(
    () => (nodes.length ? nodes.slice((displayCount ?? 0) + 1) : nodes.slice(mergedNodes.length)),
    [nodes, mergedNodes, displayCount]
  );

  const resizeHandler = (size: { width: number }): void => {
    setContainerWidth(size.width);
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
      <div className={styles.wrapper}>
        <Component className={clsx(props.className, styles.container)} style={props.style}>
          <NodeList
            nodes={mergedNodes}
            count={displayCount}
            register={registerNodeHandler}
            component={node.component}
          />
        </Component>
        <Node
          component={Rest}
          order={(displayCount ?? 0) + 1}
          register={registerRestHandler}
          display={restReady && !!omittedNodes.length}
          properties={{}}
        />
      </div>
    </ResizeObserver>
  );
}

export default Overflow;
