import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

import './globals.css'

export const metadata: Metadata = {
  title: 'Nahian — Portfolio',
  description: 'Software engineer and agentic builder shipping global SaaS, now CTO at Bidvers.',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default RootLayout
