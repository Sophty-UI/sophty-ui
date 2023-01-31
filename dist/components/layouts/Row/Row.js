import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import useResolution from '../../../hooks/useResolution.js';
import { parseGap } from '../../../utils/flex.js';
import styles from './style.module.scss.js';

const ALIGN_MAP = {
    none: undefined,
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
};
const Row = ({ gap, align, justify = 'space-evenly', children, direction = 'row', wrap = true, style, className, ...props }, ref) => {
    const resolution = useResolution();
    const flexStyles = useMemo(() => ({
        alignItems: ALIGN_MAP[(typeof align === 'string' ? align : (align ?? {})[resolution]) ?? 'none'],
        justifyContent: typeof justify === 'string' ? justify : (justify ?? {})[resolution],
        flexFlow: `${direction} ${typeof wrap === 'string' ? wrap : 'wrap'}`,
        gap: parseGap(gap),
    }), [resolution, gap, align, justify, direction, wrap]);
    return (jsx("div", { ...props, ref: ref, className: clsx(className, styles.row), style: { ...style, ...flexStyles }, children: children }));
};
var Row$1 = forwardRef(Row);

export { Row$1 as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9sYXlvdXRzL1Jvdy9Sb3cudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUE2QkEsTUFBTSxTQUFTLEdBQUc7QUFDaEIsSUFBQSxJQUFJLEVBQUUsU0FBUztBQUNmLElBQUEsS0FBSyxFQUFFLFlBQVk7QUFDbkIsSUFBQSxNQUFNLEVBQUUsUUFBUTtBQUNoQixJQUFBLEdBQUcsRUFBRSxVQUFVO0NBQ2hCLENBQUM7QUFFRixNQUFNLEdBQUcsR0FBRyxDQUNWLEVBQ0UsR0FBRyxFQUNILEtBQUssRUFDTCxPQUFPLEdBQUcsY0FBYyxFQUN4QixRQUFRLEVBQ1IsU0FBUyxHQUFHLEtBQUssRUFDakIsSUFBSSxHQUFHLElBQUksRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULEdBQUcsS0FBSyxFQUNFLEVBQ1osR0FBaUMsS0FDTjtBQUMzQixJQUFBLE1BQU0sVUFBVSxHQUFHLGFBQWEsRUFBRSxDQUFDO0FBQ25DLElBQUEsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUN4QixPQUFPO1FBQ0wsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUNoRyxRQUFBLGNBQWMsRUFBRSxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxVQUFVLENBQUM7QUFDbkYsUUFBQSxRQUFRLEVBQUUsQ0FBRyxFQUFBLFNBQVMsQ0FBSSxDQUFBLEVBQUEsT0FBTyxJQUFJLEtBQUssUUFBUSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUUsQ0FBQTtBQUNwRSxRQUFBLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ25CLEtBQUEsQ0FBQyxFQUNGLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FDbkQsQ0FBQztBQUVGLElBQUEsUUFDRUEsR0FBQSxDQUFBLEtBQUEsRUFBQSxFQUFBLEdBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsS0FBSyxFQUFFLEdBQUcsVUFBVSxFQUFFLEVBQUEsUUFBQSxFQUNqRyxRQUFRLEVBQUEsQ0FDTCxFQUNOO0FBQ0osQ0FBQyxDQUFDO0FBRUYsWUFBZSxVQUFVLENBQTRCLEdBQUcsQ0FBQzs7OzsifQ==
