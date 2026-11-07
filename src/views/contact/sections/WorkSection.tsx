import { WORK_OPTIONS } from '@/lib/data/contact'

import { WorkOptionCard } from '@/views/contact/components/WorkOptionCard'

export const WorkSection = () => {
  return (
    <section aria-labelledby="work-heading" className="flex flex-col gap-4">
      <h2 id="work-heading" className="text-ink text-lg font-semibold tracking-tight">
        Work with me
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {WORK_OPTIONS.map((option) => (
          <WorkOptionCard key={option.id} option={option} />
        ))}
      </div>
    </section>
  )
}
