'use client'

import { TokenData, formatPrice } from '@/lib/token-data'
import { TrendingUp } from 'lucide-react'

interface LivePriceTickerProps {
  data: TokenData
}

export function LivePriceTicker({ data }: LivePriceTickerProps) {
  const isPriceUp = data.priceChange24h >= 0

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/20">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-accent uppercase">Live</span>
          </div>
          <span className="text-sm text-muted-foreground">AGL Price:</span>
          <span className="text-lg font-bold text-accent">{formatPrice(data.price)}</span>
        </div>

        <div className={`flex items-center gap-2 text-sm font-semibold ${
          isPriceUp ? 'text-green-500' : 'text-red-500'
        }`}>
          <TrendingUp size={16} className={isPriceUp ? '' : 'rotate-180'} />
          {isPriceUp ? '+' : ''}{data.priceChange24h.toFixed(2)}% (24h)
        </div>

        <span className="text-xs text-muted-foreground hidden sm:inline">
          ${data.holders} holders • ${(data.volume24h / 1000).toFixed(1)}K volume
        </span>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 animate-shimmer" />
      </div>
    </div>
  )
}
