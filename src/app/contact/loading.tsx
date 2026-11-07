const Loading = () => {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-10 sm:px-6" aria-busy="true">
      <div className="bg-surface-3 h-10 w-56 animate-pulse rounded-xl" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-line bg-surface-2 h-40 animate-pulse rounded-2xl border" />
        <div className="border-line bg-surface-2 h-40 animate-pulse rounded-2xl border" />
      </div>
      <div className="border-line bg-surface-2 h-56 animate-pulse rounded-2xl border" />
    </div>
  )
}

export default Loading
