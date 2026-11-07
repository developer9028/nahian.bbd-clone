import { SKILLS_AND_TOOLS, TOP_SKILLS } from '@/lib/data/profile'

import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'

export const SkillsSection = () => {
  const renderTopSkills = () => (
    <div className="flex flex-col gap-3">
      <h2 className="text-ink text-xl font-bold tracking-tight">Top skills</h2>
      <div className="flex flex-wrap gap-2">
        {TOP_SKILLS.map((skill) => (
          <Tag key={skill} label={skill} className="h-8 px-3 text-sm" />
        ))}
      </div>
    </div>
  )

  const renderTools = () => (
    <div className="flex flex-col gap-3">
      <h2 className="text-ink text-xl font-bold tracking-tight">Skills and tools</h2>
      <div className="flex flex-wrap gap-2">
        {SKILLS_AND_TOOLS.map((tool) => (
          <Tag key={tool} label={tool} />
        ))}
      </div>
      <p className="text-ink-3 text-sm">
        PDF résumé coming later. Then again, after seeing this site, do you really need one?
      </p>
    </div>
  )

  return (
    <section aria-labelledby="skills-heading" className="grid gap-4 md:grid-cols-2">
      <Card>
        <div id="skills-heading">{renderTopSkills()}</div>
      </Card>
      <Card>{renderTools()}</Card>
    </section>
  )
}
