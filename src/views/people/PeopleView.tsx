import type { Platform } from '@/lib/data/people'

import { PEOPLE } from '@/lib/data/people'

import { FilterBar, type PeopleFilter } from '@/views/people/components/FilterBar'
import { PersonCard } from '@/views/people/components/PersonCard'

interface PeopleViewProps {
  platform?: string
}

const VALID_FILTERS: Platform[] = ['GitHub', 'X', 'LinkedIn', 'Facebook', 'Website', 'YouTube']

export const PeopleView = ({ platform }: PeopleViewProps) => {
  const normalized = VALID_FILTERS.includes(platform as Platform) ? (platform as Platform) : null
  const active: PeopleFilter = normalized ?? 'All'

  const filtered =
    active === 'All'
      ? PEOPLE
      : PEOPLE.filter((person) => person.links.some((link) => link.platform === active))

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3">
        <p className="text-ink-3 text-xs font-semibold tracking-widest uppercase">
          {PEOPLE.length} people · {VALID_FILTERS.length + 1} platforms
        </p>
        <h1 className="text-ink text-4xl font-bold tracking-tight">People</h1>
        <p className="text-ink-2 max-w-2xl text-base">
          People I learn from — builders, founders and teachers whose work keeps me sharp. Filter by
          where I follow them, and follow them too.
        </p>
      </div>

      <FilterBar active={active} />

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="border-line bg-surface-2 text-ink-3 rounded-2xl border p-6 text-center text-sm">
          No people found for this filter yet.
        </p>
      ) : null}
    </div>
  )
}
