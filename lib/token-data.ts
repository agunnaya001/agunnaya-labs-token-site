export interface TokenData {
  price: number
  marketCap: number
  volume24h: number
  liquidity: number
  holders: number
  poolAge: string
  gtSecurityScore: number
  lastUpdated: Date
  priceChange24h: number
  poolAddress: string
  tokenAddress: string
  tradingPair: string
  pooledAGL: number
  pooledCHONK9K: number
  poolFee: number
}

// Real data from GeckoTerminal for AGL/CHONK9K pool
export const DEFAULT_TOKEN_DATA: TokenData = {
  price: 0.03175,
  marketCap: 31740000, // $31.74M
  volume24h: 748.65,
  liquidity: 6924,
  holders: 25,
  poolAge: '4d',
  gtSecurityScore: 28,
  lastUpdated: new Date(),
  priceChange24h: 0,
  poolAddress: '0xe7d6de2bf95c563a819eb62cbf0c7e9020df53c875ccfbaf3fdccaa1fd25b085',
  tokenAddress: '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698',
  tradingPair: 'AGL/CHONK9K',
  pooledAGL: 61925.02,
  pooledCHONK9K: 6.25e9, // 6.25B
  poolFee: 0.01,
}

export async function fetchTokenData(): Promise<TokenData> {
  try {
    // First try CoinGecko API for AGL token
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/token_price/base?contract_addresses=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true',
      { next: { revalidate: 300 } } // 5-minute ISR cache
    )

    if (response.ok) {
      const data = await response.json()
      const tokenData = data['0xea1221b4d80a89bd8c75248fae7c176bd1854698']

      if (tokenData) {
        return {
          ...DEFAULT_TOKEN_DATA,
          price: tokenData.usd || DEFAULT_TOKEN_DATA.price,
          marketCap:
            (tokenData.usd_market_cap || DEFAULT_TOKEN_DATA.marketCap) as number,
          volume24h: (tokenData.usd_24h_vol || DEFAULT_TOKEN_DATA.volume24h) as number,
          priceChange24h:
            (tokenData.usd_24h_change || DEFAULT_TOKEN_DATA.priceChange24h) as number,
          lastUpdated: new Date(),
        }
      }
    }
  } catch (error) {
    console.error('[v0] Failed to fetch token data:', error)
  }

  // Return fallback data
  return {
    ...DEFAULT_TOKEN_DATA,
    lastUpdated: new Date(),
  }
}

export function formatPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(8)}`
  }
  return `$${price.toFixed(4)}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  }
  return num.toFixed(2)
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`
  }
  if (marketCap >= 1000) {
    return `$${(marketCap / 1000).toFixed(2)}K`
  }
  return `$${marketCap.toFixed(2)}`
}
