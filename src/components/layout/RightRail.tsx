import { PEOPLE } from '@/lib/data/people'
import { SOCIAL_LINKS } from '@/lib/data/profile'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

const TOP_PEOPLE = PEOPLE.slice(0, 3)

export const RightRail = () => {
  return (
    <aside
      aria-label="Profile sidebar"
      className="border-line sticky top-0 hidden min-h-dvh w-80 shrink-0 self-start lg:block xl:w-90 xl:border-r"
    >
      <div className="border-line bg-surface/85 sticky top-0 z-10 flex h-17.5 items-center justify-end gap-2 border-b px-6 backdrop-blur-md">
        <Button href="https://x.com/alnahian2003" variant="secondary" size="md">
          𝕏 Follow
        </Button>
      </div>

      <div className="flex flex-col gap-8 px-6 py-7">
        <div className="border-line relative rounded-3xl border bg-[color-mix(in_srgb,var(--surface-2)_72%,transparent)] p-4">
          <p className="text-ink text-body flex items-center gap-2.5 font-semibold">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="bg-brand-400 absolute size-full animate-ping rounded-full opacity-75" />
              <span className="bg-brand-500 relative size-2 rounded-full" />
            </span>
            Open to new conversations
          </p>
          <p className="text-ink-2 text-meta mt-1.5">
            Software engineer and agentic builder. Always happy to talk products, collaborations and
            consultations.
          </p>
          <Button href="/contact" size="sm" className="mt-3.5">
            Let’s talk
          </Button>
        </div>

        <section aria-labelledby="rail-follow-heading">
          <h2
            id="rail-follow-heading"
            className="text-ink text-body mb-2 flex items-center gap-2 font-semibold"
          >
            <span className="text-link">◎</span> Who to follow
          </h2>
          <ul className="-mx-2">
            {TOP_PEOPLE.map((person) => (
              <li
                key={person.id}
                className="hover:bg-surface-2 flex items-center gap-2 rounded-xl px-2 py-2 transition-colors"
              >
                <a
                  href={`/people#${person.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                  title={person.whyFollow}
                >
                  <Avatar name={person.name} imageUrl={person.avatarUrl} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="text-ink text-body block truncate font-medium">
                      {person.name}
                    </span>
                    <span className="text-ink-3 text-meta block truncate">{person.role}</span>
                  </span>
                </a>
                <Button href={person.links[0]?.url ?? '/people'} variant="secondary" size="sm">
                  Follow
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between">
            <Button href="/people" variant="ghost" size="sm">
              See all {PEOPLE.length} people
            </Button>
            <div className="flex -space-x-2">
              {TOP_PEOPLE.map((person) => (
                <Avatar
                  key={person.id}
                  name={person.name}
                  imageUrl={person.avatarUrl}
                  size="sm"
                  className="ring-surface h-7 w-7 ring-2"
                />
              ))}
              <span className="bg-surface-2 text-ink-2 ring-line grid size-7 place-items-center rounded-full text-[10px] font-semibold ring-1">
                +{PEOPLE.length - TOP_PEOPLE.length}
              </span>
            </div>
          </div>
        </section>

        <section aria-labelledby="rail-find-heading">
          <h2
            id="rail-find-heading"
            className="text-ink text-body mb-3 flex items-center gap-2.5 font-semibold"
          >
            <span className="bg-brand-500 size-2 rounded-full" aria-hidden="true" />
            Find me on
          </h2>
          <ul className="-mx-2">
            {SOCIAL_LINKS.slice(0, 4).map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group hover:bg-surface-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors"
                >
                  <span className="btn-secondary grid size-9 place-items-center rounded-full">
                    <span className="text-meta font-bold">{social.platform.slice(0, 1)}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-ink text-body block font-medium">{social.platform}</span>
                    <span className="text-ink-3 text-meta block truncate">{social.handle}</span>
                  </span>
                  <span className="text-ink-3 group-hover:text-ink transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Button href="/contact" variant="ghost" size="sm" className="mt-2">
            See all {SOCIAL_LINKS.length} profiles →
          </Button>
        </section>
      </div>
    </aside>
  )
}
