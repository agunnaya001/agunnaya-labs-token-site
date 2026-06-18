'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { transaction, stakingPosition, walletLink } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function recordTransaction(
  walletAddress: string,
  txHash: string,
  type: 'transfer' | 'approve' | 'stake' | 'unstake' | 'claim',
  amount: string,
  tokenAddress: string,
  sponsorshipUsed: boolean
) {
  const userId = await getUserId()

  const newTx = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    walletAddress,
    txHash,
    type,
    amount,
    tokenAddress,
    status: 'pending' as const,
    sponsorshipUsed,
    createdAt: new Date(),
  }

  await db.insert(transaction).values(newTx)
  revalidatePath('/dashboard')

  return newTx
}

export async function createStakingPosition(
  walletAddress: string,
  amountAGL: string,
  lockupPeriodDays: number,
  estimatedReward: string,
  txHash: string
) {
  const userId = await getUserId()

  const startDate = new Date()
  const endDate = new Date(startDate.getTime() + lockupPeriodDays * 24 * 60 * 60 * 1000)

  const newStake = {
    id: `stake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    walletAddress,
    amountAGL,
    lockupPeriodDays,
    estimatedReward,
    startDate,
    endDate,
    status: 'active' as const,
    txHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await db.insert(stakingPosition).values(newStake)
  revalidatePath('/dashboard')

  return newStake
}

export async function getUserTransactions() {
  const userId = await getUserId()

  const txs = await db
    .select()
    .from(transaction)
    .where(eq(transaction.userId, userId))
    .orderBy(desc(transaction.createdAt))
    .limit(100)

  return txs
}

export async function getUserStakingPositions() {
  const userId = await getUserId()

  const stakes = await db
    .select()
    .from(stakingPosition)
    .where(eq(stakingPosition.userId, userId))
    .orderBy(desc(stakingPosition.createdAt))

  return stakes
}

export async function linkWallet(walletAddress: string) {
  const userId = await getUserId()

  // Check if already linked
  const existing = await db
    .select()
    .from(walletLink)
    .where(eq(walletLink.walletAddress, walletAddress))

  if (existing.length > 0) {
    return existing[0]
  }

  const newLink = {
    id: `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    walletAddress,
    isVerified: true,
    createdAt: new Date(),
  }

  await db.insert(walletLink).values(newLink)
  revalidatePath('/dashboard')

  return newLink
}

export async function getUserWallets() {
  const userId = await getUserId()

  const wallets = await db
    .select()
    .from(walletLink)
    .where(eq(walletLink.userId, userId))

  return wallets
}
