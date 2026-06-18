import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Agunnaya Labs Token (AGL) - Next-Generation Blockchain Solutions',
  description: 'Explore AGL token, a pioneering cryptocurrency designed for innovative blockchain applications. Learn about tokenomics, smart contracts, and join the community.',
  keywords: ['AGL', 'Agunnaya Labs', 'cryptocurrency', 'token', 'blockchain', 'Web3'],
  generator: 'v0.app',
  creator: 'Agunnaya Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.agunnayalabs.xyz',
    siteName: 'Agunnaya Labs Token',
    title: 'Agunnaya Labs Token (AGL)',
    description: 'Next-Generation Blockchain Solutions',
    images: [
      {
        url: 'https://www.agunnayalabs.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGL Token',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@agunnayalabs',
    title: 'Agunnaya Labs Token (AGL)',
    description: 'Next-Generation Blockchain Solutions',
  },
  icons: {
    icon: '/agl-logo.svg',
    apple: '/agl-logo.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#39FF14' },
    { media: '(prefers-color-scheme: dark)', color: '#39FF14' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
