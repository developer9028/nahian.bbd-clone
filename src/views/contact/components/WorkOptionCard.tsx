import type { WorkOption } from '@/lib/data/contact'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface WorkOptionCardProps {
  option: WorkOption
}

export const WorkOptionCard = ({ option }: WorkOptionCardProps) => {
  return (
    <Card className="flex h-full flex-col gap-3">
      <h3 className="text-ink text-base font-semibold">{option.title}</h3>
      <p className="text-ink-2 flex-1 text-sm leading-relaxed">{option.description}</p>
      <div>
        <Button href="/contact" variant="secondary" size="sm">
          {option.cta} ↗
        </Button>
      </div>
    </Card>
  )
}
