import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

interface AvatarProps {
  name: string
  imageUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: 'size-9 text-meta',
  md: 'size-12 text-body',
  lg: 'size-26 text-2xl',
} as const

const PIXELS = {
  sm: 72,
  md: 96,
  lg: 240,
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
        className="h-full w-full object-cover"
        sizes={size === 'lg' ? '117px' : '48px'}
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
