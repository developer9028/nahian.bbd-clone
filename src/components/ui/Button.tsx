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
  'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl font-semibold tracking-[-0.01em] whitespace-nowrap select-none transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]'

const VARIANTS = {
  primary:
    'bg-gradient-to-b from-[#22a86a] to-[#0f9459] text-white shadow-[0_0_0_1px_rgba(15,148,89,0.6),0_8px_22px_-6px_rgba(10,127,79,0.55)]',
  secondary:
    'bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-2)] border border-line shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]',
  ghost: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
} as const

const SIZES = {
  sm: 'h-8 px-3.5 text-meta',
  md: 'h-9 px-4 text-body',
  lg: 'h-10 px-5 text-body',
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
