import { FeaturedSection } from '@/views/projects/sections/FeaturedSection'
import { OpenSourceSection } from '@/views/projects/sections/OpenSourceSection'
import { ProductGridSection } from '@/views/projects/sections/ProductGridSection'

export const ProjectsView = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-ink text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-ink-2 max-w-2xl text-base">
          Products I’ve designed, built and shipped, plus the open source work behind them.
        </p>
      </div>
      <FeaturedSection />
      <ProductGridSection />
      <OpenSourceSection />
    </div>
  )
}
