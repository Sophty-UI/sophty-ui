import { Ref } from 'react';

const compose = <T>(...refs: Ref<T>[]): Ref<T> => {
  const refList = refs.filter(ref => ref);
  const callback = (node: T): void => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        (ref as { current: T }).current = node;
      }
    });
  };

  return refList.length <= 1 ? refList[0] ?? null : callback;
};

const RefTools = {
  compose,
};

export default RefTools;
