import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  const renderContent = () => children

  return (
    <div className={cn('glass border-line bg-surface-2 rounded-2xl border p-5 sm:p-6', className)}>
      {renderContent()}
    </div>
  )
}
