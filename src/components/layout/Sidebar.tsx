'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils/cn'

const NAV = [
  {
    href: '/',
    label: 'Profile',
    d: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0M6.168 14.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855',
  },
  {
    href: '/projects',
    label: 'Projects',
    d: 'm12 3 8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  },
  {
    href: '/people',
    label: 'People',
    d: 'M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85',
  },
  {
    href: '/contact',
    label: 'Contact',
    d: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6',
  },
] as const

export const Sidebar = () => {
  const pathname = usePathname()

  const renderLogo = () => (
    <div className="flex h-17.5 shrink-0 items-center xl:px-2">
      <Link href="/" aria-label="Al Nahian, home" className="group flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-[11px] bg-gradient-to-b from-[#22a86a] to-[#0f9459] text-white transition-transform group-hover:-rotate-4 group-active:scale-95">
          <span className="text-lg leading-none font-black tracking-tighter">N</span>
        </span>
        <span className="text-title text-ink sr-only font-bold tracking-tight xl:not-sr-only xl:data-[sidebar=collapsed]:sr-only">
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
                'group text-lead hover:bg-surface-2 flex items-center gap-3.5 rounded-xl p-3 transition-colors xl:px-3 xl:py-2.5 xl:data-[sidebar=collapsed]:p-3',
                isActive && 'bg-surface-2/70 text-ink font-semibold',
                !isActive && 'text-ink',
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
                  d={item.d}
                />
              </svg>
              <span className="text-lead sr-only xl:not-sr-only xl:data-[sidebar=collapsed]:sr-only">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )

  const renderToggles = () => (
    <div className="mt-4 flex shrink-0 flex-col items-center gap-3 xl:items-start xl:px-2 xl:data-[sidebar=collapsed]:items-center xl:data-[sidebar=collapsed]:px-0">
      <div className="flex flex-col gap-2 xl:flex-row xl:data-[sidebar=collapsed]:flex-col">
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={() => {
            document.documentElement.classList.toggle('dark')
          }}
          className="border-line grid size-9 place-items-center rounded-full border bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-2)] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Toggle sounds"
          className="border-line grid size-9 place-items-center rounded-full border bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-2)] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 8a5 5 0 0 1 0 8m2.7-11a9 9 0 0 1 0 14M6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l3.5-4.5A.8.8 0 0 1 11 5v14a.8.8 0 0 1-1.5.5z"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={() => {
            const root = document.documentElement
            if (root.dataset.sidebar === 'collapsed') {
              delete root.dataset.sidebar
              try {
                localStorage.setItem('sidebar', 'expanded')
              } catch {}
            } else {
              root.dataset.sidebar = 'collapsed'
              try {
                localStorage.setItem('sidebar', 'collapsed')
              } catch {}
            }
          }}
          className="border-line grid size-9 place-items-center rounded-full border bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-2)] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="xl:hidden">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
              <path d="M9 4v16M14 10l2 2-2 2" />
            </g>
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="hidden xl:block"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
              <path d="M9 4v16M15 10l-2 2 2 2" />
            </g>
          </svg>
        </button>
      </div>
      <p className="text-meta text-ink-3 sr-only xl:not-sr-only xl:data-[sidebar=collapsed]:sr-only">
        © 2026 Al Nahian
      </p>
    </div>
  )

  return (
    <aside className="border-line sticky top-0 hidden h-dvh w-19 shrink-0 flex-col items-center px-3 pb-5 transition-[width] duration-200 md:flex xl:w-65 xl:items-stretch xl:px-4 xl:data-[sidebar=collapsed]:w-19 xl:data-[sidebar=collapsed]:items-center xl:data-[sidebar=collapsed]:px-3">
      {renderLogo()}
      {renderNav()}
      {renderToggles()}
    </aside>
  )
}
