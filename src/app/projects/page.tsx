import type { Metadata } from 'next'

import { ProjectsView } from '@/views/projects/ProjectsView'

export const metadata: Metadata = {
  title: 'Projects — Nahian',
  description: 'Products designed, built and shipped, plus open source work.',
}

const ProjectsPage = () => <ProjectsView />

export default ProjectsPage
