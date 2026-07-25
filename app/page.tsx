import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { HeroSection } from '@/components/HeroSection'
import { FeatureCard } from '@/components/FeatureCard'
import { TokenMetrics } from '@/components/TokenMetrics'
import { SecurityBadges } from '@/components/SecurityBadges'
import { StakingCalculator } from '@/components/StakingCalculator'
import { ProductShowcase } from '@/components/ProductShowcase'
import { CommunityShowcase } from '@/components/CommunityShowcase'
import { AnalyticsSection } from '@/components/AnalyticsSection'
import { TradingPairCard } from '@/components/TradingPairCard'
import { LivePriceTicker } from '@/components/LivePriceTicker'
import { OnChainVerification } from '@/components/OnChainVerification'
import Link from 'next/link'
import { fetchTokenData } from '@/lib/token-data'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'
const UNISWAP_URL = 'https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Built on Base with sub-second transaction finality and near-zero gas fees.',
    gradient: 'from-yellow-500 to-orange-400',
  },
  {
    icon: '🎮',
    title: 'GameFi Native',
    description: 'Designed specifically for gaming and DeFi applications with Web3 integration.',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: '🔐',
    title: 'Secure & Audited',
    description: 'Smart contracts verified on BaseScan with professional security audits.',
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    icon: '👥',
    title: 'Community Driven',
    description: 'Governed by holders through transparent voting and proposal systems.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: '💰',
    title: 'Earn Rewards',
    description: 'Stake AGL and earn up to 20% APY with flexible tier options.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: '🚀',
    title: 'Launch Pad',
    description: 'Fair-launch ecosystem for new Web3 projects without VC allocation.',
    gradient: 'from-indigo-500 to-purple-500',
  },
]

export default async function Home() {
  const tokenData = await fetchTokenData()

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Live Price Ticker */}
        <LivePriceTicker data={tokenData} />

        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <Section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose AGL?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features designed for the modern Web3 ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* Token Metrics Dashboard */}
        <Section className="py-16 lg:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Live Token Metrics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time data from GeckoTerminal updated every 5 minutes
            </p>
          </div>
          <TokenMetrics data={tokenData} />
        </Section>

        {/* Trading Pair Information */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <TradingPairCard data={tokenData} />
        </Section>

        {/* Security & Verification */}
        <Section className="py-16 lg:py-24">
          <SecurityBadges data={tokenData} />
        </Section>

        {/* Staking Calculator */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Calculate Your Rewards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive staking calculator to estimate your potential returns
            </p>
          </div>
          <StakingCalculator />
        </Section>

        {/* Products Showcase */}
        <Section className="py-16 lg:py-24">
          <ProductShowcase />
        </Section>

        {/* Analytics Section */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <AnalyticsSection />
        </Section>

        {/* Community */}
        <Section className="py-16 lg:py-24">
          <CommunityShowcase />
        </Section>

        {/* CTA Section */}
        <Section className="py-16 lg:py-24 bg-gradient-to-r from-accent/10 to-cyan-500/10">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your AGL Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of community members and start earning rewards with AGL staking today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#stake"
                className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:shadow-2xl hover:shadow-accent/50 transition-all active:scale-95"
              >
                Start Staking →
              </Link>
              <a
                href={UNISWAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-secondary text-foreground font-bold rounded-lg border border-border hover:border-accent transition-all"
              >
                Buy AGL Now ↗
              </a>
            </div>
          </div>
        </Section>

        {/* Smart Contract Info */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
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
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all inline-block"
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

        {/* Live On-Chain Verification (api.agunnayalabs.xyz) */}
        <Section className="py-16 lg:py-24">
          <OnChainVerification />
        </Section>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
