'use client'

import React from 'react'
import Link from 'next/link'

interface CommunityLink {
  name: string
  url: string
  icon: string
}

interface CommunityLinksProps {
  links?: CommunityLink[]
  layout?: 'horizontal' | 'vertical'
  className?: string
}

const defaultLinks: CommunityLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: '⚙️',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com',
    icon: '𝕏',
  },
  {
    name: 'Telegram',
    url: 'https://t.me',
    icon: '✈️',
  },
]

/**
 * Component for displaying community and social links
 */
export function CommunityLinks({
  links = defaultLinks,
  layout = 'horizontal',
  className = '',
}: CommunityLinksProps) {
  const containerClass =
    layout === 'horizontal'
      ? 'flex flex-wrap gap-4 items-center'
      : 'flex flex-col gap-3 items-start'

  return (
    <div className={`${containerClass} ${className}`}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition-colors font-semibold"
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.name}</span>
        </Link>
      ))}
    </div>
  )
}
