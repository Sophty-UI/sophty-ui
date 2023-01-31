import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { forwardRef, useMemo, Children, cloneElement } from 'react';
import { parseGap } from '../../../utils/flex.js';
import styles from './style.module.scss.js';
import { grid } from './utils/grid.js';

const Layout = ({ className, children, template, style = {}, gap, ...props }, ref) => {
    const [body, gridTemplate] = useMemo(() => {
        const rows = new Map();
        const cols = new Map();
        return [
            Children.map(children, child => {
                const { width, height } = child.props;
                if (typeof child.key !== 'string')
                    throw new Error('Layout.Area key is required!');
                if (height)
                    rows.set(child.key, typeof height === 'number' ? `${height}px` : height);
                if (width)
                    cols.set(child.key, typeof width === 'number' ? `${width}px` : width);
                return cloneElement(child, { area: child.key });
            }),
            grid({ template, rows, cols }),
        ];
    }, [children, template]);
    return (jsx("div", { ...props, ref: ref, className: clsx(className, styles.layout), style: { ...style, gridTemplate, gap: parseGap(gap) }, children: body }));
};
var LayoutBase = forwardRef(Layout);

export { LayoutBase as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9sYXlvdXRzL0xheW91dC9MYXlvdXQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFxQ0EsTUFBTSxNQUFNLEdBQUcsQ0FDYixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFnQixFQUMxRSxHQUFpQyxLQUNIO0lBQzlCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQUs7QUFDeEMsUUFBQSxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztBQUM5QyxRQUFBLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBRTlDLE9BQU87QUFDTCxZQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBRztnQkFDN0IsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBRXRDLGdCQUFBLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVE7QUFBRSxvQkFBQSxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDbkYsZ0JBQUEsSUFBSSxNQUFNO29CQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUcsR0FBRyxNQUFNLENBQUEsRUFBQSxDQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDckYsZ0JBQUEsSUFBSSxLQUFLO29CQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsR0FBRyxLQUFLLENBQUEsRUFBQSxDQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFFakYsZ0JBQUEsT0FBTyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELGFBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDL0IsQ0FBQztBQUNKLEtBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRXpCLElBQUEsUUFDRUEsR0FDTSxDQUFBLEtBQUEsRUFBQSxFQUFBLEdBQUEsS0FBSyxFQUNULEdBQUcsRUFBRSxHQUFHLEVBQ1IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUN6QyxLQUFLLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUVwRCxJQUFJLEVBQUEsQ0FDRCxFQUNOO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUJBQWUsVUFBVSxDQUErQixNQUFNLENBQUM7Ozs7In0=
