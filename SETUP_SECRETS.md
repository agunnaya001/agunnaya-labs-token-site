# Phase 1+2 Integration - Environment Variables Setup

This document explains all the environment variables required for the Wallet Connectivity (Phase 1) and Gas Sponsorship (Phase 2) integration.

## Required Environment Variables

### Phase 1: Wallet Connectivity

These variables are required for Web3 wallet connection and token balance checking:

#### 1. `NEXT_PUBLIC_BASE_RPC_URL`
- **What it is**: The RPC endpoint URL for Base mainnet
- **Why needed**: To read blockchain data (token balances, contract calls)
- **Type**: Public (can be exposed to frontend)
- **Example values**:
  - `https://mainnet.base.org` (Base public RPC)
  - `https://base.llamarpc.com` (LlamaRPC endpoint)
  - `https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY` (Alchemy)
  - `https://base.infura.io/v3/YOUR_API_KEY` (Infura)
- **How to get it**: 
  - Use the free public RPC: `https://mainnet.base.org`
  - Or get your own from Alchemy, Infura, or LlamaRPC

#### 2. `NEXT_PUBLIC_AGL_TOKEN_ADDRESS`
- **What it is**: The contract address of the AGL token on Base
- **Why needed**: To read user balances and interact with the token contract
- **Type**: Public (can be exposed to frontend)
- **Value**: `0xEA1221B4d80A89BD8C75248Fae7c176BD1854698`
- **Note**: This is a constant and doesn't change

#### 3. `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP`
- **What it is**: Minimum AGL balance required for gas sponsorship eligibility
- **Why needed**: Used in frontend eligibility checks and webhook validation
- **Type**: Public (can be exposed to frontend)
- **Value**: `100` (or your desired minimum)
- **Unit**: Raw AGL tokens (will be multiplied by 10^18 for wei)
- **Example**: `100` = 100 AGL minimum

#### 4. `NEXT_PUBLIC_CHAIN_ID`
- **What it is**: The blockchain network ID for Base mainnet
- **Why needed**: To ensure users are on the correct network
- **Type**: Public (can be exposed to frontend)
- **Value**: `8453` (Base mainnet chain ID)
- **Note**: This is a constant and doesn't change

### Phase 2: Gas Sponsorship with Pimlico

These variables are for gas-free transaction sponsorship via Pimlico:

#### 5. `NEXT_PUBLIC_PIMLICO_API_KEY`
- **What it is**: Your Pimlico API key for smart account operations
- **Why needed**: To connect to Pimlico's smart account bundler and paymaster
- **Type**: Public (can be exposed to frontend, but consider security)
- **How to get it**:
  1. Go to https://dashboard.pimlico.io
  2. Sign up or log in
  3. Create a new project
  4. Copy your API key from the dashboard
  5. Select "Base" as the chain
- **Security note**: This is a public key but rate-limited to your domain

#### 6. `PIMLICO_WEBHOOK_SECRET` (Backend only)
- **What it is**: The webhook signing secret from Pimlico
- **Why needed**: To verify that webhook requests from Pimlico are legitimate
- **Type**: Secret (should NEVER be exposed to frontend)
- **Where used**: `/api/webhooks/pimlico-sponsor` route only
- **How to get it**:
  1. Go to Pimlico dashboard
  2. Navigate to Webhooks section
  3. Create a new webhook endpoint: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
  4. Copy the signing secret provided by Pimlico
- **Security**: Keep this in .env.local (not .env.public)

#### 7. `PIMLICO_WEBHOOK_SIGNING_KEY` (Alternative)
- **What it is**: Alternative name for the webhook secret (same value as above)
- **Why needed**: Redundancy in case you want to name it differently
- **Type**: Secret (backend only)
- **Value**: Same as `PIMLICO_WEBHOOK_SECRET`
- **Optional**: Only set if you want both variables

## How to Set Up Environment Variables

### Option 1: Local Development (.env.local)

Create a `.env.local` file in the project root:

