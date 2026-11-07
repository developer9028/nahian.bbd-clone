import { cn } from '@/lib/utils/cn'
import { ABOUT_PARAGRAPHS, LANGUAGES, PROFILE, WORK_OPTIONS } from '@/lib/data/profile'

import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

export const AboutSection = () => {
  return (
    <section aria-labelledby="about-heading" className="flex flex-col gap-4">
      <Card>
        <h2 id="about-heading" className="text-2xl font-bold tracking-tight text-stone-900">
          About
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className={cn('flex flex-col gap-2')}>
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">Based in</p>
          <p className="text-base font-semibold text-stone-900">{PROFILE.location}</p>
          <p className="text-sm text-stone-500">{PROFILE.timezone} · Local time in Dhaka</p>
        </Card>
        <Card className={cn('flex flex-col gap-2')}>
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">Works</p>
          <p className="text-base font-semibold text-stone-900">Remote-first</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {WORK_OPTIONS.map((option) => (
              <Tag key={option} label={option} />
            ))}
          </div>
        </Card>
        <Card className={cn('flex flex-col gap-2')}>
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
            Languages
          </p>
          <ul className="flex flex-col gap-1.5">
            {LANGUAGES.map((language) => (
              <li key={language.name} className="flex items-center justify-between text-sm">
                <span className="font-medium text-stone-900">{language.name}</span>
                <span className="text-xs text-stone-500">{language.level}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
