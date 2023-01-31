import { jsx, jsxs } from 'react/jsx-runtime';
import clsx from 'clsx';
import styles from './style.module.scss.js';

const Logo = ({ className, alt, href = '/', src, name, ...events }) => (jsx("div", { className: clsx(className, styles.logo), children: jsxs("a", { className: styles.link, href: href, onClick: events.onClick, children: [jsx("img", { className: styles.image, src: src, alt: alt }), !!name && jsx("span", { className: styles.name, children: name })] }) }));

export { Logo as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nby5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdWkvTG9nby9Mb2dvLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6WyJfanN4IiwiX2pzeHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFpQkEsTUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxFQUFjLE1BQzVFQSxHQUFLLENBQUEsS0FBQSxFQUFBLEVBQUEsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUMxQyxRQUFBLEVBQUFDLElBQUEsQ0FBQSxHQUFBLEVBQUEsRUFBRyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUM1RCxRQUFBLEVBQUEsQ0FBQUQsR0FBQSxDQUFBLEtBQUEsRUFBQSxFQUFLLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBSSxFQUNuRCxDQUFDLENBQUMsSUFBSSxJQUFJQSxjQUFNLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFHLFFBQUEsRUFBQSxJQUFJLEdBQVEsQ0FDcEQsRUFBQSxDQUFBLEVBQUEsQ0FDQTs7OzsifQ==