```bash
# Public Variables (can be committed to git)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP=100
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_PIMLICO_API_KEY=your_pimlico_api_key_here

# Secret Variables (NEVER commit to git)
PIMLICO_WEBHOOK_SECRET=your_webhook_secret_here
```

**IMPORTANT**: Add `.env.local` to your `.gitignore`:
```
.env.local
.env.*.local
```

### Option 2: Vercel Deployment

1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add each variable:
   - **Public vars**: Check the "Automatically expose to the frontend" box for NEXT_PUBLIC_* variables
   - **Secret vars**: Leave unchecked for PIMLICO_WEBHOOK_SECRET

4. Deploy your changes

## Testing Your Setup

### Test Wallet Connection
1. Start the dev server: `npm run dev` or `pnpm dev`
2. Look for the "Connect Wallet" button in the navbar (top right)
3. Click it and connect your MetaMask/wallet
4. Verify your address and AGL balance appear

### Test Sponsorship Eligibility
1. After connecting wallet, go to `/stake` page
2. If you have 100+ AGL, you should see: "✓ Gas Sponsorship Eligible"
3. If you have less, you should see: "⚠️ Not Eligible for Gas Sponsorship"

### Test Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks/pimlico-sponsor \
  -H "Content-Type: application/json" \
  -H "x-pimlico-signature: test" \
  -d '{
    "userAddress": "0x1234567890123456789012345678901234567890",
    "userOpHash": "0xabcdef",
    "chainId": 8453
  }'
```

## Troubleshooting

### "Connect Wallet" button doesn't appear
- Check that `NEXT_PUBLIC_BASE_RPC_URL` is set
- Check that `NEXT_PUBLIC_CHAIN_ID` is set to `8453`
- Restart dev server after adding env vars

### Balance shows 0 or doesn't load
- Verify your wallet address is correct
- Check that `NEXT_PUBLIC_AGL_TOKEN_ADDRESS` is the correct contract
- Verify the RPC endpoint is working: `curl https://mainnet.base.org`
- Check browser console for errors

### "Wrong Network" error appears
- You're connected to a different blockchain
- Click the wallet button and switch to "Base" network in MetaMask

### Sponsorship always shows ineligible
- Check your AGL balance on Base
- Verify `NEXT_PUBLIC_AGL_MIN_FOR_SPONSORSHIP` is set correctly
- Check blockchain explorer: https://basescan.org

### Webhook signature verification fails
- Verify `PIMLICO_WEBHOOK_SECRET` is correctly copied from Pimlico dashboard
- Check that the webhook URL in Pimlico matches: `https://yourdomain.com/api/webhooks/pimlico-sponsor`
- Ensure the secret hasn't been accidentally modified

## What Each Integration Does

### Phase 1: Wallet Connectivity
- Users can connect MetaMask/Web3 wallet
- Display connected address in navbar
- Show AGL token balance
- Enable network detection (Base mainnet required)

### Phase 2: Gas Sponsorship
- Check if user holds minimum AGL (100+)
- If eligible: User gets gas-free transactions
- If not eligible: User pays gas normally
- Webhook validates each sponsored transaction on backend

## Security Considerations

1. **Public vs Secret**:
   - `NEXT_PUBLIC_*` variables are exposed to frontend (OK)
   - `PIMLICO_WEBHOOK_SECRET` is backend only (critical)

2. **API Key Rate Limits**:
   - Pimlico API keys are rate-limited to your domain
   - If rate limited, create a new project in Pimlico dashboard

3. **RPC Endpoint**:
   - Use reputable providers: Base, Alchemy, Infura, LlamaRPC
   - Free endpoints work but may have rate limits
   - For production, consider paid tier

4. **Webhook Security**:
   - Always verify webhook signatures
   - Never trust external webhook data without validation
   - Use HTTPS in production

## Next Steps

After setting up these variables, you can:

1. **Test locally** with `npm run dev`
2. **Deploy to Vercel** with the same environment variables
3. **Monitor** the webhook endpoint to ensure sponsorships work
4. **Extend** with Phase 3 (Smart Contract Interactions) when ready
