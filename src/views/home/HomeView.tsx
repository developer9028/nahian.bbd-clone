import { cn } from '@/lib/utils/cn'

export const HomeView = () => {
  const renderStatus = () => (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600',
      )}
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Phase 0 — Foundation ready
    </span>
  )

  return (
    <main
      className={cn(
        'mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center',
      )}
    >
      {renderStatus()}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Nahian — Portfolio
        </h1>
        <p className="text-base text-stone-600">
          Less talk, show me code! Foundation is ready for Phase 1.
        </p>
      </div>
      <p className="text-sm text-stone-500">Next.js 16 · TypeScript · Tailwind CSS v4 · No DB</p>
    </main>
  )
}
