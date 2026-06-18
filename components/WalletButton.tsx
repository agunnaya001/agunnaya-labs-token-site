'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from '@wagmi/connectors'
import { formatTokenAmount } from '@/lib/web3'
import { publicClient, getUserTokenBalance } from '@/lib/web3'

export function WalletButton() {
  const { address, isConnected, chain } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [balance, setBalance] = useState<string>('0')
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      fetchBalance()
      const interval = setInterval(fetchBalance, 30000) // Refresh every 30s
      return () => clearInterval(interval)
    }
  }, [isConnected, address])

  const fetchBalance = async () => {
    if (!address) return
    try {
      const bal = await getUserTokenBalance(address as `0x${string}`)
      setBalance(formatTokenAmount(bal))
    } catch (error) {
      console.error('[v0] Error fetching balance:', error)
    }
  }

  const handleConnect = async () => {
    setLoading(true)
    try {
      connect({ connector: injected() })
    } catch (error) {
      console.error('[v0] Connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setShowDropdown(false)
  }

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={loading}
        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all active:scale-95 text-sm disabled:opacity-50"
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    )
  }

  const wrongNetwork = chain?.id !== 8453

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
          wrongNetwork
            ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
            : 'bg-accent text-accent-foreground hover:shadow-lg'
        }`}
      >
        {wrongNetwork ? '❌ Wrong Network' : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Address</p>
            <p className="text-sm font-mono text-foreground break-all">{address}</p>
          </div>

          {!wrongNetwork && (
            <div className="p-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-1">AGL Balance</p>
              <p className="text-lg font-bold text-accent">{balance} AGL</p>
            </div>
          )}

          {wrongNetwork && (
            <div className="p-4 border-b border-border bg-red-500/10">
              <p className="text-xs font-semibold text-red-400">⚠️ Please switch to Base mainnet</p>
            </div>
          )}

          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
