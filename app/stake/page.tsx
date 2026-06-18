'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { TokenCard } from '@/components/TokenCard'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'
const UNISWAP_URL = 'https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base'

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState('1000')
  const [selectedPeriod, setSelectedPeriod] = useState('30')

  const calculateRewards = () => {
    const amount = parseFloat(stakeAmount) || 0
    const days = parseInt(selectedPeriod) || 30
    const apy = 0.12
    const dailyRate = apy / 365
    return (amount * dailyRate * days).toFixed(2)
  }

  const stakingTiers = [
    {
      tier: 'Bronze',
      min: 100,
      max: 10000,
      bonus: '12%',
      benefits: ['12% APY', 'Standard rewards', 'Community voting'],
    },
    {
      tier: 'Silver',
      min: 10000,
      max: 100000,
      bonus: '13%',
      benefits: ['13% APY', 'Early access to features', 'Enhanced voting power'],
      badge: 'Popular',
    },
    {
      tier: 'Gold',
      min: 100000,
      max: 1000000,
      bonus: '14%',
      benefits: ['14% APY', 'Priority support', 'VIP governance rights', 'Exclusive events'],
    },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Header */}
        <Section className="pt-12 lg:pt-20 pb-8 lg:pb-12">
          <div className="max-w-3xl">
            <Link href="/" className="text-accent text-sm font-semibold mb-4 inline-block hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">Stake AGL</h1>
            <p className="text-lg text-muted-foreground">
              Earn rewards by staking your tokens. Lock your AGL and receive daily returns
            </p>
          </div>
        </Section>

        {/* Quick Stats */}
        <Section className="py-8 lg:py-12 bg-secondary/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TokenCard
              title="APY"
              value="12-14%"
              description="Tier-based annual yield"
              icon="📈"
            />
            <TokenCard
              title="Minimum Stake"
              value="100 AGL"
              description="Get started with a small amount"
              icon="🎯"
            />
            <TokenCard
              title="Lockup Period"
              value="30 Days"
              description="Flexible lock durations"
              icon="⏱️"
            />
          </div>
        </Section>

        {/* Staking Calculator */}
        <Section className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator */}
            <div className="card">
              <h2 className="text-2xl font-bold text-foreground mb-6">Reward Calculator</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Stake Amount (AGL)
                  </label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Lockup Period (Days)
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">180 Days</option>
                    <option value="365">365 Days</option>
                  </select>
                </div>

                <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/30">
                  <p className="text-sm text-muted-foreground mb-2">Estimated Rewards</p>
                  <p className="text-4xl font-bold text-accent">{calculateRewards()}</p>
                  <p className="text-sm text-muted-foreground mt-2">AGL over {selectedPeriod} days</p>
                </div>

                <button className="w-full btn-primary">Connect Wallet to Stake</button>
              </div>
            </div>

            {/* How It Works */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-foreground mb-4">How Staking Works</h3>
                <ol className="space-y-4 text-muted-foreground">
                  {[
                    { step: 1, text: 'Connect your Web3 wallet to our platform' },
                    { step: 2, text: 'Deposit AGL tokens into the staking contract' },
                    { step: 3, text: 'Choose your lockup period (30-365 days)' },
                    { step: 4, text: 'Start earning rewards immediately' },
                    { step: 5, text: 'Withdraw principal + rewards after lockup' },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
                <h3 className="text-lg font-bold text-foreground mb-3">Smart Rewards</h3>
                <p className="text-muted-foreground text-sm">
                  Rewards are calculated daily and added to your stake automatically. Compound your gains over time.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Staking Tiers */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <h2 className="text-4xl font-bold text-foreground mb-12">Staking Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stakingTiers.map((tier, index) => (
              <div
                key={index}
                className={`card ${
                  tier.badge ? 'ring-2 ring-accent shadow-lg' : ''
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {tier.badge}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.tier}</h3>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Minimum stake</p>
                  <p className="text-2xl font-bold text-accent">{tier.min.toLocaleString()} AGL</p>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border mb-6">
                  <p className="text-sm text-muted-foreground mb-1">APY</p>
                  <p className="text-3xl font-bold text-accent">{tier.bonus}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-accent">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full btn-primary">Select Tier</button>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ Section */}
        <Section className="py-12 lg:py-16">
          <h2 className="text-4xl font-bold text-foreground mb-12">Staking FAQ</h2>

          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: 'Is my stake secure?',
                a: 'Yes. All AGL staking contracts are audited, use multi-signature wallets, and are protected by leading security practices. Your tokens remain in the smart contract which you control.',
              },
              {
                q: 'Can I withdraw early?',
                a: 'Once you stake your tokens, they are locked for the selected period. Early withdrawal before lockup ends is not permitted. Choose a lockup period that works for you.',
              },
              {
                q: 'How are rewards distributed?',
                a: 'Rewards are calculated daily based on 12-14% APY depending on your tier. Rewards are automatically compounded and added to your stake. You receive all accumulated rewards when your lockup ends.',
              },
              {
                q: 'What happens after lockup ends?',
                a: 'After your lockup period expires, you can withdraw your original stake plus all earned rewards anytime. There is no automatic renewal—you must choose to stake again.',
              },
              {
                q: 'Are there any fees?',
                a: 'No hidden fees. All transaction costs are transparent. Some gas fees apply depending on the blockchain, but staking rewards have no platform fees.',
              },
              {
                q: 'Can I upgrade my tier?',
                a: 'Yes! You can increase your stake amount or extend your lockup to move to a higher tier and earn better rewards.',
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

        {/* Need AGL Section */}
        <Section className="py-12 lg:py-16 border-y border-border">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-semibold text-accent">
              Don't Have AGL Yet?
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Get AGL Tokens First
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Purchase AGL on Uniswap using your favorite stablecoins. Once you have tokens, come back to stake and start earning rewards.
            </p>
            <a 
              href={UNISWAP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-center inline-block"
            >
              Buy AGL on Uniswap ↗
            </a>
          </div>
        </Section>

        {/* Call to Action */}
        <Section className="py-12 lg:py-16 bg-gradient-to-r from-accent/10 to-accent/5">
          <div className="text-center max-w-3xl mx-auto card">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Start Earning?</h2>
            <p className="text-muted-foreground mb-8">
              Maximize your AGL holdings by staking today. No complicated process—just connect, stake, and earn.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn-primary">Connect Wallet →</button>
              <Link href="/tokenomics" className="btn-secondary">
                View Tokenomics
              </Link>
            </div>
          </div>
        </Section>

        {/* Important Info */}
        <Section className="py-12 lg:py-16">
          <div className="card border-orange-500/30 border-2">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> Important Information
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Staking is only available for verified, compliant users</li>
              <li>• This is not financial advice. Please consult a financial advisor</li>
              <li>• Past performance does not guarantee future results</li>
              <li>• Cryptocurrency markets are volatile and high-risk</li>
              <li>• Make sure you understand the risks before staking</li>
            </ul>
          </div>
        </Section>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
