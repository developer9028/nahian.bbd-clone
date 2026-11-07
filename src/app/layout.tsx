import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, JetBrains_Mono } from 'next/font/google'

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
        </div>
      </body>
    </html>
  )
}

export default RootLayout
