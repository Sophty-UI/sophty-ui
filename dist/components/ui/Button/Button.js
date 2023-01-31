import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import styles from './style.module.scss.js';

var ButtonViewType;
(function (ButtonViewType) {
    ButtonViewType["Danger"] = "danger";
    ButtonViewType["Primary"] = "primary";
    ButtonViewType["Secondary"] = "secondary";
    ButtonViewType["Success"] = "success";
    ButtonViewType["Text"] = "text";
    ButtonViewType["Warning"] = "warning";
})(ButtonViewType || (ButtonViewType = {}));
const Button = ({ children, className, gradient, shadow, view = ButtonViewType.Secondary, ...props }) => (jsx("button", { ...props, className: clsx(styles.btn, {
        [ButtonViewType.Danger]: 'btn_danger',
        [ButtonViewType.Primary]: 'btn_primary',
        [ButtonViewType.Secondary]: 'btn_secondary',
        [ButtonViewType.Success]: 'btn_success',
        [ButtonViewType.Text]: 'btn_text',
        [ButtonViewType.Warning]: 'btn_warning',
    }[view], gradient && 'btn_gradient', shadow && 'btn_shadow', className), children: jsx("span", { className: "text-inherit", children: children }) }));

export { ButtonViewType, Button as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy91aS9CdXR0b24vQnV0dG9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6WyJfanN4Il0sIm1hcHBpbmdzIjoiOzs7O0lBTVksZUFPWDtBQVBELENBQUEsVUFBWSxjQUFjLEVBQUE7QUFDeEIsSUFBQSxjQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsUUFBaUIsQ0FBQTtBQUNqQixJQUFBLGNBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxTQUFtQixDQUFBO0FBQ25CLElBQUEsY0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLFdBQXVCLENBQUE7QUFDdkIsSUFBQSxjQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsU0FBbUIsQ0FBQTtBQUNuQixJQUFBLGNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxNQUFhLENBQUE7QUFDYixJQUFBLGNBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxTQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFQVyxjQUFjLEtBQWQsY0FBYyxHQU96QixFQUFBLENBQUEsQ0FBQSxDQUFBO0FBU0QsTUFBTSxNQUFNLEdBQUcsQ0FBQyxFQUNkLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsRUFDL0IsR0FBRyxLQUFLLEVBQ0ssTUFDYkEsR0FDTSxDQUFBLFFBQUEsRUFBQSxFQUFBLEdBQUEsS0FBSyxFQUNULFNBQVMsRUFBRSxJQUFJLENBQ2IsTUFBTSxDQUFDLEdBQUcsRUFDVjtBQUNFLFFBQUEsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLFlBQVk7QUFDckMsUUFBQSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsYUFBYTtBQUN2QyxRQUFBLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxlQUFlO0FBQzNDLFFBQUEsQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLGFBQWE7QUFDdkMsUUFBQSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsVUFBVTtBQUNqQyxRQUFBLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxhQUFhO0tBQ3hDLENBQUMsSUFBSSxDQUFDLEVBQ1AsUUFBUSxJQUFJLGNBQWMsRUFDMUIsTUFBTSxJQUFJLFlBQVksRUFDdEIsU0FBUyxDQUNWLEVBQUEsUUFBQSxFQUVEQSxHQUFNLENBQUEsTUFBQSxFQUFBLEVBQUEsU0FBUyxFQUFDLGNBQWMsWUFBRSxRQUFRLEVBQUEsQ0FBUSxFQUN6QyxDQUFBOzs7OyJ9
