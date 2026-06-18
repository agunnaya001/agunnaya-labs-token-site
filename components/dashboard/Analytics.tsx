'use client'

import { useAnalyticsStore } from '@/lib/analytics-store'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

export function Analytics() {
  const { data, isLoading } = useAnalyticsStore()
  const [timeRange, setTimeRange] = useState('30d')

  if (isLoading) {
    return <div className="p-6 text-center">Loading analytics...</div>
  }

  if (!data) {
    return <div className="p-6 text-center text-muted-foreground">No analytics data available</div>
  }

  const metrics = [
    { label: 'Total Staked', value: data.totalStaked, unit: 'AGL' },
    { label: 'Total Rewards', value: data.totalRewards, unit: 'AGL' },
    { label: 'Active Positions', value: data.activePositions, unit: '' },
    { label: 'Portfolio Value', value: data.portfolioValue, unit: 'AGL' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 bg-secondary rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-3xl font-bold text-accent mt-2">
              {typeof metric.value === 'number' ? metric.value.toFixed(2) : metric.value}{metric.unit ? ` ${metric.unit}` : ''}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded text-sm ${timeRange === '7d' ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-2 rounded text-sm ${timeRange === '30d' ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-4 py-2 rounded text-sm ${timeRange === '90d' ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}
          >
            90 Days
          </button>
        </div>

        <div className="bg-secondary rounded-lg border border-border p-4">
          <h3 className="text-lg font-semibold mb-4">Staking History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.stakingHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#00ff00" name="Amount Staked" />
              <Line type="monotone" dataKey="rewards" stroke="#0099ff" name="Rewards" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
