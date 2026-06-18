'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Wallet } from '@/components/Wallet';
import { StakingTierSelector } from '@/components/StakingTier';
import { STAKING_TIERS, calculateAPYBreakdown, StakingTier as TierType } from '@/lib/contracts';
import styles from './page.module.css';

export default function StakePage() {
  const [amount, setAmount] = useState<string>('1000');
  const [selectedTier, setSelectedTier] = useState<TierType>(STAKING_TIERS[0]);
  const [rewards, setRewards] = useState<ReturnType<typeof calculateAPYBreakdown> | null>(null);

  useEffect(() => {
    if (amount && selectedTier) {
      const numAmount = parseFloat(amount) || 0;
      const breakdown = calculateAPYBreakdown(numAmount, selectedTier.apy);
      setRewards(breakdown);
    }
  }, [amount, selectedTier]);

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
          <section className={styles.header2}>
            <h1>Stake Your AGL</h1>
            <p>
              Earn passive rewards by staking your AGL tokens. Choose your tier and start earning today.
            </p>
          </section>

          {/* Staking Interface */}
          <div className={styles.stakingContainer}>
            {/* Input Section */}
            <div className={styles.inputSection}>
              <h2>Staking Parameters</h2>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="amount">
                  Stake Amount (AGL)
                </label>
                <input
                  id="amount"
                  type="number"
                  className={styles.input}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Selected Tier
                </label>
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'var(--bg-primary)',
                    border: '2px solid var(--accent)',
                    borderRadius: '4px',
                    color: 'var(--accent)',
                    fontWeight: '700',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.25rem',
                  }}
                >
                  {selectedTier.name} - {selectedTier.apy}% APY
                  {selectedTier.duration > 0 && ` (${selectedTier.duration} days)`}
                </div>
              </div>

              <button className={styles.stakeButton}>
                Stake Now
              </button>

              <small style={{ color: 'var(--text-tertiary)', textAlign: 'center' }}>
                💡 Tip: Higher tiers offer better APY but lock your tokens for the specified period.
              </small>
            </div>

            {/* Calculator Section */}
            {rewards && (
              <div className={styles.calculatorSection}>
                <h2>Reward Calculator</h2>

                <div className={styles.result}>
                  <div className={styles.resultLabel}>Annual Rewards</div>
                  <div className={styles.resultValue}>
                    {rewards.yearly.toFixed(2)} AGL
                  </div>
                </div>

                <div className={styles.breakdownGrid}>
                  <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Daily</div>
                    <div className={styles.breakdownValue}>
                      {rewards.daily.toFixed(4)} AGL
                    </div>
                  </div>
                  <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Weekly</div>
                    <div className={styles.breakdownValue}>
                      {rewards.weekly.toFixed(4)} AGL
                    </div>
                  </div>
                  <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Monthly</div>
                    <div className={styles.breakdownValue}>
                      {rewards.monthly.toFixed(4)} AGL
                    </div>
                  </div>
                  <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Total (1 Year)</div>
                    <div className={styles.breakdownValue}>
                      {rewards.yearly.toFixed(2)} AGL
                    </div>
                  </div>
                </div>

                <small style={{ color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '1rem' }}>
                  Based on {selectedTier.apy}% APY
                </small>
              </div>
            )}
          </div>

          {/* Tier Selection */}
          <section className={styles.tiersSection}>
            <StakingTierSelector
              selectedTier={selectedTier}
              onSelect={setSelectedTier}
            />
          </section>

          {/* Info Section */}
          <section style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h2>How It Works</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem',
              marginTop: '2rem'
            }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--border)', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>1. Connect Wallet</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Connect your Web3 wallet to get started. We support MetaMask and other EIP-1193 compliant wallets.</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--border)', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>2. Choose Tier</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Select your preferred staking tier based on your risk tolerance and lock-in period.</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--border)', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>3. Stake & Earn</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Approve and stake your AGL tokens. Start earning rewards immediately!</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          © 2025 Agunnaya Labs Token. Stake responsibly.
          <br />
          <a href="https://basescan.org/token/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698" target="_blank" rel="noopener noreferrer">
            View Contract
          </a>
        </p>
      </footer>
    </div>
  );
}
