# Environment Variables Required for Phase 1+2 Integration

## Quick Reference - What You Need to Set

Copy and paste these into your `.env.local` file (for local development) or Vercel Project Settings (for deployment):

```bash
# ============================================
# PHASE 1: WALLET CONNECTIVITY (Required)
# ============================================

# The RPC endpoint for Base mainnet
# Get from: https://mainnet.base.org (free), Alchemy, Infura, or LlamaRPC
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org

# The AGL token contract address on Base (do not change)
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698

# Minimum AGL balance for gas sponsorship eligibility (in whole tokens, not wei)
NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP=100

# Base mainnet chain ID (do not change)
NEXT_PUBLIC_CHAIN_ID=8453

# ============================================
# PHASE 2: GAS SPONSORSHIP (Required)
# ============================================

# Your Pimlico API key
# Get from: https://dashboard.pimlico.io (free account)
# Steps: Sign up → Create project → Select Base → Copy API key
NEXT_PUBLIC_PIMLICO_API_KEY=YOUR_PIMLICO_API_KEY_HERE

# Pimlico webhook signing secret (SECRET - BACKEND ONLY)
# Get from: Pimlico dashboard → Webhooks section
# Register webhook URL: https://yourdomain.com/api/webhooks/pimlico-sponsor
# Copy the signing secret provided
# NEVER expose this to frontend!
PIMLICO_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET_HERE
```

---

## Environment Variables Explained

### PUBLIC Variables (safe to expose, can go in NEXT_PUBLIC_*)

#### 1. `NEXT_PUBLIC_BASE_RPC_URL` ⭐ REQUIRED
- **Purpose**: Read blockchain data, check balances, execute transactions
- **What it does**: Connects your app to the Base blockchain
- **Default options**:
  - Free: `https://mainnet.base.org`
  - Free: `https://base.llamarpc.com`
  - Paid (better): Alchemy or Infura

#### 2. `NEXT_PUBLIC_AGL_TOKEN_ADDRESS` ⭐ REQUIRED (Don't change!)
- **Purpose**: Identifies the AGL token contract
- **Value**: `0xEA1221B4d80A89BD8C75248Fae7c176BD1854698`
- **Why**: This is the unique address of AGL on Base

#### 3. `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP` ⭐ REQUIRED
- **Purpose**: Minimum AGL balance for sponsorship eligibility
- **Recommended value**: `100`
- **Example**: If set to 100, users need 100+ AGL to qualify for gas sponsorship
- **Note**: Enter as whole tokens (not wei). 100 = 100 AGL (automatically multiplied by 10^18)

#### 4. `NEXT_PUBLIC_CHAIN_ID` ⭐ REQUIRED (Don't change!)
- **Purpose**: Identifies the blockchain network
- **Value**: `8453` (Base mainnet)
- **Why**: Ensures users are on the correct network

#### 5. `NEXT_PUBLIC_PIMLICO_API_KEY` ⭐ REQUIRED
- **Purpose**: Authenticates your app with Pimlico for gas sponsorship
- **How to get**:
  1. Go to https://dashboard.pimlico.io
  2. Click "Sign Up" (free account)
  3. Create a new project
  4. Select "Base" as the chain
  5. Copy your API key
- **Note**: Rate-limited but public is OK

### SECRET Variables (NEVER expose to frontend!)

#### 6. `PIMLICO_WEBHOOK_SECRET` ⭐ REQUIRED
- **Purpose**: Verify webhook requests from Pimlico are authentic
- **How to get**:
  1. Go to Pimlico dashboard
  2. Go to "Webhooks" section
  3. Create new webhook:
     - URL: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
     - Events: Sponsorship requests
  4. Copy the signing secret
- **CRITICAL**: This must NEVER be in NEXT_PUBLIC_* variables
- **Where it's used**: Only in `/api/webhooks/pimlico-sponsor` (server-side only)

---

## Setup Instructions

### Step 1: Get Your API Keys

**Pimlico API Key:**
1. Visit: https://dashboard.pimlico.io
2. Sign up (free)
3. Create project → Select Base
4. Copy API key

