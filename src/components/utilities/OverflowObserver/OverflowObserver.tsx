import clsx from 'clsx';
import { forwardRef, HTMLAttributes, Key, ReactElement, useLayoutEffect, useMemo, useState } from 'react';

import { IComponentType } from '../../../types/component';
import ResizeObserver from '../ResizeObserver';
import Node from './parts/Node';
import NodeList from './parts/NodeList';
import styles from './style.module.scss';

export interface IOverflowProps<T, E = unknown> extends HTMLAttributes<E> {
  nodes: T[];
  itemWidth?: number;
  itemComponent?: IComponentType<T>;
  component?: IComponentType<T>;
  onVisibleChange?: (visibleCount: number) => void;

  // -----
  render: (item: T, props: INodeRenderProps) => ReactElement;
  getKey: (item: T) => Key;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, max-lines-per-function
function Overflow<ItemType = any>(props: IOverflowProps<ItemType>, ref: React.Ref<HTMLDivElement>) {
  const {
    nodes,
    render,
    getKey,
    itemWidth = 10,
    style,
    className,
    component: Component = 'div',
    itemComponent = 'div',
    onVisibleChange,
    // ...restProps
  } = props;

  const [containerWidth, setContainerWidth] = useState();
  const [itemWidths, setItemWidths] = useState(new Map<React.Key, number>());
  const [prevRestWidth, setPrevRestWidth] = useState(0);
  const [restWidth, setRestWidth] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>();
  const [restReady, setRestReady] = useState(false);

  // ================================= Data =================================

  const mergedData = useMemo(
    () => (nodes.length ? nodes.slice(0, Math.min(nodes.length, (containerWidth ?? 0) / itemWidth)) : nodes),
    [nodes, itemWidth, containerWidth]
  );

  const omittedItems = useMemo(
    () => (nodes.length ? nodes.slice((displayCount ?? 0) + 1) : nodes.slice(mergedData.length)),
    [nodes, mergedData, displayCount]
  );

  // ================================= Item =================================

  function updateDisplayCount(count: number, notReady?: boolean) {
    if (displayCount === count) {
      return;
    }

    setDisplayCount(count);

    if (!notReady) {
      setRestReady(count < nodes.length - 1);

      onVisibleChange?.(count);
    }
  }

  // ================================= Size =================================
  function onOverflowResize(_: object, element: HTMLElement) {
    setContainerWidth(element.clientWidth);
  }

  function registerSize(key?: React.Key, width?: number) {
    setItemWidths(origin => {
      const clone = new Map(origin);

      if (width === undefined) clone.delete(key);
      else clone.set(key, width);

      return clone;
    });
  }

  function registerOverflowSize(_?: React.Key, width?: number): void {
    if (width) setRestWidth(width);

    setPrevRestWidth(restWidth);
  }

  // ================================ Effect ================================
  function getItemWidth(index: number) {
    return itemWidths.get(getKey(mergedData[index], index));
  }

  // eslint-disable-next-line max-lines-per-function
  useLayoutEffect(() => {
    if (containerWidth && Math.max(prevRestWidth, restWidth) && mergedData) {
      let totalWidth = 0;

      const len = mergedData.length;
      const lastIndex = len - 1;

      // When data count change to 0, reset this since not loop will reach
      if (!len) {
        updateDisplayCount(0);

        return;
      }

      for (let i = 0; i < len; i += 1) {
        let currentItemWidth = itemWidths.get(getKey(mergedData[i], i));
        let lastItemWidth = itemWidths.get(getKey(mergedData[lastIndex], lastIndex))!;

        // Break since data not ready
        if (currentItemWidth === undefined) {
          updateDisplayCount(i - 1, true);
          break;
        }

        // Find best match
        totalWidth += currentItemWidth;

        if (
          // Only one means `totalWidth` is the final width
          (lastIndex === 0 && totalWidth <= (containerWidth ?? 0)) ||
          // Last two width will be the final width
          (i === lastIndex - 1 && totalWidth + lastItemWidth <= (containerWidth ?? 0))
        ) {
          // Additional check if match the end
          updateDisplayCount(lastIndex);
          break;
        } else if (totalWidth + Math.max(prevRestWidth, restWidth) > (containerWidth ?? 0)) {
          // Can not hold all the content to show rest
          updateDisplayCount(i - 1);
          break;
        }
      }
    }
  }, [containerWidth, itemWidths, restWidth, getKey, mergedData]);

  // ================================ Render ================================
  const displayRest = restReady && !!omittedItems.length;

  return (
    <ResizeObserver onResize={onOverflowResize}>
      {
        <Component className={clsx(className, styles.container)} style={style} ref={ref}>
          <NodeList
            items={mergedData}
            getKey={getKey}
            render={render}
            count={displayCount}
            register={registerSize}
            component={itemComponent}
          />
          <Node
            item={`+ ${omittedItems.length} ...`}
            order={displayRest ? displayCount ?? 0 : Number.MAX_SAFE_INTEGER}
            register={registerOverflowSize}
            display={displayRest}
            render={item => <div>{item}</div>}
            component={itemComponent}
          />
        </Component>
      }
    </ResizeObserver>
  );
}

export default forwardRef(Overflow);
