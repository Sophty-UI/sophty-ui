import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import styles from './style.module.scss.js';

const MenuItem = ({ className, disabled, id, label, onClick, selected, role = 'menu-item', ...props }) => {
    const handleClick = (event) => onClick(event, id);
    return (jsx("li", { ...props, role: role, className: clsx(className, styles.item, disabled && styles.disabled, selected && styles.selected), onClick: handleClick, children: label }, id));
};

export { MenuItem as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUl0ZW0uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3N0cnVjdHVyZXMvTWVudS9wYXJ0cy9JdGVtL01lbnVJdGVtLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6WyJfanN4Il0sIm1hcHBpbmdzIjoiOzs7O0FBa0JNLE1BQUEsUUFBUSxHQUFHLENBQUMsRUFDaEIsU0FBUyxFQUNULFFBQVEsRUFDUixFQUFFLEVBQ0YsS0FBSyxFQUNMLE9BQU8sRUFDUCxRQUFRLEVBQ1IsSUFBSSxHQUFHLFdBQVcsRUFDbEIsR0FBRyxLQUFLLEVBQ08sS0FBa0M7QUFDakQsSUFBQSxNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQWdDLEtBQVcsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVuRixJQUFBLFFBQ0VBLEdBRU0sQ0FBQSxJQUFBLEVBQUEsRUFBQSxHQUFBLEtBQUssRUFDVCxJQUFJLEVBQUUsSUFBSSxFQUNWLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFDakcsT0FBTyxFQUFFLFdBQVcsRUFFbkIsUUFBQSxFQUFBLEtBQUssSUFORCxFQUFFLENBT0osRUFDTDtBQUNKOzs7OyJ9
