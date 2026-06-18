import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whitepaper - AGL Token',
  description: 'Read the official AGL token whitepaper detailing our vision, technology, and roadmap.',
}

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
