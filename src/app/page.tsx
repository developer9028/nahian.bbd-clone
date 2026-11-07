import type { Metadata } from 'next'

import { HomeView } from '@/views/home/HomeView'

export const metadata: Metadata = {
  title: 'Nahian — Portfolio',
}

const HomePage = () => <HomeView />

export default HomePage
