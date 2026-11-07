import { OPEN_SOURCE } from '@/lib/data/projects'

import { OpenSourceCard } from '@/views/projects/components/OpenSourceCard'

export const OpenSourceSection = () => {
  return (
    <section aria-labelledby="opensource-heading" className="flex flex-col gap-4">
      <h2 id="opensource-heading" className="text-ink text-lg font-semibold tracking-tight">
        Open source
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {OPEN_SOURCE.map((project) => (
          <OpenSourceCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
