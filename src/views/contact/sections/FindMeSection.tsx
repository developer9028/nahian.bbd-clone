import { SOCIAL_LINKS } from '@/lib/data/profile'

import { Card } from '@/components/ui/Card'

export const FindMeSection = () => {
  return (
    <section aria-labelledby="findme-heading" className="flex flex-col gap-4">
      <h2 id="findme-heading" className="text-ink text-2xl font-bold tracking-tight">
        Find me on
      </h2>
      <Card>
        <ul className="grid gap-3 sm:grid-cols-2">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.platform}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group border-line bg-surface flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-ink group-hover:text-brand-400 text-sm font-medium transition-colors">
                    {social.platform}
                  </span>
                  <span className="text-ink-3 truncate text-xs">{social.handle}</span>
                </div>
                <span className="text-ink-3 group-hover:text-ink shrink-0 text-sm transition-colors">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
