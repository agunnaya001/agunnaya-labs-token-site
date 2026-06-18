# 🔐 Environment Secrets Checklist

## Required Secrets (6 Total)

Copy-paste this checklist and fill in your values:

### ✅ Phase 1: Wallet Connectivity (4 Secrets)

- [ ] **NEXT_PUBLIC_BASE_RPC_URL**
  - [ ] Get from: `https://mainnet.base.org` (free/default)
  - [ ] Format: URL string
  - [ ] Example: `https://mainnet.base.org`

- [ ] **NEXT_PUBLIC_AGL_TOKEN_ADDRESS**
  - [ ] Use fixed value: `0xEA1221B4d80A89BD8C75248Fae7c176BD1854698`
  - [ ] Format: Ethereum address (0x...)
  - [ ] Status: ✅ DO NOT CHANGE

- [ ] **NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP**
  - [ ] Get from: Your sponsorship policy (recommended: 100)
  - [ ] Format: Number (whole tokens, not wei)
  - [ ] Example: `100`

- [ ] **NEXT_PUBLIC_CHAIN_ID**
  - [ ] Use fixed value: `8453`
  - [ ] Format: Number
  - [ ] Status: ✅ DO NOT CHANGE (Base mainnet only)

### ✅ Phase 2: Gas Sponsorship (2 Secrets)

- [ ] **NEXT_PUBLIC_PIMLICO_API_KEY**
  - [ ] Get from: https://dashboard.pimlico.io
  - [ ] Steps:
    1. Sign up at https://dashboard.pimlico.io
    2. Create new project
    3. Select "Base" blockchain
    4. Copy API key from dashboard
  - [ ] Format: API key string
  - [ ] Example: `pk_live_xxxxxxxxxxxxxxxxxx`
  - [ ] Type: PUBLIC (OK in frontend)

- [ ] **PIMLICO_WEBHOOK_SECRET** ⚠️ SECRET
  - [ ] Get from: Pimlico Webhooks section
  - [ ] Steps:
    1. Go to dashboard.pimlico.io → Webhooks
    2. Create webhook endpoint: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
    3. Copy signing secret
  - [ ] Format: Secret string (looks like random characters)
  - [ ] Example: `whsec_xxxxxxxxxxxxxxxxxxxx`
  - [ ] Type: SECRET - Backend only! Never expose to frontend!
  - [ ] ⚠️ DO NOT USE `NEXT_PUBLIC_` prefix

---

## Step-by-Step Setup

### Step 1: Get Pimlico API Key (5 mins)
```
1. Visit https://dashboard.pimlico.io
2. Click "Sign Up"
3. Create account (free tier available)
4. Create new project
5. Select "Base" as blockchain
6. Copy API key
7. Paste as: NEXT_PUBLIC_PIMLICO_API_KEY
```

### Step 2: Set Up Pimlico Webhook (5 mins)
```
1. In Pimlico dashboard, find "Webhooks"
2. Click "Create Webhook"
3. Enter endpoint: https://yourdomain.com/api/webhooks/pimlico-sponsor
   (or localhost:3000 for testing)
4. Select events: "Sponsorship requests"
5. Copy signing secret
6. Paste as: PIMLICO_WEBHOOK_SECRET (NOT with NEXT_PUBLIC_!)
```

### Step 3: Create .env.local File
```bash
# In project root, create .env.local with:

NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP=100
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_PIMLICO_API_KEY=pk_live_xxxxx
PIMLICO_WEBHOOK_SECRET=whsec_xxxxx
```

### Step 4: Deploy to Vercel
```
1. Commit code (NOT .env.local)
2. Push to GitHub
3. Go to Vercel project settings
4. Environment Variables section
5. Add each variable:
   - PUBLIC: NEXT_PUBLIC_BASE_RPC_URL
   - PUBLIC: NEXT_PUBLIC_AGL_TOKEN_ADDRESS
   - PUBLIC: NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP
   - PUBLIC: NEXT_PUBLIC_CHAIN_ID
   - PUBLIC: NEXT_PUBLIC_PIMLICO_API_KEY
   - SECRET: PIMLICO_WEBHOOK_SECRET (leave "Expose to Frontend" unchecked!)
6. Redeploy
```

