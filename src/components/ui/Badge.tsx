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
        'inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      {children}
    </span>
  )
}
