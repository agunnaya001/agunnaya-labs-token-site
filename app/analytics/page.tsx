import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { AnalyticsSection } from '@/components/AnalyticsSection'

export const metadata = {
  title: 'Analytics - AGL Token | Real-time Market Data',
  description:
    'Real-time AGL token analytics, price charts, volume trends, holder distribution, and market insights.',
  openGraph: {
    title: 'Analytics - AGL Token',
    description: 'Real-time token analytics and market data',
    images: [
      {
        url: 'https://www.agunnayalabs.xyz/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function AnalyticsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero */}
        <Section className="pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-background to-secondary/50">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-black mb-6 text-foreground">
              Token
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                {' '}
              Analytics
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real-time market data, trends, and insights powered by GeckoTerminal. Updated every 5 minutes
              for the most accurate information.
            </p>
          </div>
        </Section>

        {/* Analytics Dashboard */}
        <Section className="py-16 lg:py-24">
          <AnalyticsSection />
        </Section>

        {/* Key Metrics Explanation */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">Understanding the Metrics</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Learn what each metric means and how they influence AGL value and trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                metric: 'Market Cap',
                explanation:
                  'The total value of all AGL tokens in circulation. Calculated by multiplying the current price by total supply. Higher market cap indicates stronger market confidence.',
              },
              {
                metric: '24h Volume',
                explanation:
                  'The total amount of AGL traded in the last 24 hours. Higher volume indicates more trading activity and typically better liquidity.',
              },
              {
                metric: 'Liquidity',
                explanation:
                  'The total value of assets in the trading pool. Higher liquidity means less slippage when trading and easier buying/selling.',
              },
              {
                metric: 'Price Trend',
                explanation:
                  'The historical price movement over time. Charts show patterns that can indicate momentum, support/resistance levels, and market sentiment.',
              },
              {
                metric: 'Holder Distribution',
                explanation:
                  'How AGL tokens are distributed among wallet addresses. Healthy distribution shows the token is not overly concentrated.',
              },
              {
                metric: 'Trading Activity',
                explanation:
                  'The number of buy/sell trades executed. Active trading indicates healthy market engagement and price discovery.',
              },
            ].map((item) => (
              <div
                key={item.metric}
                className="p-6 rounded-xl bg-gradient-to-br from-background to-secondary/50 border border-border hover:border-accent/50 transition-all"
              >
                <h3 className="text-lg font-bold text-accent mb-3">{item.metric}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.explanation}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Data Sources */}
        <Section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">Data Sources & Updates</h2>

            <div className="card border-border bg-gradient-to-br from-background to-secondary/30 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-accent mb-3">GeckoTerminal Integration</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All real-time data is sourced from GeckoTerminal, a leading decentralized exchange analytics
                  platform. This ensures transparency and eliminates any possibility of data manipulation.
                </p>
                <a
                  href="https://www.geckoterminal.com/base/pools/0xe7d6de2bf95c563a819eb62cbf0c7e9020df53c875ccfbaf3fdccaa1fd25b085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline"
                >
                  View on GeckoTerminal →
                </a>
              </div>

              <div>
                <h3 className="text-xl font-bold text-accent mb-3">Update Frequency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Analytics are refreshed every 5 minutes using Incremental Static Regeneration (ISR). This
                  ensures you always have the most recent data without sacrificing performance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-accent mb-3">Trading Pair</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Token:</strong> AGL (0xEA1221B4d80A89BD8C75248Fae7c176BD1854698)
                  <br />
                  <strong>Pair:</strong> AGL / CHONK9K
                  <br />
                  <strong>DEX:</strong> Uniswap V4 (Base)
                  <br />
                  <strong>Fee:</strong> 0.01% (ultra-low)
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Trading CTA */}
        <Section className="py-16 lg:py-24 bg-gradient-to-r from-accent/10 to-cyan-500/10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Trade?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Deep liquidity on Uniswap V4 with minimal slippage. Start trading AGL today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Trade on Uniswap →
              </a>
              <a
                href="https://www.geckoterminal.com/base/pools/0xe7d6de2bf95c563a819eb62cbf0c7e9020df53c875ccfbaf3fdccaa1fd25b085"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-secondary text-foreground font-bold rounded-lg border border-border hover:border-accent transition-all"
              >
                View on GeckoTerminal →
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}
