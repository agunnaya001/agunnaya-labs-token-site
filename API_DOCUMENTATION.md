# AGL Token Platform - API Documentation

Complete API reference for the Agunnaya Labs Token (AGL) staking platform. All endpoints are built with Next.js App Router and use Server Actions or Route Handlers.

## Table of Contents

1. [Authentication](#authentication)
2. [User Endpoints](#user-endpoints)
3. [Staking Endpoints](#staking-endpoints)
4. [Transaction Endpoints](#transaction-endpoints)
5. [Sponsorship Endpoints](#sponsorship-endpoints)
6. [Admin Endpoints](#admin-endpoints)
7. [Wallet Endpoints](#wallet-endpoints)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)

---

## Authentication

All protected endpoints require a valid Better Auth session. Sessions are managed via HTTP-only cookies.

### Authentication Headers

```
Cookie: better-auth.session_token=<token>
```

### Session Management

**Get Current Session**

```typescript
// Client-side
import { authClient } from '@/lib/auth-client'

const session = await authClient.getSession()
```

**Server-side**

```typescript
// Server Action
'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

async function getSession() {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  })
  return session?.user
}
```

---

## User Endpoints

### Get User Profile

**Endpoint:** `GET /api/user/profile`

**Authentication:** Required

**Response:**

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "emailVerified": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "wallets": [
    {
      "address": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b",
      "isVerified": true,
      "createdAt": "2024-01-15T10:35:00Z"
    }
  ]
}
```

**Errors:**

```json
{
  "error": "Unauthorized",
  "message": "User not authenticated",
  "status": 401
}
```

### Update User Profile

**Endpoint:** `POST /api/user/profile`

**Authentication:** Required

**Request Body:**

```json
{
  "name": "John Doe Updated",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ...updated user data... }
}
```

### Get Notification Preferences

**Endpoint:** `GET /api/user/notification-preferences`

**Authentication:** Required

**Response:**

```json
{
  "stakingConfirmation": true,
  "withdrawalNotification": true,
  "gasSponsorshipUpdates": true,
  "weeklyReport": true,
  "securityAlerts": true
}
```

### Update Notification Preferences

**Endpoint:** `POST /api/user/notification-preferences`

**Authentication:** Required

**Request Body:**

```json
{
  "stakingConfirmation": true,
  "withdrawalNotification": false,
  "gasSponsorshipUpdates": true,
  "weeklyReport": true,
  "securityAlerts": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Preferences updated",
  "preferences": { ...updated preferences... }
}
```

---

## Staking Endpoints

### Get User Staking Positions

**Endpoint:** `GET /api/staking/positions`

**Authentication:** Required

**Query Parameters:**

- `status` (optional): "active" | "completed" | "all" (default: "all")
- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)

**Response:**

```json
{
  "positions": [
    {
      "id": "stake_456",
      "amountAGL": "1000.00",
      "lockupPeriodDays": 30,
      "estimatedReward": "9.86",
      "startDate": "2024-01-15T10:30:00Z",
      "endDate": "2024-02-14T10:30:00Z",
      "status": "active",
      "txHash": "0x123456...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 5,
  "page": 1
}
```

### Create Staking Position

**Endpoint:** `POST /api/staking/create`

**Authentication:** Required

**Request Body:**

```json
{
  "amount": "1000",
  "lockupPeriodDays": 30,
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Staking transaction initiated",
  "stakingPosition": {
    "id": "stake_789",
    "amountAGL": "1000.00",
    "lockupPeriodDays": 30,
    "estimatedReward": "9.86",
    "status": "pending",
    "txHash": "0x789abc..."
  }
}
```

### Estimate Staking Rewards

**Endpoint:** `POST /api/staking/estimate-rewards`

**Authentication:** Not required

**Request Body:**

```json
{
  "amount": "1000",
  "lockupPeriodDays": 30
}
```

**Response:**

```json
{
  "amount": "1000",
  "lockupPeriodDays": 30,
  "dailyReward": "0.329",
  "totalReward": "9.86",
  "apy": "12-14%",
  "calculations": {
    "rate": 0.0329,
    "days": 30,
    "formula": "amount * rate * (days / 365)"
  }
}
```

### Withdraw Staking Position

**Endpoint:** `POST /api/staking/withdraw`

**Authentication:** Required

**Request Body:**

```json
{
  "stakingPositionId": "stake_456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Withdrawal initiated",
  "withdrawal": {
    "stakingPositionId": "stake_456",
    "principal": "1000.00",
    "rewards": "9.86",
    "total": "1009.86",
    "txHash": "0xwithdraw...",
    "status": "pending"
  }
}
```

---

## Transaction Endpoints

### Get User Transactions

**Endpoint:** `GET /api/transactions`

**Authentication:** Required

**Query Parameters:**

- `type` (optional): "transfer" | "approval" | "stake" | "withdraw" | "all"
- `status` (optional): "pending" | "confirmed" | "failed" | "all"
- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)

**Response:**

```json
{
  "transactions": [
    {
      "id": "tx_001",
      "type": "stake",
      "amount": "1000.00",
      "tokenAddress": "0xEA1221B4d80A89BD8C75248Fae7c176BD1854698",
      "txHash": "0x123456...",
      "status": "confirmed",
      "sponsorshipUsed": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 15,
  "page": 1
}
```

### Get Transaction Details

**Endpoint:** `GET /api/transactions/{txId}`

**Authentication:** Required

**Response:**

```json
{
  "id": "tx_001",
  "type": "stake",
  "amount": "1000.00",
  "tokenAddress": "0xEA1221B4d80A89BD8C75248Fae7c176BD1854698",
  "txHash": "0x123456...",
  "status": "confirmed",
  "sponsorshipUsed": true,
  "gasUsed": "150000",
  "gasCost": "0.05",
  "blockNumber": 12345678,
  "createdAt": "2024-01-15T10:30:00Z",
  "confirmedAt": "2024-01-15T10:35:00Z"
}
```

---

## Sponsorship Endpoints

### Get Sponsorship Eligibility

**Endpoint:** `POST /api/sponsorship/check-eligibility`

**Authentication:** Not required

**Request Body:**

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b"
}
```

**Response:**

```json
{
  "eligible": true,
  "aglBalance": "150.00",
  "minRequired": "100.00",
  "message": "User is eligible for gas sponsorship"
}
```

### Get Sponsorship History

**Endpoint:** `GET /api/sponsorship/history`

**Authentication:** Required

**Query Parameters:**

- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)

**Response:**

```json
{
  "history": [
    {
      "id": "sponsor_001",
      "userOpHash": "0xoperation...",
      "aglBalance": "150.00",
      "minRequired": "100.00",
      "approved": true,
      "reason": "User has 150 AGL, meets minimum requirement",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 42,
  "page": 1
}
```

### Webhook: Pimlico Sponsorship

**Endpoint:** `POST /api/webhooks/pimlico-sponsor`

**Authentication:** Webhook signature verification

**Headers:**

```
X-Pimlico-Signature: <HMAC-SHA256 signature>
```

**Request Body:**

```json
{
  "userOpHash": "0x123456...",
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b",
  "timestamp": 1705313400
}
```

**Response (200 OK):**

```json
{
  "sponsorshipApproved": true,
  "maxGasPrice": "50000000000",
  "reason": "User eligible: holds 100+ AGL"
}
```

**Response (403 Forbidden):**

```json
{
  "sponsorshipApproved": false,
  "reason": "Insufficient AGL balance"
}
```

---

## Admin Endpoints

### Get All Users (Admin)

**Endpoint:** `GET /api/admin/users`

**Authentication:** Required (admin role)

**Query Parameters:**

- `search` (optional): string
- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)

**Response:**

```json
{
  "users": [
    {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "totalStaked": "5000.00",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1250,
  "page": 1
}
```

### Get Admin Analytics

**Endpoint:** `GET /api/admin/analytics`

**Authentication:** Required (admin role)

**Query Parameters:**

- `period` (optional): "day" | "week" | "month" | "year" (default: "month")

**Response:**

```json
{
  "totalUsers": 1250,
  "activeUsers": 850,
  "totalStaked": "2500000.00",
  "totalSponsored": "45000.00",
  "averageStake": "1923.08",
  "approvalRate": 0.98,
  "transactions": [
    {
      "date": "2024-01-15",
      "count": 245,
      "volume": "125000.00",
      "gasSponsored": "2345.67"
    }
  ]
}
```

### Update Sponsorship Policy

**Endpoint:** `POST /api/admin/sponsorship-policy`

**Authentication:** Required (admin role)

**Request Body:**

```json
{
  "minAGLBalance": 100,
  "maxDailySponsorsPerUser": 10,
  "maxMonthlyBudget": 100000
}
```

**Response:**

```json
{
  "success": true,
  "message": "Sponsorship policy updated",
  "policy": {
    "minAGLBalance": 100,
    "maxDailySponsorsPerUser": 10,
    "maxMonthlyBudget": 100000,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Admin Audit Log

**Endpoint:** `GET /api/admin/audit-log`

**Authentication:** Required (admin role)

**Query Parameters:**

- `action` (optional): string
- `limit` (optional): number (default: 50)

**Response:**

```json
{
  "logs": [
    {
      "id": "audit_001",
      "adminId": "admin_user_1",
      "action": "UPDATE_POLICY",
      "targetId": "policy_001",
      "oldValue": "{...}",
      "newValue": "{...}",
      "reason": "Adjust sponsorship limits",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 456
}
```

---

## Wallet Endpoints

### Link Wallet to Account

**Endpoint:** `POST /api/wallet/link`

**Authentication:** Required

**Request Body:**

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b",
  "signature": "0xsignature...",
  "message": "Sign this to link your wallet"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Wallet linked successfully",
  "wallet": {
    "address": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b",
    "isVerified": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Linked Wallets

**Endpoint:** `GET /api/wallet/list`

**Authentication:** Required

**Response:**

```json
{
  "wallets": [
    {
      "address": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b",
      "isVerified": true,
      "isPrimary": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Unlink Wallet

**Endpoint:** `POST /api/wallet/unlink`

**Authentication:** Required

**Request Body:**

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Wallet unlinked"
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "ErrorType",
  "message": "Human-readable error message",
  "status": 400,
  "code": "SPECIFIC_ERROR_CODE",
  "details": {
    "field": "details about error"
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid authentication |
| FORBIDDEN | 403 | User lacks required permissions |
| NOT_FOUND | 404 | Resource not found |
| INVALID_INPUT | 400 | Invalid request parameters |
| INSUFFICIENT_BALANCE | 400 | User doesn't have enough AGL |
| TRANSACTION_FAILED | 500 | Blockchain transaction failed |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

### Example Error Response

```json
{
  "error": "ValidationError",
  "message": "Staking amount must be at least 100 AGL",
  "status": 400,
  "code": "MINIMUM_STAKE_NOT_MET",
  "details": {
    "field": "amount",
    "minimum": "100",
    "provided": "50"
  }
}
```

---

## Rate Limiting

Rate limits are applied per user per API key:

| Endpoint | Limit |
|----------|-------|
| `/api/auth/*` | 5 requests/minute |
| `/api/stake/*` | 10 requests/hour |
| `/api/transactions` | 20 requests/minute |
| `/api/user/*` | 30 requests/minute |
| `/api/webhooks/*` | 100 requests/minute |
| Admin endpoints | 50 requests/minute |

When rate limited, response includes:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705399800
```

---

## Testing Endpoints

### Using cURL

```bash
# Get user profile
curl -H "Cookie: better-auth.session_token=<token>" \
  https://yourdomain.com/api/user/profile

# Check sponsorship eligibility
curl -X POST https://yourdomain.com/api/sponsorship/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{"walletAddress": "0x742d35Cc6634C0532925a3b844Bc831e62d09b3b"}'

# Estimate rewards
curl -X POST https://yourdomain.com/api/staking/estimate-rewards \
  -H "Content-Type: application/json" \
  -d '{"amount": "1000", "lockupPeriodDays": 30}'
```

### Using JavaScript/TypeScript

```typescript
// Estimate rewards
const response = await fetch('/api/staking/estimate-rewards', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: '1000',
    lockupPeriodDays: 30
  })
})

const data = await response.json()
console.log(data.totalReward) // "9.86"
```

---

## Webhooks

### Pimlico Webhook

Triggered when a sponsored transaction is requested.

**URL:** `POST /api/webhooks/pimlico-sponsor`

**Events:**
- User operation submitted for sponsorship
- Sponsorship approval required
- Signature verification needed

**Retry Policy:**
- Automatic retry up to 3 times
- Exponential backoff: 5s, 25s, 125s

### Setting Up Webhooks

1. Go to Pimlico Dashboard
2. Navigate to Webhooks
3. Create webhook: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
4. Select events to subscribe
5. Copy signing secret to `PIMLICO_WEBHOOK_SECRET`

---

## Best Practices

### 1. Always Validate Input

```typescript
if (!amount || isNaN(parseFloat(amount))) {
  return error('INVALID_INPUT', 'Amount must be a valid number')
}
```

### 2. Use Appropriate HTTP Methods

- GET: Retrieve data (no side effects)
- POST: Create or modify data
- PUT: Update entire resource
- DELETE: Remove resource
- PATCH: Partial update

### 3. Handle Errors Gracefully

```typescript
try {
  await stakingAction()
} catch (error) {
  if (error instanceof ValidationError) {
    return { error: error.message, status: 400 }
  }
  return { error: 'Server error', status: 500 }
}
```

### 4. Implement Proper Authentication

All sensitive endpoints require valid session tokens. Tokens are automatically managed by Better Auth.

### 5. Log Important Actions

All admin actions and financial transactions are automatically logged for audit purposes.

---

## API Version

**Current Version:** 1.0  
**Last Updated:** January 2024  
**Status:** Production Ready

For support or feature requests, contact: support@agunnayalabs.xyz
