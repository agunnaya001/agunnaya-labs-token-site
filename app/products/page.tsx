import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { ProductShowcase } from '@/components/ProductShowcase'
import { motion } from 'framer-motion'

export const metadata = {
  title: 'Products - AGL Token | Agunnaya Labs Ecosystem',
  description:
    'Explore our complete suite of Web3 products including Vibe Studio, ArenaVerse, ChonkPump, and AGL Network.',
  openGraph: {
    title: 'Products - AGL Token',
    description: 'Complete Web3 product ecosystem powered by AGL',
    images: [
      {
        url: 'https://www.agunnayalabs.xyz/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

const PRODUCT_DETAILS = [
  {
    id: 'vibe-studio',
    name: 'Vibe Studio',
    tagline: 'AI-Powered Smart Contract IDE',
    description:
      'Vibe Studio is a next-generation Solidity IDE that combines artificial intelligence with professional development tools. Write, test, audit, and deploy smart contracts faster than ever.',
    features: [
      'Real-time Code Completion with AI assistance',
      'Integrated Security Audit System',
      'Gas Optimization Recommendations',
      'Live Testing Environment',
      'One-click Contract Deployment',
      'Multi-signature Safety Features',
    ],
    benefits: [
      'Reduce development time by 50%',
      'Catch security issues before deployment',
      'Optimize gas costs automatically',
      'Deploy confidently with AI guidance',
    ],
    link: '#',
    status: 'Live',
  },
  {
    id: 'arenaverse',
    name: 'ArenaVerse',
    tagline: 'Competitive GameFi Arena',
    description:
      'ArenaVerse is a competitive GameFi ecosystem where players battle with NFTs, earn rewards, and compete in tournaments. Experience the future of play-to-earn gaming.',
    features: [
      'NFT-based Battle System',
      'Dynamic Tournament Ladder',
      'Play-to-Earn Rewards',
      'Seasonal Leaderboards',
      'Guild System',
      'Cross-chain NFT Support',
    ],
    benefits: [
      'Earn while you play',
      'Compete fairly against others',
      'Build your NFT collection',
      'Join a thriving gaming community',
    ],
    link: '#',
    status: 'Live',
  },
  {
    id: 'chonkpump',
    name: 'ChonkPump',
    tagline: 'Fair-Launch Token Launchpad',
    description:
      'ChonkPump is a decentralized launchpad for fair-launch token projects with no VC allocation. Empowering community-driven projects to launch successfully.',
    features: [
      'Fair-Launch Mechanism',
      'Community Voting',
      'Lock-up Contracts',
      'Multi-sig Safety',
      'No Hidden Allocation',
      'Transparent Vesting',
    ],
    benefits: [
      'Equal opportunity for all users',
      'Transparent project vetting',
      'Safe fund management',
      'Community-driven decisions',
    ],
    link: '#',
    status: 'Coming Soon',
  },
  {
    id: 'agl-network',
    name: 'AGL Network',
    tagline: 'GameFi Blockchain Infrastructure',
    description:
      'AGL Network is a next-generation blockchain optimized for GameFi and DeFi applications. Built for speed, security, and scalability.',
    features: [
      'Sub-second Transaction Finality',
      'Ultra-low Gas Fees',
      'EVM Compatible',
      'Cross-chain Bridge',
      'Advanced DeFi Primitives',
      'Enterprise Security',
    ],
    benefits: [
      'Instant transaction confirmation',
      'Negligible transaction costs',
      'Seamless Ethereum integration',
      'Multi-chain liquidity',
    ],
    link: '#',
    status: 'Coming Soon',
  },
]

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero */}
        <Section className="pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-background to-secondary/50">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-black mb-6 text-foreground">
              Complete Web3
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                {' '}
              Ecosystem
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive suite of tools and platforms designed for the modern Web3 economy.
              From development tools to gaming platforms, we have everything you need.
            </p>
          </div>
        </Section>

        {/* Product Showcase */}
        <Section className="py-16 lg:py-24">
          <ProductShowcase />
        </Section>

        {/* Detailed Product Cards */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Deep Dive Into Our Products</h2>

          {PRODUCT_DETAILS.map((product, index) => (
            <div
              key={product.id}
              className={`mb-16 p-8 lg:p-12 rounded-2xl border border-border ${
                index % 2 === 0 ? 'bg-background' : 'bg-gradient-to-br from-background to-secondary/50'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl">
                      {product.id === 'vibe-studio'
                        ? '⚡'
                        : product.id === 'arenaverse'
                          ? '🎮'
                          : product.id === 'chonkpump'
                            ? '🚀'
                            : '🔗'}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">{product.name}</h3>
                      <p className="text-sm text-accent font-semibold">{product.tagline}</p>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
                        Benefits
                      </h4>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={product.link}
                    className={`inline-block px-6 py-3 rounded-lg font-semibold transition-all ${
                      product.status === 'Live'
                        ? 'bg-accent text-accent-foreground hover:shadow-lg'
                        : 'bg-secondary text-foreground cursor-not-allowed'
                    }`}
                  >
                    {product.status === 'Live' ? 'Launch App →' : 'Coming Soon'}
                  </a>
                </div>

                {/* Illustration */}
                <div
                  className={`relative h-80 rounded-xl ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-cyan-500/20 rounded-xl blur-xl opacity-50" />
                  <div className="relative h-full flex items-center justify-center text-8xl">{product.id === 'vibe-studio' ? '⚡' : product.id === 'arenaverse' ? '🎮' : product.id === 'chonkpump' ? '🚀' : '🔗'}</div>
                </div>
              </div>
            </div>
          ))}
        </Section>

        {/* Integration CTA */}
        <Section className="py-16 lg:py-24 bg-gradient-to-r from-accent/10 to-cyan-500/10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">Start Building Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              All products are built with AGL integration, making it easy to earn and use tokens across the
              ecosystem.
            </p>
            <a
              href="https://github.com/agunnaya001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:shadow-lg transition-all"
            >
              View Documentation →
            </a>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}
