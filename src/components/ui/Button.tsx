import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2'

const VARIANTS = {
  primary: 'bg-stone-900 text-white hover:bg-stone-700',
  secondary: 'border border-stone-200 bg-white text-stone-900 hover:bg-stone-50',
  ghost: 'text-stone-700 hover:bg-stone-100',
} as const

const SIZES = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
} as const

export const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
}: ButtonProps) => {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  const renderLabel = () => children

  if (href) {
    return (
      <a href={href} className={classes}>
        {renderLabel()}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      {renderLabel()}
    </button>
  )
}
