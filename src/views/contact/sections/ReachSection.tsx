import { REACH_LINKS } from '@/lib/data/contact'

import { Card } from '@/components/ui/Card'

export const ReachSection = () => {
  return (
    <section aria-labelledby="reach-heading" className="flex flex-col gap-4">
      <h2 id="reach-heading" className="text-ink text-2xl font-bold tracking-tight">
        Reach me
      </h2>
      <Card>
        <ul className="divide-line flex flex-col divide-y">
          {REACH_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="group flex items-center justify-between gap-3 py-3.5"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-ink group-hover:text-brand-400 text-sm font-medium transition-colors">
                    {link.platform}
                  </span>
                  <span className="text-ink-3 truncate text-xs">{link.handle}</span>
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
