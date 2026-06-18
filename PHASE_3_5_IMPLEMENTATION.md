# Phases 3-5 Implementation Guide

## Overview
This document covers the complete implementation of Phases 3, 4, and 5 for the AGL Token staking platform.

## Phase 3: Smart Contract Interactions

### What Was Built
- Real token transfer and approval functions using Wagmi
- Contract interaction hooks for balance reading and transaction execution
- Database recording of all blockchain transactions
- Staking position tracking with lockup periods and rewards calculation

### Key Files
- `lib/contracts.ts` - AGL token and staking contract ABIs
- `hooks/useContractInteraction.ts` - Wagmi hooks for smart contract calls
- `components/StakingForm.tsx` - Interactive staking component with gas sponsorship
- `app/actions/transactions.ts` - Server actions for database recording

### How It Works
1. User connects wallet via WalletButton (Phase 1)
2. User enters stake amount and lockup period in StakingForm
3. Component calls `useContractInteraction` hook to execute contract transfer
4. Transaction hash is returned from blockchain
5. Server action records transaction and staking position in Neon database
6. Transaction appears in user dashboard with status tracking

### Configuration Required
```env
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=0x... # Your staking contract address
```

## Phase 4: User Dashboard & Transaction History

### What Was Built
- Protected dashboard page requiring authentication
- Wallet connection overview showing linked Web3 wallets
- Staking positions display with real-time status
- Transaction history table with filtering
- Integration with Better Auth for user management

### Key Files
- `app/dashboard/page.tsx` - Main dashboard (server component with auth check)
- `components/dashboard/WalletOverview.tsx` - Shows connected wallets
- `components/dashboard/StakingPositions.tsx` - Lists active staking positions
- `components/dashboard/TransactionHistory.tsx` - Complete transaction log

### Database Tables Used
- `wallet_link` - User's connected Web3 wallets
- `staking_position` - Active stakes with lockup info
- `transaction` - All user transactions (transfers, stakes, etc)
- `sponsorship_log` - Gas sponsorship request history

### How It Works
1. User logs in via /sign-in (Better Auth)
2. Dashboard page checks auth and loads user data
3. Server action fetches wallet links, staking positions, transactions
4. Components render with real-time data from database
5. All queries scoped by userId for security

### Usage
- Navigate to `/dashboard` after logging in
- View all connected wallets and their status
- Track active staking positions with earnings estimates
- See complete transaction history with Basescan links

## Phase 5: Admin Dashboard & Sponsorship Management

### What Was Built
- Admin-only dashboard for sponsorship management
- Policy editor for adjusting minimum AGL requirements
- Real-time analytics on sponsorship approvals
- Audit log of all admin actions
- Sponsorship request history

### Key Files
- `app/admin/page.tsx` - Admin dashboard (server component with admin check)
- `components/admin/AdminPanel.tsx` - Main admin interface
- `app/actions/admin.ts` - Admin-only server actions

### Admin Capabilities
1. **Policy Management**
   - Set minimum AGL balance for sponsorship eligibility (default: 100 AGL)
   - Set max daily sponsors per user
   - Set max monthly sponsorship budget
   - Enable/disable sponsorship globally

2. **Analytics**
   - View total sponsorship requests
   - Track approval vs rejection rates
   - See current monthly spending
   - Monitor sponsorship trends

3. **Audit Trail**
   - All policy changes logged
   - Admin user actions tracked
   - Timestamps and reasons recorded
   - Full history searchable

### Database Tables Used
- `admin_user` - Admin role assignments
- `sponsorship_policy` - Current sponsorship settings
- `sponsorship_log` - Historical sponsorship requests
- `admin_audit_log` - All admin actions

### How It Works
1. Admin user navigates to `/admin`
2. Page verifies admin role via `adminUser` table
3. Current policy and stats load from database
4. Admin can edit policy, changes logged to audit trail
5. All sponsorship requests visible in recent requests table

### How to Create Admin Users
(Database operation required - use Neon console):
```sql
INSERT INTO "admin_user" (id, "userId", role, "createdAt")
VALUES (
  'admin_' || gen_random_uuid()::text,
  'USER_ID_HERE',
  'super_admin',
  now()
);
```

## Database Schema

### Better Auth Tables (Automatic)
- `user` - Registered users
- `session` - Active user sessions
- `account` - OAuth/auth provider links
- `verification` - Email verification tokens

### Application Tables
- `wallet_link` - Web3 wallet connections
- `staking_position` - Staking records
- `transaction` - Blockchain transactions
- `sponsorship_log` - Gas sponsorship requests
- `admin_user` - Admin role assignments
- `sponsorship_policy` - Gas sponsorship policy
- `admin_audit_log` - Admin action history

## API Routes

### Auth
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout

### Webhooks
- `POST /api/webhooks/pimlico-sponsor` - Gas sponsorship validation (Phase 2)

## Server Actions

### Transaction Actions (`/app/actions/transactions.ts`)
- `recordTransaction()` - Log blockchain transaction
- `createStakingPosition()` - Record new stake
- `getUserTransactions()` - Fetch user's transaction history
- `getUserStakingPositions()` - Fetch user's stakes
- `linkWallet()` - Connect Web3 wallet to account
- `getUserWallets()` - List connected wallets

