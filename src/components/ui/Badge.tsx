import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
