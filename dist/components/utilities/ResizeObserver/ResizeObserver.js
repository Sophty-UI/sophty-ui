import { jsx, Fragment } from 'react/jsx-runtime';
import { Children, useRef, useMemo, useCallback, useEffect, cloneElement } from 'react';
import { composeRef } from '../../../utils/ref.js';

const listeners = new Map();
const observer = new window.ResizeObserver(entities => {
    entities.forEach(({ target }) => {
        if (target instanceof HTMLElement) {
            listeners.get(target)?.forEach(listener => listener(target));
        }
    });
});
const observe = ({ current: node }, callback) => {
    if (node) {
        const listener = listeners.get(node);
        if (listener)
            listener.add(callback);
        else {
            listeners.set(node, new Set([callback]));
            observer.observe(node);
        }
    }
    return node;
};
function unobserve(node, callback) {
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
}
const ResizeObserver = ({ children, ...events }) => {
    if (process.env.NODE_ENV !== 'production') {
        const count = Children.count(children);
        if (count > 1 || count === 0)
            console.warn('ResizeObserver must contain one and only one children');
    }
    const nodeRef = useRef(null);
    const sizeRef = useRef({ width: -1, height: -1, offsetWidth: -1, offsetHeight: -1 });
    const mergedRef = useMemo(() => composeRef(children.ref ?? null, nodeRef), [children.ref, nodeRef]);
    const handleResize = useCallback((target) => {
        const { onResize } = events;
        const { width, height } = target.getBoundingClientRect();
        const { offsetWidth, offsetHeight } = target;
        if (sizeRef.current.width !== width ||
            sizeRef.current.height !== height ||
            sizeRef.current.offsetWidth !== offsetWidth ||
            sizeRef.current.offsetHeight !== offsetHeight) {
            sizeRef.current = { width, height, offsetWidth, offsetHeight };
            if (onResize)
                Promise.resolve().then(() => onResize({ ...sizeRef.current }, target));
        }
    }, [events]);
    useEffect(() => {
        const node = observe(nodeRef, handleResize);
        return () => unobserve(node, handleResize);
    }, [nodeRef.current]);
    return jsx(Fragment, { children: cloneElement(children, { ref: mergedRef }) });
};

export { ResizeObserver as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXplT2JzZXJ2ZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3V0aWxpdGllcy9SZXNpemVPYnNlcnZlci9SZXNpemVPYnNlcnZlci50c3giXSwic291cmNlc0NvbnRlbnQiOltudWxsXSwibmFtZXMiOlsiX2pzeCIsIl9GcmFnbWVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBZ0QsQ0FBQztBQUMxRSxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxJQUFHO0lBQ3BELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFJO1FBQzlCLElBQUksTUFBTSxZQUFZLFdBQVcsRUFBRTtBQUNqQyxZQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RCxTQUFBO0FBQ0gsS0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLENBQ2QsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUEwQixFQUN6QyxRQUF3QyxLQUNsQjtBQUN0QixJQUFBLElBQUksSUFBSSxFQUFFO1FBQ1IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVyQyxRQUFBLElBQUksUUFBUTtBQUFFLFlBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxhQUFBO0FBQ0gsWUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxZQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsU0FBQTtBQUNGLEtBQUE7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
