'use client'

import { TokenData, formatNumber } from '@/lib/token-data'
import { ExternalLink } from 'lucide-react'

interface TradingPairCardProps {
  data: TokenData
}

export function TradingPairCard({ data }: TradingPairCardProps) {
  const uniswapUrl =
    'https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base'
  const baseScanUrl = `https://basescan.org/token/${data.tokenAddress}`

  return (
    <div className="card p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">Trading Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trading Pair */}
        <div className="space-y-3">
          <span className="text-sm font-semibold text-muted-foreground">Trading Pair</span>
          <p className="text-2xl font-bold text-accent">{data.tradingPair}</p>
          <p className="text-xs text-muted-foreground">Uniswap V4 (Base) • 0.01% Fee</p>
        </div>

        {/* Exchange Rate */}
        <div className="space-y-3">
          <span className="text-sm font-semibold text-muted-foreground">Exchange Rate</span>
          <p className="text-2xl font-bold text-accent">
            1 AGL = {formatNumber(73915.95)} CHONK9K
          </p>
          <p className="text-xs text-muted-foreground">Current market rate</p>
        </div>

        {/* Holders */}
        <div className="space-y-3">
          <span className="text-sm font-semibold text-muted-foreground">Token Holders</span>
          <p className="text-2xl font-bold text-accent">{data.holders}</p>
          <p className="text-xs text-muted-foreground">Active community members</p>
        </div>

        {/* Pool Age */}
        <div className="space-y-3">
          <span className="text-sm font-semibold text-muted-foreground">Pool Age</span>
          <p className="text-2xl font-bold text-accent">{data.poolAge}</p>
          <p className="text-xs text-muted-foreground">Time since creation</p>
        </div>
      </div>

      {/* Pooled Amounts */}
      <div className="border-t border-border pt-6">
        <h4 className="font-semibold text-foreground mb-4">Liquidity Pool</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">AGL Pooled</span>
              <span className="text-lg font-bold text-accent">
                {formatNumber(data.pooledAGL)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">~${(data.pooledAGL * data.price).toFixed(2)}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">CHONK9K Pooled</span>
              <span className="text-lg font-bold text-accent">
                {formatNumber(data.pooledCHONK9K)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">~$4,975</p>
          </div>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="border-t border-border pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={uniswapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-center flex items-center justify-center gap-2"
        >
          Trade on Uniswap
          <ExternalLink size={16} />
        </a>
        <a
          href={baseScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-center flex items-center justify-center gap-2"
        >
          View on BaseScan
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}
