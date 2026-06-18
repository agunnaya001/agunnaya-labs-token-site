'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

interface ReferralStats {
  referralCode: string
  referralLink: string
  totalReferrals: number
  totalRewards: number
  activeReferrals: number
}

export function ReferralProgram() {
  const { address } = useAccount()
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!address) return

    async function fetchReferralStats() {
      try {
        const response = await fetch(`/api/referrals/${address}`)
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch referral stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReferralStats()
  }, [address])

  const handleCopyLink = async () => {
    if (stats?.referralLink) {
      await navigator.clipboard.writeText(stats.referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Loading referral data...</div>
  }

  if (!stats) {
    return <div className="p-6 text-center text-muted-foreground">Unable to load referral program</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Referral Program</h3>
        <p className="text-muted-foreground mb-6">Invite friends and earn rewards when they stake AGL. Get 5% of their rewards!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Total Referrals</p>
          <p className="text-3xl font-bold text-accent mt-2">{stats.totalReferrals}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Active Referrals</p>
          <p className="text-3xl font-bold text-accent mt-2">{stats.activeReferrals}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Rewards Earned</p>
          <p className="text-3xl font-bold text-accent mt-2">{stats.totalRewards.toFixed(2)} AGL</p>
        </div>
      </div>

      <div className="bg-secondary rounded-lg border border-border p-4">
        <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={stats.referralLink}
            readOnly
            className="flex-1 px-3 py-2 bg-background rounded border border-border text-sm"
          />
          <button
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              copied ? 'bg-green-500 text-white' : 'bg-accent text-accent-foreground hover:shadow-lg'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-400 font-semibold">How it works</p>
        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
          <li>Share your unique referral link with friends</li>
          <li>When they sign up and stake, you earn 5% of their staking rewards</li>
          <li>Rewards are automatically sent to your wallet quarterly</li>
          <li>No limit on how many friends you can refer</li>
        </ul>
      </div>
    </div>
  )
}
