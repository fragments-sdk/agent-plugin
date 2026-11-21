import type { HTMLAttributes } from 'react';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
}

export function Text({ size = 'md', muted = false, className, ...rest }: TextProps) {
  return <p className={['st-text', className].filter(Boolean).join(' ')} data-size={size} data-muted={muted ? '' : undefined} {...rest} />;
}
