import { pgTable, text, timestamp, boolean, numeric, varchar, integer } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables: Web3 & Staking -----------------------------------------------

export const walletLink = pgTable('wallet_link', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  walletAddress: varchar('walletAddress', { length: 42 }).notNull().unique(),
  isVerified: boolean('isVerified').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const stakingPosition = pgTable('staking_position', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  walletAddress: varchar('walletAddress', { length: 42 }).notNull(),
  amountAGL: numeric('amountAGL').notNull(),
  lockupPeriodDays: integer('lockupPeriodDays').notNull(),
  estimatedReward: numeric('estimatedReward').notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, completed, withdrawn
  txHash: varchar('txHash', { length: 66 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const transaction = pgTable('transaction', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  walletAddress: varchar('walletAddress', { length: 42 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // transfer, approve, stake, unstake, claim
  amount: numeric('amount').notNull(),
  tokenAddress: varchar('tokenAddress', { length: 42 }).notNull(),
  txHash: varchar('txHash', { length: 66 }).notNull().unique(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, confirmed, failed
  sponsorshipUsed: boolean('sponsorshipUsed').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const sponsorshipLog = pgTable('sponsorship_log', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  walletAddress: varchar('walletAddress', { length: 42 }).notNull(),
  userOpHash: varchar('userOpHash', { length: 66 }),
  aglBalance: numeric('aglBalance').notNull(),
  minRequired: numeric('minRequired').notNull(),
  approved: boolean('approved').notNull(),
  reason: text('reason').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Admin tables -----------------------------------------------

export const adminUser = pgTable('admin_user', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  role: varchar('role', { length: 50 }).notNull(), // super_admin, sponsorship_admin, analytics_admin
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const sponsorshipPolicy = pgTable('sponsorship_policy', {
  id: text('id').primaryKey(),
  minAGLBalance: numeric('minAGLBalance').notNull(),
  maxDailySponsorsPerUser: integer('maxDailySponsorsPerUser').notNull(),
  maxMonthlyBudget: numeric('maxMonthlyBudget').notNull(),
  currentMonthlySpent: numeric('currentMonthlySpent').notNull().default('0'),
  active: boolean('active').notNull().default(true),
  updatedBy: text('updatedBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const adminAuditLog = pgTable('admin_audit_log', {
  id: text('id').primaryKey(),
  adminId: text('adminId').notNull(),
  action: varchar('action', { length: 100 }).notNull(), // policy_update, user_ban, sponsorship_override, etc
  targetId: varchar('targetId', { length: 100 }),
  oldValue: text('oldValue'),
  newValue: text('newValue'),
  reason: text('reason'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
