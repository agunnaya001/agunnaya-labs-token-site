import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - AGL Token',
  description: 'Learn about Agunnaya Labs Token, our mission, vision, and impact on blockchain technology.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
