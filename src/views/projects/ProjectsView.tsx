import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export const ProjectsView = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-3">
        <Badge>Phase 1 placeholder</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">Projects</h1>
        <p className="text-base text-stone-600">
          Products designed, built and shipped. Full grid lands in Phase 3.
        </p>
      </div>
      <Card>
        <p className="text-sm text-stone-600">
          Header and Footer render on this page — Phase 1 deliverable check.
        </p>
      </Card>
    </div>
  )
}
