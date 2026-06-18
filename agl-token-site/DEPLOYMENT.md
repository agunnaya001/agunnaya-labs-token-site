# AGL Token Landing Page - Deployment Guide

## Quick Start Deployment to Vercel

### Step 1: Prepare Your Repository

```bash
cd /vercel/share/v0-project/agl-token-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AGL token landing page"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/agunnaya001/agunnaya-labs-token-site.git

# Push to main branch
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Project name: agl-token-site
# - Framework: Next.js
# - Build command: npm run build
# - Output directory: .next
```

#### Option B: Using Vercel Web Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

#### Option C: Connect Domain in Vercel

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add domain: `agunnayalabs.xyz`
4. Update DNS records:
   - Nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
   - Or add CNAME: `cname.vercel-dns.com`

### Step 3: Verify Deployment

```bash
# Test the deployed site
curl https://agunnayalabs.xyz

# Or visit in browser:
# https://agunnayalabs.xyz
# https://agunnayalabs.xyz/stake
# https://agunnayalabs.xyz/about
```

## Environment Variables

**No environment variables are required.** All configurations are public:

- RPC URL: `https://mainnet.base.org` (public)
- DexScreener API: No auth needed
- Contract address: `0xEA1221B4d80A89BD8C75248Fae7c176BD1854698`

## Production Checklist

- ✅ Build passes locally: `npm run build`
- ✅ No TypeScript errors
- ✅ Responsive design tested on mobile/desktop
- ✅ Wallet connection works
- ✅ Price data loads correctly
- ✅ Staking calculator computes properly
- ✅ All links work (Home, Stake, About)
- ✅ Navigation working
- ✅ Contract interactions tested

## Performance Optimization

### Vercel Edge Functions (Optional)

For caching DexScreener API responses:

```typescript
// pages/api/price.ts
export default async function handler(req: NextRequest) {
  const response = await fetch(
    'https://api.dexscreener.com/latest/dex/tokens/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698?chain=base',
    { next: { revalidate: 60 } }
  );
  return new Response(response.body);
}
```

### Image Optimization

Install Sharp for image optimization:

```bash
npm install sharp
```

## Monitoring & Analytics

### Add Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Custom Domain SSL

- Automatically provided by Vercel
- Auto-renewal enabled
- No additional setup needed

## Troubleshooting

### Build Fails on Vercel

```bash
# Clear build cache
vercel env pull          # Pull latest env vars
vercel env set ...       # Set any needed vars
rm -rf .next node_modules
npm install
npm run build
```

### Slow Page Load

- Check DexScreener API status
- Verify Base RPC is responding
- Enable Vercel Analytics to identify bottlenecks

### 404 on Subpages

Ensure `next.config.js` exists and is correct:

```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

### Wallet Not Connecting

- User must have Web3 wallet installed
- Must be on correct chain (Base mainnet, ChainID 8453)
- Check browser console for errors

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you:
- Push to `main` branch
- Create a pull request (preview deployment)
- Revert a deployment (rollback)

### Rollback a Deployment

```bash
# Via CLI
vercel rollback

# Or via Vercel Dashboard
# Go to Deployments → Select Previous → Promote
```

## Custom Domain Setup

### Using Vercel Nameservers

1. Go to Vercel Project Settings → Domains
2. Add domain: `agunnayalabs.xyz`
3. Copy nameservers from Vercel
4. Update DNS registrar with Vercel nameservers
5. Wait for DNS propagation (up to 48 hours)

### Using CNAME Records

If using existing nameservers:

```
Host: www
Type: CNAME
Value: cname.vercel-dns.com
```

## Scaling & Limits

Vercel Free Tier includes:
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic SSL/HTTPS
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Custom domains

## Security

### Headers Configuration

Already set by Vercel:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### CORS

For RPC calls to Base:
- Cross-origin requests allowed from all domains
- Base RPC is public and CORS-enabled

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update to latest versions (careful!)
npm install next@latest react@latest
```

### Monitoring

- Vercel Analytics: [vercel.com/analytics](https://vercel.com/analytics)
- Error tracking: Built into Vercel dashboard
- Real-time logs: `vercel logs`

## Backup & Restore

### Git Repository Backup

```bash
# Ensure all changes are pushed
git push origin main

# GitHub automatically backs up
# For additional backup:
git clone https://github.com/agunnaya001/agunnaya-labs-token-site.git backup/
```

## Advanced: Self-Hosting

If not using Vercel:

```bash
# Build for production
npm run build

# Start server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start "npm start" --name agl-token-site
pm2 save
pm2 startup
```

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Base Blockchain**: https://docs.base.org
- **DexScreener API**: https://docs.dexscreener.com

---

**Deployment Date**: [Your Date]
**Live URL**: https://agunnayalabs.xyz
**Status**: Live on Vercel
