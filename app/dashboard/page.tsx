import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { StakingPositions } from '@/components/dashboard/StakingPositions'
import { TransactionHistory } from '@/components/dashboard/TransactionHistory'
import { WalletOverview } from '@/components/dashboard/WalletOverview'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard - AGL Token',
  description: 'Your staking dashboard and transaction history',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Section className="pt-12 pb-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {session.user.name || session.user.email}
              </p>
            </div>
            <Link
              href="/stake"
              className="btn-primary"
            >
              New Stake →
            </Link>
          </div>
        </Section>

        {/* Wallet Overview */}
        <Section className="py-8">
          <WalletOverview userId={session.user.id} />
        </Section>

        {/* Two Column Layout */}
        <Section className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staking Positions */}
          <div className="lg:col-span-2">
            <StakingPositions userId={session.user.id} />
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Total Staked</h3>
              <p className="text-3xl font-bold text-foreground">-</p>
              <p className="text-xs text-muted-foreground mt-2">Across all positions</p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Total Rewards</h3>
              <p className="text-3xl font-bold text-accent">-</p>
              <p className="text-xs text-muted-foreground mt-2">Earned to date</p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Next Unlock</h3>
              <p className="text-lg font-semibold text-foreground">-</p>
              <p className="text-xs text-muted-foreground mt-2">Time remaining</p>
            </div>
          </div>
        </Section>

        {/* Transaction History */}
        <Section className="py-12">
          <TransactionHistory userId={session.user.id} />
        </Section>
      </main>

      <Footer />
    </>
  )
}
