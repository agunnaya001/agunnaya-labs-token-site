'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Copy, ExternalLink, Code2, Menu, ShieldCheck, Sparkles, X } from 'lucide-react'
import { AGL_CONFIG, shortAddress } from '@/lib/agl-config'

const sections = [
  { label: 'Overview', href: '#overview' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Governance', href: '#governance' },
  { label: 'Builders', href: '#builders' },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyAddress() {
    await navigator.clipboard.writeText(AGL_CONFIG.token.address)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="site-grid" aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Agunnaya Labs home">
          <span className="brand-mark">A</span>
          <span>AGUNNAYA <em>LABS</em></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {sections.map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}
          <a href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">AGL Studio <ArrowUpRight data-icon="inline-end" /></a>
        </nav>
        <div className="header-actions">
          <a className="button button-ghost button-small" href={AGL_CONFIG.links.baseScanToken} target="_blank" rel="noreferrer">BaseScan <ExternalLink data-icon="inline-end" /></a>
          <a className="button button-primary button-small" href={AGL_CONFIG.links.trade} target="_blank" rel="noreferrer">Get AGL <ArrowUpRight data-icon="inline-end" /></a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{sections.map((section) => <a key={section.href} href={section.href} onClick={() => setMenuOpen(false)}>{section.label}</a>)}<a href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">AGL Studio <ArrowUpRight data-icon="inline-end" /></a></nav>}

      <main id="top">
        <section id="overview" className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> BASE-NATIVE / OPEN BY DESIGN</div>
            <h1>Infrastructure for the <span>agentic</span> economy.</h1>
            <p className="hero-lede">Agunnaya Labs is building the coordination layer for autonomous software, onchain identity, and the people who make both possible.</p>
            <div className="hero-actions"><a className="button button-primary" href="#ecosystem">Explore the network <ArrowUpRight data-icon="inline-end" /></a><a className="text-link" href={AGL_CONFIG.links.baseScanToken} target="_blank" rel="noreferrer">Read the contract <ExternalLink data-icon="inline-end" /></a></div>
            <div className="hero-meta"><span>01</span><span>AGL / BASE / 2026</span><span className="meta-line" /></div>
          </div>
          <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" /><div className="orbit-core"><span>AGL</span><small>BASE</small></div><span className="orbit-label label-one">OPEN<br />COORDINATION</span><span className="orbit-label label-two">ONCHAIN<br />UTILITY</span><span className="orbit-label label-three">HUMAN<br />AGENCY</span></div>
        </section>

        <section className="ticker" aria-label="Network status"><div><span className="ticker-label">LIVE NETWORK</span><strong>BASE</strong></div><div><span className="ticker-label">TOKEN</span><strong>AGL</strong></div><div><span className="ticker-label">CONTRACT</span><strong>{shortAddress(AGL_CONFIG.token.address)}</strong></div><div><span className="ticker-label">STATUS</span><strong className="online">ONLINE <span className="status-dot" /></strong></div></section>

        <section className="section-shell live-section">
          <div className="section-heading"><div><span className="eyebrow">/ 01 — LIVE DATA</span><h2>One token.<br /><span>Many surfaces.</span></h2></div><p>AGL is the coordination asset for the Agunnaya Labs ecosystem. Supply, balances, and market discovery should be verified at the source—not invented in the interface.</p></div>
          <div className="metrics-grid"><article className="metric-card metric-featured"><div className="card-top"><span>AGL TOKEN</span><span className="live-pill"><i /> ONCHAIN</span></div><strong className="metric-value">—</strong><p>Market price unavailable</p><small>Connect to a supported market source to resolve live pricing.</small><a href={AGL_CONFIG.links.baseScanToken} target="_blank" rel="noreferrer" className="card-link">Verify on BaseScan <ArrowUpRight data-icon="inline-end" /></a></article><article className="metric-card"><span className="card-label">TOTAL SUPPLY</span><strong className="metric-value">—</strong><p>Read from Base RPC</p><span className="metric-note">Live contract read</span></article><article className="metric-card"><span className="card-label">MARKET CAP</span><strong className="metric-value">—</strong><p>Awaiting pair discovery</p><span className="metric-note">No fallback values</span></article><article className="metric-card"><span className="card-label">LIQUIDITY</span><strong className="metric-value">—</strong><p>Awaiting pair discovery</p><span className="metric-note">No fallback values</span></article></div>
        </section>

        <section id="ecosystem" className="section-shell ecosystem-section"><div className="section-heading compact"><div><span className="eyebrow">/ 02 — THE ECOSYSTEM</span><h2>Tools for a world<br />that <span>runs itself.</span></h2></div><a className="text-link" href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">Visit AGL Studio <ArrowUpRight data-icon="inline-end" /></a></div><div className="ecosystem-grid"><article className="ecosystem-card large"><span className="number">01</span><Sparkles /><h3>AGL Studio</h3><p>A workspace for building with AI, exploring agentic workflows, and turning ideas into working software.</p><a href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">Open studio <ArrowUpRight data-icon="inline-end" /></a></article><article className="ecosystem-card"><span className="number">02</span><ShieldCheck /><h3>Transparent by default</h3><p>Contract addresses, governance paths, and source links stay public and easy to inspect.</p><a href="#governance">See governance <ArrowUpRight data-icon="inline-end" /></a></article><article className="ecosystem-card"><span className="number">03</span><Code2 /><h3>Built in public</h3><p>Protocols and product surfaces evolve in the open, with contributors close to the work.</p><a href={AGL_CONFIG.external.github} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight data-icon="inline-end" /></a></article></div></section>

        <section id="governance" className="section-shell governance-section"><div className="governance-panel"><div><span className="eyebrow">/ 03 — GOVERNANCE & TRUST</span><h2>Nothing hidden<br />behind the <span>interface.</span></h2><p>AGL is designed to make the important parts legible: what is deployed, where it lives, and how people can verify it.</p></div><div className="trust-list"><div><span>NETWORK</span><strong>Base <small>Chain ID {AGL_CONFIG.network.chainId}</small></strong></div><div><span>TOKEN CONTRACT</span><strong className="mono">{shortAddress(AGL_CONFIG.token.address)} <button onClick={copyAddress} aria-label="Copy token contract address">{copied ? <Check /> : <Copy />}</button></strong></div><div><span>MARKET SOURCE</span><strong>Discovery pending <small>DexScreener / Base</small></strong></div><a className="button button-outline" href={AGL_CONFIG.links.baseScanToken} target="_blank" rel="noreferrer">Inspect on BaseScan <ExternalLink data-icon="inline-end" /></a></div></div></section>

        <section id="builders" className="section-shell builder-section"><div className="builder-copy"><span className="eyebrow">/ 04 — FOR BUILDERS</span><h2>The best systems<br />leave room for <span>agency.</span></h2><p>Whether you are composing an agent, contributing to an open protocol, or testing a new coordination primitive, there is a place to start.</p><a className="button button-primary" href={AGL_CONFIG.external.github} target="_blank" rel="noreferrer">Explore the code <Code2 data-icon="inline-start" /></a></div><div className="builder-terminal" aria-label="AGL builder command"><div className="terminal-bar"><i /><i /><i /><span>agunnaya / getting-started</span></div><pre><code><span className="terminal-muted">$</span> git clone agunnaya-labs/token-site{`\n`}<span className="terminal-muted">$</span> cd token-site{`\n`}<span className="terminal-accent">$</span> make something useful{`\n`}{`\n`}<span className="terminal-muted">// permissionless by design</span></code></pre></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark">A</span><span>AGUNNAYA <em>LABS</em></span><p>Coordination infrastructure for an agentic world.</p></div><div className="footer-links"><a href={AGL_CONFIG.external.studio} target="_blank" rel="noreferrer">AGL Studio <ArrowUpRight data-icon="inline-end" /></a><a href={AGL_CONFIG.external.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight data-icon="inline-end" /></a><a href={AGL_CONFIG.external.x} target="_blank" rel="noreferrer">X <ArrowUpRight data-icon="inline-end" /></a></div><div className="footer-bottom"><span>© 2026 Agunnaya Labs</span><span>Built on <strong>Base</strong></span></div></footer>
    </div>
  )
}
