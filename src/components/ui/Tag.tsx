import { cn } from '@/lib/utils/cn'

interface TagProps {
  label: string
  className?: string
}

export const Tag = ({ label, className }: TagProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-full border border-stone-200 bg-stone-50 px-2.5 text-xs font-medium text-stone-600',
        className,
      )}
    >
      {label}
    </span>
  )
}
