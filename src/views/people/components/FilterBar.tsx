'use client'

import Link from 'next/link'

import type { Platform } from '@/lib/data/people'

import { PEOPLE } from '@/lib/data/people'
import { cn } from '@/lib/utils/cn'

export type PeopleFilter = 'All' | Platform

const FILTERS: PeopleFilter[] = ['All', 'GitHub', 'X', 'LinkedIn', 'Facebook', 'Website', 'YouTube']

const countFor = (filter: PeopleFilter) => {
  if (filter === 'All') return PEOPLE.length

  return PEOPLE.filter((person) => person.links.some((link) => link.platform === filter)).length
}

const hrefFor = (filter: PeopleFilter) =>
  filter === 'All' ? '/people' : `/people?platform=${encodeURIComponent(filter)}`

interface FilterBarProps {
  active: PeopleFilter
}

export const FilterBar = ({ active }: FilterBarProps) => {
  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      role="tablist"
      aria-label="Filter by platform"
    >
      {FILTERS.map((filter) => {
        const count = countFor(filter)
        const isActive = active === filter

        return (
          <Link
            key={filter}
            href={hrefFor(filter)}
            role="tab"
            aria-selected={isActive}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
              isActive
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                : 'border-line bg-surface-2 text-ink-2 hover:bg-surface-3 hover:text-ink',
            )}
          >
            {filter}
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] leading-none',
                isActive ? 'bg-emerald-500/20' : 'bg-surface-3 text-ink-3',
              )}
            >
              {count}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
