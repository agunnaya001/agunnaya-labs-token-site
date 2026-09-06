'use client'

import { useState } from 'react'
import { ArrowRight, Copy, ExternalLink, Menu, X } from 'lucide-react'
import { AGL_CONFIG, shortAddress } from '@/lib/agl-config'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyAddress() {
    await navigator.clipboard.writeText(AGL_CONFIG.token.address)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="site-page">
      <div className="reference-grid" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Agunnaya Labs home">
          <img src="/agl-logo.png" alt="Agunnaya Labs logo" />
          <span>AGLSTUDIO.XYZ</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#features">Features</a>
          <a href="#network">Network</a>
          <a href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">Developer Studio <ExternalLink data-icon="inline-end" /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#features" onClick={() => setMenuOpen(false)}>Features</a><a href="#network" onClick={() => setMenuOpen(false)}>Network</a><a href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">Developer Studio <ExternalLink data-icon="inline-end" /></a></nav>}

      <main id="top">
        <section className="landing-hero">
          <p className="domain-label">aglstudio.xyz</p>
          <h1>Build on <span>Base.</span></h1>
          <p className="hero-description">Create, launch, manage, and scale fully custom on-chain applications, linear bonding curve tokens, DAOs, GameFi reward structures, and autonomous AI agents in minutes. No Solidity experience required.</p>
          <div className="hero-actions"><a className="primary-cta" href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">Enter Developer Studio <ArrowRight data-icon="inline-end" /></a><a className="secondary-cta" href={AGL_CONFIG.links.baseScanToken} target="_blank" rel="noreferrer">Inspect AGL on BaseScan <ExternalLink data-icon="inline-end" /></a></div>
        </section>

        <section id="features" className="feature-stack">
          <a className="feature-link feature-link-purple" href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer"><span className="feature-icon">⌁</span><span>Investor Pitch Deck (PDF)</span><ArrowRight data-icon="inline-end" /></a>
          <a className="feature-link" href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer"><span>Features</span><ArrowRight data-icon="inline-end" /></a>
        </section>

        <section id="network" className="network-section"><div className="stat-card"><span>TRANSACTIONS PROCESSED</span><strong>1,245,892</strong></div><div className="stat-card"><span>CONTRACTS GENERATED</span><strong>24,852</strong></div><div className="stat-card"><span>NETWORK</span><strong>BASE</strong></div></section>

        <section className="contract-strip"><div><span>AGL TOKEN</span><strong>Native utility for the Agunnaya Labs ecosystem.</strong></div><button onClick={copyAddress} aria-label="Copy AGL token contract address"><code>{copied ? 'Copied' : shortAddress(AGL_CONFIG.token.address)}</code><Copy data-icon="inline-end" /></button></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><img src="/agl-logo.png" alt="Agunnaya Labs logo" /><span>AGUNNAYA LABS</span></div><div className="footer-links"><a href={AGL_CONFIG.external.github} target="_blank" rel="noreferrer">GitHub <ExternalLink data-icon="inline-end" /></a><a href={AGL_CONFIG.external.x} target="_blank" rel="noreferrer">X <ExternalLink data-icon="inline-end" /></a><span>Built on Base</span></div></footer>
    </div>
  )
}
