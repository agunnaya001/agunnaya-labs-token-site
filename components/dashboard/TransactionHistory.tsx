'use client'

import { useEffect, useState } from 'react'
import { getUserTransactions } from '@/app/actions/transactions'

interface TransactionHistoryProps {
  userId: string
}

export function TransactionHistory({ userId }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getUserTransactions()
        setTransactions(data)
      } catch (err) {
        console.error('[v0] Failed to load transactions:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return '↔️'
      case 'approve':
        return '✓'
      case 'stake':
        return '📌'
      case 'unstake':
        return '📤'
      case 'claim':
        return '🎁'
      default:
        return '○'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Transaction History</h2>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Gas Sponsorship</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">TX</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">
                    <span className="text-lg">{getTypeIcon(tx.type)}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-foreground">{tx.amount} AGL</td>
                  <td className="py-3 px-4">
                    <span className={`capitalize font-semibold ${getStatusColor(tx.status)}`}>{tx.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    {tx.sponsorshipUsed ? (
                      <span className="text-green-400 font-semibold">Yes</span>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`https://basescan.org/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-xs"
                    >
                      View ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
