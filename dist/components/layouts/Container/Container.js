import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { forwardRef } from 'react';
import useResolution from '../../../hooks/useResolution.js';
import { Resolution } from '../../../types/resolution.js';
import styles from './style.module.scss.js';

const MODIFICATIONS = {
    [Resolution.SuperLarge]: styles.super,
    [Resolution.ExtraLarge]: styles.extra,
    [Resolution.Large]: styles.large,
    [Resolution.Medium]: styles.medium,
    [Resolution.Small]: styles.small,
};
const Container = ({ className, children, ...props }, ref) => {
    const resolution = useResolution();
    return (jsx("div", { ...props, ref: ref, className: clsx(className, styles.container, MODIFICATIONS[resolution]), children: children }));
};
var Container$1 = forwardRef(Container);

export { Container$1 as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9sYXlvdXRzL0NvbnRhaW5lci9Db250YWluZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSxNQUFNLGFBQWEsR0FBcUM7QUFDdEQsSUFBQSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUs7QUFDckMsSUFBQSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUs7QUFDckMsSUFBQSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUs7QUFDaEMsSUFBQSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07QUFDbEMsSUFBQSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUs7Q0FDakMsQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUFHLENBQ2hCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssRUFBYSxFQUM1QyxHQUFpQyxLQUNOO0FBQzNCLElBQUEsTUFBTSxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFFbkMsUUFDRUEsR0FBUyxDQUFBLEtBQUEsRUFBQSxFQUFBLEdBQUEsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsRUFDOUYsUUFBQSxFQUFBLFFBQVEsRUFDTCxDQUFBLEVBQ047QUFDSixDQUFDLENBQUM7QUFFRixrQkFBZSxVQUFVLENBQTRCLFNBQVMsQ0FBQzs7OzsifQ==
