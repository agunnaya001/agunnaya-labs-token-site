import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { TokenCard } from '@/components/TokenCard'
import { CommunityLinks } from '@/components/CommunityLinks'
import { TokenMetrics } from '@/components/TokenMetrics'
import { SecurityBadges } from '@/components/SecurityBadges'
import { TradingPairCard } from '@/components/TradingPairCard'
import { LivePriceTicker } from '@/components/LivePriceTicker'
import Link from 'next/link'
import Image from 'next/image'
import { fetchTokenData } from '@/lib/token-data'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'
const UNISWAP_URL = 'https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base'

export default async function Home() {
  const tokenData = await fetchTokenData()

  const communityLinks = [
    { name: 'GitHub', url: 'https://github.com/agunnaya001', icon: '⚙️' },
    { name: 'X (Twitter)', url: 'https://x.com/agunnayalabs', icon: '𝕏' },
    { name: 'Telegram', url: 'https://t.me', icon: '✈️' },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Live Price Ticker */}
        <LivePriceTicker data={tokenData} />

        {/* Hero Section */}
        <Section className="pt-12 lg:pt-24 pb-12 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-semibold text-accent">
                GameFi & DeFi on Base
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-accent">AGL Token</span> Powers the Ecosystem
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                AGL is the native utility and governance token of Agunnaya Labs. Stake, earn rewards, 
                access Vibe Studio AI IDE, and participate in our growing GameFi and DeFi ecosystem built on Base.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href={UNISWAP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  Buy AGL on Uniswap ↗
                </a>
                <Link href="/stake" className="btn-secondary text-center">
                  Start Staking →
                </Link>
              </div>
            </div>

            {/* Right Visual - Neon Logo */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm h-96 flex items-center justify-center group">
                <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-all duration-500" />
                <Image
                  src="/images/agl-logo-neon.png"
                  alt="Agunnaya Labs Neon Logo"
                  width={400}
                  height={400}
                  className="relative z-10 drop-shadow-2xl animate-pulse"
                  priority
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Token Metrics Dashboard */}
        <Section className="bg-secondary/30 py-12 lg:py-16">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Live Token Metrics</h2>
            <p className="text-muted-foreground">Real-time data from GeckoTerminal • Updated every 5 minutes</p>
          </div>

          <TokenMetrics data={tokenData} />
        </Section>

        {/* Trading Pair Information */}
        <Section className="py-12 lg:py-16">
          <TradingPairCard data={tokenData} />
        </Section>

        {/* Security & Verification */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <SecurityBadges data={tokenData} />
        </Section>

        {/* Smart Contract Section */}
        <Section className="py-12 lg:py-16">
          <div className="card border-accent/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Smart Contract</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  AGL is built on Base blockchain with transparent, auditable smart contracts. 
                  The contract is verified on BaseScan with full transparency and immutable records.
                </p>

                <div className="mb-6 p-4 bg-background rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Token Address:</p>
                  <p className="font-mono text-sm break-all text-accent font-semibold">
                    {CONTRACT_ADDRESS}
                  </p>
                </div>

                <Link
                  href={`https://basescan.org/token/${CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  View on BaseScan →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 border border-border">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Verified</h3>
                      <p className="text-sm text-muted-foreground">Contract verified on BaseScan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🔐</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Secure</h3>
                      <p className="text-sm text-muted-foreground">GT Security Score: 28/100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Low Fees</h3>
                      <p className="text-sm text-muted-foreground">0.01% pool fee on Uniswap V4</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Call to Action - Buy Section */}
        <Section className="py-16 lg:py-24 bg-accent/10 border-y border-accent/20">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold text-accent">
              Ready to Get Started?
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Buy AGL Today
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join thousands of AGL holders and start earning rewards. Buy on Uniswap with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a 
                href={UNISWAP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary text-center inline-block"
              >
                Buy AGL on Uniswap ↗
              </a>
              <Link href="/stake" className="btn-secondary text-center">
                Learn About Staking
              </Link>
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Key Features</h2>
            <p className="text-muted-foreground">Why choose AGL token</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Innovative',
                description: 'Cutting-edge blockchain technology for next-generation applications',
              },
              {
                icon: '👥',
                title: 'Community-Driven',
                description: 'Built by and for the community with transparent governance',
              },
              {
                icon: '📱',
                title: 'Accessible',
                description: 'Easy to use platforms and tools for all experience levels',
              },
              {
                icon: '💎',
                title: 'Valuable',
                description: 'Real utility and strong tokenomics backing the token',
              },
              {
                icon: '🔄',
                title: 'Sustainable',
                description: 'Long-term focused with responsible token distribution',
              },
              {
                icon: '🌟',
                title: 'Rewarding',
                description: 'Staking opportunities and rewards for community participation',
              },
            ].map((feature, index) => (
              <div key={index} className="card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tokenomics Section */}
        <Section className="py-12 lg:py-16">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Tokenomics</h2>
            <p className="text-muted-foreground mb-8">Transparent token distribution and allocation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Allocation Chart */}
            <div className="card">
              <h3 className="text-xl font-semibold text-foreground mb-6">Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: 'Community', percentage: 40, color: 'bg-accent' },
                  { label: 'Team & Development', percentage: 20, color: 'bg-blue-500' },
                  { label: 'Partnerships', percentage: 15, color: 'bg-purple-500' },
                  { label: 'Reserve', percentage: 15, color: 'bg-orange-500' },
                  { label: 'Marketing', percentage: 10, color: 'bg-pink-500' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-foreground">{item.label}</span>
                      <span className="text-sm font-bold text-accent">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Info */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-foreground mb-3">Total Supply</h3>
                <p className="text-3xl font-bold text-accent">1 Billion AGL</p>
                <p className="text-sm text-muted-foreground mt-2">Fixed maximum supply</p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-foreground mb-3">Staking Rewards</h3>
                <p className="text-3xl font-bold text-accent">12% APY</p>
                <p className="text-sm text-muted-foreground mt-2">Earn by staking your tokens</p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-foreground mb-3">Release Schedule</h3>
                <p className="text-3xl font-bold text-accent">4 Years</p>
                <p className="text-sm text-muted-foreground mt-2">Graduated token release period</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/tokenomics" className="btn-primary inline-block">
              View Full Tokenomics →
            </Link>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="py-12 lg:py-16 bg-accent/10 border-t border-b border-accent/20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Join the Revolution?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your journey with AGL token today. Stake, trade, or simply hold as part of our growing community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stake" className="btn-primary">
                Start Staking →
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </Section>

        {/* Community Section */}
        <Section className="py-12 lg:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Join Our Community</h2>
            <p className="text-muted-foreground">Connect with us on social media and stay updated</p>
          </div>

          <div className="flex justify-center">
            <CommunityLinks links={communityLinks} layout="horizontal" />
          </div>
        </Section>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
