import React from 'react'

interface TokenCardProps {
  title: string
  value: string | React.ReactNode
  description?: string
  icon?: React.ReactNode
  className?: string
}

/**
 * Card component for displaying token statistics
 */
export function TokenCard({
  title,
  value,
  description,
  icon,
  className = '',
}: TokenCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        {icon && <div className="text-accent text-2xl">{icon}</div>}
      </div>
      <div className="mb-2">
        <p className="text-3xl lg:text-4xl font-bold text-foreground">{value}</p>
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
