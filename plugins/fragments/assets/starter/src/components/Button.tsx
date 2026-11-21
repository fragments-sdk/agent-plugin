import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', type = 'button', className, ...rest }: ButtonProps) {
  return <button type={type} className={['st-button', className].filter(Boolean).join(' ')} data-variant={variant} data-size={size} {...rest} />;
}
