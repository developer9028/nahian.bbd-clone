'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
      <h2 className="text-ink text-2xl font-bold tracking-tight">Could not load Projects</h2>
      <p className="text-ink-2 max-w-md text-sm">Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold"
      >
        Try again
      </button>
    </div>
  )
}

export default Error
