'use client'

import { useState } from 'react'
import { fetchOnChainBalance, type OnChainBalance } from '@/lib/onchain-api'

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

export function BalanceChecker() {
  const [address, setAddress] = useState('')
  const [token, setToken] = useState<'AGL' | 'CHONK9K'>('AGL')
  const [result, setResult] = useState<OnChainBalance | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheck() {
    setError(null)
    setResult(null)

    if (!ADDRESS_REGEX.test(address)) {
      setError('Enter a valid 0x wallet address.')
      return
    }

    setLoading(true)
    const data = await fetchOnChainBalance(token, address)
    setLoading(false)

    if (!data) {
      setError('Could not fetch balance. Try again in a moment.')
      return
    }
    setResult(data)
  }

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-bold text-foreground">Check Any Wallet Balance</h3>
      <p className="text-sm text-muted-foreground">
        Look up live AGL or CHONK9K holdings for any address, straight from Base mainnet.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={token}
          onChange={(e) => setToken(e.target.value as 'AGL' | 'CHONK9K')}
          className="px-4 py-3 bg-background border border-border rounded-lg text-foreground font-medium sm:w-40"
        >
          <option value="AGL">AGL</option>
          <option value="CHONK9K">CHONK9K</option>
        </select>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value.trim())}
          placeholder="0x..."
          className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground font-mono text-sm"
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="btn-primary px-6 py-3 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check Balance'}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {result && (
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">
            {result.token} balance for {result.holder.slice(0, 6)}...{result.holder.slice(-4)}
          </p>
          <p className="text-2xl font-bold text-accent font-mono">
            {Number(result.balanceFormatted).toLocaleString()} {result.token}
          </p>
        </div>
      )}
    </div>
  )
}
