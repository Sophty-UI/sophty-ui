import clsx from 'clsx';
import { FC, Key, useLayoutEffect, useMemo, useState } from 'react';

import ResizeObserver from '../ResizeObserver';
import Node, { INodeProps } from './parts/Node';
import NodeList from './parts/NodeList';
import Rest from './parts/Rest';
import styles from './style.module.scss';

export interface IOverflowEvents {
  onVisibleNodesChange?: (count: number) => void;
}

export interface IOverflowProps extends IOverflowEvents {
  className?: string;
  component: keyof React.ReactHTML;
  nodes: any[];
  options: {
    component: INodeProps['component'];
    /** @default id */
    field?: string;
    /** @default 10 */
    width?: number;
  };
}

const Overflow: FC<IOverflowProps> = ({ component: Component, nodes, options, className, ...props }) => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [nodesWidths, setNodesWidths] = useState(new Map<Key, number>());
  const [prevRestWidth, setPrevRestWidth] = useState(0);
  const [restWidth, setRestWidth] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>();
  const [restReady, setRestReady] = useState(false);
  const node = { field: 'id', width: 10, ...options };

  const mergedNodes = useMemo((): [Key, any][] => {
    const list = nodes.length ? nodes.slice(0, Math.min(nodes.length, (containerWidth ?? 0) / node.width)) : nodes;

    return list.map((item, index) => [(item[node.field] ?? index) as Key, item]);
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
          props.onVisibleNodesChange?.(nextDisplayCount);
        }
      }
    }
  }, [containerWidth, nodesWidths, restWidth, mergedNodes]);

  return (
    <ResizeObserver onResize={handleResize}>
      <div {...props} className={clsx(className, styles.container)}>
        <Component className={styles.list}>
          <NodeList
            component={node.component}
            nodes={mergedNodes}
            count={displayCount}
            onRegister={handleNodeRegister}
          />
        </Component>
        <Node
          component={Rest}
          order={(displayCount ?? 0) + 1}
          display={restReady && !!omittedNodes.length}
          onRegister={handleRestRegister}
        />
      </div>
    </ResizeObserver>
  );
};

export default Overflow;
