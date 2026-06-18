import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Wrapper component for consistent page sections with padding and max-width
 */
export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`section container-wide ${className}`}>
      {children}
    </section>
  )
}
