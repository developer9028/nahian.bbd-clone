import { PROFILE } from '@/lib/data/profile'

import { Badge } from '@/components/ui/Badge'
import { FindMeSection } from '@/views/contact/sections/FindMeSection'
import { ReachSection } from '@/views/contact/sections/ReachSection'
import { WorkSection } from '@/views/contact/sections/WorkSection'

export const ContactView = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4">
        <Badge className="w-fit">
          {PROFILE.openTo} · {PROFILE.location}
        </Badge>
        <h1 className="text-ink text-4xl font-bold tracking-tight">Let’s build something</h1>
        <p className="text-ink-2 max-w-2xl text-base">
          Have a project, a role or just a question? Pick whatever’s easiest and I’ll get back to
          you.
        </p>
      </div>
      <WorkSection />
      <ReachSection />
      <FindMeSection />
    </div>
  )
}
