'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { APP_NAME } from '@/lib/constants'
import { SOCIAL_LINKS } from '@/lib/data/profile'
import { cn } from '@/lib/utils/cn'

import { Button } from '@/components/ui/Button'

const NAV = [
  { href: '/', label: 'Profile', icon: '◯' },
  { href: '/projects', label: 'Projects', icon: '▣' },
  { href: '/people', label: 'People', icon: '◉' },
  { href: '/contact', label: 'Contact', icon: '✉' },
] as const

export const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const renderLogo = () => (
    <div className="flex h-16 shrink-0 items-center gap-2.5 px-2">
      <Link href="/" aria-label={`${APP_NAME}, home`} className="group flex items-center gap-2.5">
        <span className="btn-primary grid size-9 place-items-center rounded-[11px] transition-transform group-hover:-rotate-4">
          <span className="text-lg leading-none font-black tracking-tighter">N</span>
        </span>
        <span className={cn('text-title text-ink font-bold tracking-tight', collapsed && 'hidden')}>
          nahian<span className="text-ink-3 group-hover:text-link transition-colors">.bd</span>
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
                'group text-ink hover:bg-surface-2 flex items-center gap-3.5 rounded-xl p-3 transition-colors',
                isActive && 'bg-surface-2/70 font-semibold',
              )}
            >
              <span aria-hidden="true" className="size-6 shrink-0 text-center text-lg leading-none">
                {item.icon}
              </span>
              <span className={cn('text-sm', collapsed && 'hidden')}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )

  const renderToggles = () => (
    <div className="mt-4 flex shrink-0 flex-col items-center gap-3 px-2">
      <div className="flex flex-col gap-2">
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={() => {
            setIsDark((dark) => !dark)
            document.documentElement.classList.toggle('dark')
          }}
          className="btn-secondary grid size-9 place-items-center rounded-full"
        >
          <span className="text-sm">{isDark ? '☾' : '☀'}</span>
        </button>
        <button
          type="button"
          aria-label="Toggle sounds"
          className="btn-secondary grid size-9 place-items-center rounded-full"
        >
          <span className="text-sm">♪</span>
        </button>
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((value) => !value)}
          className="btn-secondary grid size-9 place-items-center rounded-full"
        >
          <span className="text-sm">⟨⟩</span>
        </button>
      </div>
      <p className={cn('text-ink-3 text-xs', collapsed && 'hidden')}>© 2026 {APP_NAME}</p>
    </div>
  )

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 flex-col items-center px-3 pb-5 transition-[width] duration-200 md:flex',
        collapsed ? 'w-19' : 'w-19 xl:w-65 xl:items-stretch xl:px-4',
        'border-line border-r',
      )}
    >
      {renderLogo()}
      {renderNav()}
      <div className="border-line mt-4 hidden flex-col gap-3 border-t pt-4 xl:flex">
        <div className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.slice(0, 7).map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.platform}
              className="border-line bg-surface-2 text-ink-2 hover:text-ink grid size-8 place-items-center rounded-full border text-xs font-bold"
            >
              {social.platform.slice(0, 1)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-ink-3 text-xs">Sound and theme</span>
          <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 px-0">
            ●
          </Button>
        </div>
      </div>
      {renderToggles()}
    </aside>
  )
}
