import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

interface AvatarProps {
  name: string
  imageUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: 'h-10 w-10 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-24 w-24 text-2xl',
} as const

const PIXELS = {
  sm: 40,
  md: 48,
  lg: 96,
} as const

export const Avatar = ({ name, imageUrl, size = 'md', className }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const renderImage = () => {
    if (!imageUrl) return null

    return (
      <Image
        src={imageUrl}
        alt={name}
        width={PIXELS[size]}
        height={PIXELS[size]}
        className={cn('h-full w-full object-cover', className)}
        sizes="96px"
      />
    )
  }

  const renderFallback = () => (
    <span className="text-ink-2 flex h-full w-full items-center justify-center font-semibold">
      {initials}
    </span>
  )

  return (
    <div
      className={cn(
        'border-surface bg-surface-3 shrink-0 overflow-hidden rounded-full border-2',
        SIZES[size],
        className,
      )}
    >
      {imageUrl ? renderImage() : renderFallback()}
    </div>
  )
}
