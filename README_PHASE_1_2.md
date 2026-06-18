# 🚀 Phase 1+2 Integration - Complete Setup Guide

Welcome! Your AGL token site now has **wallet connectivity** and **gas-free sponsorship** integrated. Follow this guide to get it running.

---

## 📋 What You Need (6 Environment Variables)

### Quick Answer: The Secrets Required

```
1. NEXT_PUBLIC_BASE_RPC_URL          → https://mainnet.base.org
2. NEXT_PUBLIC_AGL_TOKEN_ADDRESS     → 0xEA1221B4d80A89BD8C75248Fae7c176BD1854698 (don't change)
3. NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP → 100
4. NEXT_PUBLIC_CHAIN_ID              → 8453 (don't change)
5. NEXT_PUBLIC_PIMLICO_API_KEY       → Get from dashboard.pimlico.io
6. PIMLICO_WEBHOOK_SECRET            → Get from Pimlico Webhooks (SECRET!)
```

**⏱️ Time to set up: 15 minutes**

---

## 🔧 Setup in 3 Steps

### Step 1: Get Your Pimlico API Key (5 mins)

1. Go to https://dashboard.pimlico.io
2. Click **"Sign Up"** (free account)
3. Verify email
4. Create a **new project**
5. Select **"Base"** as the blockchain
6. Copy your **API key**
7. Save it somewhere safe

### Step 2: Set Up Webhook in Pimlico (5 mins)

1. In Pimlico dashboard, go to **"Webhooks"** section
2. Click **"Create Webhook"**
3. For **Endpoint URL**, enter:
   - Local testing: `http://localhost:3000/api/webhooks/pimlico-sponsor`
   - Production: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
4. Select **"Sponsorship Requests"** as event type
5. Copy the **Signing Secret** provided
6. Save it somewhere safe

### Step 3: Add Secrets to Your Project (5 mins)

**For Local Development:**

