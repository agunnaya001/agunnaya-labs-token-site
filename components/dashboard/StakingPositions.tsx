'use client'

import { useEffect, useState } from 'react'
import { getUserStakingPositions } from '@/app/actions/transactions'

interface StakingPositionsProps {
  userId: string
}

export function StakingPositions({ userId }: StakingPositionsProps) {
  const [positions, setPositions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPositions() {
      try {
        const data = await getUserStakingPositions()
        setPositions(data)
      } catch (err) {
        console.error('[v0] Failed to load staking positions:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPositions()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400'
      case 'withdrawn':
        return 'bg-gray-500/20 text-gray-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Staking Positions</h2>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : positions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No active staking positions</p>
          <p className="text-sm text-muted-foreground">Start staking to earn rewards</p>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount Staked</p>
                  <p className="text-2xl font-bold text-foreground">{position.amountAGL} AGL</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(position.status)}`}>
                  {position.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Lockup Period</p>
                  <p className="font-semibold text-foreground">{position.lockupPeriodDays} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Reward</p>
                  <p className="font-semibold text-accent">{position.estimatedReward} AGL</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Days Left</p>
                  <p className="font-semibold text-foreground">{getDaysRemaining(new Date(position.endDate))} days</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Started {new Date(position.startDate).toLocaleDateString()}
                </p>
                {position.txHash && (
                  <a
                    href={`https://basescan.org/tx/${position.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline"
                  >
                    View TX ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
