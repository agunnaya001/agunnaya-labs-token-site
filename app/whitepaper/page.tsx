'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'

export default function WhitepaperPage() {
  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'vision', title: 'Vision & Mission' },
    { id: 'technology', title: 'Technology' },
    { id: 'tokenomics', title: 'Tokenomics' },
    { id: 'governance', title: 'Governance Model' },
    { id: 'roadmap', title: 'Roadmap' },
    { id: 'risks', title: 'Risk Assessment' },
    { id: 'conclusion', title: 'Conclusion' },
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
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">Whitepaper</h1>
            <p className="text-lg text-muted-foreground">
              Official technical documentation and strategic vision for Agunnaya Labs Token
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="/whitepaper.pdf"
                download="AGL-Whitepaper.pdf"
                className="btn-primary"
              >
                Download PDF →
              </a>
              <button
                onClick={() => window.print()}
                className="btn-secondary"
              >
                Print
              </button>
            </div>
          </div>
        </Section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card">
              <h3 className="font-bold text-foreground mb-4">Contents</h3>
              <ul className="space-y-2">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-accent hover:underline transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Document */}
          <div className="lg:col-span-3 space-y-12">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Introduction</h2>
              <div className="card space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Agunnaya Labs Token (AGL) represents a paradigm shift in decentralized finance and blockchain technology.
                  Built on innovative principles of transparency, security, and community governance, AGL serves as the native
                  utility token powering the Agunnaya Labs ecosystem.
                </p>
                <p>
                  This whitepaper outlines the technical architecture, economic model, and strategic roadmap for AGL. It is intended
                  for developers, investors, and community members seeking to understand the fundamental aspects of our protocol and
                  vision for the future of blockchain technology.
                </p>
              </div>
            </section>

            {/* Vision & Mission */}
            <section id="vision" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Vision & Mission</h2>
              <div className="card space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Vision</h3>
                  <p>
                    To create a globally accessible, transparent, and secure blockchain ecosystem that empowers individuals
                    and organizations to participate in the decentralized future without intermediaries or barriers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Mission</h3>
                  <p>
                    We are committed to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Building secure, audited smart contracts</li>
                    <li>Fostering community-driven development and governance</li>
                    <li>Ensuring fair token distribution and economic sustainability</li>
                    <li>Advancing blockchain technology and interoperability</li>
                    <li>Providing educational resources and support to the ecosystem</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technology */}
            <section id="technology" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">3. Technology</h2>
              <div className="card space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Blockchain Architecture</h3>
                  <p>
                    AGL is built on the Ethereum blockchain, leveraging its robust security infrastructure and widespread adoption.
                    Our smart contracts are written in Solidity and have undergone rigorous security audits by leading blockchain
                    security firms.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Smart Contracts</h3>
                  <p>
                    The AGL protocol consists of three primary smart contracts:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Token Contract:</strong> ERC-20 compliant token with additional utility functions</li>
                    <li><strong>Staking Contract:</strong> Manages token staking and reward distribution</li>
                    <li><strong>Governance Contract:</strong> Handles community voting and protocol decisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Security Measures</h3>
                  <p>
                    All AGL smart contracts implement industry-standard security practices including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Multi-signature wallets for critical operations</li>
                    <li>Time locks for sensitive contract upgrades</li>
                    <li>Comprehensive audit trails and monitoring</li>
                    <li>Community bug bounty program</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tokenomics */}
            <section id="tokenomics" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Tokenomics</h2>
              <div className="card space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Token Specifications</h3>
                  <div className="bg-background p-4 rounded-lg space-y-2">
                    <div className="flex justify-between"><span>Total Supply:</span><strong className="text-foreground">1,000,000,000 AGL</strong></div>
                    <div className="flex justify-between"><span>Token Standard:</span><strong className="text-foreground">ERC-20</strong></div>
                    <div className="flex justify-between"><span>Decimals:</span><strong className="text-foreground">18</strong></div>
                    <div className="flex justify-between"><span>Contract Address:</span><strong className="text-accent font-mono text-sm">0xEA122...</strong></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Token Distribution</h3>
                  <p>
                    The 1 billion AGL tokens are distributed as follows: 40% to Community, 20% to Team & Development,
                    15% to Partnerships, 15% to Reserve, and 10% to Marketing.
                  </p>
                </div>
              </div>
            </section>

            {/* Governance */}
            <section id="governance" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Governance Model</h2>
              <div className="card space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AGL implements a decentralized governance model that gives token holders direct influence over protocol development
                  and resource allocation. All significant decisions are submitted to community vote.
                </p>
                <p>
                  Governance participants must hold at least 100,000 AGL to submit proposals, ensuring serious participants. Voting
                  periods last 7 days, and proposals require a 51% majority to pass.
                </p>
              </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Roadmap</h2>
              <div className="card space-y-6">
                {[
                  { phase: 'Phase 1', time: 'Q1-Q2 2024', items: ['Token Launch', 'Exchange Listings', 'Community Building'] },
                  { phase: 'Phase 2', time: 'Q3-Q4 2024', items: ['Staking Protocol', 'Governance Launch', 'DEX Integration'] },
                  { phase: 'Phase 3', time: 'Q1-Q2 2025', items: ['NFT Marketplace', 'Cross-chain Bridge', 'Mobile App'] },
                  { phase: 'Phase 4', time: 'Q3-Q4 2025', items: ['Enterprise Solutions', 'Web3 Integration', 'DAO Formation'] },
                ].map((roadmap, index) => (
                  <div key={index} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl font-bold text-accent flex-shrink-0">{index + 1}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">{roadmap.phase} - {roadmap.time}</h3>
                        <ul className="text-muted-foreground space-y-1">
                          {roadmap.items.map((item, idx) => (
                            <li key={idx} className="text-sm">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Risk Assessment */}
            <section id="risks" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Risk Assessment</h2>
              <div className="card space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  As with all cryptocurrency investments, AGL token carries inherent risks. We encourage all participants to conduct
                  thorough due diligence and understand the following:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Market Risk:</strong> Token value may fluctuate significantly based on market conditions</li>
                  <li><strong>Technical Risk:</strong> Smart contract vulnerabilities could affect token functionality</li>
                  <li><strong>Regulatory Risk:</strong> Cryptocurrency regulations may impact token operations</li>
                  <li><strong>Liquidity Risk:</strong> Difficulty selling tokens in certain market conditions</li>
                  <li><strong>Operational Risk:</strong> Team changes or project challenges may affect development</li>
                </ul>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Conclusion</h2>
              <div className="card space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Agunnaya Labs Token represents a commitment to advancing blockchain technology and creating value through
                  transparent, community-driven development. We believe AGL will play a significant role in the future of
                  decentralized finance and Web3 applications.
                </p>
                <p>
                  This whitepaper reflects our vision and roadmap as of its publication date. As the blockchain ecosystem evolves,
                  our strategy and technical implementation may be updated. All updates will be communicated transparently to the
                  community.
                </p>
                <p className="pt-4 border-t border-border">
                  <strong>Last Updated:</strong> January 2024<br />
                  <strong>Next Review:</strong> Q2 2024
                </p>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="card bg-gradient-to-r from-accent/10 to-accent/5 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Join our community discord or contact our team for more information
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Join Telegram →
                </a>
                <a href="mailto:contact@agunnayalabs.xyz" className="btn-secondary">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
