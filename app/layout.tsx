import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { QueryProvider } from '@/components/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Learning App',
  description: 'Comprehensive Next.js features demonstration for learning',
  keywords: ['Next.js', 'React', 'Learning', 'Tutorial'],
  authors: [{ name: 'Next.js Learner' }],
  openGraph: {
    title: 'Next.js Learning App',
    description: 'Learn all Next.js features with practical examples',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  )
}
