import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Geist, JetBrains_Mono } from 'next/font/google'

import { RightRail } from '@/components/layout/RightRail'
import { Sidebar } from '@/components/layout/Sidebar'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Nahian — Portfolio',
  description: 'Software engineer and agentic builder shipping global SaaS, now CTO at Bidvers.',
  metadataBase: new URL('https://nahianbbd-clone.vercel.app'),
  openGraph: {
    title: 'Nahian — Portfolio',
    description: 'Software engineer and agentic builder shipping global SaaS, now CTO at Bidvers.',
    url: '/',
    siteName: 'Nahian',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Nahian — Portfolio',
    description: 'Software engineer and agentic builder shipping global SaaS, now CTO at Bidvers.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${jetBrainsMono.variable}`}>
      <body>
        <div className="mx-auto flex min-h-dvh max-w-[1400px]">
          <Sidebar />
          <main className="border-line min-w-0 flex-1 pb-24 md:border-x md:pb-0">{children}</main>
          <RightRail />
        </div>
      </body>
    </html>
  )
}

export default RootLayout
