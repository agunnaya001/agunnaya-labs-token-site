'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { checkSponsorshipEligibility } from '@/lib/web3'

export interface SponsoredTxResult {
  approved: boolean
  reason?: string
  loading: boolean
  error?: string
}

export function useSponsoredTransaction() {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [sponsorshipStatus, setSponsorshipStatus] = useState<SponsoredTxResult>({
    approved: false,
    loading: false,
  })

  const checkEligibility = async () => {
    if (!isConnected || !address) {
      setSponsorshipStatus({
        approved: false,
        reason: 'Wallet not connected',
        loading: false,
        error: 'Please connect your wallet first',
      })
      return
    }

    setLoading(true)
    try {
      const eligible = await checkSponsorshipEligibility(address as `0x${string}`)
      setSponsorshipStatus({
        approved: eligible,
        reason: eligible
          ? 'You are eligible for gas-free transactions'
          : 'You need at least 100 AGL to be eligible for gas sponsorship',
        loading: false,
      })
      return eligible
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setSponsorshipStatus({
        approved: false,
        reason: 'Error checking eligibility',
        loading: false,
        error: errorMessage,
      })
      console.error('[v0] Sponsorship check error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const estimateGas = async () => {
    if (!isConnected || !address) {
      return null
    }

    const eligible = await checkEligibility()
    if (eligible) {
      return '0.00' // Free with sponsorship
    }
    return null
  }

  return {
    checkEligibility,
    estimateGas,
    sponsorshipStatus,
    isEligible: sponsorshipStatus.approved,
    isLoading: loading,
  }
}
