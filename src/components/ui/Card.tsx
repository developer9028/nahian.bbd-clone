import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  const renderContent = () => children

  return (
    <div className={cn('rounded-2xl border border-stone-200 bg-white p-5 sm:p-6', className)}>
      {renderContent()}
    </div>
  )
}
