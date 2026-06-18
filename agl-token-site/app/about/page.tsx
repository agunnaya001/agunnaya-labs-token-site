'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Wallet } from '@/components/Wallet';
import styles from './page.module.css';

const AGL_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698';
const CONTRACT_LINK = `https://basescan.org/token/${AGL_ADDRESS}`;

export default function AboutPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            AGL TOKEN
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/stake" className={styles.navLink}>Stake</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Wallet />
          </nav>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          {/* About Section */}
          <section className={styles.section}>
            <h2>About Agunnaya Labs Token</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Agunnaya Labs Token (AGL) is a next-generation cryptocurrency built on Base mainnet.
              We're committed to creating a decentralized financial ecosystem that empowers users,
              maximizes yields, and provides transparent, secure smart contracts for everyone.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className={styles.section}>
            <h2>Mission & Vision</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>🎯 Our Mission</h3>
                <p>
                  To democratize access to high-yield financial products through blockchain technology,
                  making decentralized finance accessible to everyone.
                </p>
              </div>
              <div className={styles.card}>
                <h3>🚀 Our Vision</h3>
                <p>
                  To become the leading token on Base mainnet, recognized for security, innovation,
                  and community-driven development.
                </p>
              </div>
              <div className={styles.card}>
                <h3>💡 Core Values</h3>
                <p>
                  Transparency, security, community first, continuous innovation, and sustainable growth
                  are the pillars of everything we do.
                </p>
              </div>
            </div>
          </section>

          {/* Smart Contract */}
          <section className={styles.section}>
            <h2>Smart Contract Details</h2>
            <div className={styles.contractInfo}>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Token Name</div>
                <div className={styles.infoValue}>Agunnaya Labs Token</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Symbol</div>
                <div className={styles.infoValue}>AGL</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Network</div>
                <div className={styles.infoValue}>Base Mainnet (ChainID: 8453)</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Contract Address</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <code className={styles.infoValue}>{AGL_ADDRESS}</code>
                  <button
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(AGL_ADDRESS, 'address')}
                  >
                    {copied === 'address' ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Verification Status</div>
                <div className={styles.infoValue} style={{ color: 'var(--success)' }}>
                  ✓ Verified
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Explorer Link</div>
                <div>
                  <a href={CONTRACT_LINK} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
                    View on Basescan →
                  </a>
                </div>
              </div>
            </div>

            {/* Token Properties */}
            <div className={styles.tokenDetails}>
              <div className={styles.detail}>
                <div className={styles.detailLabel}>Decimals</div>
                <div className={styles.detailValue}>18</div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailLabel}>Max APY</div>
                <div className={styles.detailValue}>50%</div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailLabel}>Min Stake</div>
                <div className={styles.detailValue}>1 AGL</div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailLabel}>Fee</div>
                <div className={styles.detailValue}>0%</div>
              </div>
            </div>
          </section>

          {/* Staking Info */}
          <section className={styles.section}>
            <h2>Staking Information</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>🎁 Flexible Tier</h3>
                <p><strong>APY: 12%</strong></p>
                <p>No lock-in period. Withdraw anytime.</p>
              </div>
              <div className={styles.card}>
                <h3>📅 30-Day Tier</h3>
                <p><strong>APY: 20%</strong></p>
                <p>Lock your tokens for 30 days for higher yields.</p>
              </div>
              <div className={styles.card}>
                <h3>📈 60-Day Tier</h3>
                <p><strong>APY: 35%</strong></p>
                <p>Maximize rewards with a 60-day commitment.</p>
              </div>
              <div className={styles.card}>
                <h3>🚀 90-Day Tier</h3>
                <p><strong>APY: 50%</strong></p>
                <p>Highest yields with a 90-day lock period.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.section}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>Is my stake safe?</h3>
                <p>
                  Yes. Our smart contracts are audited and verified on Basescan. All code is transparent
                  and open for community review.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Can I withdraw early?</h3>
                <p>
                  Flexible tier allows anytime withdrawal. Fixed tiers require waiting until lock-in
                  period ends, or you may face early withdrawal fees.
                </p>
              </div>
              <div className={styles.card}>
                <h3>How are rewards distributed?</h3>
                <p>
                  Rewards are calculated daily and can be claimed anytime. They accrue automatically
                  in your staking pool.
                </p>
              </div>
              <div className={styles.card}>
                <h3>What network do I need?</h3>
                <p>
                  AGL runs on Base mainnet (ChainID: 8453). Your wallet will auto-switch when connecting.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Is there a minimum stake?</h3>
                <p>
                  No minimum stake required. Start with any amount, even 1 AGL token!
                </p>
              </div>
              <div className={styles.card}>
                <h3>How do I get started?</h3>
                <p>
                  Connect your wallet, choose a staking tier, enter your amount, and approve the transaction.
                  Earn rewards immediately!
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
            <h2>Ready to Start Staking?</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Join thousands of AGL holders earning passive rewards.
            </p>
            <Link
              href="/stake"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              Start Staking Now
            </Link>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          © 2025 Agunnaya Labs Token. Built with ❤️ on Base mainnet.
          <br />
          <a href={CONTRACT_LINK} target="_blank" rel="noopener noreferrer">
            View Contract
          </a>
          {' | '}
          <a href="https://x.com/agunnayalabs" target="_blank" rel="noopener noreferrer">
            Follow Us
          </a>
        </p>
      </footer>
    </div>
  );
}
