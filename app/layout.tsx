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
  title: 'AGL Token - GameFi & DeFi on Base | Agunnaya Labs',
  description:
    'AGL is the native utility & governance token of Agunnaya Labs, a GameFi and DeFi ecosystem built on Base. Trade AGL/CHONK9K, stake, earn rewards, and access Vibe Studio AI IDE.',
  keywords: [
    'AGL token',
    'Agunnaya Labs',
    'Base blockchain',
    'GameFi',
    'DeFi',
    'cryptocurrency',
    'Uniswap V4',
    'token staking',
    'Web3',
    'crypto trading',
  ],
  generator: 'v0.app',
  creator: 'Agunnaya Labs',
  metadataBase: new URL('https://www.agunnayalabs.xyz'),
  alternates: {
    canonical: 'https://www.agunnayalabs.xyz',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.agunnayalabs.xyz',
    siteName: 'Agunnaya Labs Token (AGL)',
    title: 'AGL Token - GameFi & DeFi on Base',
    description:
      'Native utility token of Agunnaya Labs ecosystem. Trade, stake, and earn rewards.',
    images: [
      {
        url: 'https://www.agunnayalabs.xyz/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGL Token Hero',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@agunnayalabs',
    site: '@agunnayalabs',
    title: 'AGL Token - GameFi & DeFi on Base',
    description: 'Native utility token of Agunnaya Labs ecosystem.',
    images: ['https://www.agunnayalabs.xyz/images/og-image.png'],
  },
  icons: {
    icon: '/images/agl-logo-neon.png',
    apple: '/images/agl-logo-neon.png',
  },
  manifest: '/manifest.json',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.agunnayalabs.xyz/#organization',
        name: 'Agunnaya Labs',
        url: 'https://www.agunnayalabs.xyz',
        logo: 'https://www.agunnayalabs.xyz/images/agl-logo-neon.png',
        description: 'GameFi and DeFi ecosystem built on Base blockchain',
        sameAs: ['https://x.com/agunnayalabs', 'https://github.com/agunnaya001'],
      },
      {
        '@type': 'Thing',
        '@id': 'https://www.agunnayalabs.xyz/#token',
        name: 'AGL Token',
        description:
          'Native utility and governance token of Agunnaya Labs ecosystem',
        image: 'https://www.agunnayalabs.xyz/images/agl-logo-neon.png',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.agunnayalabs.xyz/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is AGL token?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'AGL is the native utility and governance token of Agunnaya Labs, a GameFi and DeFi ecosystem built on Base. It powers staking, gates access to Vibe Studio AI IDE, and enables compute billing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can I buy AGL?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can buy AGL on Uniswap V4 on the Base blockchain. Trade the AGL/CHONK9K pair at https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the total supply?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The total supply of AGL is 1 billion tokens with a fixed maximum supply.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I stake AGL?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, AGL holders can stake their tokens across four APY tiers to earn staking rewards.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.agunnayalabs.xyz/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.agunnayalabs.xyz',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tokenomics',
            item: 'https://www.agunnayalabs.xyz/tokenomics',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Staking',
            item: 'https://www.agunnayalabs.xyz/stake',
          },
        ],
      },
    ],
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
