import { cn } from '@/lib/utils/cn'
import { EXPERIENCE } from '@/lib/data/profile'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export const ExperienceSection = () => {
  const renderItem = (item: (typeof EXPERIENCE)[number]) => (
    <Card key={item.id} className={cn('flex flex-col gap-3')}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-stone-900">{item.role}</h3>
          <p className="text-sm text-stone-600">
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                {item.company}
              </a>
            ) : (
              <span className="font-medium">{item.company}</span>
            )}
            <span className="text-stone-400"> · {item.type}</span>
          </p>
        </div>
        <Badge className="border-stone-200 bg-stone-50 text-stone-600">{item.period}</Badge>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-stone-600">{item.description}</p>
      {item.highlights ? (
        <div className="flex flex-wrap gap-1.5">
          {item.highlights.map((highlight) => (
            <Badge key={highlight}>{highlight}</Badge>
          ))}
        </div>
      ) : null}
    </Card>
  )

  return (
    <section aria-labelledby="experience-heading" className="flex flex-col gap-4">
      <h2 id="experience-heading" className="text-2xl font-bold tracking-tight text-stone-900">
        Experience
      </h2>
      <div className="flex flex-col gap-4">{EXPERIENCE.map((item) => renderItem(item))}</div>
    </section>
  )
}
