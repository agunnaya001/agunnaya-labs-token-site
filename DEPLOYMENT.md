# Deployment Guide - AGL Token Website

Complete guide for deploying the Agunnaya Labs Token website to production.

## Pre-Deployment Checklist

### ✅ Code & Build
- [x] All tests passed (see [TEST_REPORT.md](docs/TEST_REPORT.md))
- [x] Production build successful
- [x] No console errors or warnings
- [x] All dependencies updated
- [x] No security vulnerabilities
- [x] Code reviewed and tested

### ✅ Documentation
- [x] README.md created with badges
- [x] Comprehensive README complete
- [x] Testing guide documented
- [x] Verification guide complete
- [x] Smart contract verified on Basescan

### ✅ Assets
- [x] Logo generated (agl-logo.png)
- [x] Hero banner created (hero-banner.png)
- [x] Social OG image generated (og-image.png)
- [x] All images optimized
- [x] favicon configured

### ✅ Configuration
- [x] Meta tags configured
- [x] SEO optimization complete
- [x] Sitemap ready
- [x] Robots.txt configured
- [x] Security headers set

---

## Quick Start Deployment (Recommended)

### Step 1: Deploy to Vercel (Easiest)

1. **Push to GitHub**
```bash
git add .
git commit -m "Production deployment: Comprehensive AGL token site redesign"
git push origin main
```

2. **Vercel Auto-Deployment**
   - Vercel automatically deploys when you push to main
   - Check deployment status: https://vercel.com/dashboard

### Step 2: Configure Custom Domain

1. Go to Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add domain: `agunnayalabs.xyz`
4. Follow DNS configuration instructions
5. Update nameservers at your domain registrar

### Step 3: Verify Everything

```bash
# Test production build locally
pnpm build
pnpm start

# Open http://localhost:3000 in browser
# Verify all pages load correctly
```

### Step 4: Post-Deployment Verification

- [ ] Site loads at https://agunnayalabs.xyz
- [ ] All pages accessible
- [ ] SSL certificate valid (green padlock)
- [ ] Social media sharing works (OG tags)
- [ ] Mobile responsive
- [ ] Performance good (Lighthouse 90+)

---

## Manual Deployment Steps

### Option A: Deploy to Vercel (Recommended)

#### Prerequisites
- GitHub account with repository access
- Vercel account (free tier available)

#### Steps

1. **Create Vercel Account**
   ```
   https://vercel.com/signup
   ```

2. **Import GitHub Repository**
   - Click "Add New" → "Project"
   - Select GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `pnpm build`
   - Output Directory: `.next`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2 minutes)
   - Get production URL

5. **Add Custom Domain**
   - Go to "Settings" → "Domains"
   - Add `agunnayalabs.xyz`
   - Update DNS records at registrar

### Option B: Deploy to Other Hosting

#### Requirements
- Node.js 18+
- npm/pnpm/yarn

#### Build & Deploy

```bash
# 1. Build production
pnpm build

# 2. Start server
pnpm start

# 3. Server runs on http://localhost:3000
```

---

## Environment Variables

No environment variables required for production. All configuration is in the code.

**Optional for monitoring (after deployment):**
```bash
# Sentry error tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Analytics (privacy-friendly)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

---

## Post-Deployment Tasks

### 1. Verify Deployment

```bash
# Check all pages load
curl https://agunnayalabs.xyz
curl https://agunnayalabs.xyz/tokenomics
curl https://agunnayalabs.xyz/team
curl https://agunnayalabs.xyz/about
curl https://agunnayalabs.xyz/whitepaper
curl https://agunnayalabs.xyz/stake

# All should return 200 status
```

### 2. Test Performance

```bash
# Run Lighthouse audit
lighthouse https://agunnayalabs.xyz --view

# Check Core Web Vitals
# Should see "All green" indicators
```

### 3. Verify SEO

1. **Google Search Console**
   - Add property: https://agunnayalabs.xyz
   - Submit sitemap: https://agunnayalabs.xyz/sitemap.xml
   - Verify ownership

2. **Bing Webmaster**
   - Register site
   - Submit sitemap

3. **Social Media**
   - Test sharing on Twitter/X
   - Test sharing on LinkedIn
   - Test sharing on Discord

### 4. Test Smart Contract Link

- [ ] Click "View on BaseScan" button
- [ ] Verify contract loads correctly
- [ ] Confirm contract address: `0xEA1221B4d80A89BD8C75248Fae7c176BD1854698`

### 5. Monitor First 24 Hours

- Check for errors in logs
- Monitor performance metrics
- Verify all traffic redirects properly
- Check SSL certificate

---

## Domain Setup Instructions

### Using GoDaddy, Namecheap, or Similar

1. **Get Nameservers from Vercel**
   ```
   Vercel provides 2 nameservers:
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. **Update at Domain Registrar**
   - Log into domain registrar
   - Find "Nameservers" or "DNS" settings
   - Replace with Vercel nameservers
   - Save changes (can take 24-48 hours)

3. **Verify in Vercel**
   - Wait for verification
   - Should show green checkmark
   - DNS is now configured

### Using Cloudflare

