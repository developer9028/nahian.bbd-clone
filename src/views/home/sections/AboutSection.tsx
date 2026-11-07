import { cn } from '@/lib/utils/cn'
import { ABOUT_PARAGRAPHS, LANGUAGES, PROFILE, WORK_OPTIONS } from '@/lib/data/profile'

import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

export const AboutSection = () => {
  return (
    <section aria-labelledby="about-heading" className="flex flex-col gap-4">
      <Card>
        <h2 id="about-heading" className="text-ink text-2xl font-bold tracking-tight">
          About
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph}
              className="text-ink-2 max-w-3xl text-sm leading-relaxed sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className={cn('flex flex-col gap-2')}>
          <p className="text-ink-3 text-xs font-semibold tracking-widest uppercase">Based in</p>
          <p className="text-ink text-base font-semibold">{PROFILE.location}</p>
          <p className="text-ink-3 text-sm">{PROFILE.timezone} · Local time in Dhaka</p>
        </Card>
        <Card className={cn('flex flex-col gap-2')}>
          <p className="text-ink-3 text-xs font-semibold tracking-widest uppercase">Works</p>
          <p className="text-ink text-base font-semibold">Remote-first</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {WORK_OPTIONS.map((option) => (
              <Tag key={option} label={option} />
            ))}
          </div>
        </Card>
        <Card className={cn('flex flex-col gap-2')}>
          <p className="text-ink-3 text-xs font-semibold tracking-widest uppercase">Languages</p>
          <ul className="flex flex-col gap-1.5">
            {LANGUAGES.map((language) => (
              <li key={language.name} className="flex items-center justify-between text-sm">
                <span className="text-ink font-medium">{language.name}</span>
                <span className="text-ink-3 text-xs">{language.level}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
