'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Section className="pt-12 lg:pt-20 pb-8 lg:pb-12">
          <div className="max-w-3xl">
            <Link href="/" className="text-accent text-sm font-semibold mb-4 inline-block hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">About AGL</h1>
            <p className="text-lg text-muted-foreground">
              Pioneering the future of blockchain technology with innovation, transparency, and community-driven development
            </p>
          </div>
        </Section>

        {/* Story Section */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Agunnaya Labs was founded with a simple but powerful vision: to create a blockchain ecosystem that puts
                  community first. We recognized that while blockchain technology held immense promise, most projects prioritized
                  profit over people.
                </p>
                <p>
                  We set out to build something different. AGL Token represents our commitment to transparency, fairness, and
                  sustainable growth. From day one, we&apos;ve been guided by our core values and the belief that decentralization
                  means giving power back to the people.
                </p>
                <p>
                  Today, AGL is growing into a thriving ecosystem with thousands of community members, partnerships with leading
                  projects, and a clear roadmap for the future.
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent/20 to-accent/5 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🌍</div>
                <p className="text-xl font-bold text-accent">Global Blockchain Community</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Why AGL Section */}
        <Section className="py-12 lg:py-16">
          <h2 className="text-4xl font-bold text-foreground mb-12">Why Choose AGL?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🔐',
                title: 'Secure & Audited',
                description:
                  'All smart contracts undergo rigorous security audits by leading blockchain security firms to ensure maximum safety.',
              },
              {
                icon: '📊',
                title: 'Transparent Tokenomics',
                description:
                  'Our token distribution and economic model are completely transparent and aligned with community interests.',
              },
              {
                icon: '👥',
                title: 'Community Governed',
                description:
                  'Every AGL holder has a voice in major project decisions through our decentralized governance model.',
              },
              {
                icon: '📈',
                title: 'Real Utility',
                description:
                  'AGL has practical use cases across staking, governance, and ecosystem participation—not just speculation.',
              },
              {
                icon: '🌱',
                title: 'Sustainable Growth',
                description:
                  'We focus on long-term sustainable value creation rather than short-term hype cycles.',
              },
              {
                icon: '🚀',
                title: 'Active Development',
                description:
                  'Our team continuously works on new features, partnerships, and ecosystem expansion.',
              },
            ].map((item, index) => (
              <div key={index} className="card">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Milestones */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <h2 className="text-4xl font-bold text-foreground mb-12">Key Milestones</h2>

          <div className="space-y-8">
            {[
              { date: 'January 2023', title: 'Project Launch', description: 'Agunnaya Labs officially founded with initial team' },
              { date: 'Q2 2023', title: 'Token Launch', description: 'AGL token deployed on Ethereum with initial liquidity pool' },
              {
                date: 'Q3 2023',
                title: 'Exchange Listings',
                description: 'AGL listed on major decentralized and centralized exchanges',
              },
              {
                date: 'Q4 2023',
                title: 'Staking Protocol',
                description: 'Launched staking system with 12% APY rewards for community',
              },
              { date: 'Q1 2024', title: 'Governance Launch', description: 'Decentralized governance system activated' },
              { date: 'Q2 2024', title: 'Partnerships', description: 'Strategic partnerships announced with leading Web3 projects' },
            ].map((milestone, index) => (
              <div key={index} className="card">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-accent mb-1">{milestone.date}</p>
                    <h3 className="text-lg font-bold text-foreground mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Vision for Future */}
        <Section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Vision for the Future</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We envision a world where blockchain technology is accessible, transparent, and beneficial to all. AGL is our vehicle
              for achieving this vision—a community-driven project that demonstrates what&apos;s possible when people prioritize
              shared value over individual gain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: '🌐', title: 'Global Adoption', text: 'Bringing blockchain to millions worldwide' },
                { icon: '🔄', title: 'Interoperability', text: 'Seamless integration across blockchain networks' },
                { icon: '💡', title: 'Innovation', text: 'Pioneering new use cases and applications' },
              ].map((item, index) => (
                <div key={index} className="card">
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Partnerships */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <h2 className="text-4xl font-bold text-foreground mb-12">Strategic Partnerships</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4'].map((partner, index) => (
              <div key={index} className="card text-center">
                <div className="text-6xl mb-4">🤝</div>
                <p className="font-semibold text-foreground">{partner}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            We actively collaborate with leading blockchain projects, exchanges, and development teams to expand the AGL ecosystem.
          </p>
        </Section>

        {/* Get Involved */}
        <Section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Get Involved</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-2xl font-bold text-accent mb-4">Hold</h3>
                <p className="text-muted-foreground mb-6">Own AGL tokens and participate in ecosystem growth</p>
                <Link href="/stake" className="btn-primary text-center w-full">
                  Get Started →
                </Link>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-accent mb-4">Govern</h3>
                <p className="text-muted-foreground mb-6">Vote on proposals and shape the future of AGL</p>
                <button className="btn-secondary w-full">Learn More →</button>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-accent mb-4">Build</h3>
                <p className="text-muted-foreground mb-6">Develop applications and integrations on AGL</p>
                <a
                  href="mailto:developers@agunnayalabs.xyz"
                  className="btn-secondary text-center w-full block"
                >
                  Join Devs →
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-12 lg:py-16 bg-accent/10">
          <div className="card text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Join the Revolution?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of something bigger. Join thousands of community members shaping the future of blockchain.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/" className="btn-primary">
                Learn More →
              </Link>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Join Community
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
