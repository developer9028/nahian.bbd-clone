import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export const ContactView = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-3">
        <Badge>Phase 1 placeholder</Badge>
        <h1 className="text-ink text-4xl font-bold tracking-tight">Let’s build something</h1>
        <p className="text-ink-2 text-base">
          Full contact page lands in Phase 5. Header, Footer and UI kit are live now.
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
