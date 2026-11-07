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
            <h3 className="text-sm font-semibold text-stone-900">{person.name}</h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-stone-500">{person.role}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-stone-500">
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
          <h2 id="follow-heading" className="text-xl font-bold tracking-tight text-stone-900">
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
          <h2 className="text-xl font-bold tracking-tight text-stone-900">Find me on</h2>
          <ul className="flex flex-col divide-y divide-stone-100">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-emerald-700"
                >
                  <span className="font-medium text-stone-900">{social.platform}</span>
                  <span className="text-xs text-stone-500">{social.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <p className="text-xs text-stone-500">Open to new conversations</p>
            <Button href="/contact" size="sm">
              Let’s talk
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
