import type { Person } from '@/lib/data/people'

import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

interface PersonCardProps {
  person: Person
}

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar name={person.name} imageUrl={person.avatarUrl} size="md" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-ink truncate text-base font-semibold">{person.name}</h3>
            {person.isFavorite ? <Badge className="shrink-0">★ Favorite</Badge> : null}
          </div>
          <p className="text-ink-2 text-sm">{person.role}</p>
        </div>
      </div>

      {person.whyFollow ? (
        <p className="text-ink-2 border-l-2 border-emerald-500/40 pl-3 text-sm leading-relaxed">
          <span className="text-ink font-medium">Why I follow: </span>
          {person.whyFollow}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        {person.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      <div className="border-line mt-auto flex flex-col gap-2 border-t pt-4">
        {person.links.map((link) => (
          <div key={link.platform} className="flex items-center justify-between gap-2">
            <span className="text-ink-3 min-w-0 truncate text-xs">
              {link.platform} · {link.handle}
            </span>
            <Button href={link.url} variant="secondary" size="sm" className="shrink-0">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
