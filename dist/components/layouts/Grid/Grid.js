import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { forwardRef, useMemo, Children, cloneElement } from 'react';
import useResolution from '../../../hooks/useResolution.js';
import { calcSpan } from '../../../utils/flex.js';
import styles from './style.module.scss.js';

const Grid = ({ children, className, columns = 12, ...props }, ref) => {
    const resolution = useResolution();
    const body = useMemo(() => {
        const columnEnd = columns + 1;
        let prevPosition = 1;
        return Children.map(children, child => {
            const columnStart = prevPosition;
            const span = calcSpan(child.props.span, resolution, columns);
            prevPosition = prevPosition + span >= columnEnd ? 1 : prevPosition + span;
            return cloneElement(child, { columnStart, columnEnd, span });
        });
    }, [children, resolution, columns]);
    return (jsx("div", { ...props, ref: ref, className: clsx(className, styles.grid), children: body }));
};
var GridBase = forwardRef(Grid);

export { GridBase as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbGF5b3V0cy9HcmlkL0dyaWQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQSxNQUFNLElBQUksR0FBRyxDQUNYLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLEdBQUcsS0FBSyxFQUFjLEVBQzNELEdBQWlDLEtBQ0w7QUFDNUIsSUFBQSxNQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztBQUNuQyxJQUFBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFLO0FBQ3hCLFFBQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUc7WUFDcEMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDO0FBQ2pDLFlBQUEsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU3RCxZQUFBLFlBQVksR0FBRyxZQUFZLEdBQUcsSUFBSSxJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQztBQUUxRSxZQUFBLE9BQU8sWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMvRCxTQUFDLENBQUMsQ0FBQztLQUNKLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFcEMsUUFDRUEsZ0JBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUM5RCxRQUFBLEVBQUEsSUFBSSxFQUNELENBQUEsRUFDTjtBQUNKLENBQUMsQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUE2QixJQUFJLENBQUM7Ozs7In0=
