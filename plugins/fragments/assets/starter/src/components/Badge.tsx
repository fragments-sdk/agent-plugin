import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'danger';
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={['st-badge', className].filter(Boolean).join(' ')} data-tone={tone} {...rest} />;
}
