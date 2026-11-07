import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

const NAV = [
  { href: '/', label: 'Profile' },
  { href: '/projects', label: 'Projects' },
  { href: '/people', label: 'People' },
  { href: '/contact', label: 'Contact' },
] as const

export const MobileBottomNav = () => {
  return (
    <nav
      aria-label="Mobile"
      className="border-line bg-surface/90 fixed inset-x-0 bottom-0 z-40 flex border-t backdrop-blur-md md:hidden"
    >
      {NAV.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-micro flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors active:scale-95',
            i === 0 ? 'text-ink font-semibold' : 'text-ink-3',
          )}
        >
          <span aria-hidden="true" className="text-base leading-none">
            ●
          </span>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
