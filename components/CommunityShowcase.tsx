'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface CommunityMember {
  id: string
  name: string
  role: string
  bio: string
  contribution: string
  avatar: string
}

const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Core Developer',
    bio: 'Smart contract architect and blockchain engineer',
    contribution: 'Vibe Studio Development',
    avatar: '👨‍💻',
  },
  {
    id: '2',
    name: 'Sofia Rodriguez',
    role: 'Game Designer',
    bio: 'GameFi ecosystem designer with Web3 expertise',
    contribution: 'ArenaVerse Mechanics',
    avatar: '👩‍🎮',
  },
  {
    id: '3',
    name: 'Raj Patel',
    role: 'Community Lead',
    bio: 'Building bridges between developers and community',
    contribution: 'Community Growth',
    avatar: '👨‍💼',
  },
  {
    id: '4',
    name: 'Emma Watson',
    role: 'Security Auditor',
    bio: 'Smart contract security specialist',
    contribution: 'Contract Audits',
    avatar: '👩‍💼',
  },
]

const COMMUNITY_STATS = [
  { label: 'Active Members', value: '25+', icon: '👥' },
  { label: 'Governance Proposals', value: '12', icon: '🗳️' },
  { label: 'Community Events', value: '8/month', icon: '🎉' },
  { label: 'Open Bounties', value: '$50K+', icon: '💰' },
]

export function CommunityShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Community Powered
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AGL is built by a vibrant community of developers, designers, and Web3 enthusiasts
        </p>
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {COMMUNITY_STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="p-4 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 border border-border text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-accent mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Members */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-6">Featured Members</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {COMMUNITY_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="p-5 rounded-lg bg-gradient-to-br from-background to-secondary/30 border border-border hover:border-accent/50 transition-all group"
            >
              {/* Avatar */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{member.avatar}</div>

              {/* Name & Role */}
              <h4 className="font-bold text-foreground mb-1">{member.name}</h4>
              <p className="text-sm text-accent font-semibold mb-2">{member.role}</p>

              {/* Bio */}
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{member.bio}</p>

              {/* Contribution Badge */}
              <div className="inline-block px-2.5 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold text-accent">
                {member.contribution}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-xl bg-gradient-to-r from-accent/10 to-secondary border border-accent/20">
        <h3 className="text-2xl font-bold text-foreground mb-3">Join the Community</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Have a great idea? Want to contribute? We are always looking for passionate builders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/community"
            className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            View Full Community →
          </Link>
          <a
            href="https://github.com/agunnaya001"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:border-accent border border-border transition-all"
          >
            Contribute on GitHub →
          </a>
        </div>
      </div>
    </div>
  )
}
