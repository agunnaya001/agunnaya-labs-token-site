'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  index?: number
}

export function FeatureCard({
  icon,
  title,
  description,
  gradient,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`} />

      {/* Card Content */}
      <div className="relative card border-border hover:border-accent/50 transition-all duration-500">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform"
          whileHover={{ rotate: 10 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>

        {/* Hover Line */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-cyan-400 rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  )
}
