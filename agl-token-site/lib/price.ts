// DexScreener API for AGL/USD price data

export const AGL_CONTRACT = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698';
export const BASE_CHAIN = 'base';
export const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex/tokens';

export interface PriceData {
  priceUsd: number;
  priceChange24h: number;
  liquidity: number;
  volume24h: number;
  marketCap?: number;
  fdv?: number;
  timestamp: number;
}

export interface DexscreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  tokenAddress: string;
  baseToken: {
    symbol: string;
    name: string;
    address: string;
  };
  quoteToken: {
    symbol: string;
    address: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    m5: number;
    h1: number;
    h24: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

export interface DexscreenerResponse {
  schemaVersion: string;
  pairs: DexscreenerPair[];
}

let priceCache: { data: PriceData; timestamp: number } | null = null;
const CACHE_DURATION = 60000; // 1 minute

export async function getAGLPrice(): Promise<PriceData> {
  // Check cache
  if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
    return priceCache.data;
  }

  try {
    const response = await fetch(`${DEXSCREENER_API}/${AGL_CONTRACT}?chain=${BASE_CHAIN}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status}`);
    }

    const data: DexscreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      throw new Error('No trading pairs found for AGL');
    }

    // Get the most liquid pair
    const pair = data.pairs.reduce((best, current) =>
      current.liquidity.usd > best.liquidity.usd ? current : best
    );

    const priceData: PriceData = {
      priceUsd: parseFloat(pair.priceUsd),
      priceChange24h: pair.priceChange.h24,
      liquidity: pair.liquidity.usd,
      volume24h: pair.volume.h24,
      marketCap: pair.marketCap,
      fdv: pair.fdv,
      timestamp: Date.now(),
    };

    // Cache the result
    priceCache = { data: priceData, timestamp: Date.now() };

    return priceData;
  } catch (error) {
    console.error('[v0] Failed to fetch AGL price:', error);

    // Return last cached price even if expired, or fallback
    if (priceCache) {
      return priceCache.data;
    }

    // Fallback price
    return {
      priceUsd: 0,
      priceChange24h: 0,
      liquidity: 0,
      volume24h: 0,
      timestamp: Date.now(),
    };
  }
}

export function formatPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(8)}`;
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toFixed(2)}`;
}

export function formatLiquidity(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function formatPriceChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}
