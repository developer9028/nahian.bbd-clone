import { PEOPLE } from '@/lib/data/people'
import { SOCIAL_LINKS } from '@/lib/data/profile'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

const PLATFORM_PATH: Record<string, string> = {
  GitHub:
    'M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  X: 'M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993l-9.532-13.829M18.056 22.14h-3.182L3.076 1.56h3.182l10.962 15.008',
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z',
  Peerlist:
    'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm8.892 20.894c-1.57 1.569-4.247 2.249-8.892 2.249s-7.322-.68-8.892-2.25C1.735 19.522 1.041 17.3.89 13.654A40 40 0 0 1 .857 12c0-1.162.043-2.201.13-3.13c.177-1.859.537-3.278 1.106-4.366c.284-.544.62-1.006 1.013-1.398s.854-.729 1.398-1.013C5.592 1.524 7.01 1.164 8.87.988C9.799.9 10.838.858 12 .858c4.645 0 7.322.68 8.892 2.248s2.25 4.246 2.25 8.894s-.681 7.325-2.25 8.894',
  Facebook:
    'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564H13.37v8.245',
}

const TOP_PEOPLE = [PEOPLE[7], PEOPLE[8], PEOPLE[3]].filter((person) => person !== undefined)

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
                  <span className="border-line grid size-9 place-items-center rounded-full border bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-2)]">
                    {PLATFORM_PATH[social.platform] ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="text-ink-2"
                      >
                        <path fill="currentColor" d={PLATFORM_PATH[social.platform]} />
                      </svg>
                    ) : (
                      <span className="text-meta font-bold">{social.platform.slice(0, 1)}</span>
                    )}
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
