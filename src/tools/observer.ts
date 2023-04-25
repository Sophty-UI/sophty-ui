import { RefObject } from 'react';

const listeners = new Map<Element, Set<(element: HTMLElement) => void>>();
const observer = new window.ResizeObserver(entities => {
  entities.forEach(({ target }) => {
    if (target instanceof HTMLElement) {
      listeners.get(target)?.forEach(listener => listener(target));
    }
  });
});

const observe = (
  { current: node }: RefObject<HTMLElement>,
  callback: (element: HTMLElement) => void
): HTMLElement | null => {
  if (node) {
    const listener = listeners.get(node);

    if (listener) listener.add(callback);
    else {
      listeners.set(node, new Set([callback]));
      observer.observe(node);
    }
  }

  return node;
};

const unobserve = (node: HTMLElement | null, callback: (element: HTMLElement) => void): void => {
  if (node) {
    const listener = listeners.get(node);

    if (listener) {
      listener.delete(callback);

      if (!listener.size) {
        observer.unobserve(node);
        listeners.delete(node);
      }
    }
  }
};

const ObserverTools = {
  observe,
  unobserve,
};

export default ObserverTools;
