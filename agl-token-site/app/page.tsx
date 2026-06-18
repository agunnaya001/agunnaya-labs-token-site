import Link from 'next/link';
import { Wallet } from '@/components/Wallet';
import { PriceDisplay } from '@/components/PriceDisplay';
import { TokenomicsChart } from '@/components/TokenomicsChart';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Header/Navigation */}
        <header className={styles.header}>
          <h1 className={styles.logo}>AGL TOKEN</h1>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/stake" className={styles.navLink}>Stake</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Wallet />
          </nav>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              The Future of
              <br />
              <span className="accent-text accent-glow">Decentralized Finance</span>
            </h1>
            
            <p>
              Experience next-generation blockchain technology with Agunnaya Labs Token (AGL).
              Built on Base mainnet for speed, security, and sustainability.
            </p>

            <div className={styles.heroButtons}>
              <Link href="/stake" className={`${styles.heroButton} ${styles.primary}`}>
                Start Staking
              </Link>
              <a 
                href="https://basescan.org/token/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroButton}
              >
                View Contract
              </a>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>8453</div>
                <div className={styles.heroStatLabel}>Base Mainnet</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>50%</div>
                <div className={styles.heroStatLabel}>Max APY</div>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.visualBox}>
              <div>
                🔐 Secure Smart Contracts
                <br />
                Audited & Verified
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Price Section */}
          <section className={styles.section}>
            <h2>Live Market Data</h2>
            <div className={styles.sectionGrid}>
              <PriceDisplay />
            </div>
          </section>

          {/* Tokenomics Section */}
          <section className={styles.section}>
            <h2>Token Distribution</h2>
            <div className={styles.sectionGrid}>
              <TokenomicsChart />
            </div>
          </section>

          {/* Features Section */}
          <section className={styles.section}>
            <h2>Why Choose AGL?</h2>
            <div className={styles.sectionGrid}>
              <div className="glow" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '2px solid var(--border)', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>⚡ Lightning Fast</h3>
                <p>Built on Base mainnet for sub-second transactions and minimal fees.</p>
              </div>
              <div className="glow" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '2px solid var(--border)', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>🔒 Secure</h3>
                <p>Smart contracts audited and verified on Basescan with transparent code.</p>
              </div>
              <div className="glow" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '2px solid var(--border)', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>💰 High Yields</h3>
                <p>Earn up to 50% APY with our flexible staking tiers.</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          © 2025 Agunnaya Labs Token. Built with ❤️ on Base mainnet.
          <br />
          <a href="https://basescan.org/token/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698" target="_blank" rel="noopener noreferrer">
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
