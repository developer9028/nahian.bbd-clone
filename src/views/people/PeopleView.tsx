import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export const PeopleView = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-3">
        <Badge>Phase 1 placeholder</Badge>
        <h1 className="text-ink text-4xl font-bold tracking-tight">People</h1>
        <p className="text-ink-2 text-base">
          Builders, founders and teachers I learn from. Full list lands in Phase 4.
        </p>
      </div>
      <Card>
        <p className="text-ink-2 text-sm">
          Header and Footer render on this page — Phase 1 deliverable check.
        </p>
      </Card>
    </div>
  )
}
