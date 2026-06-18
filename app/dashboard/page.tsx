'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { StakingPositions } from '@/components/dashboard/StakingPositions'
import { TransactionHistory } from '@/components/dashboard/TransactionHistory'
import { WalletOverview } from '@/components/dashboard/WalletOverview'
import { Analytics } from '@/components/dashboard/Analytics'
import { NotificationSettings } from '@/components/dashboard/NotificationSettings'
import { ReferralProgram } from '@/components/dashboard/ReferralProgram'
import Link from 'next/link'

type Tab = 'overview' | 'analytics' | 'referrals' | 'settings'

export default function DashboardPage() {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  if (!address) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">
          <Section className="pt-20 pb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6">Please connect your wallet to access the dashboard.</p>
            <button className="btn-primary">Connect Wallet</button>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'referrals', label: 'Referrals', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Section className="pt-12 pb-8">
          <div className="flex justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your AGL stakes and track your earnings
              </p>
            </div>
            <Link
              href="/stake"
              className="btn-primary"
            >
              New Stake →
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Content Sections */}
        <Section className="py-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <WalletOverview userId={address} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <StakingPositions userId={address} />
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">Total Staked</h3>
                    <p className="text-3xl font-bold text-foreground">-</p>
                    <p className="text-xs text-muted-foreground mt-2">Across all positions</p>
                  </div>
                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">Total Rewards</h3>
                    <p className="text-3xl font-bold text-accent">-</p>
                    <p className="text-xs text-muted-foreground mt-2">Earned to date</p>
                  </div>
                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">Next Unlock</h3>
                    <p className="text-lg font-semibold text-foreground">-</p>
                    <p className="text-xs text-muted-foreground mt-2">Time remaining</p>
                  </div>
                </div>
              </div>

              <TransactionHistory userId={address} />
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <Analytics />
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <ReferralProgram />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <NotificationSettings />
          )}
        </Section>
      </main>

      <Footer />
    </>
  )
}
