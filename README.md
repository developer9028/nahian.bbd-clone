# Nahian Portfolio Clone

> Inspired clean redesign of nahian.bd — Profile, Projects, People, Contact (no Library / Focus).

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- Modular monolithic structure per `next-js-fullstack-modular-monolithic-tailwindcss.md`
- No database — static data in `src/lib/data/`

## Development

```bash
npm install
npm run dev
npx tsc --noEmit
npm run lint
npm run build
```

## Structure

```
src/
├── app/          # routing + HTTP layer
├── views/        # page views (Server Components)
├── components/   # shared UI
└── lib/          # cn(), constants, data
```

## Phases

- Phase 0 — Foundation (current)
- Phase 1 — Layout & Design System
- Phase 2 — Profile `/`
- Phase 3 — Projects `/projects`
- Phase 4 — People `/people`
- Phase 5 — Contact `/contact`
- Phase 6 — Polish & Deploy
