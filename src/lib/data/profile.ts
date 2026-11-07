export interface ExperienceItem {
  id: string
  role: string
  company: string
  companyUrl?: string
  period: string
  type: string
  description: string
  logoUrl?: string
  highlights?: string[]
}

export interface LanguageItem {
  name: string
  level: string
}

export interface SocialLink {
  platform: string
  handle: string
  url: string
}

export const PROFILE = {
  name: 'Al Nahian',
  shortName: 'Nahian',
  tagline: 'Less talk, show me code!',
  openTo: 'Open to new conversations',
  location: 'Dhaka, Bangladesh',
  timezone: 'GMT+6',
  role: 'Software engineer and agentic builder shipping global SaaS, now CTO at Bidvers.',
  avatarUrl: 'https://nahian.bd/_astro/61485238_Z2pHLup.webp',
  contactUrl: '/contact',
  email: 'hello@nahian.bd',
} as const

export const ABOUT_PARAGRAPHS = [
  'I’m a founding engineer and product builder who enjoys turning complex ideas into products that ship globally.',
  'As CTO at Bidvers, I built the core platform and API from a blank repo. I joined GymScanner first, and I still maintain and scale its backend.',
  'These days I build with agentic engineering — I own the architecture, the product decisions and the quality bar.',
] as const

export const CURRENT_ROLES = [
  { label: 'CTO at', company: 'Bidvers', url: 'https://bidvers.com' },
  { label: 'Software Engineer at', company: 'GymScanner', url: 'https://gymscanner.com' },
] as const

export const LANGUAGES: LanguageItem[] = [
  { name: 'English', level: 'Near-native' },
  { name: 'Bangla', level: 'Native' },
  { name: 'Arabic', level: 'Reading and small talk' },
]

export const WORK_OPTIONS = [
  'Remote',
  'Async-friendly',
  'US hours',
  'EU hours',
  'Flexible schedule',
] as const

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'bidvers',
    logoUrl: 'https://nahian.bd/_astro/bidvers.C2tonTRK_eIN7F.webp',
    role: 'Chief Technology Officer',
    company: 'Bidvers',
    companyUrl: 'https://bidvers.com',
    period: 'Nov 2025 – Present',
    type: 'Full-time · Remote',
    description:
      'Hand-picked by GymScanner’s CEO to build his next company from day one. I own the architecture and technical roadmap.',
    highlights: ['Raised $120K+', 'Built core + API from scratch', 'iOS + Android apps on my API'],
  },
  {
    id: 'gymscanner',
    logoUrl: 'https://nahian.bd/_astro/gymscanner.DxYHAPQV_1vPcnn.webp',
    role: 'Software Engineer',
    company: 'GymScanner',
    companyUrl: 'https://gymscanner.com',
    period: 'Nov 2025 – Present',
    type: 'Full-time · Remote',
    description: 'Maintaining and scaling backend infrastructure.',
  },
  {
    id: 'interactive-cares',
    logoUrl: 'https://nahian.bd/_astro/interactive-cares.Dxy2JPeA_1hpXyj.webp',
    role: 'Education Mentor',
    company: 'Interactive Cares',
    period: 'Jun 2023 – Feb 2025',
    type: 'Contract · Remote',
    description:
      'Taught Laravel to aspiring developers, from a full career-path course to a free crash course.',
  },
  {
    id: 'megaminds',
    logoUrl: 'https://nahian.bd/_astro/megaminds.BKlHk01__V4dmS.webp',
    role: 'Education Mentor',
    company: 'Megaminds Technologies',
    period: '2023 – 2025',
    type: 'Remote',
    description: 'Mentored learners at Megaminds Learning.',
  },
  {
    id: 'zovozip',
    logoUrl: 'https://nahian.bd/_astro/zovozip.DtAI_D_n_R6qV.webp',
    role: 'Co-Founder',
    company: 'ZovoZip',
    period: 'Feb 2021 – Present',
    type: 'Seasonal · Dhaka, Bangladesh',
    description: 'Co-founded a web and software studio building UI templates and WordPress themes.',
  },
  {
    id: 'zovoteam',
    logoUrl: 'https://nahian.bd/_astro/zovoteam.djNkmjfA_Z1Y9aq1.webp',
    role: 'Executive Web Developer',
    company: 'ZovoTeam',
    period: 'Jan 2021 – Present',
    type: 'Seasonal · Dhaka, Bangladesh',
    description: 'Led web development for the team’s client and product work.',
  },
]

export const TOP_SKILLS = [
  'Product Development',
  'SaaS Development',
  'System Architecture',
  'Agentic AI Development',
  'Strategic Planning',
] as const

export const SKILLS_AND_TOOLS = [
  'Claude',
  'OpenAI',
  'Antigravity',
  'OpenCode',
  'Laravel',
  'PHP',
  'JavaScript',
  'Livewire',
  'Alpine.js',
  'Vue.js',
  'Inertia',
  'Tailwind CSS',
  'VS Code',
  'PhpStorm',
  'Git',
  'GitHub',
] as const

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', handle: '@alnahian2003', url: 'https://github.com/alnahian2003' },
  { platform: 'X', handle: '@alnahian2003', url: 'https://x.com/alnahian2003' },
  {
    platform: 'LinkedIn',
    handle: 'in/alnahian2003',
    url: 'https://www.linkedin.com/in/alnahian2003',
  },
  { platform: 'Peerlist', handle: '@alnahian2003', url: 'https://peerlist.io/alnahian2003' },
  { platform: 'Facebook', handle: '/alnahian2003', url: 'https://www.facebook.com/alnahian2003' },
  { platform: 'DEV', handle: 'dev.to/alnahian2003', url: 'https://dev.to/alnahian2003' },
  { platform: 'Behance', handle: '/alnahian2003', url: 'https://www.behance.net/alnahian2003' },
]
