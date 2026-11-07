import type { Metadata } from 'next'

import { PeopleView } from '@/views/people/PeopleView'

export const metadata: Metadata = {
  title: 'People — Nahian',
  description: 'Builders, founders and teachers whose work keeps me sharp.',
}

interface PeoplePageProps {
  searchParams: Promise<{ platform?: string }>
}

const PeoplePage = async ({ searchParams }: PeoplePageProps) => {
  const { platform } = await searchParams

  return <PeopleView platform={platform} />
}

export default PeoplePage
