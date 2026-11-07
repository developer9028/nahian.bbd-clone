const Loading = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6" aria-busy="true">
      <div className="bg-surface-3 h-10 w-48 animate-pulse rounded-xl" />
      <div className="border-line bg-surface-2 h-44 animate-pulse rounded-2xl border" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-line bg-surface-2 h-44 animate-pulse rounded-2xl border" />
        <div className="border-line bg-surface-2 h-44 animate-pulse rounded-2xl border" />
      </div>
    </div>
  )
}

export default Loading
