export interface WorkOption {
  id: string
  title: string
  description: string
  cta: string
}

export interface ReachLink {
  id: string
  platform: string
  handle: string
  url: string
}

export const WORK_OPTIONS: WorkOption[] = [
  {
    id: 'build',
    title: 'Build something together',
    description:
      'Founders and teams building ambitious products: I take features from idea to production with agentic engineering.',
    cta: 'Let’s talk',
  },
  {
    id: 'consultation',
    title: 'Paid consultation',
    description:
      'Code reviews, architecture advice and performance fixes for your web app or SaaS.',
    cta: 'Book a consultation',
  },
  {
    id: 'call',
    title: '1:1 call',
    description: 'Career chats, mentoring, or a second opinion on what you’re building.',
    cta: 'Book a call',
  },
  {
    id: 'english',
    title: 'Spoken English sessions',
    description: 'Relaxed conversation practice with a near-native speaker. No judging, no drills.',
    cta: 'Book a session',
  },
]

export const REACH_LINKS: ReachLink[] = [
  { id: 'email', platform: 'Email', handle: 'hello@nahian.bd', url: 'mailto:hello@nahian.bd' },
  { id: 'x', platform: 'X', handle: '@alnahian2003', url: 'https://x.com/alnahian2003' },
  {
    id: 'messenger',
    platform: 'Messenger',
    handle: 'm.me/alnahian2003',
    url: 'https://m.me/alnahian2003',
  },
  {
    id: 'whatsapp',
    platform: 'WhatsApp',
    handle: 'wa.me/alnahian2003',
    url: 'https://wa.me/alnahian2003',
  },
]
