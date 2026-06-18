import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team - AGL Token',
  description: 'Meet the talented team behind Agunnaya Labs Token.',
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
