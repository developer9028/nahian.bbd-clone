import Link from 'next/link'

import { APP_NAME, NAV_LINKS } from '@/lib/constants'
import { SOCIAL_LINKS } from '@/lib/data/profile'
import { cn } from '@/lib/utils/cn'

export const Footer = () => {
  const renderBrand = () => (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-sm font-bold text-stone-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white">
          N
        </span>
        <span>
          {APP_NAME}
          <span className="text-stone-400">.bd</span>
        </span>
      </span>
      <p className="max-w-xs text-sm text-stone-500">
        Software engineer and agentic builder shipping global SaaS.
      </p>
    </div>
  )

  const renderNav = () => (
    <nav aria-label="Footer" className="flex flex-col gap-1">
      <p className="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">Explore</p>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="w-fit rounded-md px-2 py-1 text-sm text-stone-600 transition-colors hover:text-stone-900"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )

  const renderSocials = () => (
    <div className="flex flex-col gap-1">
      <p className="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
        Find me on
      </p>
      <div className="flex flex-wrap gap-1.5">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
          >
            {social.platform}
          </a>
        ))}
      </div>
    </div>
  )

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        {renderBrand()}
        {renderNav()}
        {renderSocials()}
      </div>
      <div className="border-t border-stone-200">
        <div
          className={cn(
            'mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6',
          )}
        >
          <p>© 2026 {APP_NAME} — nahian.bd. All rights reserved.</p>
          <a
            href="https://www.dmca.com/Protection/Status.aspx?ID=48e2fe6b-11f4-406a-91b2-c9b9c1897281&refurl=https%3A%2F%2Fnahian.bd%2F"
            target="_blank"
            rel="noreferrer"
            className="w-fit underline underline-offset-2 hover:text-stone-700"
          >
            DMCA Protected
          </a>
        </div>
      </div>
    </footer>
  )
}
