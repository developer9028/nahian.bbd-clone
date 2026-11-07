import { PROJECTS } from '@/lib/data/projects'

import { ProjectCard } from '@/views/projects/components/ProjectCard'

export const ProductGridSection = () => {
  return (
    <section aria-labelledby="products-heading" className="flex flex-col gap-4">
      <h2 id="products-heading" className="text-ink text-lg font-semibold tracking-tight">
        Products
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
