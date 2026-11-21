import type { HTMLAttributes } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row';
  /** A step of the space scale; 4 (16px) when not said. */
  gap?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  align?: 'stretch' | 'start' | 'center' | 'end';
}

export function Stack({ direction = 'column', gap = 4, align = 'stretch', className, ...rest }: StackProps) {
  return <div className={['st-stack', className].filter(Boolean).join(' ')} data-direction={direction} data-gap={gap} data-align={align} {...rest} />;
}
