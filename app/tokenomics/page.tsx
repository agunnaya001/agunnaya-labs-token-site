'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { TokenCard } from '@/components/TokenCard'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'

export default function TokenomicsPage() {
  const tokenomicsData = [
    { label: 'Community', percentage: 40, description: 'Direct distribution to community members' },
    { label: 'Team & Development', percentage: 20, description: 'Long-term incentives for core team' },
    { label: 'Partnerships', percentage: 15, description: 'Strategic partnerships and integrations' },
    { label: 'Reserve', percentage: 15, description: 'Emergency fund and liquidity pool' },
    { label: 'Marketing', percentage: 10, description: 'Growth and brand awareness' },
  ]

  const releaseSchedule = [
    { year: 'Year 1', percentage: 25, description: '250M tokens released' },
    { year: 'Year 2', percentage: 25, description: '250M tokens released' },
    { year: 'Year 3', percentage: 25, description: '250M tokens released' },
    { year: 'Year 4', percentage: 25, description: '250M tokens released' },
  ]

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
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">Tokenomics</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive breakdown of AGL token distribution, allocation, and economic model
            </p>
          </div>
        </Section>

        {/* Overview Cards */}
        <Section className="py-8 lg:py-12 bg-secondary/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TokenCard
              title="Total Supply"
              value="1B AGL"
              description="Fixed maximum supply"
              icon="🎯"
            />
            <TokenCard
              title="Circulating Supply"
              value="250M AGL"
              description="Currently in circulation"
              icon="💱"
            />
            <TokenCard
              title="Staking APY"
              value="12%"
              description="Annual percentage yield"
              icon="📈"
            />
          </div>
        </Section>

        {/* Token Distribution */}
        <Section className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Distribution Chart */}
            <div className="card">
              <h2 className="text-2xl font-bold text-foreground mb-8">Token Distribution</h2>

              <div className="space-y-6">
                {tokenomicsData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-accent">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-accent to-accent/70 h-3 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Table */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Distribution Breakdown</h3>

                <div className="space-y-4">
                  {tokenomicsData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="font-semibold text-foreground">{item.label}</span>
                      <span className="font-bold text-accent">{(1000000000 * item.percentage) / 100 / 1000000}M</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
                <p className="text-sm text-muted-foreground mb-3">Total Supply</p>
                <p className="text-4xl font-bold text-accent">1,000,000,000 AGL</p>
                <p className="text-sm text-muted-foreground mt-3">Fixed and immutable on blockchain</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Release Schedule */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">Token Release Schedule</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {releaseSchedule.map((schedule, index) => (
              <div key={index} className="card">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{schedule.year}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{schedule.description}</p>
                    <div className="w-full bg-secondary rounded-full h-8">
                      <div
                        className="bg-gradient-to-r from-accent to-accent/70 h-8 rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground"
                        style={{ width: `${schedule.percentage}%` }}
                      >
                        {schedule.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Visual */}
          <div className="card">
            <h3 className="text-xl font-semibold text-foreground mb-8">Vesting Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-secondary" />

              {/* Timeline items */}
              <div className="relative flex justify-between">
                {['Q1 2024', 'Q1 2025', 'Q1 2026', 'Q1 2027'].map((date, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mb-4 relative z-10">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold text-foreground text-center">{date}</p>
                    <p className="text-xs text-muted-foreground text-center mt-1">250M tokens</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Economics */}
        <Section className="py-12 lg:py-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">Token Economics</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Staking</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">APY</p>
                  <p className="text-2xl font-bold text-accent">12%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Minimum Stake</p>
                  <p className="text-lg font-semibold text-foreground">100 AGL</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Lockup Period</p>
                  <p className="text-lg font-semibold text-foreground">30 days</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Burning</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Monthly Rate</p>
                  <p className="text-2xl font-bold text-accent">0.1%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Burned</p>
                  <p className="text-lg font-semibold text-foreground">5M AGL</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Mechanism</p>
                  <p className="text-lg font-semibold text-foreground">Automatic</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Liquidity</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pool Size</p>
                  <p className="text-2xl font-bold text-accent">50M AGL</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Swap Fee</p>
                  <p className="text-lg font-semibold text-foreground">0.3%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-semibold text-foreground">Active</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">Tokenomics FAQ</h2>

          <div className="space-y-6 max-w-3xl">
            {[
              {
                q: 'Is the total supply fixed?',
                a: 'Yes, the total supply of 1 billion AGL tokens is fixed and immutable on the blockchain. No additional tokens can be minted.',
              },
              {
                q: 'How do staking rewards work?',
                a: 'Holders can stake their AGL tokens to earn rewards at 12% APY. Rewards are distributed monthly and can be claimed at any time after the 30-day lockup period.',
              },
              {
                q: 'Why does AGL implement token burning?',
                a: 'Token burning reduces the total supply over time, creating deflationary pressure that can increase the value of remaining tokens and demonstrate commitment to long-term sustainability.',
              },
              {
                q: 'When will all tokens be released?',
                a: 'The token release follows a 4-year schedule with 25% (250M tokens) released each year. Full circulation is expected by Q1 2027.',
              },
              {
                q: 'Where can I see the smart contract?',
                a: `You can view the complete smart contract on BaseScan at the contract address: ${CONTRACT_ADDRESS}`,
              },
            ].map((faq, index) => (
              <details key={index} className="card cursor-pointer group">
                <summary className="font-semibold text-foreground flex justify-between items-center">
                  {faq.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="text-muted-foreground mt-4 pt-4 border-t border-border">{faq.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="py-12 lg:py-16">
          <div className="card bg-gradient-to-r from-accent/10 to-accent/5 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ready to Stake?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start earning rewards with your AGL tokens. Connect your wallet and begin staking today.
            </p>
            <Link href="/stake" className="btn-primary inline-block">
              Go to Staking →
            </Link>
          </div>
        </Section>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
