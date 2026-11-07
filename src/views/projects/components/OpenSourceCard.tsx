import type { OpenSourceProject } from '@/lib/data/projects'

import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

interface OpenSourceCardProps {
  project: OpenSourceProject
}

export const OpenSourceCard = ({ project }: OpenSourceCardProps) => {
  return (
    <Card className="flex h-full flex-col gap-3">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="text-ink text-lead w-fit font-semibold hover:text-emerald-700 hover:underline hover:underline-offset-4"
      >
        {project.title} ↗
      </a>
      <p className="text-ink-2 text-body flex-1 leading-relaxed">{project.description}</p>
      <div className="flex items-center gap-2">
        <Tag label={project.language} />
        <span className="text-ink-3 text-meta font-medium">★ {project.stars}</span>
        {project.forks !== undefined ? (
          <span className="text-ink-3 text-meta">· {project.forks} forks</span>
        ) : null}
      </div>
    </Card>
  )
}
