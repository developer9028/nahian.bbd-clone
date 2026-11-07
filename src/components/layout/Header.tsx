'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { APP_NAME, NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'

import { Button } from '@/components/ui/Button'

export const Header = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const renderLogo = () => (
    <Link
      href="/"
      className="flex items-center gap-2 text-sm font-bold tracking-tight text-stone-900"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
        N
      </span>
      <span>
        {APP_NAME}
        <span className="text-stone-400">.bd</span>
      </span>
    </Link>
  )

  const renderDesktopNav = () => (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'rounded-full px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )

  const renderMobileMenu = () => {
    if (!isOpen) return null

    return (
      <div className="border-t border-stone-200 bg-white px-4 pt-2 pb-4 md:hidden">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block rounded-xl px-3 py-2.5 text-sm font-medium',
                isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100',
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {renderLogo()}
        {renderDesktopNav()}
        <div className="flex items-center gap-2">
          <Button href="/contact" size="sm" className="hidden md:inline-flex" variant="primary">
            Get in touch
          </Button>
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 md:hidden"
          >
            <span aria-hidden="true" className="text-lg">
              ☰
            </span>
          </button>
        </div>
      </div>
      {renderMobileMenu()}
    </header>
  )
}
