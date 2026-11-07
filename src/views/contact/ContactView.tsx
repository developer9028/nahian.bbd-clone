import { PROFILE } from '@/lib/data/profile'

import { Badge } from '@/components/ui/Badge'
import { FindMeSection } from '@/views/contact/sections/FindMeSection'
import { ReachSection } from '@/views/contact/sections/ReachSection'
import { WorkSection } from '@/views/contact/sections/WorkSection'

export const ContactView = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="border-line bg-surface/85 sticky top-14 z-20 flex h-15 items-center justify-between gap-4 border-b px-4 backdrop-blur-md sm:px-6 md:top-0 md:h-17.5 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="text-ink truncate text-lg font-semibold tracking-tight">Contact</h1>
        </div>
      </div>
      <div className="flex flex-col gap-10 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit">
            {PROFILE.openTo} · {PROFILE.location}
          </Badge>
          <p className="text-ink-2 text-lead max-w-2xl">
            Have a project, a role or just a question? Pick whatever’s easiest and I’ll get back to
            you.
          </p>
        </div>
        <WorkSection />
        <ReachSection />
        <FindMeSection />
      </div>
    </div>
  )
}
