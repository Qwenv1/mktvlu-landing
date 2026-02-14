# MKTVLU Landing Page — Replit Build Instructions

## Overview

Build a high-end landing page for **MKTVLU** (mktvlu.co), a product valuation platform for the secondary e-commerce market. The page should feel like a premium fintech/data product — think Bloomberg meets Apple. Dark theme, editorial typography, smooth scroll-triggered animations, and compelling content that communicates authority.

**Live product:** mktvlu.co (mobile web app with AI camera scanning + text search for used product valuations)

---

## Assets Provided

### Logo
The MKTVLU logo is an SVG globe inside crosshair brackets. Use the provided `mktvlu-logo.svg` file. It renders in white/light strokes on dark backgrounds. For the navbar wordmark, pair the SVG logo (32px) with "MKTVLU" in Inter 700, letter-spacing 1px.

```jsx
// Logo component
function Logo({ size = 32 }) {
  return (
    <div className="flex items-center gap-2">
      <img src="/mktvlu-logo.svg" alt="MKTVLU" width={size} height={size} className="opacity-85" />
      <span className="font-bold tracking-wider text-white/75" style={{ fontFamily: 'Inter', fontSize: 18 }}>MKTVLU</span>
    </div>
  );
}
```

### Animated AI Sphere
The provided `ParticleSphere.tsx` is a self-contained React canvas component that renders the morphing wireframe particle sphere — this is the same animation that runs during product scanning in the live app. It's the signature visual identity of MKTVLU.

```jsx
import ParticleSphere from '@/components/ParticleSphere';
// Usage:
<ParticleSphere size={400} className="mx-auto" />
```

**Where to use it:** In the Hero section background (large, low opacity, behind the text) and/or in the "How It Works" section as the visual for Step 2 (AI processing). Can also be used as a section divider decoration.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router) or plain React + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Google Fonts — `Instrument Serif` (display/headings, italic for emphasis) + `Inter` (body, 400/500/600/700)
- **Icons:** Lucide React
- **Deployment:** Replit (auto-deploy)

---

## Design System

### Colors
```
--bg: #000000 (pure black background)
--surface: #0a0a0a
--surface-2: #111111
--border: rgba(255, 255, 255, 0.06)
--border-hover: rgba(255, 255, 255, 0.12)
--white: #ffffff
--white-80: rgba(255, 255, 255, 0.8)
--white-60: rgba(255, 255, 255, 0.6)
--white-40: rgba(255, 255, 255, 0.4)
--white-20: rgba(255, 255, 255, 0.2)
--mint: #34D399 (primary accent — used sparingly for emphasis)
--mint-glow: rgba(52, 211, 153, 0.15)
```

### Typography Scale
- Hero headline: `Instrument Serif`, 72px desktop / 42px mobile, italic, letter-spacing: -2px
- Section headlines: `Instrument Serif`, 48px desktop / 32px mobile, italic
- Subheadings: `Inter`, 20px, weight 500
- Body: `Inter`, 16px, weight 400, line-height 1.7, color white-60
- Labels/Overlines: `Inter`, 11px, weight 600, letter-spacing 3px, uppercase, color white-40
- Captions: `Inter`, 13px, weight 400, color white-40

### Spacing
- Section padding: 120px vertical desktop, 80px mobile
- Max content width: 1200px, centered
- Component gap rhythm: 8, 16, 24, 32, 48, 64

### Animation Principles
- Use `framer-motion` for all scroll-triggered reveals
- Default entrance: fade up 30px, duration 0.6s, ease [0.25, 0.4, 0.25, 1]
- Stagger children by 0.08s
- Parallax on hero background elements (subtle, 0.1-0.2 rate)
- No animation on the first screen (hero loads immediately, no flash of blank content)
- Number counters: count up from 0 when scrolling into view

---

## Page Sections (Build Order)

### 1. Navigation Bar (Sticky)

Fixed top bar, transparent initially, gains `backdrop-filter: blur(20px)` + subtle border-bottom on scroll.

