import { FeaturedSection } from '@/views/projects/sections/FeaturedSection'
import { OpenSourceSection } from '@/views/projects/sections/OpenSourceSection'
import { ProductGridSection } from '@/views/projects/sections/ProductGridSection'

export const ProjectsView = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-ink truncate text-lg font-semibold tracking-tight">Projects</h1>
        <p className="text-ink-2 text-lead max-w-2xl">
          Products I’ve designed, built and shipped, plus the open source work behind them.
        </p>
      </div>
      <FeaturedSection />
      <ProductGridSection />
      <OpenSourceSection />
    </div>
  )
}
