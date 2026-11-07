import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import { CURRENT_ROLES, PROFILE, SKILLS_AND_TOOLS } from '@/lib/data/profile'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

const STACK_PILLS = SKILLS_AND_TOOLS.slice(4, 12)

const BLOBS = [
  { v: 'var(--cover-1)', top: '-45%', left: '-12%', dur: '24s', delay: '0s', width: '70%' },
  { v: 'var(--cover-2)', top: '15%', left: '8%', dur: '27s', delay: '-4s', width: '70%' },
  { v: 'var(--cover-3)', top: '-35%', left: '32%', dur: '29s', delay: '-8s', width: '70%' },
  { v: 'var(--cover-4)', top: '5%', left: '55%', dur: '23s', delay: '-12s', width: '70%' },
  { v: 'var(--cover-5)', top: '-30%', left: '76%', dur: '31s', delay: '-6s', width: '70%' },
  { v: 'var(--cover-6)', top: '45%', left: '38%', dur: '33s', delay: '-16s', width: '45%' },
] as const

export const HeroSection = () => {
  return (
    <div className={cn('border-line overflow-hidden rounded-none border-b')}>
      <div className="border-line bg-surface/80 sticky top-0 z-20 border-b backdrop-blur-md">
        <div className="flex h-17.5 items-center gap-3 px-6 max-md:hidden lg:px-8">
          <Avatar name={PROFILE.name} imageUrl={PROFILE.avatarUrl} size="sm" className="size-9" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-ink flex items-center gap-1 truncate text-base font-semibold">
              {PROFILE.name} <span className="text-brand-500">✓</span>
            </p>
            <p className="text-meta text-ink-3">484 followers on GitHub</p>
          </div>
          <button
            type="button"
            aria-label="Share profile"
            className="border-line grid size-10 place-items-center rounded-xl border bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-2)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-ink">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4M8.7 13.3l6.6 3.4"
              />
            </svg>
          </button>
          <Button href={PROFILE.contactUrl} size="md" className="text-body h-10 px-4.5">
            Get in touch
          </Button>
          <Button
            href="https://x.com/alnahian2003"
            variant="secondary"
            size="md"
            className="text-body h-10 px-4.5"
          >
            𝕏 Follow
          </Button>
        </div>
      </div>

      <div className="cover relative h-36 sm:h-52" aria-hidden="true">
        {BLOBS.map((blob, index) => (
          <span
            key={blob.v}
            className="cover-blob"
            style={
              {
                ['--blob' as string]: blob.v,
                top: blob.top,
                left: blob.left,
                ['--dur' as string]: blob.dur,
                ['--delay' as string]: blob.delay,
                width: blob.width,
              } as React.CSSProperties
            }
            data-index={index}
          />
        ))}
      </div>

      <div className="flex flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <Avatar
          name={PROFILE.name}
          imageUrl={PROFILE.avatarUrl}
          size="lg"
          className="ring-surface relative -mt-13 size-26 ring-4"
        />
        <h1 className="text-ink text-title mt-3 flex items-center gap-1.5 font-bold tracking-tight">
          {PROFILE.name} <span className="text-brand-500">✓</span>
        </h1>
        <p className="text-ink text-lead mt-1">{PROFILE.tagline}</p>
        <a
          href={PROFILE.contactUrl}
          className="text-meta bg-brand-500/10 text-brand-700 ring-brand-500/25 hover:bg-brand-500/15 dark:text-brand-300 mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold ring-1 transition-colors"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="bg-brand-400 absolute size-full animate-ping rounded-full opacity-75" />
            <span className="bg-brand-500 relative size-2 rounded-full" />
          </span>
          {PROFILE.openTo}
        </a>

        <ul className="text-body text-ink-2 mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              {CURRENT_ROLES[0]?.label}{' '}
              <a
                href={CURRENT_ROLES[0]?.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink decoration-line-strong hover:decoration-ink inline-flex items-center gap-1.5 font-medium underline underline-offset-2"
              >
                {CURRENT_ROLES[0]?.company}
              </a>
            </span>{' '}
            <span className="text-ink-3" aria-hidden="true">
              ·
            </span>{' '}
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              {CURRENT_ROLES[1]?.label}{' '}
              <a
                href={CURRENT_ROLES[1]?.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink decoration-line-strong hover:decoration-ink inline-flex items-center gap-1.5 font-medium underline underline-offset-2"
              >
                {CURRENT_ROLES[1]?.company}
              </a>
            </span>
          </li>
          <li className="inline-flex items-center gap-1.5">⌖ {PROFILE.location} · 8:03 AM</li>
        </ul>

        <div className="mt-6 max-w-2xl space-y-2">
          <ul className="flex flex-wrap justify-center gap-1.5" aria-label="AI tools">
            {SKILLS_AND_TOOLS.slice(0, 4).map((tool) => (
              <li key={tool}>
                <span className="text-meta text-ink inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface)] px-2.5 py-0.5 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <span className="size-3.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
                  {tool}
                </span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-1.5" aria-label="Tech stack">
            {STACK_PILLS.map((tool) => (
              <li key={tool}>
                <span className="text-meta text-ink inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface)] px-2.5 py-0.5 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <span className="size-3.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
                  {tool}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Profile" className="border-line mt-10 border-b px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center gap-8">
            <li>
              <Link
                href="/"
                aria-current="page"
                className="text-meta text-brand-400 relative block py-3 font-semibold tracking-wide uppercase"
              >
                Resume
                <span className="bg-link absolute inset-x-0 -bottom-px h-0.5 rounded-full" />
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-meta text-ink hover:text-ink-2 relative block py-3 font-semibold tracking-wide uppercase"
              >
                Work
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