### Admin Actions (`/app/actions/admin.ts`)
- `getSponsorshipPolicy()` - Get current policy
- `updateSponsorshipPolicy()` - Modify sponsorship rules
- `getSponsorshipLogs()` - View sponsorship requests
- `getAdminAuditLogs()` - View admin action history
- `getSponsorshipStats()` - Get analytics
- `togglePolicyActive()` - Enable/disable policy
- `logAdminAction()` - Record admin action

## Security

### Row Level Security
All database queries use `userId` scoping:
```ts
const userId = await getUserId() // From session
await db.select().from(stakingPosition)
  .where(eq(stakingPosition.userId, userId))
```

### Admin Protection
- Admin pages check `adminUser` table
- Redirect non-admins to `/dashboard`
- All admin actions logged to audit trail
- Policy changes timestamped with admin ID

### Smart Contract Calls
- Validated via Wagmi wallet client
- Transaction hashes stored for verification
- Sponsorship verified via Pimlico webhook
- Gas fees optionally covered via sponsorship

## Testing

### Manual Testing Checklist
1. **Authentication**
   - Sign up with email/password
   - Verify email (dev mode)
   - Sign in
   - Check session persistence

2. **Wallet Connection**
   - Connect MetaMask
   - Verify address display
   - Check balance reading

3. **Staking**
   - Enter stake amount
   - Select lockup period
   - View reward estimate
   - Submit transaction
   - Verify in dashboard

4. **Dashboard**
   - View wallet connections
   - See staking positions
   - Track transaction history
   - Check gas sponsorship status

5. **Admin**
   - Login as admin
   - View sponsorship policy
   - Edit policy settings
   - Check analytics
   - Review audit logs

### Test Data
For development, you can create test data directly in Neon:
```sql
-- Create test user (note: use real user ID from auth)
INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
VALUES ('test_user_1', 'Test User', 'test@example.com', true, now(), now());

-- Link test wallet
INSERT INTO "wallet_link" (id, "userId", "walletAddress", "isVerified", "createdAt")
VALUES ('wallet_1', 'test_user_1', '0x123...', true, now());

-- Create test staking position
INSERT INTO "staking_position" (id, "userId", "walletAddress", "amountAGL", "lockupPeriodDays", "estimatedReward", "startDate", "endDate", status, "txHash", "createdAt", "updatedAt")
VALUES ('stake_1', 'test_user_1', '0x123...', '1000', 30, '10', now(), now() + interval '30 days', 'active', '0x456...', now(), now());
```

## Environment Variables

### Required for Phase 3-5
```env
# Database (from Neon integration)
DATABASE_URL=postgresql://...

# Authentication
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
BETTER_AUTH_URL=https://your-domain.com (optional)

# Smart Contracts
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=0x... (your contract)

# Web3 RPC
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_CHAIN_ID=8453

# Phase 2 (Gas Sponsorship)
NEXT_PUBLIC_PIMLICO_API_KEY=<from Pimlico>
PIMLICO_WEBHOOK_SECRET=<from Pimlico>
```

## Deployment Checklist

Before deploying to production:

1. Database
   - ✓ All tables created in production Neon instance
   - ✓ Backups configured
   - ✓ Indexes on frequently queried columns

2. Authentication
   - ✓ BETTER_AUTH_SECRET set (strong random value)
   - ✓ BETTER_AUTH_URL matches production domain
   - ✓ SSL certificate valid

3. Smart Contracts
   - ✓ Staking contract deployed and verified
   - ✓ Token addresses correct for mainnet
   - ✓ Contract permissions set

4. Admin Setup
   - ✓ At least one admin user created
   - ✓ Sponsorship policy initialized
   - ✓ Monthly budget reasonable

5. Monitoring
   - ✓ Vercel analytics configured
   - ✓ Error logging enabled
   - ✓ Database query monitoring

6. Security
   - ✓ All secrets in Vercel environment
   - ✓ No hardcoded credentials
   - ✓ CORS properly configured
   - ✓ Rate limiting on webhooks

## Troubleshooting

### Dashboard shows "Not logged in"
- User session may have expired
- Check BETTER_AUTH_SECRET is set
- Verify DATABASE_URL is correct
- Check browser cookies in dev tools

### Staking transaction fails
- Check wallet has sufficient AGL balance
- Verify staking contract address is correct
- Check Base mainnet RPC is responsive
- Ensure wallet is on Base network

### Admin page shows "Not an admin"
- User must be added to `admin_user` table
- Use Neon console to add admin role
- Restart app after role assignment

### Database connection errors
- Verify DATABASE_URL format and connectivity
- Check Neon project is active
- Ensure IP whitelist includes deployment server
- Test with: `psql $DATABASE_URL`

## Next Steps

### Future Enhancements
- Real-time reward accrual calculations
- Email notifications for stake milestones
- Advanced analytics dashboard
- Multi-signature admin approvals
- Rate limiting on sponsorship requests
- Mobile app support
- Additional staking tiers
- Governance token integration

### Performance Optimizations
- Add database indexes on frequently filtered columns
- Implement caching layer (Redis)
- Optimize React Query data fetching
- Lazy load admin components
- Compress transaction history exports

## Support

For issues or questions:
1. Check v0_debug_logs.log for errors
2. Verify all environment variables are set
3. Review Neon console for database issues
4. Check Basescan for transaction details
5. Review Pimlico dashboard for sponsorship logs
