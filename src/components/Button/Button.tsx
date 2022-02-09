import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';

import './style.css';

export enum ButtonViewType {
  Danger = 'danger',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Text = 'text',
  Warning = 'warning',
}

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  gradient?: boolean;
  loading?: boolean; // TODO:
  shadow?: boolean;
  view?: ButtonViewType;
}

const Button = ({
  children,
  className,
  gradient,
  shadow,
  view = ButtonViewType.Secondary,
  ...props
}: IButtonProps): ReactElement => (
  <button
    {...props}
    className={clsx(
      'btn',
      {
        [ButtonViewType.Danger]: 'btn_danger',
        [ButtonViewType.Primary]: 'btn_primary',
        [ButtonViewType.Secondary]: 'btn_secondary',
        [ButtonViewType.Success]: 'btn_success',
        [ButtonViewType.Text]: 'btn_text',
        [ButtonViewType.Warning]: 'btn_warning',
      }[view],
      gradient && 'btn_gradient',
      shadow && 'btn_shadow',
      className
    )}
  >
    <span className="text-inherit">{children}</span>
  </button>
);

export default Button;
