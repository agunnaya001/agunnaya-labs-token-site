import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, AGL_MIN_FOR_SPONSORSHIP } from '@/lib/pimlico'
import { getUserTokenBalance, AGL_TOKEN_ADDRESS } from '@/lib/web3'
import { getAddress, isAddress } from 'viem'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-pimlico-signature') || ''
    const secret = process.env.PIMLICO_WEBHOOK_SECRET || ''

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature, secret)) {
      console.error('[v0] Webhook signature verification failed')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const data = JSON.parse(body)
    console.log('[v0] Sponsorship request received:', data)

    const { userAddress, userOpHash, chainId } = data

    // Validate inputs
    if (!userAddress || !isAddress(userAddress)) {
      return NextResponse.json(
        { error: 'Invalid user address' },
        { status: 400 }
      )
    }

    if (chainId !== 8453) {
      return NextResponse.json(
        { approved: false, reason: 'Invalid chain. Only Base mainnet is supported' },
        { status: 200 }
      )
    }

    // Check user's AGL balance
    const userAddressChecksum = getAddress(userAddress)
    const balance = await getUserTokenBalance(userAddressChecksum as `0x${string}`)

    console.log(
      `[v0] User ${userAddress} balance: ${balance.toString()}, required: ${AGL_MIN_FOR_SPONSORSHIP.toString()}`
    )

    // Decision logic: sponsor if user has at least minimum AGL
    const isEligible = balance >= AGL_MIN_FOR_SPONSORSHIP

    if (isEligible) {
      console.log(`[v0] Sponsoring user op for ${userAddress}`)
      return NextResponse.json(
        {
          approved: true,
          reason: `User holds ${(balance / BigInt(10 ** 18)).toString()} AGL, eligible for sponsorship`,
        },
        { status: 200 }
      )
    } else {
      const balanceInAGL = Number(balance) / 10 ** 18
      const requiredInAGL = Number(AGL_MIN_FOR_SPONSORSHIP) / 10 ** 18
      console.log(
        `[v0] Rejecting sponsorship for ${userAddress}: insufficient balance (${balanceInAGL} < ${requiredInAGL})`
      )
      return NextResponse.json(
        {
          approved: false,
          reason: `Insufficient AGL balance. Required: ${requiredInAGL}, Available: ${balanceInAGL}`,
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    webhook: 'pimlico-sponsor',
  })
}
