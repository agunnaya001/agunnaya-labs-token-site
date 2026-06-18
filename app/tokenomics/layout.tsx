import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tokenomics - AGL Token',
  description: 'Explore detailed AGL token distribution, allocation, and release schedule.',
}

export default function TokenomicsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
