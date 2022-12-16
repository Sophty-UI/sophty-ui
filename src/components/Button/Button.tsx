import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';

import styles from './style.module.scss';

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
      styles.btn,
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

/*
:root {
  --btn-background-color-active: theme('colors.neutral.dark');
  --btn-background-color-disabled: theme('colors.neutral.DEFAULT');
  --btn-background-color-gradient: theme('colors.secondary.DEFAULT');
  --btn-background-color-hover: theme('colors.neutral.dark');
  --btn-background-color: theme('colors.secondary.DEFAULT');
  --btn-border-color-disabled: theme('colors.neutral.light');
  --btn-border-color: theme('colors.transparent');
  --btn-color-disabled: theme('colors.neutral.dark');
  --btn-color: theme('colors.on.secondary.DEFAULT');
}

.btn {
  @apply rounded-normal mr-2 mb-2 whitespace-nowrap py-2 px-5 outline-none;
  @apply border border-[color:var(--btn-border-color)];
  @apply bg-[color:var(--btn-background-color)] text-[color:var(--btn-color)];
  @apply disabled:bg-[color:var(--btn-background-color-disabled)];
  @apply disabled:border-[color:var(--btn-border-color-disabled)];
  @apply disabled:cursor-not-allowed;
  @apply disabled:hover:border-[color:var(--btn-border-color-disabled)];
  @apply disabled:hover:text-[color:var(--btn-color-disabled)];
  @apply disabled:text-[color:var(--btn-color-disabled)];
  @apply hover:bg-[color:var(--btn-background-color-hover)] active:bg-[color:var(--btn-background-color-active)];

  &_primary {
    --btn-background-color-active: theme('colors.primary.dark');
    --btn-background-color-gradient: theme('colors.primary.gradient');
    --btn-background-color-hover: theme('colors.primary.light');
    --btn-background-color: theme('colors.primary.DEFAULT');
    --btn-color: theme('colors.on.primary.DEFAULT');
  }

  &_danger {
    --btn-background-color-active: theme('colors.status.error.dark');
    --btn-background-color-gradient: theme('colors.status.error.gradient');
    --btn-background-color-hover: theme('colors.status.error.light');
    --btn-background-color: theme('colors.status.error.DEFAULT');
    --btn-color: theme('colors.on.status.error');
  }

  &_success {
    --btn-background-color-active: theme('colors.status.success.dark');
    --btn-background-color-gradient: theme('colors.status.success.gradient');
    --btn-background-color-hover: theme('colors.status.success.light');
    --btn-background-color: theme('colors.status.success.DEFAULT');
    --btn-color: theme('colors.on.status.success');
  }

  &_warning {
    --btn-background-color-active: theme('colors.status.warning.dark');
    --btn-background-color-gradient: theme('colors.status.warning.gradient');
    --btn-background-color-hover: theme('colors.status.warning.light');
    --btn-background-color: theme('colors.status.warning.DEFAULT');
    --btn-color: theme('colors.on.status.warning');
  }

  &_secondary {
    --btn-background-color-active: var(--btn-background-color);
    --btn-background-color-hover: var(--btn-background-color);
    --btn-border-color: theme('colors.secondary.dark');

    @apply hover:border-primary active:border-primary-dark hover:text-primary active:text-primary-dark;
  }

  &_text {
    --btn-background-color-active: theme('colors.neutral.light');
    --btn-background-color-hover: theme('colors.neutral.light');

    @apply hover:bg-none active:bg-none;
  }

  &_gradient {
    @apply bg-gradient-to-tr from-[var(--btn-background-color)] to-[var(--btn-background-color-gradient)];
    @apply hover:from-[var(--btn-background-color-hover)];
    @apply active:from-[var(--btn-background-color-active)];
    @apply disabled:bg-none;
  }

  &_shadow {
    @apply drop-shadow-lg active:drop-shadow-md disabled:drop-shadow-none;
  }
}
*/
