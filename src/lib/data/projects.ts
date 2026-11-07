export interface Project {
  id: string
  title: string
  url: string
  description: string
  tags: string[]
  stars?: number
  sourceUrl?: string
}

export interface OpenSourceProject {
  id: string
  title: string
  url: string
  description: string
  language: string
  stars: number
  forks?: number
}

export const FEATURED_PROJECT: Project = {
  id: 'bidvers',
  title: 'Bidvers',
  url: 'https://bidvers.com',
  description: 'Core platform and API behind a real-time hotel upgrade bidding marketplace',
  tags: ['Laravel', 'API', 'Real-time'],
}

export const PROJECTS: Project[] = [
  {
    id: 'learn-laravel',
    title: 'Learn Laravel',
    url: 'https://github.com/alnahian2003/learn-laravel',
    description: 'Self-learning resources to level up your Laravel skills',
    tags: ['Open source', 'Laravel', 'Learning'],
    stars: 187,
  },
  {
    id: 'invo',
    title: 'Invo',
    url: 'https://alnahian2003.github.io/invo',
    description: 'Effortless invoice management, no sign-up needed',
    tags: ['SaaS', 'Productivity'],
    stars: 5,
    sourceUrl: 'https://github.com/alnahian2003/invo',
  },
  {
    id: 'prompt-filler',
    title: 'Prompt Filler',
    url: 'https://alnahian2003.github.io/prompt-filler',
    description: 'Fill prompt placeholders as easily as filling a form',
    tags: ['DevTool', 'SaaS', 'Productivity'],
    stars: 2,
    sourceUrl: 'https://github.com/alnahian2003/prompt-filler',
  },
  {
    id: 'year',
    title: 'Year',
    url: 'https://alnahian2003.github.io/year',
    description: 'Real-time year progress tracker with 8 themes, from Windows 7 to Cyberpunk',
    tags: ['Real-time', 'Fun'],
    stars: 12,
    sourceUrl: 'https://github.com/alnahian2003/year',
  },
  {
    id: 'murad-takla',
    title: 'Murad Takla',
    url: 'https://alnahian2003.github.io/muradtakla',
    description: 'A fun dictionary of hilariously misspelled Banglish, made for laughs',
    tags: ['Fun', 'Bangla'],
    stars: 25,
    sourceUrl: 'https://github.com/alnahian2003/muradtakla',
  },
  {
    id: 'kajkam',
    title: 'KajKam',
    url: 'https://alnahian2003.github.io/kajkam',
    description: 'Client-side kanban task manager, no backend',
    tags: ['Productivity', 'Kanban'],
    stars: 3,
    sourceUrl: 'https://github.com/alnahian2003/kajkam',
  },
  {
    id: 'hatiar',
    title: 'Hatiar',
    url: 'https://github.com/alnahian2003/hatiar',
    description: 'Hand-picked VS Code extension packs that make Laravel development smoother',
    tags: ['VS Code', 'Laravel', 'DevTool'],
    stars: 8,
  },
]

export const OPEN_SOURCE: OpenSourceProject[] = [
  {
    id: 'kordova',
    title: 'alnahian2003/kordova',
    url: 'https://github.com/alnahian2003/kordova',
    description: 'Simplify your uptime monitoring experience with this all-in-one solution.',
    language: 'PHP',
    stars: 6,
  },
  {
    id: 'kleon',
    title: 'alnahian2003/kleon',
    url: 'https://github.com/alnahian2003/kleon',
    description: 'Freelancer CRM — Laravel, Vue 3 & Inertia.',
    language: 'PHP',
    stars: 10,
    forks: 2,
  },
]
