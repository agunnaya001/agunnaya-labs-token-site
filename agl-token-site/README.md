# AGL Token Landing Page

A modern, fully functional Next.js 14 landing page for Agunnaya Labs Token (AGL) on Base mainnet. Built with raw EIP-1193 wallet integration, direct RPC calls, and a cyberpunk dark aesthetic.

## 🚀 Features

### Pages
- **Home** (`/`) - Hero section with live market data and tokenomics
- **Stake** (`/stake`) - Interactive staking interface with APY calculator
- **About** (`/about`) - Project info, smart contract details, FAQ

### Wallet Integration
- **Raw EIP-1193** - No external Web3 libraries (wagmi, ethers.js, viem)
- **Auto-switch** - Automatically switches to Base mainnet (ChainID: 8453)
- **Account Management** - Connect, view balance, disconnect
- **Event Listening** - Real-time account and chain change detection

### Smart Contract Interaction
- **Raw eth_call** - Direct RPC calls to Base mainnet
- **Contract Reading** - Live token stats (supply, symbol, decimals)
- **No ABI parsing** - Pure hex encoding/decoding
- **Base RPC**: `https://mainnet.base.org`

### Live Data
- **Price Data** - DexScreener API integration (AGL/USD, 24h volume, liquidity)
- **Token Stats** - Total supply, token info from smart contract
- **Staking Calculator** - Real-time APY breakdown (daily/weekly/monthly/yearly)

### Design
- **Dark Cyberpunk Aesthetic**
  - Background: `#0a0a0f` (deep black)
  - Accent: `#39FF14` (acid green)
  - Typography: Bebas Neue (display), DM Sans (body), DM Mono (numbers)
  - Glowing effects, grid patterns, smooth transitions

- **Responsive** - Mobile-first design, works on all devices
- **CSS Modules** - Scoped styling, no global conflicts
- **Accessible** - Semantic HTML, ARIA attributes, keyboard navigation

### Staking Tiers
1. **Flexible** - 12% APY, no lock-in
2. **30-Day** - 20% APY, 30-day lock
3. **60-Day** - 35% APY, 60-day lock
4. **90-Day** - 50% APY, 90-day lock

## 📋 Project Structure

```
agl-token-site/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Home page
│   ├── page.module.css     # Home styles
│   ├── globals.css         # Global styles
│   ├── stake/
│   │   ├── page.tsx        # Stake page
│   │   └── page.module.css # Stake styles
│   └── about/
│       ├── page.tsx        # About page
│       └── page.module.css # About styles
├── components/
│   ├── Wallet.tsx          # Wallet connector
│   ├── Wallet.module.css
│   ├── PriceDisplay.tsx    # Live price component
│   ├── PriceDisplay.module.css
│   ├── TokenomicsChart.tsx # Token distribution chart
│   ├── TokenomicsChart.module.css
│   ├── StakingTier.tsx     # Staking tier selector
│   └── StakingTier.module.css
├── lib/
│   ├── web3.ts            # Raw EIP-1193 utilities
│   ├── contracts.ts       # Smart contract interactions
│   ├── price.ts           # DexScreener API integration
│   └── types.ts           # TypeScript type definitions
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Environment Configuration

### Base Mainnet RPC
```typescript
const BASE_RPC_URL = 'https://mainnet.base.org';
const BASE_CHAIN_ID = 8453;
```

### AGL Contract Address
```typescript
const AGL_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698';
```

### DexScreener API
```typescript
const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex/tokens';
```

## 💻 Web3 Integration

### Connect Wallet
```typescript
import { connectWallet } from '@/lib/web3';

const address = await connectWallet();
// Auto-switches to Base mainnet
```

### Raw eth_call Example
```typescript
import { ethCall, ERC20_ABI } from '@/lib/web3';

const result = await ethCall(
  contractAddress,
  ERC20_ABI.balanceOf,
  'latest'
);
```

### Get Token Stats
```typescript
import { getAGLTokenStats } from '@/lib/contracts';

const stats = await getAGLTokenStats();
// Returns: { symbol, decimals, totalSupply, totalSupplyFormatted }
```

### Get Live Price
```typescript
import { getAGLPrice } from '@/lib/price';

const price = await getAGLPrice();
// Returns: { priceUsd, priceChange24h, liquidity, volume24h, marketCap, fdv }
```

## 🎨 Styling

### CSS Variables
```css
--bg-primary: #0a0a0f
--accent: #39FF14
--text-primary: #ffffff
--text-secondary: #b0b0b8
--border: #2a2a32
```

### Utility Classes
- `.glow` - Adds green glow effect
- `.accent-text` - Green accent color
- `.accent-glow` - Text glow with accent
- `.grid-lines` - Background grid pattern
- `.fade-in` - Fade in animation
- `.slide-in` - Slide in animation

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   git add .
   git commit -m "Initial commit: AGL token landing page"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your repository
   - Click "Deploy"
   - Visit your live site

3. **Domain Setup**
   - Go to Vercel project settings
   - Add domain: `agunnayalabs.xyz`
   - Update DNS records with Vercel nameservers

### Environment Variables (Optional)
None required - all APIs are public.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires a Web3 wallet with EIP-1193 support:
- MetaMask
- Brave Wallet
- Trust Wallet
- Coinbase Wallet
- And others...

## 🔒 Security Considerations

- ✅ No private keys handled
- ✅ No external Web3 libraries (reduced attack surface)
- ✅ Raw RPC calls to Base mainnet
- ✅ HTTPS only (enforced by Vercel)
- ✅ No backend - purely frontend
- ✅ Smart contracts are read-only

## 📊 Contract Interaction

### Supported Operations
- ✅ Get token balance
- ✅ Get total supply
- ✅ Get decimals
- ✅ Get symbol
- ⚠️ No write operations (frontend only)

### RPC Methods Used
- `eth_call` - Read contract state
- `eth_requestAccounts` - Connect wallet
- `eth_accounts` - Get connected accounts
- `eth_chainId` - Get current chain
- `eth_getBalance` - Get ETH balance
- `wallet_switchEthereumChain` - Switch network
- `wallet_addEthereumChain` - Add network

## 🐛 Troubleshooting

### Wallet Not Detected
- Install MetaMask or compatible wallet
- Ensure you're on a supported browser
- Check that wallet extension is enabled

### Wrong Network
- Wallet will auto-switch to Base when connecting
- If not, manually switch in MetaMask settings
- Network: Base Mainnet, ChainID: 8453

### Price Data Not Loading
- Check DexScreener API status
- AGL must have active trading pairs
- API has 1-minute cache

### Build Errors
- Delete `.next` folder and `node_modules`
- Run `npm install` and `npm run build` again
- Ensure Node.js 18+ is installed

## 📚 Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Fonts**: Google Fonts (Bebas Neue, DM Sans, DM Mono)
- **APIs**: 
  - Base RPC (mainnet.base.org)
  - DexScreener
- **Wallet**: EIP-1193 (native browser Web3)
- **Deployment**: Vercel

## 📝 License

MIT License - Feel free to use, modify, and deploy.

## 🔗 Links

- **Contract**: https://basescan.org/token/0xEA1221B4d80A89BD8C75248Fae7c176BD1854698
- **Base Blockchain**: https://base.org
- **DexScreener**: https://dexscreener.com/base/agl
- **Vercel**: https://vercel.com

## 💬 Support

For issues or questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review the code comments in `lib/` files
3. Consult the component JSDoc comments
4. Check Base mainnet RPC documentation

---

**Built with ❤️ on Base mainnet**
