import { FeaturedSection } from '@/views/projects/sections/FeaturedSection'
import { OpenSourceSection } from '@/views/projects/sections/OpenSourceSection'
import { ProductGridSection } from '@/views/projects/sections/ProductGridSection'

export const ProjectsView = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="border-line bg-surface/85 sticky top-14 z-20 flex h-15 items-center justify-between gap-4 border-b px-4 backdrop-blur-md sm:px-6 md:top-0 md:h-17.5 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="text-ink truncate text-lg font-semibold tracking-tight">Projects</h1>
        </div>
      </div>
      <div className="flex flex-col gap-10 px-4 pb-8 sm:px-6 lg:px-8">
        <p className="text-ink-2 text-body max-w-xl">
          Products I’ve designed, built and shipped, plus the open source work behind them.
        </p>
        <FeaturedSection />
        <ProductGridSection />
        <OpenSourceSection />
      </div>
    </div>
  )
}
