'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useContractInteraction } from '@/hooks/useContractInteraction'
import { useSponsoredTransaction } from '@/hooks/useSponsoredTransaction'
import { recordTransaction, createStakingPosition, linkWallet } from '@/app/actions/transactions'
import { parseUnits, formatUnits } from 'viem'

export function StakingForm() {
  const { address: userAddress, isConnected } = useAccount()
  const { transferToken, isLoading: contractLoading } = useContractInteraction()
  const { sponsorshipStatus } = useSponsoredTransaction()

  const [stakeAmount, setStakeAmount] = useState('')
  const [lockupDays, setLockupDays] = useState('30')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const calculateReward = (amount: string, days: string) => {
    const num = parseFloat(amount) || 0
    const d = parseInt(days) || 30
    const apy = 0.12
    const dailyRate = apy / 365
    return (num * dailyRate * d).toFixed(2)
  }

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userAddress) {
      setError('Wallet not connected')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      setSuccess(null)

      // Link wallet to user account
      await linkWallet(userAddress)

      // Transfer tokens (simulated for now - in production would call staking contract)
      const txHash = await transferToken(
        process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
        stakeAmount
      )

      // Record transaction in database
      await recordTransaction(
        userAddress,
        txHash as string,
        'stake',
        stakeAmount,
        process.env.NEXT_PUBLIC_AGL_TOKEN_ADDRESS || '',
        sponsorshipStatus.approved
      )

      // Create staking position
      const reward = calculateReward(stakeAmount, lockupDays)
      await createStakingPosition(userAddress, stakeAmount, parseInt(lockupDays), reward, txHash as string)

      setSuccess(
        `Staking successful! You'll earn ~${reward} AGL over ${lockupDays} days. TX: ${(txHash as string).slice(0, 10)}...`
      )
      setStakeAmount('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Staking failed'
      setError(message)
      console.error('[v0] Staking error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="p-6 bg-secondary/50 rounded-lg border border-border text-center">
        <p className="text-muted-foreground mb-4">Connect your wallet to start staking</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleStake} className="card space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Stake Your AGL</h2>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Amount (AGL)</label>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground"
          disabled={isSubmitting || contractLoading}
        />
        <p className="text-xs text-muted-foreground mt-1">Minimum: 100 AGL</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Lockup Period</label>
        <select
          value={lockupDays}
          onChange={(e) => setLockupDays(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground"
          disabled={isSubmitting || contractLoading}
        >
          <option value="30">30 Days - 12% APY</option>
          <option value="90">90 Days - 12.5% APY</option>
          <option value="180">180 Days - 13% APY</option>
          <option value="365">365 Days - 14% APY</option>
        </select>
      </div>

      {stakeAmount && (
        <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Estimated Reward</p>
          <p className="text-2xl font-bold text-accent">{calculateReward(stakeAmount, lockupDays)} AGL</p>
          <p className="text-xs text-muted-foreground mt-1">after {lockupDays} days</p>
        </div>
      )}

      {sponsorshipStatus.approved && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm font-semibold text-green-400">Gas Sponsorship Active - Stake for free!</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm font-semibold text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm font-semibold text-green-400">{success}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stakeAmount || isSubmitting || contractLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || contractLoading ? 'Processing...' : 'Stake AGL'}
      </button>
    </form>
  )
}
