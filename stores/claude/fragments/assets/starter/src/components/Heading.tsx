import type { HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
}

export function Heading({ level = 2, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={['st-heading', className].filter(Boolean).join(' ')} data-level={level} {...rest} />;
}
