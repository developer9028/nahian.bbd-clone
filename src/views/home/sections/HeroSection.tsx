import { cn } from '@/lib/utils/cn'
import { CURRENT_ROLES, PROFILE } from '@/lib/data/profile'

import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const HeroSection = () => {
  const renderCurrentRoles = () =>
    CURRENT_ROLES.map((role) => (
      <a
        key={role.company}
        href={role.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-stone-900"
      >
        {role.label} <span className="font-semibold text-stone-900">{role.company}</span> ↗
      </a>
    ))

  return (
    <Card className={cn('overflow-hidden')}>
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="flex shrink-0 flex-col items-start gap-4">
          <Avatar name={PROFILE.name} imageUrl={PROFILE.avatarUrl} size="lg" />
          <Badge>{PROFILE.openTo}</Badge>
        </div>
        <div className="flex flex-1 flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              {PROFILE.name}
            </h1>
            <p className="text-lg font-medium text-stone-700">{PROFILE.tagline}</p>
            <p className="max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
              {PROFILE.role}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">{renderCurrentRoles()}</div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={PROFILE.contactUrl} size="lg">
              Get in touch
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              View projects
            </Button>
          </div>
          <p className="text-xs text-stone-500">
            {PROFILE.location} · {PROFILE.timezone} · Remote-first
          </p>
        </div>
      </div>
    </Card>
  )
}
