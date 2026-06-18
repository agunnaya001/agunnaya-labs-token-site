'use client'

import { useEffect, useState } from 'react'
import {
  getSponsorshipPolicy,
  updateSponsorshipPolicy,
  getSponsorshipLogs,
  getSponsorshipStats,
} from '@/app/actions/admin'

interface AdminPanelProps {
  userId: string
}

export function AdminPanel({ userId }: AdminPanelProps) {
  const [policy, setPolicy] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [minAGL, setMinAGL] = useState('100')
  const [maxDaily, setMaxDaily] = useState('5')
  const [maxMonthly, setMaxMonthly] = useState('10000')

  useEffect(() => {
    async function loadData() {
      try {
        const [policyData, statsData, logsData] = await Promise.all([
          getSponsorshipPolicy(),
          getSponsorshipStats(),
          getSponsorshipLogs(20),
        ])

        setPolicy(policyData)
        setStats(statsData)
        setLogs(logsData)

        if (policyData) {
          setMinAGL(policyData.minAGLBalance)
          setMaxDaily(String(policyData.maxDailySponsorsPerUser))
          setMaxMonthly(policyData.maxMonthlyBudget)
        }
      } catch (err) {
        console.error('[v0] Failed to load admin data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSavePolicy = async () => {
    try {
      await updateSponsorshipPolicy(minAGL, parseInt(maxDaily), maxMonthly)
      setIsEditing(false)
      // Reload data
      const policyData = await getSponsorshipPolicy()
      setPolicy(policyData)
    } catch (err) {
      console.error('[v0] Failed to update policy:', err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-sm text-muted-foreground mb-2">Total Sponsorships</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalSponsorship}</p>
          </div>
          <div className="card">
            <p className="text-sm text-muted-foreground mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-400">{stats.approved}</p>
          </div>
          <div className="card">
            <p className="text-sm text-muted-foreground mb-2">Rejected</p>
            <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
          </div>
          <div className="card">
            <p className="text-sm text-muted-foreground mb-2">Approval Rate</p>
            <p className="text-3xl font-bold text-accent">{stats.approvalRate}%</p>
          </div>
        </div>
      )}

      {/* Sponsorship Policy */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Sponsorship Policy</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Min AGL Balance for Sponsorship</label>
              <input
                type="number"
                value={minAGL}
                onChange={(e) => setMinAGL(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Max Daily Sponsors Per User</label>
              <input
                type="number"
                value={maxDaily}
                onChange={(e) => setMaxDaily(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Max Monthly Budget (in USD)</label>
              <input
                type="number"
                value={maxMonthly}
                onChange={(e) => setMaxMonthly(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            <button
              onClick={handleSavePolicy}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
            >
              Save Policy
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Minimum AGL Balance</p>
              <p className="text-2xl font-bold text-foreground">{policy?.minAGLBalance || '-'} AGL</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Max Daily Sponsors Per User</p>
              <p className="text-2xl font-bold text-foreground">{policy?.maxDailySponsorsPerUser || '-'}</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Max Monthly Budget</p>
              <p className="text-2xl font-bold text-foreground">${policy?.maxMonthlyBudget || '-'}</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Current Monthly Spent</p>
              <p className="text-2xl font-bold text-accent">${policy?.currentMonthlySpent || '0'}</p>
            </div>

            <div className={`p-4 rounded-lg ${policy?.active ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <p className="text-sm font-semibold">
                {policy?.active ? 'Policy is Active' : 'Policy is Inactive'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Sponsorship Logs */}
      <div className="card">
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent Sponsorship Requests</h2>

        {logs.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No sponsorship requests yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Wallet</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">AGL Balance</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Required</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Reason</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      {log.walletAddress.slice(0, 6)}...{log.walletAddress.slice(-4)}
                    </td>
                    <td className="py-3 px-4 text-foreground">{log.aglBalance}</td>
                    <td className="py-3 px-4 text-foreground">{log.minRequired}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.approved ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {log.approved ? 'Approved' : 'Rejected'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{log.reason}</td>
                    <td className="py-3 px-4 text-muted-foreground">{new Date(log.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
