'use client'

import { TokenData, formatPrice, formatNumber, formatMarketCap } from '@/lib/token-data'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TokenMetricsProps {
  data: TokenData
}

export function TokenMetrics({ data }: TokenMetricsProps) {
  const isPriceUp = data.priceChange24h >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Price */}
      <div className="card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">Price</span>
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              isPriceUp ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPriceUp ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(data.priceChange24h).toFixed(2)}%
          </div>
        </div>
        <p className="text-2xl lg:text-3xl font-bold text-accent">
          {formatPrice(data.price)}
        </p>
        <p className="text-xs text-muted-foreground">24h change</p>
      </div>

      {/* Market Cap */}
      <div className="card p-4 space-y-3">
        <span className="text-sm text-muted-foreground font-medium">Market Cap</span>
        <p className="text-2xl lg:text-3xl font-bold text-accent">
          {formatMarketCap(data.marketCap)}
        </p>
        <p className="text-xs text-muted-foreground">FDV</p>
      </div>

      {/* 24h Volume */}
      <div className="card p-4 space-y-3">
        <span className="text-sm text-muted-foreground font-medium">24h Volume</span>
        <p className="text-2xl lg:text-3xl font-bold text-accent">
          ${formatNumber(data.volume24h)}
        </p>
        <p className="text-xs text-muted-foreground">Trading activity</p>
      </div>

      {/* Liquidity */}
      <div className="card p-4 space-y-3">
        <span className="text-sm text-muted-foreground font-medium">Liquidity</span>
        <p className="text-2xl lg:text-3xl font-bold text-accent">
          ${formatNumber(data.liquidity)}
        </p>
        <p className="text-xs text-muted-foreground">Pool liquidity</p>
      </div>
    </div>
  )
}
