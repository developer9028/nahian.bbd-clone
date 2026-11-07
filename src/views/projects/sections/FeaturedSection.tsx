import { FEATURED_PROJECT } from '@/lib/data/projects'
import { cn } from '@/lib/utils/cn'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const FeaturedSection = () => {
  return (
    <Card
      className={cn(
        'via-surface-2 to-surface-2 border-emerald-500/20 bg-gradient-to-br from-emerald-950/60',
      )}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <Badge className="w-fit">$120K+ raised</Badge>
          <div className="flex flex-col gap-2">
            <a
              href={FEATURED_PROJECT.url}
              target="_blank"
              rel="noreferrer"
              className="text-ink w-fit text-2xl font-bold tracking-tight hover:underline hover:underline-offset-4"
            >
              {FEATURED_PROJECT.title} ↗
            </a>
            <p className="text-ink-2 max-w-xl text-sm leading-relaxed">
              {FEATURED_PROJECT.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FEATURED_PROJECT.tags.map((tag) => (
              <span
                key={tag}
                className="border-line bg-surface-3 text-ink-2 inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button href={FEATURED_PROJECT.url}>Visit Bidvers</Button>
        </div>
      </div>
    </Card>
  )
}
