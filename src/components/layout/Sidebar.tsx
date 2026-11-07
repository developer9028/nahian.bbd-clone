'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

const NAV = [
  {
    href: '/',
    label: 'Profile',
    iconPath:
      'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0M6.168 14.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855',
  },
  {
    href: '/projects',
    label: 'Projects',
    iconPath: 'm12 3 8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  },
  {
    href: '/people',
    label: 'People',
    iconPath:
      'M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85',
  },
  {
    href: '/contact',
    label: 'Contact',
    iconPath: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6',
  },
] as const

export const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const renderLogo = () => (
    <div className="flex h-16 shrink-0 items-center xl:px-2">
      <Link href="/" aria-label="Al Nahian, home" className="group flex items-center gap-2.5">
        <span className="btn-primary grid size-9 place-items-center rounded-[11px] transition-transform group-hover:-rotate-4">
          <span className="text-lg leading-none font-black tracking-tighter">N</span>
        </span>
        <span
          className={cn('text-ink text-base font-bold tracking-tight', collapsed && 'xl:hidden')}
        >
          nahian<span className="text-ink-3 group-hover:text-brand-500 transition-colors">.bd</span>
        </span>
      </Link>
    </div>
  )

  const renderNav = () => (
    <nav
      aria-label="Main"
      className="mt-3 flex min-h-0 flex-1 [scrollbar-width:none] flex-col gap-4 overflow-y-auto"
    >
      <div className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'group text-ink hover:bg-surface-2 flex items-center gap-3.5 rounded-xl p-3 transition-colors xl:px-3 xl:py-2.5',
                collapsed && 'xl:p-3',
                isActive && 'bg-surface-2/70 font-semibold',
              )}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={cn(
                  'size-6 shrink-0 transition-transform group-active:scale-90',
                  isActive && 'stroke-[2.4]',
                )}
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={item.iconPath}
                />
              </svg>
              <span className={cn('text-sm', collapsed && 'xl:hidden')}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )

  const renderToggles = () => (
    <div className="mt-4 flex shrink-0 flex-col items-center gap-3 xl:items-start xl:px-2">
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={() => {
            setIsDark((dark) => !dark)
            document.documentElement.classList.toggle('dark')
          }}
          className="btn-secondary grid size-9 place-items-center rounded-full"
        >
          <span className="text-base leading-none">{isDark ? '☾' : '☀'}</span>
        </button>
        <button
          type="button"
          aria-label="Toggle sounds"
          className="btn-secondary grid size-9 place-items-center rounded-full"
        >
          <span className="text-base leading-none">♪</span>
        </button>
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((value) => !value)}
          className="btn-secondary grid size-9 place-items-center rounded-full"
        >
          <span className="text-base leading-none">⟨⟩</span>
        </button>
      </div>
      <p className={cn('text-ink-3 text-xs', collapsed && 'xl:hidden')}>© 2026 Al Nahian</p>
    </div>
  )

  return (
    <aside
      className={cn(
        'border-line sticky top-0 hidden h-dvh shrink-0 flex-col items-center px-3 pb-5 transition-[width] duration-200 md:flex',
        collapsed ? 'w-19' : 'w-19 xl:w-65 xl:items-stretch xl:px-4',
      )}
    >
      {renderLogo()}
      {renderNav()}
      {renderToggles()}
    </aside>
  )
}
