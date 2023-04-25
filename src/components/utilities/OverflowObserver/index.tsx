import clsx from 'clsx';
import { Key, ReactElement, ReactNode, useLayoutEffect, useMemo, useState } from 'react';

import ResizeObserver from '~/utilities/ResizeObserver';

import Node, { INodeProps } from './parts/Node';
import NodeList from './parts/NodeList';
import Rest from './parts/Rest';

import styles from './style.scss';

export interface IOverflowObserverEvents {
  onChange?: (count: number) => void;
}

export interface IOverflowObserverProps<T, P> extends IOverflowObserverEvents {
  className?: string;
  element: keyof React.ReactHTML;
  nodes: Omit<P, 'ref' | 'children'>[];
  options: {
    component: INodeProps<T, P>['component'];
    /** @default key */
    field?: string;
    /** @default 10 */
    width?: number;
  };
  rest?: ReactNode | ReactNode[];
}

const OverflowObserver = <T, P = unknown>({
  element: Element,
  rest = '...',
  nodes,
  options,
  className,
  onChange,
  ...props
}: IOverflowObserverProps<T, P>): ReactElement<P> => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [nodesWidths, setNodesWidths] = useState(new Map<Key, number>());
  const [prevRestWidth, setPrevRestWidth] = useState(0);
  const [restWidth, setRestWidth] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>();
  const [restReady, setRestReady] = useState(false);
  const node = { field: 'key' as keyof INodeProps<T, P>['properties'], width: 10, ...options };

  const mergedNodes = useMemo((): [Key, INodeProps<T, P>['properties']][] => {
    const list = nodes.length ? nodes.slice(0, Math.min(nodes.length, (containerWidth ?? 0) / node.width)) : nodes;

    return list.map((item, index) => [
      (item[node.field as keyof INodeProps<T, P>['properties']] ?? index) as Key,
      item,
    ]);
  }, [nodes, node.field, node.width, containerWidth]);

  const omittedNodes = useMemo(
    () => (nodes.length ? nodes.slice((displayCount ?? 0) + 1) : nodes.slice(mergedNodes.length)),
    [nodes, mergedNodes, displayCount]
  );

  const handleResize = (size: { width: number }): void => {
    setContainerWidth(size.width);
  };

  const handleRestRegister = (_: unknown, width?: number): void => {
    if (width) setRestWidth(width);

    setPrevRestWidth(restWidth);
  };

  const handleNodeRegister = (key?: React.Key, width?: number): void => {
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
          onChange?.(nodes.length - (nextDisplayCount + 1));
        }
      }
    }
  }, [containerWidth, nodesWidths, restWidth, mergedNodes]);

  return (
    <ResizeObserver onResize={handleResize}>
      <div className={styles.container}>
        <Element className={clsx(className, styles.list)} {...props}>
          <NodeList
            component={node.component}
            nodes={mergedNodes}
            count={displayCount}
            onRegister={handleNodeRegister}
          />
        </Element>
        <Node
          component={Rest}
          order={(displayCount ?? 0) + 1}
          display={restReady && !!omittedNodes.length}
          onRegister={handleRestRegister}
        >
          {rest}
        </Node>
      </div>
    </ResizeObserver>
  );
};

export default OverflowObserver;
