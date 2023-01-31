import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { forwardRef } from 'react';
import useResolution from '../../../hooks/useResolution.js';
import { calcSpan, parseFlex } from '../../../utils/flex.js';
import styles from './style.module.scss.js';

const GRID_SIZE = (parseInt(styles.size, 10)) || 0;
const Col = ({ span, flex, grow, children, className, style, ...props }, ref) => {
    const resolution = useResolution();
    return (jsx("div", { ...props, ref: ref, className: clsx(className, styles.col, grow && styles.grow, !flex && span !== undefined && styles[`span${calcSpan(span, resolution, GRID_SIZE)}`]), style: { ...style, flex: parseFlex(flex) }, children: children }));
};
var Col$1 = forwardRef(Col);

export { Col$1 as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9sYXlvdXRzL0NvbC9Db2wudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFlQSxNQUFNLFNBQVMsR0FBRyxDQUFnQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFbEUsTUFBTSxHQUFHLEdBQUcsQ0FDVixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFhLEVBQ3JFLEdBQWlDLEtBQ047QUFDM0IsSUFBQSxNQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztBQUVuQyxJQUFBLFFBQ0VBLEdBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxHQUNNLEtBQUssRUFDVCxHQUFHLEVBQUUsR0FBRyxFQUNSLFNBQVMsRUFBRSxJQUFJLENBQ2IsU0FBUyxFQUNULE1BQU0sQ0FBQyxHQUFHLEVBQ1YsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQ25CLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLENBQU8sSUFBQSxFQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBLENBQXlCLENBQUMsQ0FDN0csRUFDRCxLQUFLLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUEsUUFBQSxFQUV6QyxRQUFRLEVBQUEsQ0FDTCxFQUNOO0FBQ0osQ0FBQyxDQUFDO0FBRUYsWUFBZSxVQUFVLENBQTRCLEdBQUcsQ0FBQzs7OzsifQ==
