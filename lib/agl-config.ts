export const AGL_CONFIG = {
  token: {
    symbol: 'AGL',
    name: 'Agunnaya Labs',
    address: '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698' as `0x${string}`,
  },
  network: { name: 'Base', chainId: 8453, explorer: 'https://basescan.org' },
  links: {
    baseScanToken: 'https://basescan.org/token/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698',
    trade: 'https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base',
  },
  external: {
    studio: 'https://studio.agunnayalabs.xyz',
    github: 'https://github.com/agunnaya001/agunnaya-labs-token-site',
    x: 'https://x.com/agunnayalabs',
  },
} as const

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}
