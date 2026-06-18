'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { adminUser, sponsorshipPolicy, adminAuditLog, sponsorshipLog } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function getAdminId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')

  const admin = await db.select().from(adminUser).where(eq(adminUser.userId, session.user.id))

  if (!admin.length) throw new Error('Not an admin')

  return session.user.id
}

async function isAdmin(userId: string) {
  const admin = await db.select().from(adminUser).where(eq(adminUser.userId, userId))
  return admin.length > 0
}

export async function getSponsorshipPolicy() {
  const policies = await db.select().from(sponsorshipPolicy).orderBy(desc(sponsorshipPolicy.updatedAt)).limit(1)
  return policies[0] || null
}

export async function updateSponsorshipPolicy(
  minAGLBalance: string,
  maxDailySponsorsPerUser: number,
  maxMonthlyBudget: string
) {
  const adminId = await getAdminId()

  const existingPolicy = await db.select().from(sponsorshipPolicy).limit(1)

  if (existingPolicy.length > 0) {
    await db
      .update(sponsorshipPolicy)
      .set({
        minAGLBalance,
        maxDailySponsorsPerUser,
        maxMonthlyBudget,
        updatedBy: adminId,
        updatedAt: new Date(),
      })
      .where(eq(sponsorshipPolicy.id, existingPolicy[0].id))
  } else {
    const newPolicy = {
      id: `policy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      minAGLBalance,
      maxDailySponsorsPerUser,
      maxMonthlyBudget,
      currentMonthlySpent: '0',
      active: true,
      updatedBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await db.insert(sponsorshipPolicy).values(newPolicy)
  }

  await logAdminAction(adminId, 'policy_update', 'sponsorship_policy', null, JSON.stringify({ minAGLBalance, maxDailySponsorsPerUser, maxMonthlyBudget }), 'Sponsorship policy updated')

  revalidatePath('/admin')
}

export async function getSponsorshipLogs(limit: number = 100) {
  const adminId = await getAdminId()

  const logs = await db
    .select()
    .from(sponsorshipLog)
    .orderBy(desc(sponsorshipLog.createdAt))
    .limit(limit)

  return logs
}

export async function getAdminAuditLogs(limit: number = 50) {
  const adminId = await getAdminId()

  const logs = await db
    .select()
    .from(adminAuditLog)
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(limit)

  return logs
}

export async function logAdminAction(
  adminId: string,
  action: string,
  targetId: string | null,
  oldValue: string | null,
  newValue: string | null,
  reason: string
) {
  const logEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    adminId,
    action,
    targetId,
    oldValue,
    newValue,
    reason,
    createdAt: new Date(),
  }

  await db.insert(adminAuditLog).values(logEntry)
}

export async function togglePolicyActive(policyId: string, active: boolean) {
  const adminId = await getAdminId()

  const policy = await db.select().from(sponsorshipPolicy).where(eq(sponsorshipPolicy.id, policyId))

  if (!policy.length) throw new Error('Policy not found')

  await db
    .update(sponsorshipPolicy)
    .set({
      active,
      updatedBy: adminId,
      updatedAt: new Date(),
    })
    .where(eq(sponsorshipPolicy.id, policyId))

  await logAdminAction(adminId, 'policy_toggle', policyId, String(!active), String(active), `Policy ${active ? 'activated' : 'deactivated'}`)

  revalidatePath('/admin')
}

export async function getSponsorshipStats() {
  const adminId = await getAdminId()

  const totalLogs = await db.select().from(sponsorshipLog)
  const approvedCount = totalLogs.filter((log) => log.approved).length
  const rejectedCount = totalLogs.length - approvedCount
  const approvalRate = totalLogs.length > 0 ? ((approvedCount / totalLogs.length) * 100).toFixed(2) : '0'

  return {
    totalSponsorship: totalLogs.length,
    approved: approvedCount,
    rejected: rejectedCount,
    approvalRate: parseFloat(approvalRate),
  }
}
