import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stake AGL - Earn Rewards',
  description: 'Earn 12% APY by staking your AGL tokens. Secure, transparent, and community-owned.',
}

export default function StakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