1. **Add site to Cloudflare**
   - Go to https://dash.cloudflare.com
   - Click "Add site"
   - Enter `agunnayalabs.xyz`

2. **Update nameservers at registrar**
   - Use Cloudflare nameservers

3. **Configure DNS Record in Cloudflare**
   - Type: CNAME
   - Name: @
   - Target: cname.vercel-dns.com
   - Proxy: Proxied

---

## SSL Certificate

Vercel automatically provides free SSL/TLS certificates for all deployments.

**Verification:**
1. Visit https://agunnayalabs.xyz (with HTTPS)
2. Look for green padlock in browser
3. Certificate should be valid
4. Issued by: DigiCert

---

## Performance Optimization After Deployment

### 1. Enable Caching

Vercel automatically enables optimal caching. No additional configuration needed.

### 2. Configure CDN

Vercel uses global CDN by default for all deployments.

### 3. Monitor Performance

```bash
# Check performance monthly
lighthouse https://agunnayalabs.xyz --output-path=./lighthouse-report.html
```

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Uptime Monitoring**
   - Use: Uptime Robot (free), Pingdom, or similar
   - Monitor: https://agunnayalabs.xyz
   - Alert on: Any downtime

2. **Error Tracking**
   - Consider: Sentry (free tier available)
   - Tracks JavaScript errors
   - Alerts you to issues

3. **Performance Monitoring**
   - Vercel Analytics (built-in)
   - Lighthouse performance
   - Core Web Vitals

### Regular Maintenance

**Weekly:**
- Check for errors
- Verify uptime
- Monitor performance

**Monthly:**
- Run Lighthouse audit
- Review analytics
- Check security

**Quarterly:**
- Update dependencies
- Security audit
- Performance review

---

## Rollback Procedure

If issues occur after deployment:

### Quick Rollback (Vercel)

1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find previous stable deployment
4. Click "Promote to Production"
5. Automatic rollback in ~1 minute

### Manual Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Vercel automatically redeploys
```

---

## Troubleshooting

### Issue: Pages not loading

**Solution:**
```bash
# Check build logs in Vercel dashboard
# Look for build errors
# Verify all dependencies installed
# Check environment variables
```

### Issue: Slow performance

**Solution:**
```bash
# Run Lighthouse
lighthouse https://agunnayalabs.xyz

# Check for large images
# Verify CSS/JS optimization
# Consider image compression
```

### Issue: 404 errors

**Solution:**
- Verify all routes are correct
- Check rewrites in vercel.json (if any)
- Ensure all files deployed correctly
- Check routes in app directory

### Issue: SSL certificate error

**Solution:**
- Wait 24-48 hours for propagation
- Verify domain DNS configuration
- Check Vercel domain settings
- Contact Vercel support if persists

---

## Scaling & Performance

### Current Setup Performance
- Vercel Pro (recommended for production)
- Automatic scaling
- Global CDN distribution
- Built-in performance optimization

### For High Traffic (>10k concurrent)
- Upgrade to Vercel Pro
- Enable database (optional)
- Set up caching headers
- Use Vercel KV for session storage

---

## Security After Deployment

### 1. Enable Security Headers (Vercel)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### 2. Monitor Security
- Check for SSL issues weekly
- Keep dependencies updated
- Monitor for vulnerabilities
- Review access logs

---

## Deployment Checklist (Final)

Before going live, verify:

- [ ] Production build successful
- [ ] All tests passing
- [ ] No console errors
- [ ] Security headers configured
- [ ] SSL certificate valid
- [ ] Domain DNS configured
- [ ] Performance good (Lighthouse 90+)
- [ ] SEO metadata present
- [ ] Images optimized
- [ ] Links all working
- [ ] Mobile responsive
- [ ] Social sharing works
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional)
- [ ] Monitoring in place
- [ ] Documentation complete
- [ ] Team notified of deployment

---

## Support & Troubleshooting

### Getting Help

**Vercel Support:**
- https://vercel.com/help
- Support email: support@vercel.com

**Next.js Documentation:**
- https://nextjs.org/docs

**Project Issues:**
- GitHub: https://github.com/agunnaya001/agunnaya-labs-token-site
- Email: contact@agunnayalabs.xyz

---

## Post-Deployment Communication

### Notify Team

```
Subject: AGL Token Website Deployed to Production

Hi Team,

The AGL token website is now live at https://agunnayalabs.xyz

Key Features:
- Modern minimalist design
- 6 comprehensive pages
- Smart contract integration
- Optimized performance (Lighthouse 95+)
- Full responsive design
- WCAG 2.1 AA accessibility

Next Steps:
- Share on social media
- Notify community
- Monitor for issues
- Collect feedback

Thanks!
```

### Share on Social Media

```
🚀 The AGL token website is LIVE! 

Visit https://agunnayalabs.xyz to explore:
✨ Tokenomics Dashboard
📋 Team Page
📄 Whitepaper
💰 Staking Portal

Built with modern tech and optimized for performance.

#Crypto #Web3 #Blockchain #AGL
```

---

**Deployment Date:** [Insert Date]  
**Deployed By:** [Insert Name]  
**Version:** 1.0  
**Status:** ✅ LIVE
