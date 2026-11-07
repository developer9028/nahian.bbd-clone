import type { Project } from '@/lib/data/projects'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const renderStars = () => {
    if (project.stars === undefined) return null

    return (
      <span className="text-ink-3 text-meta font-medium">★ {project.stars} stars on GitHub</span>
    )
  }

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="text-ink text-lead w-fit font-semibold hover:text-emerald-700 hover:underline hover:underline-offset-4"
        >
          {project.title} ↗
        </a>
        <p className="text-ink-2 text-body flex-1 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        {renderStars()}
        {project.sourceUrl ? (
          <Button href={project.sourceUrl} variant="ghost" size="sm">
            Source code
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
