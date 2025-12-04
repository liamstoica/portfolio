import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { ChatProvider } from '@/components/chat/chat-provider'
import { ChatInputPill } from '@/components/chat/chat-input-pill'
import { ChatPanel } from '@/components/chat/chat-panel'
import './globals.css'


import localFont from "next/font/local";

const advercase = localFont({
  src: [
    {
      path: "../../public/fonts/Advercase/Advercase-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Advercase/Advercase-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});



export const metadata: Metadata = {
  title: 'Liam Stoica — Growth Designer',
  description:
    'At the intersection of art, science and business. Product designer building digital experiences that feel human, intentional, and impactful.',
  keywords: ['product design', 'growth design', 'UX design', 'portfolio', 'digital experience'],
  authors: [{ name: 'Liam Stoica' }],
  openGraph: {
    title: 'Liam Stoica — Growth Designer',
    description: 'At the intersection of art, science and business.',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liam Stoica — Growth Designer',
    description: 'At the intersection of art, science and business.'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={advercase.variable}>
        <ThemeProvider>
          <ChatProvider>
            {/* Atmospheric Background */}
            <div className="page-bg" aria-hidden="true" />

            {/* Page Content */}
            <div className="relative min-h-screen py-8 md:py-12 pb-32">
              {children}
            </div>

            {/* Floating Chat Input */}
            <ChatInputPill />

            {/* Full Chat Panel */}
            <ChatPanel />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
