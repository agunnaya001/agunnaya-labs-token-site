# Agunnaya Labs - Brand Guidelines

## Brand Identity

### Core Values
- **Innovation**: Next-generation Web3 and GameFi solutions
- **Transparency**: Open-source, verifiable smart contracts
- **Community**: Decentralized, user-driven ecosystem
- **Security**: Audited contracts and verified code
- **Performance**: Optimized for speed and efficiency

---

## Visual Identity

### Logo & Lockup

#### Primary Logo
- **Format**: SVG (scalable) and PNG (raster)
- **File**: `/public/agl-logo.svg` | `/public/agl-logo.png`
- **Usage**: Website header, favicon, social profiles
- **Minimum Size**: 32x32px for favicon, 64x64px for social
- **Background**: Works on dark and light backgrounds

#### Logo Variations
1. **Full Lockup**: "AGL" text + geometric "A" symbol (Navbar)
2. **Symbol Only**: Geometric "A" shape (Favicon, App Icon)
3. **Wordmark**: "Agunnaya Labs" text logo (Documents)

#### Logo Spacing (Clearspace)
- Minimum clearspace around logo: 1/4 of logo height
- Never overlap logo with other elements
- Always maintain readable aspect ratio

---

## Color System

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Neon Green** | `#39FF14` | (57, 255, 20) | Primary accent, CTAs, highlights |
| **Dark Base** | `#0f0f0f` | (15, 15, 15) | Primary background (dark mode) |
| **Light Base** | `#f9f7f4` | (249, 247, 244) | Primary background (light mode) |

### Secondary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Charcoal** | `#1a1a1a` | (26, 26, 26) | Text (dark mode) |
| **Off-White** | `#f5f5f5` | (245, 245, 245) | Text (light mode) |
| **Warm Gray** | `#e6e0d9` | (230, 224, 217) | Borders (light) |
| **Dark Gray** | `#2a2a2a` | (42, 42, 42) | Borders (dark) |
| **Cyan** | `#00d4ff` | (0, 212, 255) | Secondary accent |
| **Purple** | `#9d4edd` | (157, 78, 221) | Tertiary accent |