1. In project root, create file `.env.local` (it's in `.gitignore` already)
2. Copy this exactly:

```bash
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP=100
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_PIMLICO_API_KEY=pk_live_xxxxxxxxxxxxxxxxxxxx
PIMLICO_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx
```

3. Replace `xxxx` values with your actual keys
4. Save the file
5. Restart dev server: `Ctrl+C` then `pnpm dev`

**For Vercel Deployment:**

1. Push code to GitHub (don't include .env.local!)
2. Go to your Vercel project
3. Click **Settings** → **Environment Variables**
4. Add these 6 variables:
   - `NEXT_PUBLIC_BASE_RPC_URL` (check "Expose to Frontend")
   - `NEXT_PUBLIC_AGL_TOKEN_ADDRESS` (check "Expose to Frontend")
   - `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP` (check "Expose to Frontend")
   - `NEXT_PUBLIC_CHAIN_ID` (check "Expose to Frontend")
   - `NEXT_PUBLIC_PIMLICO_API_KEY` (check "Expose to Frontend")
   - `PIMLICO_WEBHOOK_SECRET` (leave unchecked - it's secret!)
5. Redeploy your site

---

## ✅ Test It Works

### Test 1: Wallet Connection

1. Start dev server: `pnpm dev`
2. Open http://localhost:3000
3. Look for **"Connect Wallet"** button in top right
4. Click it → approve in MetaMask
5. Button should change to show your address like `0x1234...5678`
6. ✅ If this works, Phase 1 is connected!

### Test 2: Check Your Balance

1. Click the wallet button
2. You should see:
   - Your full address
   - Your **AGL balance** (e.g., "1234.56 AGL")
3. ✅ If balance shows, you're reading blockchain data correctly!

### Test 3: Sponsorship Status

1. With wallet connected, go to `/stake` page
2. Scroll to "Reward Calculator" section
3. You should see one of:
   - ✅ **"✓ Gas Sponsorship Eligible"** (if you have 100+ AGL)
   - ⚠️ **"⚠️ Not Eligible for Gas Sponsorship"** (if you have less)
4. ✅ If status appears, Phase 2 is working!

### Test 4: Webhook Health Check

```bash
curl http://localhost:3000/api/webhooks/pimlico-sponsor
```

You should see:
```json
{"status":"ok","webhook":"pimlico-sponsor"}
```

---

## 🎯 What Each Secret Does

### Public Secrets (Frontend)

| Secret | Purpose | Where Used |
|--------|---------|-----------|
| `NEXT_PUBLIC_BASE_RPC_URL` | Read data from blockchain | WalletButton, check balances |
| `NEXT_PUBLIC_AGL_TOKEN_ADDRESS` | Which contract is AGL | Token balance reading |
| `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP` | Min AGL for sponsorship | Eligibility check |
| `NEXT_PUBLIC_CHAIN_ID` | Network ID (Base only) | Verify network selection |
| `NEXT_PUBLIC_PIMLICO_API_KEY` | Access Pimlico services | Smart accounts (future) |

### Secret (Backend Only)

| Secret | Purpose | Where Used |
|--------|---------|-----------|
| `PIMLICO_WEBHOOK_SECRET` | Verify webhook requests | `/api/webhooks/pimlico-sponsor` |

---

## 📁 What Was Added

### New Components
- **`WalletButton`** - Shows wallet connection status and balance
- **`useSponsoredTransaction` hook** - Checks sponsorship eligibility

### New Utilities
- **`lib/web3.ts`** - Token balance & contract interactions
- **`lib/pimlico.ts`** - Gas sponsorship utilities
- **`app/providers.tsx`** - Web3 setup (Wagmi + Query)

### New API Route
- **`/api/webhooks/pimlico-sponsor`** - Webhook handler for sponsorship decisions

### Updated Components
- **`Navbar`** - Added WalletButton
- **`Stake Page`** - Shows sponsorship status

### Documentation
- **`ENV_VARS_REQUIRED.md`** - Detailed env var guide
- **`SETUP_SECRETS.md`** - Full setup walkthrough  
- **`SECRETS_CHECKLIST.md`** - Quick checklist format
- **`PHASE_1_2_SUMMARY.md`** - What was built
- **`.env.example`** - Template for env vars

---

## 🐛 Troubleshooting

### Problem: "Connect Wallet" button doesn't appear

**Solution:**
1. Check `.env.local` has all 4 Phase 1 variables
2. Restart dev server: `Ctrl+C` then `pnpm dev`
3. Clear browser cache: `Ctrl+Shift+Delete` then refresh
4. Check browser console for errors: F12 → Console tab

### Problem: Balance shows 0 or doesn't load

**Solution:**
1. Make sure wallet is connected to **Base** network
2. Check your balance on https://basescan.org
3. Verify you're using correct wallet address
4. Try adding AGL token to MetaMask manually:
   - Contract: `0xEA1221B4d80A89BD8C75248Fae7c176BD1854698`
   - Network: Base

### Problem: "Wrong Network" error appears

**Solution:**
1. In MetaMask, switch to **Base** network
2. If Base not listed, add it manually:
   - Network: Base
   - RPC: https://mainnet.base.org
   - Chain ID: 8453
   - Currency: ETH

### Problem: Sponsorship always shows "Not Eligible"

**Solution:**
1. Check your actual AGL balance on basescan.org
2. Make sure you have 100+ AGL (or whatever min is set)
3. Wait a moment for balance to refresh
4. Check `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP` is correct

### Problem: Getting "Invalid API Key" error

**Solution:**
1. Copy your Pimlico API key again from dashboard
2. Make sure there are no extra spaces
3. Verify it's a key for **Base** chain
4. Restart dev server

### Problem: Webhook not working

**Solution:**
1. Make sure `PIMLICO_WEBHOOK_SECRET` is in `.env.local` (NOT NEXT_PUBLIC_*)
2. Restart dev server after adding
3. Test with: `curl http://localhost:3000/api/webhooks/pimlico-sponsor`
4. Check Pimlico dashboard webhook logs

---

## 🔒 Security Notes

✅ **What's Secure:**
- Webhook signature verification (HMAC-SHA256)
- Backend-only secret handling
- No private keys stored in code
- RLS protection via network detection

⚠️ **Best Practices:**
- Never commit `.env.local` to git (it's already in .gitignore)
- Keep `PIMLICO_WEBHOOK_SECRET` secret (backend only)
- Pimlico API keys are rate-limited by domain anyway
- Use HTTPS in production
- Monitor webhook logs for unusual activity

---

## 📊 How It Works (Simple Explanation)

### When User Connects Wallet

```
User clicks "Connect Wallet"
         ↓
Wagmi connects to MetaMask
         ↓
User approves connection
         ↓
App shows: wallet address + AGL balance
         ↓
Balance is read from blockchain (read-only, no cost)
```

### When User Stakes Tokens

```
User clicks "Stake"
         ↓
Pimlico builds a smart account transaction
         ↓
Webhook calls: "Does this user have 100+ AGL?"
         ↓
Backend checks balance on blockchain
         ↓
If yes: Pimlico sponsors gas fee (FREE for user)
If no: User pays gas fee normally
```

---

## 🎓 Learn More

- **Wagmi Docs**: https://wagmi.sh
- **Pimlico Docs**: https://docs.pimlico.io
- **Base Docs**: https://docs.base.org
- **Viem Docs**: https://viem.sh

---

## 📞 Need Help?

Check these files in order:
1. **`SECRETS_CHECKLIST.md`** - Quick checklist
2. **`ENV_VARS_REQUIRED.md`** - Detailed env var explanations
3. **`SETUP_SECRETS.md`** - Full step-by-step guide

---

## ✨ What's Next?

After Phase 1+2 is working:

- **Phase 3**: Smart contract staking (actual stake/unstake)
- **Phase 4**: Backend database (Neon + Better Auth)
- **Phase 5**: Admin dashboard (manage sponsorship)

---

## 🎉 Summary

You now have:
- ✅ Wallet connectivity (MetaMask integration)
- ✅ Balance checking (real-time on blockchain)
- ✅ Gas sponsorship (free transactions for 100+ AGL holders)
- ✅ Webhook verification (secure backend validation)

**Next step:** Set your 6 environment variables and test locally! 🚀

---

**Questions?** Check the documentation files or review the code comments tagged with `[v0]`.
