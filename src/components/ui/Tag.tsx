import { cn } from '@/lib/utils/cn'

interface TagProps {
  label: string
  className?: string
}

export const Tag = ({ label, className }: TagProps) => {
  return (
    <span
      className={cn(
        'border-line bg-surface-3 text-ink-2 text-meta inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 font-medium',
        className,
      )}
    >
      {label}
    </span>
  )
}
