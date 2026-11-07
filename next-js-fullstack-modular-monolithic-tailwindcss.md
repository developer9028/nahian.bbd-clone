# Modern Next.js + TypeScript Full-Stack Style Guide (Modular Monolithic Edition)

> Replaces the outdated Airbnb React/JSX Style Guide with modern React (hooks-era) conventions.
> Stack: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma · PostgreSQL · Modular Monolith**
> This edition is the **full-stack variant**: the Next.js app owns the database. `app/api/*` route handlers are the application's real backend — they validate input, enforce authentication/authorization, run domain services and repositories, and query PostgreSQL through Prisma. There is **no BFF and no upstream service**.
> **Runtime:** route handlers and all data-access modules run on **Node.js** (`export const runtime = 'nodejs'` where needed) because Prisma is Node-only. Never import `lib/db`, `lib/auth` or `server/*` from a Client Component.
> Pattern: `Browser → /api/* → Zod → Service → Repository → Prisma → PostgreSQL`. The Next.js app is the only deployable backend.

---

## Table of Contents

1. [File & Directory Conventions](#1-file--directory-conventions)
2. [Modular Monolithic Architecture](#2-modular-monolithic-architecture)
3. [Component Rules](#3-component-rules)
4. [TypeScript Rules](#4-typescript-rules)
5. [JSX Rules](#5-jsx-rules)
6. [Hooks & State Rules](#6-hooks--state-rules)
7. [Import Order](#7-import-order)
8. [Event Handlers](#8-event-handlers)
9. [Server vs Client Components](#9-server-vs-client-components)
10. [useCallback & useMemo](#10-usecallback--usememo)
11. [Zod Validation](#11-zod-validation)
12. [Form Handling](#12-form-handling)
13. [Proxy — Route Protection](#13-proxy--route-protection)
14. [error.tsx & loading.tsx](#14-errortsx--loadingtsx)
15. [ESLint Configuration](#15-eslint-configuration)
16. [Authentication — JWT + httpOnly Cookies](#16-authentication--jwt--httponly-cookies)
17. [Prettier Configuration](#17-prettier-configuration)
18. [Pre-commit Hooks](#18-pre-commit-hooks)
19. [API Routes as the Backend — Services, Repositories, Prisma](#19-api-routes-as-the-backend--services-repositories-prisma)
20. [Database & Prisma Conventions](#20-database--prisma-conventions)

---

## 1. File & Directory Conventions

| Item                  | Convention             | Example                                 |
| --------------------- | ---------------------- | --------------------------------------- |
| Component files       | PascalCase             | `UserCard.tsx`                          |
| Hook files            | camelCase              | `useAuth.ts`                            |
| Utility/service files | camelCase              | `formatDate.ts`, `auth.service.ts`      |
| Domain types          | PascalCase             | `DoctorDto.ts`, `ChamberDto.ts`         |
| Folders               | kebab-case             | `user-profile/`, `chamber-form/`        |
| Next.js page files    | lowercase (enforced)   | `page.tsx`, `layout.tsx`, `loading.tsx` |
| Props interface       | `[ComponentName]Props` | `UserCardProps`                         |

**Rules:**

- One component per file — no multiple component exports in the same file
- `index.ts` files are only for re-exporting — never put logic inside them
- Co-locate types: either inside the component file or in a sibling `UserCard.types.ts`
- Never put business logic in `page.tsx` — delegate to the view, and data access to `server/*`
- **Server-only rule:** anything that imports Prisma, hashes passwords, signs tokens or reads cookies must import `server-only`
- **No BFF layer:** there is no `bff-client`, no `upstream.ts`, no proxy-to-another-API layer. `app/api/*` is the backend

```
src/
├── app/                              # Routing + HTTP layer
│   ├── (auth)/
│   │   ├── login/
│   │   │   ├── page.tsx              # Only renders <LoginView /> + metadata
│   │   │   └── loading.tsx
│   │   └── register/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── (portal)/                     # Authenticated doctor workspace
│   │   ├── layout.tsx                # Sidebar + header shell
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx             # must be 'use client'
│   │   ├── profile/page.tsx
│   │   ├── chambers/page.tsx
│   │   ├── appointments/page.tsx
│   │   └── reports/page.tsx
│   ├── api/                          # ★ The backend — owns the database
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── refresh/route.ts
│   │   │   └── me/route.ts
│   │   ├── doctor/
│   │   │   ├── me/route.ts           # GET / PATCH own profile
│   │   │   └── claim/route.ts        # claim an existing directory profile
│   │   ├── chambers/
│   │   │   ├── route.ts              # GET, POST
│   │   │   └── [id]/route.ts         # PATCH, DELETE
│   │   ├── appointments/
│   │   │   ├── route.ts              # GET
│   │   │   └── [id]/route.ts         # PATCH (status)
│   │   └── reports/
│   │       └── summary/route.ts
│   ├── layout.tsx
│   └── globals.css
│
├── views/                            # Main view for every page
│   ├── dashboard/
│   │   ├── DashboardView.tsx
│   │   ├── types.ts
│   │   ├── api.ts                    # Calls /api/... only (never Prisma)
│   │   ├── hooks/
│   │   │   └── useDashboard.ts
│   │   ├── sections/
│   │   │   ├── StatsSection.tsx
│   │   │   └── ActivitySection.tsx
│   │   └── components/
│   │       └── StatCard.tsx
│   ├── profile/
│   │   ├── ProfileView.tsx
│   │   ├── api.ts
│   │   └── components/ProfileForm.tsx
│   ├── chambers/
│   │   ├── ChambersView.tsx
│   │   ├── api.ts
│   │   └── components/ChamberForm.tsx
│   ├── appointments/
│   │   ├── AppointmentsView.tsx
│   │   ├── api.ts
│   │   └── components/AppointmentTable.tsx
│   └── reports/
│       ├── ReportsView.tsx
│       └── api.ts
│
├── components/                       # Globally shared UI components
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ...
│
├── server/                           # ★ Domain layer (server-only)
│   ├── auth/
│   │   ├── auth.service.ts           # register / login / refresh / logout
│   │   ├── auth.repository.ts        # Prisma queries for users + refresh tokens
│   │   └── auth.schema.ts            # Register / Login Zod schemas
│   ├── doctors/
│   │   ├── doctors.service.ts
│   │   ├── doctors.repository.ts
│   │   └── doctors.schema.ts
│   ├── chambers/
│   │   ├── chambers.service.ts
│   │   ├── chambers.repository.ts
│   │   └── chambers.schema.ts
│   ├── appointments/
│   │   ├── appointments.service.ts
│   │   ├── appointments.repository.ts
│   │   └── appointments.schema.ts
│   └── reports/
│       ├── reports.service.ts
│       └── reports.repository.ts
│
├── lib/                              # Shared infrastructure (ONLY shared code)
│   ├── db.ts                         # ★ Prisma client singleton (server-only)
│   ├── auth.ts                       # bcrypt + JWT + cookies + session (server-only)
│   ├── api-error.ts                  # ApiError(status, message, fields)
│   ├── api-utils.ts                  # ok(), created(), requireUser(), handleApiError()
│   ├── env.ts                        # Zod-validated env
│   ├── constants.ts
│   └── utils/cn.ts                   # cn() helper
├── types/                            # Global TypeScript types
└── proxy.ts                          # Route protection — reads the cookie, no DB
```

> **The app owns the database.** `prisma/schema.prisma` is the source of truth. Do not add a second data layer, a second ORM, or an HTTP client that proxies to another backend.

### `page.tsx` rule — thin shell only

`page.tsx` must stay minimal. It only renders the view and optionally exports Next.js metadata. If the page needs data, either the view (Server Component) queries a service, or it is passed to a client view as props.

```tsx
// app/(portal)/dashboard/page.tsx
import type { Metadata } from 'next'

import { DashboardView } from '@/views/dashboard/DashboardView'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const DashboardPage = () => <DashboardView />

export default DashboardPage
```

```tsx
// views/dashboard/DashboardView.tsx (Server Component)
import { ActivitySection } from './sections/ActivitySection'
import { StatsSection } from './sections/StatsSection'

export const DashboardView = () => {
  return (
    <main className="flex flex-col gap-8 p-6">
      <StatsSection />
      <ActivitySection />
    </main>
  )
}
```

### The `cn()` utility — merge Tailwind classes safely

All components use `cn()` from `lib/utils/cn.ts` to merge Tailwind classes. Install the dependencies:

```bash
npm install clsx tailwind-merge
```

```ts
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```

```tsx
// ✅ cn() handles Tailwind class conflicts correctly
import { cn } from '@/lib/utils/cn'

const Alert = ({ variant, className }: { variant: string; className?: string }) => (
  <div
    className={cn(
      'rounded-md border p-4 text-sm',
      variant === 'error' && 'border-error bg-error-light text-error',
      className,
    )}
  />
)

// ❌ Never concatenate Tailwind strings — last class wins, conflicts silently
className={`rounded-md ${variant === 'error' ? 'bg-error-light' : 'bg-white'} ${className}`}
```

---

## 2. Modular Monolithic Architecture

A **full-stack modular monolith** is a single deployable Next.js app that owns its PostgreSQL database and organises code into strict **domain vertical slices**. Each slice contains the HTTP route, Zod schema, business service and Prisma repository for one business capability (`auth`, `doctors`, `chambers`, `appointments`, `reports`). The monolith stays simple to deploy while the domain boundaries keep it extractable.

### Core Principles

| Principle                    | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| **Single deployment**        | One Next.js deploy serves both UI and API — no separate backend service               |
| **Database ownership**       | The app owns PostgreSQL through Prisma; `prisma/schema.prisma` is the source of truth |
| **Domain boundaries**        | Code grouped by business domain (`auth`, `doctors`, `chambers`, …)                    |
| **Layered domains**          | `route → schema → service → repository → Prisma` inside every domain                  |
| **No circular dependencies** | Domains import shared infrastructure, never each other's internals                    |
| **Extractability**           | A domain can be moved to its own service later by replacing its route layer           |

### File Structure as Domain Boundaries

The directory tree from Section 1 embodies the pattern — each domain is a complete vertical slice:

```
src/
├── app/api/chambers/             ← HTTP layer (thin)
│   ├── route.ts                  ← GET list, POST create
│   └── [id]/route.ts             ← PATCH, DELETE
├── server/chambers/              ← Domain layer (server-only)
│   ├── chambers.schema.ts        ← Zod validation + input types
│   ├── chambers.service.ts       ← Business rules, ownership checks, transactions
│   └── chambers.repository.ts    ← Prisma queries only
├── views/chambers/               ← Frontend layer
│   ├── ChambersView.tsx          ← Page view
│   ├── api.ts                    ← fetch('/api/chambers') — never Prisma
│   └── components/ChamberForm.tsx
├── lib/                          ← SHARED infrastructure only
│   ├── db.ts                     ← Prisma singleton (server-only)
│   ├── auth.ts                   ← bcrypt + JWT + cookies (server-only)
│   ├── api-utils.ts              ← ok(), requireUser(), handleApiError()
│   ├── env.ts                    ← Zod-validated environment
│   └── utils/cn.ts               ← cn() utility
```

### Rules

| Rule                                                             | Reason                                                            |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| Each domain owns its routes, schema, service and repository      | Complete vertical slice — nothing domain-specific lives in `lib/` |
| Shared infrastructure lives in `lib/` only (`db`, `auth`, `env`) | Prevents domain coupling; `server-only` enforced                  |
| Domains never import another domain's repository                 | Cross-domain reads go through the other domain's **service**      |
| The frontend mirrors the backend domain structure in `views/`    | One-to-one mapping — easy to navigate                             |
| `app/api/*` is the only backend the browser talks to             | No BFF, no upstream proxy, no second API base URL                 |
| No circular imports between domains                              | Enforced by ESLint `import/no-restricted-paths`                   |

### Modular Monolith vs Microservices vs BFF

| Aspect                 | Full-Stack Monolith (this guide)         | BFF + Upstream                        | Microservices                            |
| ---------------------- | ---------------------------------------- | ------------------------------------- | ---------------------------------------- |
| DB ownership           | Next.js owns DB via Prisma               | Upstream owns DB — BFF is stateless   | Each service owns its DB                 |
| Deployment             | Single deploy                            | BFF + upstream(s)                     | Multiple independent deploys             |
| Frontend coupling      | UI and API evolve in one repo            | BFF shapes payload for the UI         | UI calls many services directly (chatty) |
| Operational complexity | Low                                      | Medium (two deployables)              | High (K8s, service mesh)                 |
| Extractability         | Move a domain out by replacing its route | Domain → upstream with zero UI change | Already separate                         |

> **This project is the first column.** The original DoctorZone API is not deployed alongside this app and is never called at runtime. Its entity shapes are used only as a reference when modelling `prisma/schema.prisma`.

### When to use this pattern

| Scenario                                      | Recommendation                                       |
| --------------------------------------------- | ---------------------------------------------------- |
| Single product with a web UI and its own data | ✅ Full-stack modular monolith — this guide          |
| Startup / MVP with one small team             | ✅ Full-stack monolith — fastest iteration           |
| Separate backend team already owns the domain | ⚠️ Consider a BFF instead — do not duplicate the DB  |
| Public app with mobile + web clients          | ⚠️ Monolith works, but add a dedicated API contract  |
| Large org with independent service teams      | ✅ Extract domains into microservices when justified |

### How the guide embodies this

Every section that follows reinforces the full-stack modular pattern:

- **Section 3** (Component Rules) — components stay within their domain's `components/` folder
- **Section 12** (Form Handling) — forms live in `views/*/components/`, scoped to their domain
- **Section 19** (API Routes as the Backend) — each domain's `service` and `repository` own the Prisma access; there is no upstream client
- **Shared `lib/`** — only cross-cutting concerns (`db`, `auth`, `env`, `api-utils`)

---

## 3. Component Rules

### Always use arrow functions

```tsx
// ✅ Good
export const UserCard = ({ name, role = 'User' }: UserCardProps) => {
  return <div>{name}</div>
}

// ❌ Bad — no function declarations for components
export function UserCard({ name }: UserCardProps) {
  return <div>{name}</div>
}
```

### Keep JSX return clean — extract into small render functions

```tsx
// ✅ Good — extract complex JSX into named sub-functions inside the component
export const UserCard = ({ name, role }: UserCardProps) => {
  const renderAvatar = () => (
    <div className="avatar">
      <img src="/avatar.png" alt={`${name} avatar`} />
    </div>
  )

  const renderBadge = () => role === 'Admin' && <span className="badge">Admin</span>

  return (
    <div className="user-card">
      {renderAvatar()}
      <p>{name}</p>
      {renderBadge()}
    </div>
  )
}

// ❌ Bad — logic crammed inside return
export const UserCard = ({ name, role }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="avatar">
        <img src="/avatar.png" alt={`${name} avatar`} />
      </div>
      <p>{name}</p>
      {role === 'Admin' && <span className="badge">Admin</span>}
    </div>
  )
}
```

### Props interface

```tsx
// ✅ Always define a named interface for props — never inline
interface UserCardProps {
  name: string
  role?: 'Admin' | 'User' | 'Guest'
  onClick?: () => void
}

// ✅ Destructure props at the top — use default values inline
const UserCard = ({ name, role = 'User', onClick }: UserCardProps) => { ... }
```

### Exports

- **Named exports** for all components except Next.js pages
- **Default exports** only for `page.tsx`, `layout.tsx`, and `error.tsx` (required by Next.js)

```tsx
// ✅ Named export (components)
export const Button = () => { ... }

// ✅ Default export (pages only — Next.js requirement)
export default function DashboardPage() { ... }
```

---

## 4. TypeScript Rules

```tsx
// ❌ Never use `any`
const data: any = fetchUser()

// ✅ Use `unknown` if type is truly dynamic — then narrow it
const data: unknown = fetchUser()
if (typeof data === 'object' && data !== null) { ... }

// ✅ Use `interface` for object shapes
interface User {
  id: string
  name: string
  email: string
}

// ✅ Use `type` for unions, intersections, and primitives
type Status = 'idle' | 'loading' | 'error' | 'success'
type UserId = string

// ✅ No magic numbers — extract to named constants
const MAX_RETRIES = 3                    // ✅
if (retries > 3) { ... }                 // ❌

// ✅ Boolean props — omit value when true
<Button disabled />           // ✅
<Button disabled={true} />    // ❌

// ✅ Omit React.FC — just type the props directly
const UserCard = ({ name }: UserCardProps) => { ... }          // ✅
const UserCard: React.FC<UserCardProps> = ({ name }) => { ... } // ❌ (React.FC is discouraged)
```

---

## 5. JSX Rules

### Self-closing tags

```tsx
<Spinner />           // ✅
<Spinner></Spinner>   // ❌
```

### Multi-line props — closing bracket on new line

```tsx
// ✅
<UserCard
  name="Ruhul"
  role="Admin"
  onClick={handleClick}
/>

// ❌
<UserCard
  name="Ruhul"
  role="Admin" />
```

### Keys — always stable ID, never array index

```tsx
// ✅
{
  users.map((user) => <UserCard key={user.id} {...user} />)
}

// ❌
{
  users.map((user, i) => <UserCard key={i} {...user} />)
}
```

### Quotes

> Prettier enforces these automatically — this is just for awareness.

```tsx
// ✅ Double quotes for JSX attributes
<Foo bar="value" />

// ❌ Single quotes for JSX attributes
<Foo bar='value' />

// ✅ Single quotes inside JS/TS expressions (non-JSX)
const label = 'hello'
const styles = cn('rounded-md', isActive && 'bg-blue-600')

// ❌ Never use inline styles — use Tailwind classes via cn()
<Foo style={{ color: 'red' }} />
<Foo className="text-red-500" />  // ✅
```

### No spaces inside JSX curly braces

```tsx
<Foo bar={baz} />     // ✅
<Foo bar={ baz } />   // ❌
```

### Conditional rendering

```tsx
// ✅ Simple condition — inline
{
  isLoading && <Spinner />
}

// ✅ Two branches — ternary
{
  isLoggedIn ? <Dashboard /> : <Login />
}

// ✅ Complex condition — extract to render function
const renderContent = () => {
  if (isLoading) return <Spinner />
  if (isError) return <ErrorMessage />
  return <Dashboard />
}

return <div>{renderContent()}</div>
```

### Accessibility

```tsx
// ✅ Always include alt on img
<img src="photo.jpg" alt="User profile photo" />
<img src="decoration.jpg" alt="" />       // presentational — empty string is fine

// ❌ Never describe the element type in alt
<img src="photo.jpg" alt="Photo of user" />  // screenreader already says "image"

// ✅ Use valid ARIA roles only
<div role="button" />   // ✅
<div role="datepicker" /> // ❌ — not a valid ARIA role
```

---

## 6. Hooks & State Rules

```tsx
// ✅ Local UI state → useState
const [isOpen, setIsOpen] = useState(false)

// ✅ Server/async state → React Query (never store server data in useState)
const { data: users, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: usersApi.getAll,
})

// ❌ Don't duplicate server data into local state
const [users, setUsers] = useState([])
useEffect(() => { fetchUsers().then(setUsers) }, [])

// ✅ Derived values — compute inline, never store as state
const activeUsers = users?.filter(u => u.isActive) ?? []  // ✅
const [activeUsers, setActiveUsers] = useState([])        // ❌

// ✅ Custom hooks — always prefixed with `use`
const useAuth = () => { ... }
const useUserProfile = (id: string) => { ... }

// ✅ useRef for DOM references
const inputRef = useRef<HTMLInputElement>(null)

// ✅ Shared client state → Zustand or Context (defined in hooks/)
// ✅ Never call /api/* directly inside a component — use the domain api module
const handleSubmit = async () => {
  await chambersApi.create(formData)   // ✅ via views/chambers/api.ts → /api/chambers
}
```

---

## 7. Import Order

Enforced by ESLint `import/order`. Order strictly:

```tsx
// 1. React & Next.js core
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

// 3. Internal path aliases (@/)
import { Button } from '@/components/ui/Button'
import { env } from '@/lib/env'
import { useAuth } from '@/hooks/useAuth'

// 4. Relative imports
import { UserCardSkeleton } from './UserCardSkeleton'

// 5. Type-only imports (always last)
import type { User } from '@/types'
import type { UserCardProps } from './UserCard.types'
```

---

## 8. Event Handlers

```tsx
// ✅ Always prefix with `handle`
const handleSubmit = () => { ... }
const handleClick = () => { ... }
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// ❌ No underscore prefix (no private methods in React)
const _handleSubmit = () => { ... }

// ✅ Use useCallback for handlers passed to child components
const handleClick = useCallback(() => {
  doSomething()
}, [dependency])

// ✅ Async handlers always use try/catch
const handleSubmit = async () => {
  try {
    await usersApi.create(formData)
    router.push('/dashboard')
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}
```

---

## 9. Server vs Client Components

In Next.js App Router **all components are Server Components by default**. Only add `'use client'` when strictly necessary. Push it as far down the tree as possible.

### Decision rule

```
Does the component need:
  useState / useReducer?          → 'use client'
  useEffect?                      → 'use client'
  onClick / onChange / events?    → 'use client'
  browser APIs (window, document)?→ 'use client'
  third-party client-only lib?    → 'use client'

Otherwise → Server Component (no directive needed)
```

### Server Component — default, no directive

Server Components query the database **directly through a service** — no `fetch('/api/...')` hop to your own API, and no BFF client.

```tsx
// views/dashboard/sections/StatsSection.tsx
// ✅ No 'use client' — Server Component reads the DB through the domain service
import { redirect } from 'next/navigation'

import { getSessionUser } from '@/lib/auth'
import { reportsService } from '@/server/reports/reports.service'

import { StatCard } from '../components/StatCard'

export const StatsSection = async () => {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  const stats = await reportsService.dashboardSummary(user.id)

  return (
    <section className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </section>
  )
}
```

> **Rule:** Server Components import `server/*` services. They never import `@/lib/db` directly — the service is the single place that reads/writes a domain.

### Client Component — only when needed

```tsx
// views/dashboard/components/StatCard.tsx
'use client' // ← needed only because of onClick

import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

interface StatCardProps {
  label: string
  value: number
}

export const StatCard = ({ label, value }: StatCardProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn('rounded-lg border p-4', expanded && 'shadow-lg')}
      onClick={() => setExpanded((e) => !e)}
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
```

### Composing Server + Client

```tsx
// ✅ Server Component wrapping a Client Component — correct pattern
// views/dashboard/DashboardView.tsx  (Server Component)
import { FilterBar } from './components/FilterBar' // Client ('use client')
import { StatsSection } from './sections/StatsSection' // Server

export const DashboardView = async () => {
  return (
    <main className="flex flex-col gap-8 p-6">
      <FilterBar /> {/* client — interactive */}
      <StatsSection /> {/* server — queries the DB via a service */}
    </main>
  )
}
```

### Client Components talk to `/api/*`

A Client Component never imports a service, Prisma or `lib/auth`. It calls the app's own API through `views/*/api.ts`:

```ts
// views/chambers/api.ts
export const chambersApi = {
  list: () => fetch('/api/chambers').then((r) => r.json()),
  create: (input: CreateChamberInput) =>
    fetch('/api/chambers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }).then((r) => r.json()),
}
```

### Rules

| Rule                                                                         | Reason                                             |
| ---------------------------------------------------------------------------- | -------------------------------------------------- |
| Default to Server Components                                                 | Less JS to the browser, direct data access, faster |
| Only add `'use client'` when you need interactivity or browser APIs          | Keeps components lean                              |
| Server Components query services with `async/await` — never `useEffect`      | Data fetching belongs on the server                |
| Client Components call `/api/*` via `views/*/api.ts`                         | Keeps Prisma and secrets out of the browser bundle |
| Never import `@/lib/db`, `@/lib/auth` or `@/server/*` into Client Components | `server-only` makes the build fail if you do       |
| Server Components can import Client Components — not vice versa              | One-way boundary                                   |

---

## 10. useCallback & useMemo

Over-memoization is a common mistake. Use these **only when there is a proven need**.

### useCallback — only for handlers passed to memoized children

```tsx
// ❌ Pointless — no child component receiving this, no benefit
const handleClick = useCallback(() => {
  setCount((c) => c + 1)
}, [])

// ✅ Needed — passed to React.memo() child, prevents unnecessary re-render
const handleRowClick = useCallback(
  (id: string) => {
    router.push(`/users/${id}`)
  },
  [router],
)

return <UserTable onRowClick={handleRowClick} />
```

### useMemo — only for genuinely expensive calculations

```tsx
// ❌ Wasteful — string template is trivially cheap
const label = useMemo(() => `Hello ${name}`, [name])

// ❌ Wasteful — filtering a small array is cheap
const active = useMemo(() => users.filter((u) => u.isActive), [users])

// ✅ Justified — expensive sort/transform on large dataset
const sorted = useMemo(
  () =>
    largeDataset
      .filter((item) => item.category === selectedCategory)
      .sort((a, b) => b.score - a.score)
      .slice(0, 100),
  [largeDataset, selectedCategory],
)
```

### Simple rule

```
Ask: "Would this be noticeably slow without memoization?"
  Yes → use useMemo / useCallback
  No  → don't bother
```

---

## 11. Zod Validation

Use Zod for all runtime validation at three boundaries: **incoming HTTP requests** (`/api/*`), **environment variables** (`lib/env.ts`), and **untrusted external data** (uploads, imported files). The database schema is not a validator — never trust `req.json()` to match it.

### Install

```bash
npm install zod
```

### Schema co-location

Domain schemas live with the domain, so both the route and the service can import the same types:

```
src/server/chambers/
├── chambers.schema.ts      ← Zod input schemas + z.infer types
├── chambers.service.ts     ← imports CreateChamberInput
└── chambers.repository.ts
src/app/api/chambers/
├── route.ts                ← imports CreateChamberSchema
└── [id]/route.ts
```

Route-local schemas (`app/api/<domain>/schema.ts`) are fine when only one handler uses them, but a schema shared with a service belongs in `server/<domain>/`.

### API route request validation

```ts
// src/server/chambers/chambers.schema.ts
import { z } from 'zod'

export const WorkingDaysSchema = z.record(z.string(), z.array(z.string()))

export const CreateChamberSchema = z.object({
  facilityName: z.string().trim().min(1, 'Name is required').max(200),
  roomNo: z.coerce.number().int().min(0).default(0),
  workingDays: WorkingDaysSchema.default({}),
  consultationFee: z.coerce.number().min(0).optional(),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export const UpdateChamberSchema = CreateChamberSchema.partial()

export type CreateChamberInput = z.infer<typeof CreateChamberSchema>
export type UpdateChamberInput = z.infer<typeof UpdateChamberSchema>
```

```ts
// src/app/api/chambers/route.ts — validate, then call the domain service
import type { NextRequest } from 'next/server'

import { badRequest, created, handleApiError, requireDoctor } from '@/lib/api-utils'
import { chambersService } from '@/server/chambers/chambers.service'
import { CreateChamberSchema } from '@/server/chambers/chambers.schema'

export const POST = async (req: NextRequest) => {
  try {
    const user = await requireDoctor()
    const parsed = CreateChamberSchema.safeParse(await req.json())

    // ✅ Always validate at the API boundary before touching the database
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.flatten().fieldErrors)
    }

    return created(await chambersService.create(user.id, parsed.data))
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Validating query parameters

```ts
// src/server/appointments/appointments.schema.ts
import { z } from 'zod'

// `Appointment.status` is a String column — keep the enum in sync with the DB.
export const ListAppointmentsQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
})
```

```ts
const query = ListAppointmentsQuery.safeParse(
  Object.fromEntries(req.nextUrl.searchParams.entries()),
)
if (!query.success) {
  return badRequest('Invalid query', query.error.flatten().fieldErrors)
}
```

### Environment validation

```ts
// src/lib/env.ts
import { z } from 'zod'

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
})

const parsed = EnvSchema.safeParse(process.env)

if (!parsed.success) {
  throw new Error(`Invalid environment:\n${parsed.error.toString()}`)
}

export const env = parsed.data
```

### Rules

| Rule                                                         | Reason                                           |
| ------------------------------------------------------------ | ------------------------------------------------ |
| Validate every request body, query string and route param    | Never trust client input                         |
| Use `safeParse` not `parse` — handle errors gracefully       | `parse` throws, harder to return a 400           |
| Export `z.infer<typeof Schema>` as the TypeScript type       | Single source of truth for input types           |
| Put shared schemas in `server/<domain>/<domain>.schema.ts`   | Route and service use the same contract          |
| Validate `process.env` once at boot with Zod                 | Fail fast instead of `undefined` at request time |
| Frontend validation is UX only — the API always re-validates | A client can bypass the form                     |
| Never `as`-cast `req.json()` or `searchParams`               | Validation is not a type assertion               |

---

## 12. Form Handling

Use `react-hook-form` + `zod` for all forms. All form submissions go through the app's own API (`/api/...`) — the browser has no other backend to call.

### Install

```bash
npm install react-hook-form @hookform/resolvers
```

### Pattern — react-hook-form + zod + Tailwind CSS

```tsx
// views/auth/login/components/LoginForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginInput = z.infer<typeof LoginSchema>

/** Reusable input wrapper — renders label, input, and error message */
const Field = ({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
)

export const LoginForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        setError('root', { message: err.error?.message ?? 'Login failed' })
        return
      }

      router.push('/dashboard')
    } catch {
      setError('root', { message: 'Something went wrong. Try again.' })
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </Field>

      <Field label="Password" error={errors.password?.message}>
        <input
          type="password"
          {...register('password')}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </Field>

      {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
```

### Rules

| Rule                                               | Reason                                              |
| -------------------------------------------------- | --------------------------------------------------- |
| Always use `zodResolver` with react-hook-form      | Single schema for both validation and types         |
| Form submit handler always calls `/api/...`        | The API sets the httpOnly session cookie            |
| Use `form.setError('root', ...)` for server errors | Shows errors without crashing                       |
| Always disable submit button during `isSubmitting` | Prevents double-submit                              |
| Define schema in the same file as the form         | Co-location — schema is tightly coupled to the form |

---

## 13. Proxy — Route Protection

`proxy.ts` handles **optimistic route protection** before a page renders. It lives at the **project root** (next to `src/`; in this repo it is `src/proxy.ts` because the app lives under `src/`). It only reads the httpOnly cookie — it never queries the database.

> **Note:** In Next.js 16 the file convention was renamed from `middleware.ts` to `proxy.ts`, and Proxy now defaults to the **Node.js runtime**. The codemod `npx @next/codemod@canary middleware-to-proxy .` handles the rename.

```ts
// src/proxy.ts — auth gate only: no DB, no service calls
import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/chambers', '/appointments', '/reports']
const AUTH_ROUTES = ['/login', '/register']

// Must match the names in lib/auth.ts. Presence is enough here — the portal layout
// validates the session against the database.
const isProd = process.env.NODE_ENV === 'production'
const ACCESS_COOKIE = isProd ? '__Host-dz_access' : 'dz_access'
const REFRESH_COOKIE = isProd ? '__Host-dz_refresh' : 'dz_refresh'

const hasSession = (req: NextRequest) =>
  Boolean(req.cookies.get(ACCESS_COOKIE)?.value ?? req.cookies.get(REFRESH_COOKIE)?.value)

export const proxy = (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  const hasCookies = hasSession(req)

  if (isProtected && !hasCookies) return NextResponse.redirect(new URL('/login', req.url))
  if (isAuthRoute && hasCookies) return NextResponse.redirect(new URL('/dashboard', req.url))

  return NextResponse.next()
}

// ✅ Always define matcher — skip static files and API routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
```

### Rules

| Rule                                                            | Reason                                                         |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| Always define `config.matcher`                                  | Without it, proxy runs on every static file request            |
| Use httpOnly cookies for the access token — never localStorage  | Cookies are readable server-side and not exposed to JS         |
| Keep proxy lean — no DB, no service calls, no heavy crypto      | It runs on every page request; keep it in the low milliseconds |
| Treat proxy as **UX only** — APIs still enforce auth themselves | A proxy redirect is not an authorization boundary              |
| Skip `/api/*` in the matcher                                    | API routes run `requireUser()` and return 401/403              |

#### `next.config.ts` — security headers

```ts
// next.config.ts
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
```

> Add a Content-Security-Policy once asset/CDN origins are known. A CSP with a per-request nonce must be generated in `proxy.ts` and forwarded via a request header.

---

## 14. error.tsx & loading.tsx

App Router has built-in file conventions for loading and error states at the route level.

### `loading.tsx` — automatic loading skeleton

Shown automatically by Next.js while the page's async Server Component is fetching data. **Must be a Server Component** (no `'use client'`).

```tsx
// app/dashboard/loading.tsx

const DashboardLoading = () => (
  <main className="flex flex-col gap-8 p-6">
    <div className="grid grid-cols-3 gap-4">
      <div className="h-32 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-32 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-32 animate-pulse rounded-lg bg-gray-200" />
    </div>
    <div className="h-64 animate-pulse rounded-lg bg-gray-200" />
  </main>
)

export default DashboardLoading
```

### `error.tsx` — route-level error boundary

Shown when a Server Component throws (for example a failed Prisma query or a service error). **Must be `'use client'`** — required by Next.js.

```tsx
// app/dashboard/error.tsx
'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const DashboardError = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Log to error tracking (e.g. Sentry) — never render raw server messages.
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-500">
        Please try again. If the problem continues, contact support.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  )
}

export default DashboardError
```

### File placement per route

```
app/
├── (portal)/
│   ├── dashboard/
│   │   ├── page.tsx         # renders <DashboardView />
│   │   ├── layout.tsx
│   │   ├── loading.tsx      # ← skeleton while DashboardView loads data
│   │   └── error.tsx        # ← shown if the view or a query throws
│   ├── chambers/…
│   └── appointments/…
├── (auth)/
│   ├── login/
│   │   ├── page.tsx
│   │   └── loading.tsx  # ← light skeleton for auth pages
```

### Rules

| Rule                                               | Reason                                      |
| -------------------------------------------------- | ------------------------------------------- |
| `loading.tsx` — no `'use client'`                  | It's a Server Component — Suspense boundary |
| `error.tsx` — always `'use client'`                | Next.js requirement for error boundaries    |
| Mirror `loading.tsx` layout to real page           | Prevents layout shift when content loads    |
| Always call `reset()` from a button in `error.tsx` | Lets users recover without full page reload |
| Use `animate-pulse` + `bg-gray-200` for skeletons  | Pure Tailwind — no extra library needed     |

---

## 15. ESLint Configuration

ESLint enforces rules that Prettier cannot — import order, no `any`, accessibility, React patterns, and the **server/client boundary**. The same config also protects the database: client components must never pull Prisma, `bcryptjs` or JWT signing code into the browser bundle.

### Install

```bash
npm install -D eslint eslint-config-next
```

> `eslint`, `eslint-config-next` and the React/a11y/import plugins they bundle are included with a modern Next.js app — do not install the individual plugins separately. Prettier is covered in Section 17.

### `eslint.config.mjs` (flat config — ESLint v9+)

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// ★ Server-only modules (Section 9) — never import these from a Client Component
const serverOnlyPaths = [
  { name: '@/lib/db', message: 'Prisma is server-only. Query through a service.' },
  { name: '@/lib/auth', message: 'Session helpers are server-only. Call /api/auth/*.' },
  { name: '@/lib/env', message: 'Environment secrets are server-only.' },
]

const serverOnlyPatterns = [
  {
    group: ['@/server/*'],
    message: 'Domain services are server-only. Use /api/* from client code.',
  },
  { group: ['@prisma/client'], message: 'Prisma is server-only. Query through a service.' },
]

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript (Section 4)
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',

      // React (Sections 3, 5)
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/no-array-index-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import order (Section 7)
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',

      // Accessibility (Section 5)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/no-access-key': 'error',
    },
  },

  {
    // ★ Client-side UI must never import server-only modules (Section 9)
    files: ['src/components/**/*.tsx', 'src/views/**/components/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: serverOnlyPaths,
          patterns: serverOnlyPatterns,
        },
      ],
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
```

> **Why an override?** `src/components/**` and `src/views/**/components/**` hold interactive Client Components. Server Components live in `views/*.tsx` and `views/*/sections/` and may import services. The `server-only` package still provides a hard build-time guarantee if an import slips through.

### `package.json` scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

> Next.js 16 removed `next lint`. Call the ESLint CLI directly.

### Key rules explained

| Rule                          | What it enforces                                         |
| ----------------------------- | -------------------------------------------------------- |
| `no-explicit-any`             | Bans `any` — matches Section 4                           |
| `consistent-type-imports`     | Forces `import type {}` for type-only imports            |
| `no-floating-promises`        | Every async call must be awaited or `.catch()`d          |
| `no-array-index-key`          | Bans `key={index}` — matches Section 5                   |
| `react-hooks/exhaustive-deps` | Catches missing `useEffect`/`useCallback` dependencies   |
| `import/order`                | Auto-enforces the import order from Section 7            |
| `no-restricted-imports`       | ★ Keeps Prisma/auth/server code out of Client Components |
| `jsx-a11y/*`                  | Enforces accessibility rules from Section 5              |

---

## 16. Authentication — JWT + httpOnly Cookies

This app issues and verifies its **own** sessions. There is no upstream identity provider. Passwords are hashed with **bcryptjs** (cost 12 — compatible with existing `$2b$` hashes in the database) and sessions are **JWTs signed with `jose`**. Both the access token and the refresh token live in httpOnly cookies; the refresh token is also persisted in `refresh_tokens` so it can be rotated and revoked.

### Token strategy

| Token         | Storage                    | Lifetime | Purpose                                |
| ------------- | -------------------------- | -------- | -------------------------------------- |
| Access token  | `__Host-dz_access` cookie  | 15 min   | Authenticates API calls and page loads |
| Refresh token | `__Host-dz_refresh` cookie | 7 days   | Rotates the access token; stored in DB |

> `__Host-` cookies require `Secure`, `Path=/` and **no** `Domain`. They are therefore only valid over HTTPS; in local development the cookie names are used without the prefix and `secure` is disabled.

### Why httpOnly cookies (not localStorage)

| Concern            | httpOnly cookie                   | localStorage                     |
| ------------------ | --------------------------------- | -------------------------------- |
| XSS token theft    | ❌ JS cannot read the cookie      | ✅ Any script can read the token |
| CSRF               | Needs `SameSite` + origin checks  | Not applicable (no auto-send)    |
| SSR auth           | ✅ Available in Server Components | ❌ Unavailable on the server     |
| Logout across tabs | ✅ Server clears the cookie       | ⚠️ Manual storage events         |

### Flow

```
register ──► hash password ──► create User (role = DOCTOR) ──► issue tokens ──► Set-Cookie
login    ──► verify bcrypt ──► issue tokens ────────────────► Set-Cookie
request  ──► cookie ──► jwtVerify ──► load user ──► authorize
refresh  ──► find+revoke old refresh ──► issue new pair ──► Set-Cookie
logout   ──► revoke refresh ──► clear cookies
```

### Environment

```bash
# .env
DATABASE_URL="postgresql://..."
JWT_SECRET="<at least 32 random bytes>"
JWT_ACCESS_TTL="15m"
JWT_REFRESH_TTL="7d"
```

```ts
// src/lib/env.ts
import { z } from 'zod'

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
})

const parsed = EnvSchema.safeParse(process.env)
if (!parsed.success) throw new Error(`Invalid environment:\n${parsed.error.toString()}`)

export const env = parsed.data
```

### Prisma singleton

```ts
// src/lib/db.ts
import 'server-only'

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### Password + token helpers

```ts
// src/lib/auth.ts
import 'server-only'

import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import type { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { env } from '@/lib/env'

import type { UserRole } from '@prisma/client'

const key = new TextEncoder().encode(env.JWT_SECRET)
const BCRYPT_ROUNDS = 12
const isProd = process.env.NODE_ENV === 'production'

export const ACCESS_COOKIE = isProd ? '__Host-dz_access' : 'dz_access'
export const REFRESH_COOKIE = isProd ? '__Host-dz_refresh' : 'dz_refresh'

const baseCookie = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
}

export interface SessionUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface IssuedTokens {
  accessToken: string
  refreshToken: string
}

export const hashPassword = (password: string) => bcrypt.hash(password, BCRYPT_ROUNDS)
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash)

export const parseDuration = (value: string): number => {
  const match = /^(\d+)([smhd])$/.exec(value)
  if (!match) throw new Error(`Invalid duration: ${value}`)
  const amount = Number(match[1])
  const unit = { s: 1, m: 60, h: 3600, d: 86400 }[match[2] as 's' | 'm' | 'h' | 'd']
  return amount * unit
}

export const signAccessToken = (userId: string, role: UserRole) =>
  new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(env.JWT_ACCESS_TTL)
    .sign(key)

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (!payload.sub) return null
    return { userId: payload.sub, role: payload.role as UserRole }
  } catch {
    return null
  }
}

export const setAuthCookies = (res: NextResponse, tokens: IssuedTokens) => {
  res.cookies.set(ACCESS_COOKIE, tokens.accessToken, {
    ...baseCookie,
    maxAge: parseDuration(env.JWT_ACCESS_TTL),
  })
  res.cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
    ...baseCookie,
    maxAge: parseDuration(env.JWT_REFRESH_TTL),
  })
  return res
}

export const clearAuthCookies = (res: NextResponse) => {
  res.cookies.set(ACCESS_COOKIE, '', { ...baseCookie, maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, '', { ...baseCookie, maxAge: 0 })
  return res
}

const selectSessionUser = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  deletedAt: true,
} as const

const loadUser = async (id: string): Promise<SessionUser | null> => {
  const user = await db.user.findUnique({ where: { id }, select: selectSessionUser })
  if (!user || !user.isActive || user.deletedAt) return null
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const store = await cookies()
  const token = store.get(ACCESS_COOKIE)?.value

  if (token) {
    const payload = await verifyAccessToken(token)
    if (payload) return loadUser(payload.userId)
  }

  // Access token expired → accept a live refresh token so SSR page loads work.
  // A Client Component rotates it through POST /api/auth/refresh on the next 401.
  const refreshToken = store.get(REFRESH_COOKIE)?.value
  if (!refreshToken) return null

  const stored = await db.refreshToken.findUnique({
    where: { token: refreshToken },
    select: { revokedAt: true, expiresAt: true, user: { select: selectSessionUser } },
  })

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) return null
  const { user } = stored
  if (!user.isActive || user.deletedAt) return null

  return { id: user.id, name: user.name, email: user.email, role: user.role }
}
```

### Auth service

```ts
// src/server/auth/auth.service.ts
import 'server-only'

import { ApiError } from '@/lib/api-error'
import {
  hashPassword,
  parseDuration,
  signAccessToken,
  verifyPassword,
  type IssuedTokens,
  type SessionUser,
} from '@/lib/auth'
import { db } from '@/lib/db'
import { env } from '@/lib/env'

export interface RegisterInput {
  name: string
  email: string
  password: string
}

const selectPublicUser = { id: true, name: true, email: true, role: true } as const

export const authService = {
  async register(input: RegisterInput): Promise<SessionUser> {
    const existing = await db.user.findUnique({ where: { email: input.email } })
    if (existing) throw new ApiError(409, 'Email is already registered')

    // ★ Never accept a role from the client — this app only creates doctors.
    return db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await hashPassword(input.password),
        role: 'DOCTOR',
      },
      select: selectPublicUser,
    })
  },

  async login(email: string, password: string): Promise<SessionUser> {
    const user = await db.user.findUnique({ where: { email } })

    // Generic message — never reveal whether the email exists.
    if (!user || !user.isActive || user.deletedAt) {
      throw new ApiError(401, 'Invalid email or password')
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) throw new ApiError(401, 'Invalid email or password')

    return { id: user.id, name: user.name, email: user.email, role: user.role }
  },

  async issueTokens(user: Pick<SessionUser, 'id' | 'role'>): Promise<IssuedTokens> {
    const accessToken = await signAccessToken(user.id, user.role)
    const refresh = await db.refreshToken.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + parseDuration(env.JWT_REFRESH_TTL) * 1000),
      },
      select: { token: true },
    })
    return { accessToken, refreshToken: refresh.token }
  },

  async rotate(refreshToken: string): Promise<IssuedTokens> {
    const stored = await db.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: { select: { id: true, role: true, isActive: true, deletedAt: true } } },
    })

    if (!stored) throw new ApiError(401, 'Invalid session')

    // Reuse of a revoked token = likely theft → revoke the whole family.
    if (stored.revokedAt) {
      await db.refreshToken.updateMany({
        where: { userId: stored.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      })
      throw new ApiError(401, 'Session revoked')
    }

    if (stored.expiresAt < new Date()) throw new ApiError(401, 'Session expired')
    if (!stored.user.isActive || stored.user.deletedAt) throw new ApiError(401, 'Account disabled')

    await db.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } })

    return this.issueTokens(stored.user)
  },

  async revoke(refreshToken: string) {
    await db.refreshToken.updateMany({
      where: { token: refreshToken, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  },

  async revokeAll(userId: string) {
    await db.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  },
}
```

> `rotate()` passes the stored user to `issueTokens()`; only `id` and `role` are needed to sign the access token.

### Routes

```ts
// src/server/auth/auth.schema.ts
import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  // bcrypt truncates after 72 bytes — cap it explicitly.
  password: z.string().min(8).max(72),
})

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(72),
})
```

```ts
// src/app/api/auth/register/route.ts
import type { NextRequest } from 'next/server'

import { badRequest, created, handleApiError } from '@/lib/api-utils'
import { setAuthCookies } from '@/lib/auth'
import { authService } from '@/server/auth/auth.service'

import { RegisterSchema } from '@/server/auth/auth.schema'

export const POST = async (req: NextRequest) => {
  try {
    const parsed = RegisterSchema.safeParse(await req.json())
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.flatten().fieldErrors)
    }

    const user = await authService.register(parsed.data)
    const tokens = await authService.issueTokens(user)
    return setAuthCookies(created(user), tokens)
  } catch (error) {
    return handleApiError(error)
  }
}
```

```ts
// src/app/api/auth/login/route.ts
import type { NextRequest } from 'next/server'

import { badRequest, handleApiError, ok } from '@/lib/api-utils'
import { setAuthCookies } from '@/lib/auth'
import { authService } from '@/server/auth/auth.service'
import { LoginSchema } from '@/server/auth/auth.schema'

export const POST = async (req: NextRequest) => {
  try {
    const parsed = LoginSchema.safeParse(await req.json())
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.flatten().fieldErrors)
    }

    const user = await authService.login(parsed.data.email, parsed.data.password)
    const tokens = await authService.issueTokens(user)
    return setAuthCookies(ok(user), tokens)
  } catch (error) {
    return handleApiError(error)
  }
}
```

```ts
// src/app/api/auth/refresh/route.ts
import { cookies } from 'next/headers'

import { handleApiError, ok, unauthorized } from '@/lib/api-utils'
import { REFRESH_COOKIE, setAuthCookies } from '@/lib/auth'
import { authService } from '@/server/auth/auth.service'

export const POST = async () => {
  try {
    const store = await cookies()
    const refreshToken = store.get(REFRESH_COOKIE)?.value
    if (!refreshToken) return unauthorized()

    const tokens = await authService.rotate(refreshToken)
    return setAuthCookies(ok({ rotated: true }), tokens)
  } catch (error) {
    return handleApiError(error)
  }
}
```

```ts
// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers'

import { ok } from '@/lib/api-utils'
import { clearAuthCookies, REFRESH_COOKIE } from '@/lib/auth'
import { authService } from '@/server/auth/auth.service'

export const POST = async () => {
  const store = await cookies()
  const refreshToken = store.get(REFRESH_COOKIE)?.value
  if (refreshToken) await authService.revoke(refreshToken)

  return clearAuthCookies(ok({ loggedOut: true }))
}
```

```ts
// src/app/api/auth/me/route.ts
import { ok, requireUser } from '@/lib/api-utils'

export const GET = async () => {
  const user = await requireUser()
  return ok(user)
}
```

### Protecting pages

The portal layout is the server-side gate. `proxy.ts` (Section 13) handles the fast redirect; the layout confirms the session against the database.

```tsx
// src/app/(portal)/layout.tsx
import { redirect } from 'next/navigation'

import { getSessionUser } from '@/lib/auth'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  return <DashboardShell user={user}>{children}</DashboardShell>
}
```

### Doctor onboarding

Registration creates a `User` with `role = 'DOCTOR'` but **no `Doctor` row**. Directory profiles are unclaimed (`Doctor.userId` is `null`), so the portal must support both onboarding paths:

| Path             | Endpoint                 | Rule                                                              |
| ---------------- | ------------------------ | ----------------------------------------------------------------- |
| Claim a profile  | `POST /api/doctor/claim` | The target `Doctor` must exist, be unclaimed and not soft-deleted |
| Create a profile | `POST /api/doctor/me`    | The session user must not already own a profile                   |

Both paths must run in a transaction and reject a second profile for the same `userId`. `GET /api/doctor/me` returns the linked profile (or `404` when onboarding is still pending).

### Protecting API routes

```ts
// src/lib/api-utils.ts (excerpt)
import { getSessionUser } from '@/lib/auth'

export const requireUser = async () => {
  const user = await getSessionUser()
  if (!user) throw new ApiError(401, 'Authentication required')
  return user
}

export const requireDoctor = async () => {
  const user = await requireUser()
  if (user.role !== 'DOCTOR') throw new ApiError(403, 'Doctor access required')
  return user
}
```

### Client-side usage

Client Components never see or store a token. They call the API with `credentials: 'same-origin'` (the default for same-origin `fetch`) and let the cookie do the work:

```ts
await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(values),
  credentials: 'same-origin',
})
```

Wrap API calls so an expired access token is rotated once, then retried:

```ts
// views/shared/api-client.ts
export const apiFetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, { ...init, credentials: 'same-origin' })
  if (res.status !== 401) return res

  const refreshed = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'same-origin',
  })
  if (!refreshed.ok) return res

  return fetch(input, { ...init, credentials: 'same-origin' })
}
```

### Security rules

| Rule                                                                | Reason                                                   |
| ------------------------------------------------------------------- | -------------------------------------------------------- |
| Force `role: 'DOCTOR'` on registration — never accept a client role | Prevent privilege escalation into `ADMIN`/`SUPER_ADMIN`  |
| Hash with bcrypt cost 12; cap passwords at 72 bytes                 | Compatible with existing hashes; bcrypt truncation limit |
| Use a generic “Invalid email or password” message                   | Prevent account enumeration                              |
| Keep the access token short-lived and rotate refresh tokens         | Limits the blast radius of a stolen token                |
| Revoke **all** refresh tokens on password change or reuse detection | Kills stolen sessions                                    |
| `httpOnly` + `Secure` + `SameSite=Lax` + `__Host-` prefix           | Blocks XSS token reads and most CSRF                     |
| Return `401`/`403` from every protected API route                   | Proxy redirects are UX, not authorization                |
| Never log tokens, passwords or `password` fields                    | Logs are commonly shipped to third parties               |
| Rate-limit `/api/auth/login` and `/api/auth/register`               | Slows credential stuffing                                |

---

## 17. Prettier Configuration

Prettier handles all formatting automatically — never argue about formatting in code review.

### `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### `.prettierignore`

```
.next/
node_modules/
public/
dist/
build/
*.min.js
pnpm-lock.yaml
package-lock.json
```

### Key Decisions Explained

| Option                        | Value      | Why                                                                   |
| ----------------------------- | ---------- | --------------------------------------------------------------------- |
| `semi`                        | `false`    | No semicolons — cleaner look, TypeScript/ESLint catches issues        |
| `singleQuote`                 | `true`     | Single quotes in JS/TS expressions                                    |
| `jsxSingleQuote`              | `false`    | Double quotes in JSX attributes (HTML convention)                     |
| `trailingComma`               | `"all"`    | Cleaner git diffs when adding props/args                              |
| `printWidth`                  | `100`      | Wider than 80 — modern monitors, Next.js files tend to be verbose     |
| `bracketSameLine`             | `false`    | Closing `>` on its own line for multi-line JSX                        |
| `arrowParens`                 | `"always"` | Always `(x) =>` not `x =>` — consistent and required by some TS cases |
| `endOfLine`                   | `"lf"`     | Unix line endings — consistent across macOS/Linux/Windows             |
| `prettier-plugin-tailwindcss` | enabled    | Auto-sorts Tailwind classes in the official recommended order         |

### Install

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

### VS Code integration (`.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  }
}
```

### `package.json` scripts

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

## 18. Pre-commit Hooks

Uses **husky** + **lint-staged** to run Prettier format check and ESLint on staged files only before every commit. If either fails, the commit is blocked.

### Install

```bash
npm install -D husky lint-staged
npx husky init
```

> `husky init` creates a `.husky/` folder and adds a `prepare` script to `package.json` automatically.

### `.husky/pre-commit`

```sh
npx lint-staged
```

That's the entire file — `lint-staged` reads its config from `package.json`.

### `package.json` — lint-staged config

```json
{
  "scripts": {
    "prepare": "husky",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["prettier --check", "eslint --max-warnings=0"],
    "*.{json,css,md}": ["prettier --check"]
  }
}
```

### What happens on `git commit`

```
git commit -m "feat: add user card"
  → husky triggers pre-commit
    → lint-staged runs on staged files only
      → prettier --check  *.{ts,tsx,json,css,md}
          FAIL? ❌ Commit blocked — run `npm run format` then re-commit
          PASS? ✔️
      → eslint --max-warnings=0  *.{ts,tsx}
          FAIL? ❌ Commit blocked — run `npm run lint:fix` then re-commit
          PASS? ✔️
  → Commit succeeds
```

### Why `--max-warnings=0`

ESLint warnings are treated as errors — nothing gets committed with lint warnings. This enforces `react-hooks/exhaustive-deps` and other `warn`-level rules strictly.

### Skipping in emergencies (use sparingly)

```bash
git commit -m "wip" --no-verify
```

> Only use `--no-verify` for WIP commits on personal branches. Never on `main` or `develop`.

### Rules

| Rule                                               | Reason                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| Run `prettier --check` not `--write` in pre-commit | Auto-fixing silently hides problems — developer should fix intentionally |
| `--max-warnings=0` in ESLint                       | Warnings are technical debt — block them at the gate                     |
| lint-staged runs on staged files only              | Fast — doesn't lint the entire project on every commit                   |
| Never `--no-verify` on shared branches             | Bypasses all quality gates                                               |

---

## 19. API Routes as the Backend — Services, Repositories, Prisma

`app/api/*` **is** the backend. There is no proxy layer and no upstream service: a route handler validates the request, resolves the session, delegates to a domain service, and the service talks to PostgreSQL through a Prisma repository.

```
Browser (Client Components, forms, fetch)
        │
        ▼
app/api/<domain>/route.ts      HTTP: parse, validate (Zod), auth, status codes
        │
        ▼
server/<domain>/<domain>.service.ts    Business rules, ownership, transactions
        │
        ▼
server/<domain>/<domain>.repository.ts Prisma queries (select / where / include)
        │
        ▼
Prisma Client → PostgreSQL
```

> **Server Components skip the HTTP hop:** they call the same `server/<domain>` service directly (Section 9). Both paths share validation, authorization and query logic — only the transport differs.

### Layering rules

| Layer          | Owns                                                            | Must not                                                  |
| -------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| **Route**      | HTTP parsing, Zod validation, auth guard, status code, response | Contain business rules, Prisma calls, or multi-step logic |
| **Service**    | Business rules, ownership checks, orchestration, transactions   | Know about `NextRequest`, cookies, HTTP status codes¹     |
| **Repository** | Prisma queries, `select` shapes, filters, pagination, `orderBy` | Enforce business rules or make authorization decisions    |
| **Prisma**     | SQL, relations, constraints                                     | Leak into UI code                                         |

¹ Services throw `ApiError` with an HTTP status — a pragmatic exception that keeps error mapping in one place.

### `lib/api-error.ts`

```ts
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fields?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
```

### `lib/api-utils.ts`

```ts
import 'server-only'

import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

import { ApiError } from '@/lib/api-error'
import { getSessionUser } from '@/lib/auth'

export const ok = <T>(data: T) => NextResponse.json({ success: true, data })
export const created = <T>(data: T) => NextResponse.json({ success: true, data }, { status: 201 })

export const errorResponse = (message: string, status: number, fields?: Record<string, string[]>) =>
  NextResponse.json({ success: false, error: { message, fields } }, { status })

export const badRequest = (message = 'Bad request', fields?: Record<string, string[]>) =>
  errorResponse(message, 400, fields)
export const unauthorized = (message = 'Authentication required') => errorResponse(message, 401)
export const forbidden = (message = 'Forbidden') => errorResponse(message, 403)
export const notFound = (message = 'Not found') => errorResponse(message, 404)
export const conflict = (message = 'Conflict') => errorResponse(message, 409)
export const serverError = (message = 'Internal server error') => errorResponse(message, 500)

export const requireUser = async () => {
  const user = await getSessionUser()
  if (!user) throw new ApiError(401, 'Authentication required')
  return user
}

export const requireDoctor = async () => {
  const user = await requireUser()
  if (user.role !== 'DOCTOR') throw new ApiError(403, 'Doctor access required')
  return user
}

export const getPagination = (searchParams: URLSearchParams) => {
  const page = Math.max(1, Number(searchParams.get('page') ?? 1) || 1)
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20) || 20))
  return { page, limit, skip: (page - 1) * limit }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return errorResponse(error.message, error.status, error.fields)
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        const target = (error.meta?.target as string[] | undefined)?.join(', ')
        return conflict(target ? `A record with this ${target} already exists` : 'Duplicate record')
      }
      case 'P2025':
        return notFound('Record not found')
      case 'P2003':
        return conflict('Related record does not exist')
      case 'P2014':
        return conflict('The change would break a required relation')
      default:
        break
    }
  }

  console.error('[api] unhandled error', error)
  return serverError()
}
```

> **Never return raw Prisma errors to the browser.** They leak table, column and constraint names.

### The domain: Chambers

A doctor can only see and modify **their own** chambers. The `doctorId` always comes from the session — never from the request body.

```ts
// src/server/chambers/chambers.schema.ts
import { z } from 'zod'

export const WorkingDaysSchema = z.record(z.string(), z.array(z.string()))

export const CreateChamberSchema = z.object({
  facilityName: z.string().trim().min(1).max(200),
  roomNo: z.coerce.number().int().min(0).default(0),
  workingDays: WorkingDaysSchema.default({}),
  consultationFee: z.coerce.number().min(0).optional(),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export const UpdateChamberSchema = CreateChamberSchema.partial()

export type CreateChamberInput = z.infer<typeof CreateChamberSchema>
export type UpdateChamberInput = z.infer<typeof UpdateChamberSchema>
```

#### Repository — Prisma only

```ts
// src/server/chambers/chambers.repository.ts
import 'server-only'

import type { Prisma } from '@prisma/client'

import { db } from '@/lib/db'

export const chamberSelect = {
  id: true,
  facilityName: true,
  slug: true,
  roomNo: true,
  workingDays: true,
  consultationFee: true,
  isPrimary: true,
  isActive: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ChamberSelect

export type ChamberRow = Prisma.ChamberGetPayload<{ select: typeof chamberSelect }>

export const chambersRepository = {
  listByDoctor(doctorId: string) {
    return db.chamber.findMany({
      where: { doctorId, deletedAt: null },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
      select: chamberSelect,
    })
  },

  findOwned(id: string, doctorId: string) {
    return db.chamber.findFirst({
      where: { id, doctorId, deletedAt: null },
      select: chamberSelect,
    })
  },

  async create(doctorId: string, input: Prisma.ChamberUncheckedCreateInput) {
    return db.chamber.create({
      data: { ...input, doctorId },
      select: chamberSelect,
    })
  },

  update(id: string, input: Prisma.ChamberUpdateInput) {
    return db.chamber.update({ where: { id }, data: input, select: chamberSelect })
  },

  softDelete(id: string) {
    return db.chamber.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
      select: { id: true },
    })
  },
}
```

```ts
// src/server/doctors/doctors.repository.ts (excerpt)
export const findByUserId = (userId: string) =>
  db.doctor.findFirst({
    where: { userId, deletedAt: null },
    select: { id: true, name: true, userId: true },
  })
```

#### Service — rules, ownership, transactions

```ts
// src/server/chambers/chambers.service.ts
import 'server-only'

import { ApiError } from '@/lib/api-error'
import { db } from '@/lib/db'
import { doctorsRepository } from '@/server/doctors/doctors.repository'

import { chamberSelect, chambersRepository } from './chambers.repository'
import type { CreateChamberInput, UpdateChamberInput } from './chambers.schema'

const requireDoctorProfile = async (userId: string) => {
  const doctor = await doctorsRepository.findByUserId(userId)
  if (!doctor) throw new ApiError(404, 'Doctor profile not found')
  return doctor
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const chambersService = {
  async list(userId: string) {
    const doctor = await requireDoctorProfile(userId)
    return chambersRepository.listByDoctor(doctor.id)
  },

  async create(userId: string, input: CreateChamberInput) {
    const doctor = await requireDoctorProfile(userId)
    const slug = `${slugify(input.facilityName)}-${doctor.id.slice(-6)}`

    // A doctor has at most one primary chamber → clear the old one atomically.
    return db.$transaction(async (tx) => {
      if (input.isPrimary) {
        await tx.chamber.updateMany({
          where: { doctorId: doctor.id, isPrimary: true, deletedAt: null },
          data: { isPrimary: false },
        })
      }

      return tx.chamber.create({
        data: {
          doctorId: doctor.id,
          facilityName: input.facilityName,
          slug,
          roomNo: input.roomNo,
          workingDays: input.workingDays,
          consultationFee: input.consultationFee ?? null,
          isPrimary: input.isPrimary,
          isActive: input.isActive,
        },
        select: chamberSelect,
      })
    })
  },

  async update(userId: string, id: string, input: UpdateChamberInput) {
    const doctor = await requireDoctorProfile(userId)
    const existing = await chambersRepository.findOwned(id, doctor.id)
    if (!existing) throw new ApiError(404, 'Chamber not found')

    return db.$transaction(async (tx) => {
      if (input.isPrimary) {
        await tx.chamber.updateMany({
          where: { doctorId: doctor.id, isPrimary: true, deletedAt: null, NOT: { id } },
          data: { isPrimary: false },
        })
      }

      return tx.chamber.update({
        where: { id },
        data: input,
        select: chamberSelect,
      })
    })
  },

  async remove(userId: string, id: string) {
    const doctor = await requireDoctorProfile(userId)
    const existing = await chambersRepository.findOwned(id, doctor.id)
    if (!existing) throw new ApiError(404, 'Chamber not found')

    await chambersRepository.softDelete(id)
    return { id }
  },
}
```

> **Ownership by query, not by comparison.** `findOwned(id, doctorId)` returns `null` when the row belongs to someone else, so the route returns `404` and never confirms that another doctor's chamber exists.

#### Route handlers — thin

```ts
// src/app/api/chambers/route.ts
import type { NextRequest } from 'next/server'

import { badRequest, created, handleApiError, ok, requireDoctor } from '@/lib/api-utils'
import { chambersService } from '@/server/chambers/chambers.service'

import { CreateChamberSchema } from '@/server/chambers/chambers.schema'

export const GET = async () => {
  try {
    const user = await requireDoctor()
    return ok(await chambersService.list(user.id))
  } catch (error) {
    return handleApiError(error)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const user = await requireDoctor()
    const parsed = CreateChamberSchema.safeParse(await req.json())
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.flatten().fieldErrors)
    }

    return created(await chambersService.create(user.id, parsed.data))
  } catch (error) {
    return handleApiError(error)
  }
}
```

```ts
// src/app/api/chambers/[id]/route.ts
import type { NextRequest } from 'next/server'

import { badRequest, handleApiError, ok, requireDoctor } from '@/lib/api-utils'
import { chambersService } from '@/server/chambers/chambers.service'

import { UpdateChamberSchema } from '@/server/chambers/chambers.schema'

interface RouteContext {
  params: Promise<{ id: string }>
}

export const PATCH = async (req: NextRequest, { params }: RouteContext) => {
  try {
    const user = await requireDoctor()
    const { id } = await params
    const parsed = UpdateChamberSchema.safeParse(await req.json())
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.flatten().fieldErrors)
    }

    return ok(await chambersService.update(user.id, id, parsed.data))
  } catch (error) {
    return handleApiError(error)
  }
}

export const DELETE = async (_req: NextRequest, { params }: RouteContext) => {
  try {
    const user = await requireDoctor()
    const { id } = await params
    await chambersService.remove(user.id, id)
    return ok({ id })
  } catch (error) {
    return handleApiError(error)
  }
}
```

> Route `params` are a **Promise** in Next.js 15+. Always `await params`.

### Pagination + filtering (Appointments)

```ts
// src/app/api/appointments/route.ts (excerpt)
export const GET = async (req: NextRequest) => {
  try {
    const user = await requireDoctor()
    const { page, limit, skip } = getPagination(req.nextUrl.searchParams)

    const { items, total } = await appointmentsService.listForDoctor(user.id, {
      skip,
      take: limit,
      status: req.nextUrl.searchParams.get('status') ?? undefined,
    })

    return ok({ items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } })
  } catch (error) {
    return handleApiError(error)
  }
}
```

```ts
// src/server/appointments/appointments.repository.ts (excerpt)
import type { Prisma } from '@prisma/client'

export const appointmentSelect = {
  id: true,
  date: true,
  status: true,
  notes: true,
  createdAt: true,
  user: { select: { id: true, name: true, email: true } },
} satisfies Prisma.AppointmentSelect

export const listForDoctor = async (
  doctorId: string,
  args: { skip: number; take: number; status?: string },
) => {
  const where: Prisma.AppointmentWhereInput = {
    doctorId,
    deletedAt: null,
    ...(args.status ? { status: args.status } : {}),
  }

  const [items, total] = await db.$transaction([
    db.appointment.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: args.skip,
      take: args.take,
      select: appointmentSelect,
    }),
    db.appointment.count({ where }),
  ])

  return { items, total }
}
```

> Use `db.$transaction([...])` for page + count so both queries run in one transaction and one round trip.

### Transactions

Use a transaction when **two or more writes must succeed together** — creating a user plus their first doctor profile, rotating a refresh token, clearing the previous primary chamber:

```ts
await db.$transaction(async (tx) => {
  const chamber = await tx.chamber.create({ data: { ... }, select: chamberSelect })
  await tx.doctor.update({ where: { id: doctorId }, data: { updatedAt: new Date() } })
  return chamber
})
```

| Rule                                                      | Reason                                            |
| --------------------------------------------------------- | ------------------------------------------------- |
| Keep transactions short — no `fetch`, no email, no files  | Long transactions hold locks and exhaust the pool |
| Never call another service that opens its own transaction | Nested connections can deadlock                   |
| Throw `ApiError` inside the callback to roll back         | Prisma rolls back on any thrown error             |
| Prefer `$transaction([...])` for independent reads        | One round trip, consistent snapshot               |

### Route handler rules

| Rule                                                                | Reason                                                  |
| ------------------------------------------------------------------- | ------------------------------------------------------- |
| Keep handlers under ~40 lines                                       | Logic belongs in the service                            |
| Validate body, query and params with Zod before any DB access       | Never trust the client                                  |
| Resolve `userId` from the session — never from the body             | Prevents horizontal privilege escalation                |
| Scope every query by the owning doctor                              | Row-level authorization, not just authentication        |
| Use `select` — never return full rows                               | Avoid leaking `adminExtraInformation`, `password`, etc. |
| Map Prisma errors to HTTP in one place (`handleApiError`)           | Consistent responses, no schema leaks                   |
| Soft-delete with `deletedAt` + filter `deletedAt: null`             | Recoverable data, no dangling relations                 |
| Return `201` on create, `200` on read/update, `204`/`200` delete    | Predictable client behavior                             |
| Set `export const runtime = 'nodejs'` only when a segment overrides | Node is the default and Prisma requires it              |

### Checklist for a new endpoint

1. Define the Zod schema in `server/<domain>/<domain>.schema.ts` (or `app/api/<domain>/schema.ts` if only the route uses it).
2. Add the repository method with an explicit `select`.
3. Add the service method — validate ownership, wrap multi-writes in a transaction.
4. Write the route: `requireUser`/`requireDoctor` → `safeParse` → service → `ok`/`created`.
5. Wrap the body in `try/catch` and return `handleApiError(error)`.
6. Add the client call to `views/<domain>/api.ts` (never import server code).
7. Add an integration test against a disposable Postgres database.

---

## 20. Database & Prisma Conventions

The app owns a PostgreSQL database. Prisma is the **only** data-access layer: no raw SQL in components, no second ORM, no HTTP call to another backend for data the app already stores.

### Schema conventions

| Concern        | Convention                                                                   |
| -------------- | ---------------------------------------------------------------------------- |
| Primary keys   | `String @id @default(cuid())`                                                |
| Timestamps     | `createdAt @default(now())`, `updatedAt @updatedAt`, both `@db.Timestamptz`  |
| Soft delete    | `deletedAt DateTime? @db.Timestamptz()` — never hard-delete business rows    |
| Money          | `Decimal @db.Decimal(10, 2)` — never `Float` for currency                    |
| Enums          | Prisma `enum` for closed sets; `String` only for legacy columns              |
| Table names    | `@@map("snake_case_plural")` — match the existing database                   |
| Relations      | Explicit `onDelete` (`Cascade` for owned children, `SetNull` for references) |
| Indexes        | Index every foreign key and every column used in a `where`/`orderBy`         |
| Private fields | `adminExtraInformation`, `medicalHistoryEnc` — never returned to clients     |

### Client singleton

`src/lib/db.ts` exports one `PrismaClient` instance, cached on `globalThis` in development so hot reload does not exhaust connections. See Section 16 for the implementation. Every repository imports `db` from there — never `new PrismaClient()` anywhere else.

### Migrations

```bash
# Create + apply a migration in development
npx prisma migrate dev --name add_chamber_indexes

# Apply pending migrations in CI / production (no prompts, no resets)
npx prisma migrate deploy

# Regenerate the client after a schema change
npx prisma generate
```

**Never run `prisma db push` against production.** It bypasses migration history and can drop data.

#### Adopting an existing database

This project starts from a database that already contains tables. Baseline it instead of recreating it:

```bash
# 1. Generate Prisma models from the live database
npx prisma db pull

# 2. Create an initial migration without executing it
npx prisma migrate dev --create-only --name baseline

# 3. Mark that migration as already applied
npx prisma migrate resolve --applied <migration_name>
```

From then on, every schema change goes through `migrate dev` locally and `migrate deploy` in CI/production.

### Query rules

| Rule                                                            | Reason                                                                 |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Always pass `select` (or a shared `*Select` constant)           | Prevents leaking `password`, `adminExtraInformation`, encrypted fields |
| Filter `deletedAt: null` on every soft-deleted model            | Deleted rows must never appear in lists or lookups                     |
| Paginate every list endpoint (`skip`/`take` + `count`)          | Avoid loading thousands of rows into memory                            |
| Use `include` only for relations the response actually needs    | Prevents over-fetching and N+1 payload bloat                           |
| Prefer one query with `include`/`select` over a loop of queries | N+1 kills latency at scale                                             |
| Use `$transaction([...])` for page + count                      | One round trip, consistent connection state                            |
| Use `$transaction(async (tx) => …)` for multi-write invariants  | All-or-nothing writes                                                  |
| Never build `where` from raw client strings                     | Use validated enums / parsed dates                                     |
| Wrap `PrismaClientKnownRequestError` in `handleApiError`        | Consistent HTTP mapping, no schema leaks                               |

### Soft delete

```ts
// Delete
await db.chamber.update({
  where: { id },
  data: { deletedAt: new Date(), isActive: false },
})

// Every read
await db.chamber.findMany({ where: { doctorId, deletedAt: null } })
```

- `DELETE` endpoints soft-delete and return `200` (or `204`).
- Admin-only restore endpoints set `deletedAt: null`.
- Unique constraints still apply to soft-deleted rows — prefer partial unique indexes in a raw migration when reuse must be allowed.

### Row-level ownership

Authentication answers _who_ the user is; the query must answer _what they may touch_.

```ts
// ✅ Ownership is part of the WHERE clause
const chamber = await db.chamber.findFirst({
  where: { id, doctorId, deletedAt: null },
})

// ❌ Fetch-then-compare is easy to forget on one branch
const chamber = await db.chamber.findUnique({ where: { id } })
if (chamber?.doctorId !== doctorId) throw new Error('Forbidden')
```

Return `404` for rows the caller does not own — it avoids confirming that someone else's record exists.

### Seeding

```ts
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const main = async () => {
  // Idempotent: upsert by a natural key, never create duplicates on re-run.
  await db.user.upsert({
    where: { email: 'doctor@example.com' },
    update: {},
    create: {
      name: 'Demo Doctor',
      email: 'doctor@example.com',
      password: '<bcrypt hash>',
      role: 'DOCTOR',
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
```

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

- Seed scripts must be **idempotent** (`upsert`).
- Never seed production with demo credentials.
- Keep the seed free of real patient data.

### Testing

| Test type         | Database strategy                                                    |
| ----------------- | -------------------------------------------------------------------- |
| Unit (service)    | Mock the repository, not Prisma                                      |
| Integration (API) | Throwaway Postgres (Docker/testcontainers) + `prisma migrate deploy` |
| E2E               | Seed a dedicated test database; never point at production            |

Reset between tests with `TRUNCATE ... RESTART IDENTITY CASCADE` or a fresh schema per worker.

### Operational safety

- Take a backup before destructive migrations (`DROP COLUMN`, type changes, backfills).
- Run `prisma migrate diff` in CI to catch schema drift.
- Keep `DATABASE_URL` server-only — it must never appear in `NEXT_PUBLIC_*`.
- Use a pooled connection string in serverless deployments; one client per process.
- Log slow queries (`log: ['warn', 'error']` in dev, add `query` temporarily when profiling).
- Review `EXPLAIN ANALYZE` for any query that scans more than a few thousand rows.

### Checklist for a schema change

1. Edit `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name <change>` locally.
3. Review the generated SQL — confirm no unintended drops.
4. Update repositories/services/types that depend on the changed fields.
5. Run `npx prisma generate` and type-check.
6. Commit the migration **with** the schema change.
7. Deploy with `npx prisma migrate deploy` before the new app version serves traffic.

---
