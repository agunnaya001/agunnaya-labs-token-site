/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K'
  }
  return num.toFixed(2)
}

/**
 * Format currency with symbol
 */
export function formatCurrency(num: number, symbol: string = '$'): string {
  return `${symbol}${num.toFixed(2)}`
}

/**
 * Format percentage
 */
export function formatPercentage(num: number, decimals: number = 2): string {
  return `${(num * 100).toFixed(decimals)}%`
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`
}

/**
 * Copy text to clipboard with feedback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

/**
 * Scroll to element smoothly
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Generate color for chart based on index
 */
export const chartColors = [
  '#39FF14', // Neon Green
  '#00d4ff', // Cyan
  '#6c63ff', // Purple
  '#ff6b9d', // Pink
  '#ffa502', // Orange
]

export function getChartColor(index: number): string {
  return chartColors[index % chartColors.length]
}
