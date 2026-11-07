export type Platform = 'GitHub' | 'X' | 'LinkedIn' | 'Facebook' | 'Website' | 'YouTube'

export interface PersonLink {
  platform: Platform
  handle: string
  url: string
}

export interface Person {
  id: string
  name: string
  isFavorite?: boolean
  avatarUrl: string
  role: string
  whyFollow?: string
  tags: string[]
  links: PersonLink[]
}

const avatar = (slug: string) => `https://nahian.bd/_astro/${slug}`

export const PEOPLE: Person[] = [
  {
    id: 'ahmed-shamim-hassan-shaon',
    name: 'Ahmed Shamim Hassan Shaon',
    isFavorite: true,
    avatarUrl: avatar('ahmed-shamim-hassan-shaon.BIgVFP6s_Z1hpCVE.webp'),
    role: 'CEO of Megaminds Learning, software architect and Laravel contributor',
    whyFollow:
      'My mentor and the senior brother everyone wants by their side. I admire him the most.',
    tags: ['Laravel', 'Open source'],
    links: [
      { platform: 'X', handle: '@me_shaon', url: 'https://x.com/me_shaon' },
      { platform: 'GitHub', handle: '@me-shaon', url: 'https://github.com/me-shaon' },
      {
        platform: 'LinkedIn',
        handle: 'in/ahmed-shamim',
        url: 'https://www.linkedin.com/in/ahmed-shamim',
      },
      {
        platform: 'Facebook',
        handle: '/ahmed.shamim.hassan',
        url: 'https://www.facebook.com/ahmed.shamim.hassan',
      },
    ],
  },
  {
    id: 'mohammad-emran-hasan',
    name: 'Mohammad Emran Hasan',
    avatarUrl: avatar('mohammad-emran-hasan.B3Wat4fb_2rMcEN.webp'),
    role: 'Building SaaS at klasio.com and helping teams ship Laravel products at figlab.io',
    whyFollow: 'The guru of gurus, with extensive experience behind every tip.',
    tags: ['PHP', 'Laravel'],
    links: [
      { platform: 'X', handle: '@phpfour', url: 'https://x.com/phpfour' },
      { platform: 'LinkedIn', handle: 'in/phpfour', url: 'https://www.linkedin.com/in/phpfour' },
      { platform: 'GitHub', handle: '@phpfour', url: 'https://github.com/phpfour' },
      { platform: 'Facebook', handle: '/emran.hasan', url: 'https://www.facebook.com/emran.hasan' },
      { platform: 'Website', handle: 'emranhasan.com', url: 'https://emranhasan.com' },
    ],
  },
  {
    id: 'hm-nayem',
    name: 'HM Nayem',
    avatarUrl: avatar('hm-nayem.Ds5mCNNA_Z8zyPc.webp'),
    role: 'Founder of Stack Learner, full-stack developer and trainer',
    tags: ['Teaching', 'Full stack'],
    links: [
      { platform: 'GitHub', handle: '@mrhm-dev', url: 'https://github.com/mrhm-dev' },
      { platform: 'LinkedIn', handle: 'in/mrhm', url: 'https://www.linkedin.com/in/mrhm' },
    ],
  },
  {
    id: 'muntaser-muttaqi',
    name: 'Muntaser Muttaqi',
    avatarUrl: avatar('muntaser-muttaqi.kNFzAuiZ_ZVBNB4.webp'),
    role: 'Software engineer at GymScanner and Laravel enthusiast',
    whyFollow: 'One of my best buddies. We work together on the same stack.',
    tags: ['Laravel', 'TALL stack', 'VILT stack'],
    links: [
      { platform: 'GitHub', handle: '@iammuttaqi', url: 'https://github.com/iammuttaqi' },
      {
        platform: 'LinkedIn',
        handle: 'in/iammuttaqi',
        url: 'https://www.linkedin.com/in/iammuttaqi',
      },
      {
        platform: 'Facebook',
        handle: '/muntasermuttaqi',
        url: 'https://www.facebook.com/muntasermuttaqi',
      },
    ],
  },
  {
    id: 'mehbub-rashid-rabu',
    name: 'Mehbub Rashid Rabu',
    avatarUrl: avatar('mehbub-rashid-rabu.M5BbTgk6_1L2swT.webp'),
    role: 'Web developer focused on Node.js, React, WordPress, chatbots and automations',
    tags: ['Node.js', 'WordPress'],
    links: [
      {
        platform: 'Facebook',
        handle: '/mehbub.rashid.2025',
        url: 'https://www.facebook.com/mehbub.rashid.2025',
      },
      { platform: 'GitHub', handle: '@MehbubRashid', url: 'https://github.com/MehbubRashid' },
    ],
  },
  {
    id: 'md-abu-taher',
    name: 'Md. Abu Taher',
    avatarUrl: avatar('md-abu-taher.BiKbjkUv_Z2aCf1e.webp'),
    role: 'Co-founder of Data Automators, full-stack developer focused on web automation and DevOps',
    tags: ['Web automation', 'DevOps'],
    links: [
      { platform: 'X', handle: '@entrptaher', url: 'https://x.com/entrptaher' },
      { platform: 'Website', handle: 'taher.xyz', url: 'https://taher.xyz' },
      {
        platform: 'Facebook',
        handle: '/originaltaher',
        url: 'https://www.facebook.com/originaltaher',
      },
      {
        platform: 'LinkedIn',
        handle: 'in/entrptaher',
        url: 'https://www.linkedin.com/in/entrptaher',
      },
    ],
  },
  {
    id: 'jeffrey-way',
    name: 'Jeffrey Way',
    avatarUrl: avatar('jeffrey-way.DplsT5Lt_1zBnpr.webp'),
    role: 'Founder of Laracasts',
    whyFollow: 'Taught half the PHP world, me included.',
    tags: ['Teaching', 'Laravel'],
    links: [
      { platform: 'X', handle: '@jeffrey_way', url: 'https://x.com/jeffrey_way' },
      { platform: 'Website', handle: 'laracasts.com', url: 'https://laracasts.com' },
    ],
  },
  {
    id: 'povilas-korop',
    name: 'Povilas Korop',
    avatarUrl: avatar('povilas-korop.B8T32WAI_Z1P9Xzs.webp'),
    role: 'Laravel Daily: practical Laravel tips every day',
    whyFollow: 'I call him Uncle Povilas, if anyone cares.',
    tags: ['Laravel', 'Teaching'],
    links: [
      {
        platform: 'YouTube',
        handle: '@LaravelDaily',
        url: 'https://www.youtube.com/@LaravelDaily',
      },
      { platform: 'X', handle: '@PovilasKorop', url: 'https://x.com/PovilasKorop' },
      { platform: 'GitHub', handle: '@PovilasKorop', url: 'https://github.com/PovilasKorop' },
      {
        platform: 'LinkedIn',
        handle: 'in/povilas-korop',
        url: 'https://www.linkedin.com/in/povilas-korop-laravel-developer',
      },
    ],
  },
  {
    id: 'taylor-otwell',
    name: 'Taylor Otwell',
    avatarUrl: avatar('taylor-otwell.DsnKVGqJ_Z1ssXEe.webp'),
    role: 'Creator of Laravel',
    whyFollow: 'Every Laravel release is a free lesson in API design.',
    tags: ['Laravel', 'PHP'],
    links: [
      { platform: 'X', handle: '@taylorotwell', url: 'https://x.com/taylorotwell' },
      { platform: 'GitHub', handle: '@taylorotwell', url: 'https://github.com/taylorotwell' },
    ],
  },
  {
    id: 'caleb-porzio',
    name: 'Caleb Porzio',
    avatarUrl: avatar('caleb-porzio.DgSGKaNa_21RW5D.webp'),
    role: 'Creator of Livewire and Alpine.js',
    whyFollow: 'Proof that simple tools win. Half my stack exists because of him.',
    tags: ['Livewire', 'Alpine.js'],
    links: [
      { platform: 'X', handle: '@calebporzio', url: 'https://x.com/calebporzio' },
      { platform: 'GitHub', handle: '@calebporzio', url: 'https://github.com/calebporzio' },
    ],
  },
  {
    id: 'aaron-francis',
    name: 'Aaron Francis',
    avatarUrl: avatar('aaron-francis.DqvZlXsc_27miwt.webp'),
    role: 'VP of Marketing & Community at Laravel, creator of Solo and faster.dev',
    tags: ['Databases', 'Laravel'],
    links: [
      { platform: 'X', handle: '@aarondfrancis', url: 'https://x.com/aarondfrancis' },
      { platform: 'Website', handle: 'aaronfrancis.com', url: 'https://aaronfrancis.com' },
      {
        platform: 'YouTube',
        handle: '@aarondfrancis',
        url: 'https://www.youtube.com/@aarondfrancis',
      },
      { platform: 'GitHub', handle: '@aarondfrancis', url: 'https://github.com/aarondfrancis' },
    ],
  },
]
