import { PEOPLE } from '@/lib/data/people'
import { SOCIAL_LINKS } from '@/lib/data/profile'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const TOP_PEOPLE = PEOPLE.slice(0, 3)

export const FollowSection = () => {
  const renderPerson = (person: (typeof PEOPLE)[number]) => {
    const primaryLink = person.links[0]

    return (
      <Card key={person.id} className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Avatar name={person.name} imageUrl={person.avatarUrl} size="md" />
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="text-ink text-sm font-semibold">{person.name}</h3>
            <p className="text-ink-3 line-clamp-2 text-xs leading-relaxed">{person.role}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-ink-3 text-xs">
            {primaryLink ? `${primaryLink.platform} · ${primaryLink.handle}` : 'Follow'}
          </span>
          {primaryLink ? (
            <Button href={primaryLink.url} variant="secondary" size="sm">
              Follow
            </Button>
          ) : null}
        </div>
      </Card>
    )
  }

  return (
    <section aria-labelledby="follow-heading" className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 id="follow-heading" className="text-ink text-xl font-bold tracking-tight">
            Who to follow
          </h2>
          <Button href="/people" variant="ghost" size="sm">
            See all {PEOPLE.length} people
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {TOP_PEOPLE.map((person) => renderPerson(person))}
        </div>
      </div>

      <Card className="h-fit">
        <div className="flex flex-col gap-4">
          <h2 className="text-ink text-xl font-bold tracking-tight">Find me on</h2>
          <ul className="divide-line flex flex-col divide-y">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-emerald-700"
                >
                  <span className="text-ink font-medium">{social.platform}</span>
                  <span className="text-ink-3 text-xs">{social.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-line flex items-center justify-between gap-3 border-t pt-4">
            <p className="text-ink-3 text-xs">Open to new conversations</p>
            <Button href="/contact" size="sm">
              Let’s talk
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
