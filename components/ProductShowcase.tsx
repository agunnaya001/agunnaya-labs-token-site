'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  features: string[]
  icon: string
  color: string
  link: string
  status: 'Live' | 'Coming Soon'
}

const PRODUCTS: Product[] = [
  {
    id: 'vibe-studio',
    name: 'Vibe Studio',
    description: 'AI-powered Solidity IDE with smart contract development, auditing, and deployment tools.',
    features: ['Code Completion', 'Real-time Auditing', 'Gas Optimization', 'AI Assistant'],
    icon: '⚡',
    color: 'from-purple-500 to-pink-400',
    link: '#',
    status: 'Live',
  },
  {
    id: 'arenaverse',
    name: 'ArenaVerse',
    description: 'Competitive GameFi ecosystem with NFT battles, tournaments, and play-to-earn rewards.',
    features: ['NFT Battles', 'Tournaments', 'P2E Rewards', 'Leaderboards'],
    icon: '🎮',
    color: 'from-cyan-500 to-blue-400',
    link: '#',
    status: 'Live',
  },
  {
    id: 'chonkpump',
    name: 'ChonkPump',
    description: 'Fair-launch launchpad for community token projects with no VC allocation.',
    features: ['Fair Launch', 'Community Voting', 'Lock-up Contract', 'Multi-sig Safety'],
    icon: '🚀',
    color: 'from-green-500 to-emerald-400',
    link: '#',
    status: 'Coming Soon',
  },
  {
    id: 'agl-network',
    name: 'AGL Network',
    description: 'Next-gen blockchain infrastructure optimized for GameFi and DeFi applications.',
    features: ['Sub-second Finality', 'Low Gas Fees', 'EVM Compatible', 'Cross-chain Bridge'],
    icon: '🔗',
    color: 'from-orange-500 to-red-400',
    link: '#',
    status: 'Coming Soon',
  },
]

export function ProductShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Our Products & Ecosystem
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive suite of tools and platforms powering the GameFi and DeFi revolution on Base
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="group relative"
          >
            {/* Card Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`} />

            {/* Card Content */}
            <div className="relative card border-border hover:border-accent/50 transition-all duration-500 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{product.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.status === 'Live'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link
                href={product.link}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 ${
                  product.status === 'Live'
                    ? `bg-gradient-to-r ${product.color} text-white hover:shadow-lg`
                    : 'bg-secondary text-foreground hover:bg-secondary/80 cursor-not-allowed'
                }`}
              >
                {product.status === 'Live' ? 'Launch App →' : 'Coming Soon'}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