### Accessibility
- Neon Green (#39FF14) on Dark (#0f0f0f): **17:1 contrast ratio** ✅
- All color combinations meet WCAG AA+ standards
- Never rely on color alone to convey information

---

## Typography

### Font Family
- **Display & Headings**: Inter (System Sans-Serif)
- **Body Text**: Inter (System Sans-Serif)
- **Monospace**: Geist Mono (code, contracts, addresses)

### Type Hierarchy

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| **H1** | 48-60px | 700 Bold | Page titles, hero headings |
| **H2** | 36-48px | 700 Bold | Section titles |
| **H3** | 24-28px | 600 Semi-Bold | Subsection titles |
| **H4** | 18-20px | 600 Semi-Bold | Card titles |
| **Body** | 16px | 400 Regular | Main content |
| **Small** | 14px | 400 Regular | Secondary text |
| **Caption** | 12px | 400 Regular | Labels, helper text |
| **Code** | 14px | 500 Medium | Smart contract code |

### Line Height
- **Headings**: 1.2-1.3
- **Body**: 1.5-1.6 (leading-relaxed)
- **Code**: 1.6

### Letter Spacing
- **Headings**: -0.02em (tight)
- **Body**: 0px (normal)
- **All Caps**: 0.05em (tracking)

---

## Design System

### Layout & Spacing

**Spacing Scale (in px)**
```
4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128
```

**Container Widths**
- Mobile: 100% - 24px padding (full width - 12px sides)
- Tablet: 728px
- Desktop: 1024px
- Wide: 1280px

**Grid System**
- 12-column grid on desktop
- 6-column grid on tablet
- 2-column grid on mobile
- 16px gutter spacing

### Buttons

#### Primary Button (CTA)
- Background: Neon Green (#39FF14)
- Text: Dark (#0f0f0f) - Bold weight
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Opacity 90%, shadow-lg
- Active: Scale 95%

#### Secondary Button
- Background: Dark Gray (#2a2a2a)
- Text: Off-White (#f5f5f5)
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Opacity 80%
- Active: Scale 95%

#### Ghost Button
- Background: Transparent
- Border: 1px Neon Green (#39FF14)
- Text: Neon Green (#39FF14)
- Hover: Background #39FF14, text dark

### Cards & Containers

**Card Component**
- Background: `bg-card` (secondary color)
- Border: 1px solid `border` color
- Padding: 24px
- Border Radius: 12px
- Box Shadow: 0 2px 4px rgba(0,0,0,0.1)

**Input Fields**
- Background: Dark background
- Border: 1px solid border color
- Padding: 12px 16px
- Border Radius: 8px
- Focus: Border color → Neon Green, outline none

---

## Components

### Navigation Bar
- **Height**: 64px (mobile), 80px (desktop)
- **Logo Size**: 32x32px (mobile), 40x40px (desktop)
- **Fixed**: Sticky top with blur backdrop
- **Colors**: Dark background with border
- **Actions**: "Buy AGL" button on right

### Hero Section
- **Min Height**: 500px (mobile), 600px (desktop)
- **Background**: Gradient or solid dark
- **Content Width**: Constrained to container-wide (1280px)
- **CTA Buttons**: Primary + Secondary variants

### Footer
- **Background**: Secondary color
- **Padding**: 48px (mobile), 64px (desktop)
- **Columns**: 1 (mobile), 3 (desktop)
- **Border Top**: 1px solid border
- **Link Hover**: Color → Neon Green

### Forms
- **Label**: 14px, 600 weight, 8px below input
- **Input**: 16px body text, 12px padding
- **Error**: Red text below input (#ff3333)
- **Success**: Green text below input (#39FF14)

---

## Imagery & Photography

### Photography Style
- **Tone**: Modern, minimalist, tech-forward
- **Subjects**: Code, blockchain, circuits, gaming, community
- **Colors**: Integrate neon green accents
- **Quality**: High resolution (2x size for retina)

### Illustrations
- **Style**: Minimalist geometric, cyberpunk aesthetic
- **Colors**: Neon green primary, cyan secondary, dark backgrounds
- **Consistency**: Use consistent line weight and corner radius

### Image Assets

| Asset | Dimensions | Format | Usage |
|-------|-----------|--------|-------|
| **Logo** | 256x256 | SVG/PNG | All uses |
| **Favicon** | 64x64 | PNG | Browser tab |
| **App Icon** | 180x180 | PNG | Mobile home screen |
| **OG Image** | 1200x630 | PNG | Social sharing |
| **Social Banner** | 1200x600 | PNG | Twitter, LinkedIn |
| **Hero Banner** | 1920x1080 | PNG | Page headers |

---

## Web & Digital

### Typography on Web
- **Font Loading**: System fonts first (performance)
- **Font Size**: 16px minimum for body text (accessibility)
- **Line Height**: 1.5-1.6 for readability
- **Color Contrast**: Min 4.5:1 for normal text, 3:1 for large text

### Icons
- **Set**: SF Symbols, Heroicons, or custom SVG
- **Size**: 16px, 20px, 24px, 32px (multiples of 4)
- **Color**: Inherit from text color or Neon Green
- **Stroke Width**: 2px for consistency

### Animations
- **Duration**: 200-400ms for micro-interactions
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) (ease-in-out)
- **Hover**: Subtle opacity or color changes
- **Loading**: Shimmer or pulse effects
- **Transitions**: Never animate layout (layout shift)

---

## Social Media

### Profile Images
- **Platform**: Twitter, LinkedIn, Discord, Telegram
- **Image**: 256x256px minimum (1200x1200 preferred)
- **Format**: PNG with transparent background
- **Content**: Logo or branded mark

### Post Templates
- **Dimensions**: 1200x630px (16:9 ratio)
- **Design**: Include Neon Green accent, logo, clear text hierarchy
- **Typography**: Large bold headlines, supporting text
- **Brand Elements**: Logo, color scheme, consistent style

### Hashtag Strategy
```
Primary: #AgunnayaLabs #AGL #Base #GameFi #DeFi
Secondary: #Web3 #Crypto #OnchainGaming #BaseEcosystem
Trending: #TradingCrypto #TokenLaunch #DeFiYield
```

---

## Applications & Asset Files

### File Locations
```
public/
  ├── agl-logo.svg              # Primary logo (scalable)
  ├── agl-logo.png              # Logo (raster, 256x256)
  ├── favicon.ico.png           # Browser tab icon
  ├── app-icon.png              # Mobile home screen
  ├── social-banner.png         # Twitter/social sharing
  ├── og-image.png              # Open Graph social preview
  ├── images/
  │   ├── agl-logo-neon.png     # Neon variant
  │   ├── og-image.png          # Social sharing backup
  │   └── hero-banner.png       # Page header image
  └── robots.txt                # SEO optimization
```

### Export Settings

**SVG**
- Optimize for web (remove unnecessary code)
- Embed colors (no external references)
- Set viewBox for scaling

**PNG**
- 8-bit PNG with transparency
- Optimize with ImageOptim or similar
- No color profile (sRGB only)

**Favicon**
- ICO format for legacy browsers
- PNG 32x32, 64x64, 128x128
- Include dark and light variants

---

## Brand Voice & Tone

### Tone of Voice
- **Technical but Accessible**: Explain complex concepts simply
- **Confident**: Showcase leadership in Web3/GameFi
- **Community-Driven**: Emphasize user ownership and governance
- **Forward-Thinking**: Focus on innovation and future vision

### Language
- **Avoid**: Corporate jargon, unnecessary complexity
- **Embrace**: Clear explanations, action-oriented language, community focus
- **Keywords**: Token, staking, rewards, decentralized, governance, ecosystem

### Examples

**Website Copy**
> "AGL is the native utility and governance token of Agunnaya Labs, powering our GameFi and DeFi ecosystem built on Base."

**Social Media**
> "Stake AGL, earn rewards, and help shape the future of gaming and finance. 🚀 #Web3 #Base"

**Calls to Action**
- "Buy AGL on Uniswap"
- "Start Staking Now"
- "Explore the Ecosystem"
- "Join the Community"

---

## Compliance & Legal

### Usage Rights
- All brand assets are owned by Agunnaya Labs
- Third parties may use logo for community purposes with permission
- Always link back to official website: agunnayalabs.xyz

### Trademark Notices
- ™ after first use: "Agunnaya Labs™"
- ® for registered marks (if applicable)
- Include: "© 2024 Agunnaya Labs. All rights reserved."

### Privacy & Security
- Never share unfinished designs publicly
- Keep high-resolution files in secure repository
- Watermark confidential mockups

---

## Brand Checklist

### For Marketing Materials
- [ ] Logo is correct size and spacing
- [ ] Colors match brand palette (not approximations)
- [ ] Typography follows hierarchy guidelines
- [ ] Text is clear and legible on background
- [ ] Neon Green (#39FF14) is primary accent
- [ ] Dark background respects brand aesthetic
- [ ] Imagery is high-quality and on-brand
- [ ] Links use proper web colors (underlined if not obvious)
- [ ] Contact info is current and verified
- [ ] Legal disclaimers are included

### For Website
- [ ] Logo renders in navbar without errors
- [ ] All images are optimized for web
- [ ] Favicon displays in browser tabs
- [ ] OG image is correct for social sharing
- [ ] Color contrast meets WCAG AA+ standards
- [ ] Typography hierarchy is clear
- [ ] Mobile responsive layout works
- [ ] All brand assets load without 404 errors
- [ ] Footer includes copyright and legal links

---

## Contact & Support

For branding inquiries or permission to use Agunnaya Labs assets:
- **Email**: contact@agunnayalabs.xyz
- **Website**: https://www.agunnayalabs.xyz
- **GitHub**: https://github.com/agunnaya001

---

**Last Updated**: January 2024 | Version 1.0
