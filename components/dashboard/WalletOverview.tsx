'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getUserWallets } from '@/app/actions/transactions'

interface WalletOverviewProps {
  userId: string
}

export function WalletOverview({ userId }: WalletOverviewProps) {
  const { address } = useAccount()
  const [wallets, setWallets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWallets() {
      try {
        const data = await getUserWallets()
        setWallets(data)
      } catch (err) {
        console.error('[v0] Failed to load wallets:', err)
      } finally {
        setLoading(false)
      }
    }

    loadWallets()
  }, [])

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Connected Wallets</h2>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : wallets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No wallets connected yet</p>
          <p className="text-sm text-muted-foreground">Connect your Web3 wallet to start staking</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-mono text-sm text-foreground">
                  {wallet.walletAddress.slice(0, 6)}...{wallet.walletAddress.slice(-4)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Linked {new Date(wallet.createdAt).toLocaleDateString()}
                </p>
              </div>
              {wallet.isVerified && (
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Verified</span>
              )}
            </div>
          ))}
        </div>
      )}

      {address && !wallets.some((w) => w.walletAddress.toLowerCase() === address.toLowerCase()) && (
        <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Your current wallet ({address.slice(0, 6)}...{address.slice(-4)}) is not linked to your account
          </p>
        </div>
      )}
    </div>
  )
}
