// Client for api.agunnayalabs.xyz — the ecosystem's on-chain data API.
// Serves live Base mainnet data (raw eth_call, no CoinGecko/GeckoTerminal dependency).

const API_BASE = process.env.NEXT_PUBLIC_AGUNNAYA_API_URL || 'https://api.agunnayalabs.xyz'

export interface OnChainTokenInfo {
  label: string
  project: string
  site: string
  address: string
  chainId: number
  name: string
  symbol: string
  decimals: number
  totalSupplyRaw: string
  totalSupplyFormatted: string
  owner: string | null
}

export interface OnChainBalance {
  token: string
  tokenAddress: string
  holder: string
  balanceRaw: string
  balanceFormatted: string
}

export async function fetchOnChainToken(
  symbol: 'AGL' | 'CHONK9K'
): Promise<OnChainTokenInfo | null> {
  try {
    const res = await fetch(`${API_BASE}/api/token/${symbol}`, {
      next: { revalidate: 60 }, // 1-minute ISR — supply/owner rarely change
    })
    if (!res.ok) return null
    return (await res.json()) as OnChainTokenInfo
  } catch (error) {
    console.error('[agunnaya-api] Failed to fetch token info:', error)
    return null
  }
}

export async function fetchOnChainBalance(
  symbol: 'AGL' | 'CHONK9K',
  address: string
): Promise<OnChainBalance | null> {
  try {
    const res = await fetch(`${API_BASE}/api/token/${symbol}/balance/${address}`, {
      cache: 'no-store', // balances change often, always fresh
    })
    if (!res.ok) return null
    return (await res.json()) as OnChainBalance
  } catch (error) {
    console.error('[agunnaya-api] Failed to fetch balance:', error)
    return null
  }
}

export async function fetchChainHealth(): Promise<{ latestBlock: number } | null> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error('[agunnaya-api] Failed to fetch health:', error)
    return null
  }
}
