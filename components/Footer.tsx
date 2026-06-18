import React from 'react'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  year?: number
  companyName?: string
  contractAddress?: string
}

/**
 * Footer component with links, copyright, and contract info
 */
export function Footer({
  year = new Date().getFullYear(),
  companyName = 'Agunnaya Labs',
  contractAddress,
}: FooterProps) {
  const footerLinks: FooterLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Tokenomics', href: '/tokenomics' },
    { label: 'Team', href: '/team' },
    { label: 'About', href: '/about' },
    { label: 'Whitepaper', href: '/whitepaper' },
  ]

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About AGL</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agunnaya Labs Token is a next-generation cryptocurrency designed for
              innovative blockchain applications and community-driven growth.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub →
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                X (Twitter) →
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Telegram →
              </a>
            </div>
          </div>
        </div>

        {/* Contract Info */}
        {contractAddress && (
          <div className="mb-8 p-4 bg-background rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-2">Smart Contract Address:</p>
            <p className="font-mono text-sm break-all text-foreground">{contractAddress}</p>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