**Left:** MKTVLU wordmark (Inter, 700, 18px, letter-spacing 1px)
**Right:** Nav links: Technology, Product, Pricing (future) — Inter 13px weight 500, white-60, hover white. Final CTA button: "Launch App" — pill shape, mint background, black text, links to mktvlu.co

Mobile: hamburger menu (Lucide `Menu` icon), slides down with nav links.

---

### 2. Hero Section

The most important section. Must immediately communicate what MKTVLU is.

**Layout:**
- Overline pill: "Market Intelligence 2.0" — small rounded pill, mint border, mint text, centered
- Headline: large `Instrument Serif` italic. Text: `Bridging the` (white) + line break + `Information Gap.` (mint gradient: #34D399 to #6EE7B7, applied via background-clip text)
- Subtitle: 2 lines, Inter weight 400, white-60, max-width 500px, centered: "Smoothing market friction and eliminating dislocation. MKTVLU provides the ultimate lens to see through market noise and find true value."
- Two buttons centered: "Launch App" (mint bg, black text, arrow icon) + "Learn More" (transparent, white border, white text)

**Background — Animated Particle Sphere:**
Place the `<ParticleSphere size={500} />` component absolutely positioned behind the hero text, centered, with `opacity-[0.35]` and `pointer-events-none`. This creates the signature MKTVLU visual — the morphing AI wireframe globe rotating behind the headline. Add a subtle radial gradient overlay on top (black edges fading to transparent center) so the text remains crisp. The sphere should be slightly lower than center (offset 60px down) so it sits behind "Information Gap." text.

```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Sphere background */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(60px)' }}>
    <ParticleSphere size={500} className="opacity-35" />
  </div>
  {/* Radial fade overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
  {/* Content */}
  <div className="relative z-10 text-center px-6">
    {/* ...pill, headline, subtitle, buttons */}
  </div>
</section>
```

This is a key differentiator — most landing pages use static images. MKTVLU has a living, breathing AI visualization.

---

### 3. Problem Section — "The Market is Broken"

Communicates WHY MKTVLU exists using compelling data.

**Layout:**
- Overline: "THE PROBLEM"
- Headline: `Instrument Serif` italic — "The resale market is a $77B blind spot."
- Body paragraph (1-2 sentences): "Millions of transactions happen daily with no reliable price reference. Buyers overpay. Sellers underprice. Platforms lose velocity. Everyone loses."
- Below: 3 stat cards in a row (stack on mobile)

**Stat Cards** (glass-morphism style: bg rgba(255,255,255,0.03), border rgba(255,255,255,0.06), rounded-2xl, padding 32px):
1. `$77B` — "Secondhand market size" — with source caption "thredUP Resale Report"
2. `36.2M` — "New sellers entered in 2020 alone"
3. `0` — "Platforms offering unbiased cross-market pricing"

Numbers should count up when scrolled into view. The "0" has special emphasis — use mint color and slightly larger font.

---

### 4. Solution Section — "The MRP Primitive"

Explains the core product concept.

**Layout:**
- Overline: "THE SOLUTION"
- Headline: `Instrument Serif` italic — "One number. Every marketplace."
- Body: "The Market Reference Price (MRP) aggregates real-time and historical pricing across 10+ platforms, applies statistical filtering, and returns the true market value of any used product — adjusted for condition, configuration, and region."

**Visual:** A stylized product card mock showing:
- Product name: "iPhone 15 Pro Max · 256GB · Good"
- Large MRP number: "$987" in mint, Instrument Serif
- Below: price range bar showing Floor ($820) — MRP ($987) — Ceiling ($1,140)
- Small pills: "42 listings · 4 platforms · 94% confidence"
- Build this as an actual styled div (not an image) with a subtle glass background and border

This card should have a very slight float animation (translateY oscillating 4px over 4 seconds, ease-in-out, infinite).

---

### 5. How It Works — Visual Workflow

This is the key visual section. Show the product flow as an animated pipeline.

**Layout:**
- Overline: "HOW IT WORKS"
- Headline: `Instrument Serif` italic — "Point. Scan. Know."

**Visual Workflow Pipeline:**
Build a horizontal pipeline (vertical on mobile) showing 4 stages connected by animated flowing lines. Each stage is a card with icon, title, and description. Between each card, draw a connector line with animated dots flowing left-to-right (CSS `@keyframes` — a small mint dot moves along the line every 2s).

```
[Capture] -----> [Identify] -----> [Aggregate] -----> [Valuate]
```

**Stage 1 — Capture**
- Icon: Camera (Lucide)
- Title: "Scan Any Product"
- Description: "Point your camera at any product — electronics, watches, furniture, anything."
- Visual: Mock phone frame outline (CSS border, rounded) with crosshair brackets inside (matching the MKTVLU logo brackets). Subtle pulse animation on the brackets.

**Stage 2 — Identify**
- Icon: Cpu / Brain (Lucide)
- Title: "AI Identifies It"
- Description: "Claude Vision AI recognizes brand, model, storage, color, and condition from a single photo."
- Visual: **Place a `<ParticleSphere size={180} />` here** — this is the actual animation that runs during identification in the live app. Add a label below: "AI Processing" with a simulated typing animation cycling through: "Identifying product...", "Matching configuration...", "Analyzing condition..."

**Stage 3 — Aggregate**
- Icon: Search (Lucide)
- Title: "Search Every Marketplace"
- Description: "Real-time data from eBay, Facebook Marketplace, Swappa, Craigslist, Kijiji, OfferUp, and retail sources."
- Visual: 6 small platform pill badges stacking/fanning in with staggered animation (eBay, Facebook, Swappa, Craigslist, Kijiji, OfferUp). Each pill has a subtle glass background.

**Stage 4 — Valuate**
- Icon: Target / CheckCircle (Lucide)
- Title: "Get Your MRP"
- Description: "Receive a statistically filtered Market Reference Price with confidence score, range, and deal assessment."
- Visual: Animated MRP result — a number counting up from $0 to $987 (use the CountUp component), with "94% confidence" fading in below after the count finishes.

**Connector Lines:**
Between each stage card, draw a horizontal line (1px, white-10). On top of the line, animate a small mint dot (6px circle, glow) that travels from left to right every 3s:

```css
@keyframes flowDot {
  0% { left: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
```

On mobile, stack the stages vertically with vertical connector lines and downward-flowing dots.

**Stagger animation:** Each stage card fades in 0.2s after the previous one as you scroll into view, creating a left-to-right reveal that matches the data flow direction.

---

### 6. Features Grid

**Layout:**
- Overline: "CAPABILITIES"
- Headline: `Instrument Serif` italic — "Built for the resale economy."
- 2x3 grid of feature cards (2x2 then 1x2 on mobile, or stack to 1-column)

**Feature Cards** (glass style, padding 32px, rounded-2xl):
1. **AI Camera Scanning** — "Point at any product. Our vision AI identifies brand, model, configuration, and condition from a single photo."
2. **Cross-Platform Pricing** — "Aggregates listings from eBay, Facebook Marketplace, Swappa, Craigslist, Kijiji, OfferUp, and more."
3. **Statistical Filtering** — "MAD outlier removal, condition adjustment, and time-decay weighting ensure the MRP reflects true market value."
4. **Negotiation Mode** — "Generate data-backed counter-offers. Choose your strategy — friendly, firm, or data-driven — and share directly."
5. **Price DNA Scoring** — "Multi-axis radar showing confidence, stability, liquidity, demand, retention, and overall value score."
6. **Browser Extension** (Coming Soon badge) — "See real-time MRP overlays while browsing Facebook Marketplace, eBay, and Craigslist."

Each card has a Lucide icon in a rounded square with mint-glow bg.

---

### 7. Who It's For

**Layout:**
- Overline: "USE CASES"
- Headline: `Instrument Serif` italic — "For everyone in the market."
- 3 persona cards side by side (stack on mobile)

**Persona Cards:**
1. **Buyers** — "Know the real price before you buy. Stop overpaying on Facebook Marketplace."
2. **Sellers** — "Price competitively. List at the optimal price to sell faster."
3. **Platforms** (Future) — "Add pricing legitimacy to your listings. Increase transaction velocity with the 'Avg Price Verified' badge."

Style: each card has a top accent line (1px, mint for Buyers, blue for Sellers, purple for Platforms), large persona label, description text.

---

### 8. Technology Section

**Layout:**
- Overline: "UNDER THE HOOD"
- Headline: `Instrument Serif` italic — "Intelligence layers, not just data."
- Body: "MKTVLU's pricing engine combines computer vision, real-time web aggregation, and statistical analysis into a single API call."

**Tech Stack visual:** A horizontal pipeline diagram built with styled divs:
`Camera Input` → `Claude Vision AI` → `Multi-Platform Search` → `MAD Filtering` → `MRP Output`

Each node: rounded pill with icon + label, connected by thin lines with animated dots moving along them (CSS animation, 3s loop). Nodes stagger-reveal on scroll.

Below the pipeline, show 3 technical detail cards:
1. **Evidence Selection** — "Sold prices weighted over asking prices. Region-adjusted. Time-decayed with 30-day half-life."
2. **Outlier Removal** — "Median Absolute Deviation filtering removes statistical anomalies, fraud listings, and miscategorized items."
3. **Confidence Scoring** — "0-100 score based on evidence count, source diversity, price consistency, and data recency."

---

### 9. Roadmap / Vision

**Layout:**
- Overline: "VISION"
- Headline: `Instrument Serif` italic — "The Bloomberg Terminal for physical goods."
- Body: "MKTVLU is building the independent price reference layer for the global resale economy."

**Timeline:** Vertical timeline with 5 phases, each with a dot (filled if current/past, outlined if future):
1. **Phase 1 — Foundation** (Active, mint dot): "AI camera valuation + text search. Real-time MRP. Mobile web app."
2. **Phase 2 — Expansion**: "Browser extension. Price tracking + alerts. Trend history."
3. **Phase 3 — Intelligence**: "Pro subscription. Seller optimization engine. Enhanced analytics."
4. **Phase 4 — Platform**: "B2B API. Avg Price Verified badge licensing. Data licensing."
5. **Phase 5 — Scale**: "Cross-asset classes. Vehicle + real estate pricing. MRP Index reporting."

Active phase has a glow effect. Future phases are dimmer (white-20).

---

### 10. CTA Section

**Layout:**
- Full-width section with centered content
- Headline: `Instrument Serif` italic — "Know what anything is worth."
- Subtitle: "Available now on mobile web. Point your camera and get instant valuations."
- Single CTA button: "Launch MKTVLU" — large, mint bg, black text, links to mktvlu.co
- Below button: small text "Free to use. No account required."

Background: subtle radial mint glow behind the CTA (matching hero treatment).

---

### 11. Footer

**Layout:**
- Top border: 1px rgba(255,255,255,0.06)
- Left: MKTVLU wordmark
- Center: Nav links — Technology, Privacy, Brand Kit
- Right: Social icons — X (twitter) linking to x.com/mktvlu, Instagram linking to instagram.com/mktvlu
- Below: Tagline centered — "INTELLIGENCE LAYERS FOR THE GLOBAL ECONOMY." — 9px, letter-spacing 3px, white-20
- Copyright: "2026 MKTVLU. All rights reserved." — 11px, white-20

---

## Animation Specification

Use Framer Motion's `useInView` hook or `whileInView` prop for all scroll-triggered animations.

```jsx
// Standard reveal pattern for all sections
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

// Stagger container
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

// Number count-up (for stats)
// Use a custom hook that animates from 0 to target when in view
```

**Page load:** Hero is visible immediately (no entrance animation — it's the first thing seen). Everything below the fold animates in on scroll.

**Scroll behavior:** `scroll-behavior: smooth` on html. Sections have generous padding so content doesn't crowd.

**Hover states:** Cards lift slightly (translateY -2px) with increased border opacity. Buttons scale 0.97 on press. Links lighten on hover.

---

## Responsive Breakpoints

- Desktop: 1200px+ (full grid layouts)
- Tablet: 768px-1199px (2-col grids become 2-col, reduce padding)
- Mobile: <768px (single column, reduce font sizes, stack everything)

Hero headline: 72px → 48px → 36px
Section headlines: 48px → 36px → 28px
Section padding: 120px → 80px → 64px

---

## Key Content Points (Use These Exact Phrases)

- **Tagline:** "Intelligence layers for the global economy."
- **Hero:** "Bridging the Information Gap."
- **Mission:** "Empower users with accurate, real-time valuation of any product."
- **Vision:** "The resale market's price match guarantee."
- **Verb:** "VALU-ME" — the action of obtaining a reference price using MKTVLU
- **Positioning:** "MKTVLU is not a resale platform. It is the reference price layer of the resale economy."
- **Market size:** $77B secondhand market, 5.4x growth projected over 5 years
- **New entrants:** 36.2M first-time sellers + 33M first-time buyers in 2020
- **Product scope:** Electronics, watches, furniture, appliances, tools, sporting goods
- **Data sources:** eBay, Facebook Marketplace, Swappa, Craigslist, Kijiji, OfferUp, Amazon, Best Buy
- **Key differentiator:** Independent, unbiased, cross-platform — not tied to any single marketplace

---

## Social Links

- X / Twitter: https://x.com/mktvlu
- Instagram: https://instagram.com/mktvlu
- Product: https://mktvlu.co

---

## Quality Checklist

Before shipping:
- [ ] Lighthouse performance score > 90
- [ ] All animations are 60fps (use transform/opacity only)
- [ ] Mobile responsive at 375px width
- [ ] All links work (mktvlu.co, social links)
- [ ] No horizontal scroll on any viewport
- [ ] Fonts loaded (Instrument Serif + Inter from Google Fonts)
- [ ] Dark theme consistent (no white flashes)
- [ ] Meta tags: title "MKTVLU — Market Intelligence for the Resale Economy", description, og:image
- [ ] Favicon (use a simple green circle or the MKTVLU wordmark)

---

## File Structure (Suggested)

```
public/
  mktvlu-logo.svg       (provided — globe + crosshair logo)
src/
  app/
    layout.tsx           (fonts, metadata, global styles)
    page.tsx             (all sections composed here)
    globals.css          (Tailwind + custom properties + @keyframes flowDot)
  components/
    Navbar.tsx
    Hero.tsx             (includes ParticleSphere as background)
    Problem.tsx
    Solution.tsx
    HowItWorks.tsx       (visual workflow pipeline with sphere + flow dots)
    Features.tsx
    Personas.tsx
    Technology.tsx
    Roadmap.tsx
    CTA.tsx
    Footer.tsx
    ParticleSphere.tsx   (provided — animated canvas component)
    ui/
      CountUp.tsx        (animated number counter)
      SectionLabel.tsx   (overline pill component)
      GlassCard.tsx      (reusable glass-morphism card)
      FlowConnector.tsx  (animated dot connector between workflow stages)
```

---

## Implementation Notes for Replit

1. Create a new Next.js project in Replit
2. Install dependencies: `framer-motion`, `lucide-react`
3. Add Google Fonts in `layout.tsx` using `next/font/google`
4. Build sections top-to-bottom following the order above
5. Test on mobile viewport (375px) throughout — this is a mobile-first product
6. Deploy via Replit's built-in hosting

**Domain:** If you want to connect a custom domain (e.g., about.mktvlu.co), configure it in Replit's deployment settings and add a CNAME record in your DNS provider.
