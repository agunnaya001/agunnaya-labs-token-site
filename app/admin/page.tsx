import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { adminUser } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { AdminPanel } from '@/components/admin/AdminPanel'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard - AGL Token',
  description: 'Manage sponsorship policies and user analytics',
}

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  // Check if user is admin
  const adminCheck = await db.select().from(adminUser).where(eq(adminUser.userId, session.user.id))

  if (!adminCheck.length) {
    redirect('/dashboard')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Section className="pt-12 pb-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage sponsorship policies, users, and view analytics
              </p>
            </div>
            <Link href="/dashboard" className="btn-secondary">
              ← User Dashboard
            </Link>
          </div>
        </Section>

        <Section className="py-12">
          <AdminPanel userId={session.user.id} />
        </Section>
      </main>

      <Footer />
    </>
  )
}
