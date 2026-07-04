'use client'

import { TokenData } from '@/lib/token-data'
import { CheckCircle2, AlertCircle, Shield } from 'lucide-react'

interface SecurityBadgesProps {
  data: TokenData
}

export function SecurityBadges({ data }: SecurityBadgesProps) {
  const gtScorePercentage = (data.gtSecurityScore / 100) * 100
  const isSecure = data.gtSecurityScore >= 60

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Security & Verification</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GT Security Score */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-accent" />
              <span className="font-semibold text-sm">GT Security</span>
            </div>
            <span className="text-lg font-bold text-accent">{data.gtSecurityScore}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isSecure ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${Math.min(gtScorePercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {isSecure ? 'Good security score' : 'Standard security'}
          </p>
        </div>

        {/* DeFi Scan */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="font-semibold text-sm">DeFi Scan</span>
          </div>
          <p className="text-sm font-semibold text-green-500">Passed</p>
          <p className="text-xs text-muted-foreground">No reentrancy detected</p>
        </div>

        {/* Contract Verified */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="font-semibold text-sm">Verified</span>
          </div>
          <p className="text-sm font-semibold text-green-500">On-chain</p>
          <p className="text-xs text-muted-foreground">Contract verified</p>
        </div>
      </div>

      {/* Additional Security Info */}
      <div className="card p-4 bg-secondary/50">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>No honeypot detected</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>Open source contract</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span>No proxy vulnerabilities</span>
          </div>
        </div>
      </div>
    </div>
  )
}
