import { cn } from '@/lib/utils/cn'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

export const HomeView = () => {
  const renderStatus = () => <Badge>Phase 1 — Layout & design system ready</Badge>

  return (
    <div
      className={cn(
        'mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6',
      )}
    >
      {renderStatus()}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Nahian — Portfolio
        </h1>
        <p className="text-base text-stone-600">
          Less talk, show me code! Design system is live — Header, Footer, Button, Card, Badge, Tag
          and Avatar.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button href="/projects">View projects</Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </div>
      <Card className="w-full text-left">
        <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
          Design system preview
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tag label="Laravel" />
          <Tag label="Next.js" />
          <Tag label="Tailwind CSS" />
          <Tag label="TypeScript" />
        </div>
        <p className="mt-3 text-sm text-stone-500">
          Next.js 16 · TypeScript · Tailwind CSS v4 · No DB
        </p>
      </Card>
    </div>
  )
}
