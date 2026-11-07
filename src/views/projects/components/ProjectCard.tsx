import type { Project } from '@/lib/data/projects'

import { cn } from '@/lib/utils/cn'

interface ProjectCardProps {
  project: Project
}

const BLOB_SETS = [
  [
    'var(--cover-2)',
    'var(--cover-3)',
    'var(--cover-4)',
    'var(--cover-5)',
    'var(--cover-6)',
    'var(--cover-1)',
  ],
  [
    'var(--cover-3)',
    'var(--cover-4)',
    'var(--cover-5)',
    'var(--cover-6)',
    'var(--cover-1)',
    'var(--cover-2)',
  ],
  [
    'var(--cover-4)',
    'var(--cover-5)',
    'var(--cover-6)',
    'var(--cover-1)',
    'var(--cover-2)',
    'var(--cover-3)',
  ],
] as const

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const blobs = BLOB_SETS[0]
  return (
    <article
      className={cn(
        'group bg-surface-2 ring-line hover:ring-line-strong relative flex flex-col rounded-[1.75rem] p-1.5 ring-1 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)]',
      )}
    >
      <div className="bg-surface-3 ring-line relative aspect-video overflow-hidden rounded-[1.375rem] ring-1">
        <div
          className="cover absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          aria-hidden="true"
        >
          {blobs.map((blob, i) => (
            <span
              key={blob}
              className="cover-blob"
              style={
                {
                  ['--blob' as string]: blob,
                  top: `${-45 + i * 20}%`,
                  left: `${-12 + i * 20}%`,
                  ['--dur' as string]: `${24 + i}s`,
                  ['--delay' as string]: `${i * -4}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div
          className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)] [background-size:14px_14px] opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="relative rounded-2xl bg-white/20 px-6 py-3 text-2xl font-bold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_12px_30px_-10px_rgb(0_0_0/0.45)] ring-1 ring-white/40 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 dark:bg-white/10 dark:ring-white/20">
            {project.title}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 pt-3.5 pb-3">
        <h3 className="text-body text-ink font-semibold">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="focus-visible:after:ring-link outline-none after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:after:ring-2"
          >
            {project.title}
          </a>
        </h3>
        <p className="text-meta text-ink-3 mt-0.5 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-micro bg-surface text-ink-2 ring-line rounded-md px-2 py-0.5 font-medium ring-1"
            >
              {tag}
            </span>
          ))}
          {project.stars !== undefined ? (
            <span className="text-meta text-ink-2 ml-auto font-semibold">★ {project.stars}</span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
