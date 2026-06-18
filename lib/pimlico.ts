import { 
  createPublicClient, 
  createWalletClient, 
  http, 
  parseAbi, 
  encodeFunctionData,
  Address,
} from 'viem'
import { base } from 'viem/chains'

export const PIMLICO_API_KEY = process.env.NEXT_PUBLIC_PIMLICO_API_KEY
export const AGL_MIN_FOR_SPONSORSHIP = BigInt(process.env.NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP || '100') * BigInt(10 ** 18)

// Pimlico Smart Account Client URLs
export const PIMLICO_BUNDLER_RPC = `https://api.pimlico.io/v2/base/rpc?apikey=${PIMLICO_API_KEY}`
export const PIMLICO_PAYMASTER_RPC = `https://api.pimlico.io/v2/base/rpc?apikey=${PIMLICO_API_KEY}`

export interface SponsorshipRequest {
  userAddress: string
  userOpHash: string
  chainId: number
  balance?: bigint
}

export interface SponsorshipDecision {
  approved: boolean
  reason?: string
}

// Helper to create transfer calldata
export function createTransferCalldata(
  tokenAddress: Address,
  toAddress: Address,
  amount: bigint
): `0x${string}` {
  const abi = parseAbi([
    'function transfer(address to, uint256 amount) external returns (bool)',
  ])
  
  return encodeFunctionData({
    abi,
    functionName: 'transfer',
    args: [toAddress, amount],
  })
}

// Helper to create approve calldata
export function createApproveCalldata(
  tokenAddress: Address,
  spenderAddress: Address,
  amount: bigint
): `0x${string}` {
  const abi = parseAbi([
    'function approve(address spender, uint256 amount) external returns (bool)',
  ])
  
  return encodeFunctionData({
    abi,
    functionName: 'approve',
    args: [spenderAddress, amount],
  })
}

// Verify webhook signature from Pimlico
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  
  return signature === expectedSignature
}