---

## Secret Types Explained

### 🟢 PUBLIC Secrets (Can be in frontend code)
- `NEXT_PUBLIC_BASE_RPC_URL`
- `NEXT_PUBLIC_AGL_TOKEN_ADDRESS`
- `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_PIMLICO_API_KEY`

**Why?** These are rate-limited, domain-specific, or essential for the frontend to work.

### 🔴 SECRET Secrets (Backend only)
- `PIMLICO_WEBHOOK_SECRET`

**Why?** Used to verify webhook requests. If leaked, attackers could forge sponsorship requests.

---

## Verification Checklist

After setting up, verify each works:

### Test 1: RPC Endpoint
```bash
curl https://mainnet.base.org \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# Should return: {"jsonrpc":"2.0","result":"0x2105","id":1}
```

### Test 2: Token Address is Valid
```bash
# Visit https://basescan.org/address/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
# Should show: AGL token contract
```

### Test 3: Pimlico API Key Works
```bash
curl "https://api.pimlico.io/v2/base/rpc?apikey=YOUR_KEY" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# Should return valid response (not 401 Unauthorized)
```

### Test 4: Webhook Endpoint Accessible
```bash
curl https://yourdomain.com/api/webhooks/pimlico-sponsor
# Should return: {"status":"ok","webhook":"pimlico-sponsor"}
```

---

## Common Mistakes to Avoid

❌ **WRONG**: Using `NEXT_PUBLIC_PIMLICO_WEBHOOK_SECRET`
✅ **RIGHT**: Using `PIMLICO_WEBHOOK_SECRET` (no NEXT_PUBLIC_!)

❌ **WRONG**: Committing .env.local to git
✅ **RIGHT**: Add .env.local to .gitignore (already done)

❌ **WRONG**: Using wrong RPC endpoint
✅ **RIGHT**: Use https://mainnet.base.org or reputable provider

❌ **WRONG**: Copying webhook secret incorrectly
✅ **RIGHT**: Copy exact string from Pimlico dashboard

❌ **WRONG**: Mixing up secret variables
✅ **RIGHT**: Using exact variable names provided

---

## If Something Goes Wrong

### "Invalid API Key" Error
- Copy key again from Pimlico dashboard
- Make sure no extra spaces
- Verify it's for Base chain

### "Webhook signature verification failed"
- Verify PIMLICO_WEBHOOK_SECRET is in .env.local
- Make sure it's NOT in NEXT_PUBLIC_PIMLICO_WEBHOOK_SECRET
- Restart dev server after updating

### "RPC endpoint error"
- Test RPC endpoint with curl (see Test 1 above)
- Try different RPC provider if needed
- Check internet connection

### "Balance shows 0"
- Verify wallet is on Base network
- Check balance on basescan.org
- Verify AGL token address is correct

---

## Support

Need help? Check:
- 📖 `ENV_VARS_REQUIRED.md` - Detailed env var guide
- 📖 `SETUP_SECRETS.md` - Full setup walkthrough
- 🔗 https://dashboard.pimlico.io - Pimlico dashboard
- 🔗 https://docs.base.org - Base documentation

---

## Summary: The 6 Secrets You Need

| # | Name | Source | Type | Format |
|---|------|--------|------|--------|
| 1 | NEXT_PUBLIC_BASE_RPC_URL | https://mainnet.base.org | PUBLIC | URL |
| 2 | NEXT_PUBLIC_AGL_TOKEN_ADDRESS | Fixed: 0xEA1221B4d80A89BD8C75248Fae7c176BD1854698 | PUBLIC | Address |
| 3 | NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP | Your choice (100) | PUBLIC | Number |
| 4 | NEXT_PUBLIC_CHAIN_ID | Fixed: 8453 | PUBLIC | Number |
| 5 | NEXT_PUBLIC_PIMLICO_API_KEY | dashboard.pimlico.io | PUBLIC | API Key |
| 6 | PIMLICO_WEBHOOK_SECRET | dashboard.pimlico.io/webhooks | SECRET | Secret |

**⏱️ Estimated time to set up all: 15 minutes**
