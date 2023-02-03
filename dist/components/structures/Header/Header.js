import { jsx, jsxs } from 'react/jsx-runtime';
import clsx from 'clsx';
import { forwardRef } from 'react';
import useResolution from '../../../hooks/useResolution.js';
import { Resolution } from '../../../types/resolution.js';
import Col from '../../layouts/Col/Col.js';
import Container from '../../layouts/Container/Container.js';
import '../../layouts/Grid/index.js';
import '../../layouts/Layout/index.js';
import Row from '../../layouts/Row/Row.js';
import Menu from '../Menu/Menu.js';
import styles from './style.module.scss.js';

const LOGO_SPAN = { xs: 24, sm: 24, md: 6, lg: 6, xl: 4, sl: 4 };
const MENU_SPAN = { xs: 0, sm: 0, md: 18, lg: 18, xl: 20, sl: 20 };
const Header = ({ className, logo, menu, extra, ...props }, ref) => {
    const resolution = useResolution();
    const isMobile = resolution === Resolution.Small || resolution === Resolution.ExtraSmall;
    return (jsx(Container, { ...props, ref: ref, className: clsx(className, styles.header), children: jsxs(Row, { className: styles.container, align: "center", justify: "end", children: [(!!logo || !!extra) && (jsx(Col, { span: LOGO_SPAN, grow: !isMobile, children: jsxs(Row, { align: "center", justify: isMobile ? 'space-between' : 'start', children: [!!logo && jsx(Col, { grow: true, children: logo }), !!extra && isMobile && jsx(Col, { children: extra })] }) })), !!menu && (jsx(Col, { className: styles.menu, span: MENU_SPAN, grow: true, children: jsx(Menu, { ...menu }) })), !!extra && !isMobile && jsx(Col, { children: extra })] }) }));
};
var Header$1 = forwardRef(Header);

export { Header$1 as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zdHJ1Y3R1cmVzL0hlYWRlci9IZWFkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giLCJfanN4cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWdCQSxNQUFNLFNBQVMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDakUsTUFBTSxTQUFTLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBRW5FLE1BQU0sTUFBTSxHQUFHLENBQ2IsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLEVBQWdCLEVBQ3hELEdBQWlDLEtBQ0g7QUFDOUIsSUFBQSxNQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztBQUNuQyxJQUFBLE1BQU0sUUFBUSxHQUFHLFVBQVUsS0FBSyxVQUFVLENBQUMsS0FBSyxJQUFJLFVBQVUsS0FBSyxVQUFVLENBQUMsVUFBVSxDQUFDO0FBRXpGLElBQUEsUUFDRUEsR0FBQSxDQUFDLFNBQVMsRUFBQSxFQUFBLEdBQUssS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFBLFFBQUEsRUFDdkVDLElBQUMsQ0FBQSxHQUFHLElBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFBLFFBQUEsRUFBQSxDQUMzRCxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssTUFDakJELEdBQUEsQ0FBQyxHQUFHLEVBQUEsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFDbkMsUUFBQSxFQUFBQyxJQUFBLENBQUMsR0FBRyxFQUFDLEVBQUEsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLGVBQWUsR0FBRyxPQUFPLEVBQzlELFFBQUEsRUFBQSxDQUFBLENBQUMsQ0FBQyxJQUFJLElBQUlELEdBQUMsQ0FBQSxHQUFHLElBQUMsSUFBSSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUUsSUFBSSxFQUFBLENBQU8sRUFDaEMsQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLElBQUlBLEdBQUMsQ0FBQSxHQUFHLGNBQUUsS0FBSyxFQUFBLENBQU8sQ0FDdEMsRUFBQSxDQUFBLEVBQUEsQ0FDRixDQUNQLEVBQ0EsQ0FBQyxDQUFDLElBQUksS0FDTEEsR0FBQSxDQUFDLEdBQUcsRUFBQSxFQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQ2hEQSxHQUFDLENBQUEsSUFBSSxPQUFLLElBQUksRUFBQSxDQUFJLEVBQ2QsQ0FBQSxDQUNQLEVBQ0EsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsSUFBSUEsR0FBQyxDQUFBLEdBQUcsY0FBRSxLQUFLLEVBQUEsQ0FBTyxDQUN2QyxFQUFBLENBQUEsRUFBQSxDQUNJLEVBQ1o7QUFDSixDQUFDLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBK0IsTUFBTSxDQUFDOzs7OyJ9