### Step 2: Set Up Webhook in Pimlico

1. In Pimlico dashboard, go to "Webhooks"
2. Create new webhook:
   - Endpoint URL: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
   - Event type: UserOperation sponsorship
3. Copy the "Signing Secret"

### Step 3: Add to Your Project

**For Local Development:**
Create `.env.local` in project root:
```bash
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP=100
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_PIMLICO_API_KEY=your_key_here
PIMLICO_WEBHOOK_SECRET=your_webhook_secret_here
```

**For Vercel Deployment:**
1. Go to project settings
2. Click "Environment Variables"
3. Add each variable:
   - Public vars: Enable "Automatically expose to the frontend" for NEXT_PUBLIC_*
   - Secret vars: Leave unchecked for PIMLICO_WEBHOOK_SECRET

### Step 4: Restart Dev Server

```bash
# Ctrl+C to stop current server
pnpm dev
```

---

## What Each Environment Variable Does

| Variable | Phase | Use | Required | Public? |
|----------|-------|-----|----------|---------|
| NEXT_PUBLIC_BASE_RPC_URL | 1 | Connect to blockchain | ✅ Yes | ✅ Yes |
| NEXT_PUBLIC_AGL_TOKEN_ADDRESS | 1 | Read AGL balance | ✅ Yes | ✅ Yes |
| NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP | 1+2 | Check sponsorship eligibility | ✅ Yes | ✅ Yes |
| NEXT_PUBLIC_CHAIN_ID | 1 | Validate network | ✅ Yes | ✅ Yes |
| NEXT_PUBLIC_PIMLICO_API_KEY | 2 | Access Pimlico API | ✅ Yes | ✅ Yes |
| PIMLICO_WEBHOOK_SECRET | 2 | Verify webhooks | ✅ Yes | ❌ No |

---

## Verify Setup Works

### Test 1: Wallet Connection
1. Start dev server: `pnpm dev`
2. Open http://localhost:3000
3. Click "Connect Wallet" (top right)
4. You should see a wallet button appear

### Test 2: Balance Check
1. Connect a wallet with some AGL tokens
2. Navigate to `/stake`
3. You should see either:
   - ✅ "Gas Sponsorship Eligible" (if you have 100+ AGL)
   - ⚠️ "Not Eligible" (if you have less AGL)

### Test 3: Webhook Endpoint
```bash
curl -X GET http://localhost:3000/api/webhooks/pimlico-sponsor
# Should return: {"status":"ok","webhook":"pimlico-sponsor"}
```

---

## Troubleshooting

### "Connect Wallet button doesn't appear"
- Verify all NEXT_PUBLIC_* variables are set
- Restart dev server after adding env vars
- Check browser console for errors

### "Balance shows 0"
- Make sure wallet is on Base network
- Verify the wallet address holds AGL tokens
- Check that NEXT_PUBLIC_AGL_TOKEN_ADDRESS is correct

### "Wrong Network error"
- Switch to Base network in MetaMask
- Base network details:
  - Network: Base
  - RPC: https://mainnet.base.org
  - Chain ID: 8453
  - Currency: ETH

### "Sponsorship always shows ineligible"
- Check your actual AGL balance on Base
- Try on https://basescan.org to verify balance
- Adjust NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP if needed

### Webhook not working
- Verify PIMLICO_WEBHOOK_SECRET is in `.env.local` (NOT NEXT_PUBLIC_*)
- Test with: `curl -X GET http://localhost:3000/api/webhooks/pimlico-sponsor`
- Check Pimlico dashboard for webhook logs

---

## Next Steps

1. ✅ Set all 6 environment variables
2. ✅ Test locally with `pnpm dev`
3. ✅ Connect wallet and verify balance displays
4. ✅ Navigate to `/stake` and check sponsorship status
5. ✅ Deploy to Vercel with same env vars
6. ⏭️ Continue with Phase 3 (Smart Contract Interactions) when ready

---

## Need Help?

- Pimlico docs: https://docs.pimlico.io
- Base docs: https://docs.base.org
- Wagmi docs: https://wagmi.sh
