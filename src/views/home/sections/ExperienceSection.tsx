import Image from 'next/image'

import { cn } from '@/lib/utils/cn'
import { EXPERIENCE } from '@/lib/data/profile'

import { Badge } from '@/components/ui/Badge'

export const ExperienceSection = () => {
  const renderItem = (item: (typeof EXPERIENCE)[number], isLast: boolean) => (
    <li key={item.id} className={cn('relative flex gap-4 pb-6', isLast && 'pb-0')}>
      {!isLast ? (
        <span
          aria-hidden="true"
          className="bg-line absolute top-12 bottom-0 left-6 w-px -translate-x-1/2"
        />
      ) : null}
      <span className="relative size-12 shrink-0">
        {item.logoUrl ? (
          <Image
            src={item.logoUrl}
            alt={`${item.company} logo`}
            width={96}
            height={96}
            className="ring-line size-12 rounded-xl object-cover ring-1"
          />
        ) : (
          <span className="border-line bg-surface-2 text-body text-ink ring-line grid size-12 place-items-center rounded-xl font-bold ring-1">
            {item.company.slice(0, 1)}
          </span>
        )}
        {item.period.includes('Present') ? (
          <span className="bg-brand-500 ring-surface absolute -right-1 -bottom-1 size-3.5 rounded-full ring-2" />
        ) : null}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="text-ink text-base font-semibold">{item.role}</h3>
          <p className="text-meta text-ink-3 tabular-nums">{item.period}</p>
        </div>
        <p className="text-body text-ink-2">
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink font-medium hover:underline hover:underline-offset-2"
            >
              {item.company}
            </a>
          ) : (
            <span className="text-ink font-medium">{item.company}</span>
          )}
          <span className="text-ink-3"> · {item.type}</span>
        </p>
        <p className="text-body text-ink mt-2.5 leading-relaxed">{item.description}</p>
        {item.highlights ? (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {item.highlights.map((highlight) => (
              <Badge key={highlight}>{highlight}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  )

  return (
    <section aria-labelledby="experience-heading">
      <div className="mb-5 flex items-center gap-2.5">
        <h2
          id="experience-heading"
          className="text-ink flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-6 shrink-0"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13a20 20 0 0 0 18 0" />
            </g>
          </svg>
          Experience
        </h2>
      </div>
      <ol className="relative space-y-1">
        {EXPERIENCE.map((item, index) => renderItem(item, index === EXPERIENCE.length - 1))}
      </ol>
    </section>
  )
}
