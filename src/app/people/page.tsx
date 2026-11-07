import type { Metadata } from 'next'

import { PeopleView } from '@/views/people/PeopleView'

export const metadata: Metadata = {
  title: 'People — Nahian',
  description: 'Builders, founders and teachers whose work keeps me sharp.',
}

const PeoplePage = () => <PeopleView />

export default PeoplePage
