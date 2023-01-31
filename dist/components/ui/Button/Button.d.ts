import { ReactElement } from 'react';
import { IDetailedButtonProps } from '../../../types/box';
export declare enum ButtonViewType {
    Danger = "danger",
    Primary = "primary",
    Secondary = "secondary",
    Success = "success",
    Text = "text",
    Warning = "warning"
}
export interface IButtonProps extends IDetailedButtonProps {
    gradient?: boolean;
    loading?: boolean;
    shadow?: boolean;
    view?: ButtonViewType;
}
declare const Button: ({ children, className, gradient, shadow, view, ...props }: IButtonProps) => ReactElement<IButtonProps>;
export default Button;
