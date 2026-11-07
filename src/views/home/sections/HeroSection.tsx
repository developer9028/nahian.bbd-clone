import { cn } from '@/lib/utils/cn'
import { CURRENT_ROLES, PROFILE, SKILLS_AND_TOOLS } from '@/lib/data/profile'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

const STACK_PILLS = SKILLS_AND_TOOLS.slice(4, 12)

export const HeroSection = () => {
  return (
    <div className={cn('border-line overflow-hidden rounded-none border-b')}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={PROFILE.name} imageUrl={PROFILE.avatarUrl} size="sm" />
          <div className="flex min-w-0 flex-col">
            <span className="text-ink text-body truncate font-semibold">
              {PROFILE.name} <span className="text-brand-400">✓</span>
            </span>
            <span className="text-ink-3 text-meta truncate">484 followers on GitHub</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Share profile"
            className="btn-secondary grid size-9 place-items-center rounded-full"
          >
            <span aria-hidden="true" className="text-sm">
              ↗
            </span>
          </button>
          <Button href={PROFILE.contactUrl} size="sm">
            Get in touch
          </Button>
          <Button
            href="https://x.com/alnahian2003"
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            𝕏 Follow
          </Button>
        </div>
      </div>

      <div className="relative h-36 bg-gradient-to-r from-[#03140d] via-[#047857] to-[#0d9488] sm:h-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
      </div>

      <div className="flex flex-col items-center gap-4 px-4 pt-0 pb-8 text-center sm:px-6">
        <div className="relative -mt-12">
          <Avatar
            name={PROFILE.name}
            imageUrl={PROFILE.avatarUrl}
            size="lg"
            className="ring-surface ring-4"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-ink text-title font-bold tracking-tight">
            {PROFILE.name} <span className="text-brand-400">✓</span>
          </h1>
          <p className="text-ink-2 text-lead font-medium">{PROFILE.tagline}</p>
          <span className="text-meta inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {PROFILE.openTo}
          </span>
        </div>

        <div className="text-ink-3 text-meta flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {CURRENT_ROLES.map((role) => (
            <a
              key={role.company}
              href={role.url}
              target="_blank"
              rel="noreferrer"
              className="text-ink-2 hover:text-ink inline-flex items-center gap-1.5 font-medium"
            >
              {role.label} <span className="text-ink font-semibold">{role.company}</span> ·
            </a>
          ))}
          <span className="inline-flex items-center gap-1">⌖ {PROFILE.location} · 8:03 AM</span>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {SKILLS_AND_TOOLS.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="border-line bg-surface-3 text-ink-2 text-meta inline-flex h-7 items-center rounded-full border px-2.5 font-medium"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {STACK_PILLS.map((tool) => (
            <span
              key={tool}
              className="border-line bg-surface-3 text-ink-2 text-meta inline-flex h-7 items-center rounded-full border px-2.5 font-medium"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="border-line mt-2 flex w-full flex-col border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Button href={PROFILE.contactUrl} size="sm" className="w-full sm:w-auto">
            Get in touch
          </Button>
          <nav aria-label="Profile" className="mt-3 flex items-center justify-center gap-6 sm:mt-0">
            <span className="border-brand-500 text-brand-400 text-meta border-b-2 pb-2 font-bold tracking-widest">
              RESUME
            </span>
            <span className="text-ink-3 text-meta pb-2 font-bold tracking-widest">WORK</span>
          </nav>
        </div>
      </div>
    </div>
  )
}
