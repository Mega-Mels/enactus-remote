import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enactus Remote - Connecting Swati Youth to Global Opportunities',
  description: 'Remote work platform for Eswatini youth. Find jobs, learn skills, and build a sustainable digital career.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        
        {/* main tag ensures the content expands to push the footer down */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        {children}
  <ChatWidget />
      </body>
    </html>
  )
}