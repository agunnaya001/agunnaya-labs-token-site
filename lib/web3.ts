import { createPublicClient, http, parseAbi } from 'viem'
import { base } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
})

// AGL Token ABI (minimal - just the functions we need)
export const AGL_TOKEN_ABI = parseAbi([
  'function balanceOf(address account) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
])

export const AGL_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_AGL_TOKEN_ADDRESS as `0x${string}`

export async function getUserTokenBalance(address: `0x${string}`) {
  try {
    const balance = await publicClient.readContract({
      address: AGL_TOKEN_ADDRESS,
      abi: AGL_TOKEN_ABI,
      functionName: 'balanceOf',
      args: [address],
    })
    return balance as bigint
  } catch (error) {
    console.error('Error fetching balance:', error)
    return BigInt(0)
  }
}

export async function checkSponsorshipEligibility(address: `0x${string}`): Promise<boolean> {
  try {
    const balance = await getUserTokenBalance(address)
    const minRequired = BigInt(process.env.NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP || '100') * BigInt(10 ** 18)
    return balance >= minRequired
  } catch (error) {
    console.error('Error checking sponsorship eligibility:', error)
    return false
  }
}

export function formatTokenAmount(amount: bigint, decimals = 18): string {
  const divisor = BigInt(10 ** decimals)
  const whole = amount / divisor
  const fraction = amount % divisor
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 2)
  return `${whole}.${fractionStr}`
}
