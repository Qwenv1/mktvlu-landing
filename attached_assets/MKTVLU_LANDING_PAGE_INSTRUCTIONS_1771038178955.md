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
The provided `ParticleSphere.tsx` is a self-contained React canvas component that renders the morphing wireframe particle sphere with revolving feature text and mouse/touch interactivity — this is the same animation that runs during product scanning in the live app. It's the signature visual identity of MKTVLU.

```jsx
import ParticleSphere from '@/components/ParticleSphere';

// Full featured — sphere + revolving text + interactive
<ParticleSphere size={400} interactive showText />

// Hero background — larger, no text, still interactive
<ParticleSphere size={500} interactive showText={false} className="opacity-35" />

// Small decorative — no interaction, no text
<ParticleSphere size={180} interactive={false} showText={false} />
```

**Props:**
- `size` (number, default 400) — pixel width/height
- `interactive` (boolean, default true) — sphere tilts toward mouse/finger position, smoothly lerps back to auto-rotation when released
- `showText` (boolean, default true) — shows revolving mint text around the sphere orbit, cycling through product features: "Scanning Product...", "AI Vision Processing", "Cross-Platform Search", "Aggregating Prices", "Statistical Filtering", "Calculating MRP", "Condition Assessment", "VLU Certified", "Price DNA Analysis", "Market Intelligence". Text types out character-by-character with a blinking cursor, then fades as the next phrase starts. A glowing mint dot leads the text orbit.

**Where to use it:**
- **Hero background:** `size={500} interactive showText={false} className="opacity-35"` — large, subtle, behind text
- **How It Works Step 2:** `size={180} interactive={false} showText={false}` — small, decorative
- **Standalone showcase:** `size={400} interactive showText` — full experience, let visitors play with it

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
--bg: #0a0a0a (gradient dark — NOT pure black)
--bg-elevated: #111111
--surface: rgba(255, 255, 255, 0.03)
--surface-hover: rgba(255, 255, 255, 0.06)
--border: rgba(255, 255, 255, 0.08)
--border-hover: rgba(255, 255, 255, 0.15)
--white: #ffffff
--white-80: rgba(255, 255, 255, 0.8)
--white-60: rgba(255, 255, 255, 0.6)
--white-40: rgba(255, 255, 255, 0.4)
--white-20: rgba(255, 255, 255, 0.2)
--mint: #34D399 (primary accent — used sparingly for emphasis)
--mint-glow: rgba(52, 211, 153, 0.15)
```

Background is NOT pure black — use `#0a0a0a` with a very subtle radial gradient at the body level: `radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.03) 0%, #0a0a0a 70%)`. This gives the page a living, breathing feel rather than flat black.

### Liquid Glass Design Language

All cards, panels, and interactive surfaces use a consistent glass-morphism treatment. This is the signature visual layer across the entire page:

**Glass Card (primary surface):**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.05) inset,
    0 4px 24px rgba(0, 0, 0, 0.3);
}
```

**Glass Card Hover:**
```css
.glass-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.08) inset,
    0 8px 32px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}
```

**Glass Pill (badges, labels, nav items):**
```css
.glass-pill {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  padding: 6px 16px;
}
```

**Glass Nav (sticky header on scroll):**
```css
.glass-nav {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Mint Glass (accent variant — for VLU Certified badge, active states):**
```css
.glass-mint {
  background: rgba(52, 211, 153, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(52, 211, 153, 0.15);
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.05);
}
```

**Key principles:**
- Every card and surface is glass — no solid backgrounds anywhere except body
- Borders are always translucent white, never solid
- Inner glow (inset box-shadow) creates the "light catching the edge" effect
- Depth comes from layered blur + shadow, not from color contrast
- On hover, glass gets slightly brighter (more opaque) and lifts slightly
- The particle sphere bleeds through glass panels — this is intentional and beautiful

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

Fixed top bar, transparent initially, transitions to `glass-nav` style on scroll (backdrop blur + border).

**Left:** MKTVLU logo (svg, 28px) + wordmark (Inter, 700, 18px, letter-spacing 1px). Clicking scrolls to top.
**Right:** Nav links + CTA button

**Nav Links (scroll-to anchors):**
- **Product** → smooth scrolls to `#product` (the Solution + VLU Certified sections)
- **Technology** → smooth scrolls to `#technology` (the Tech pipeline section)
- **Pricing** → opens a modal/bottom sheet overlay (see Pricing Modal spec below)
- **"Launch App"** → pill button, mint bg, black text, links to `https://mktvlu.co`

Link style: Inter 13px weight 500, white-60, hover white with 0.15s transition. Active link (currently scrolled to that section) gets white color + subtle underline.

```jsx
// Smooth scroll handler
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
```

**Mobile:** Hamburger menu (Lucide `Menu` icon). Opens a full-height glass overlay sliding down from top with nav links stacked vertically, large touch targets (48px height each). Close button (Lucide `X`) top right.

**Pricing Modal:**
Triggered by clicking "Pricing" in the nav. Renders as a centered modal with glass-card backdrop overlay.

```
┌────────────────────────────────────────┐
│               Pricing                   │
│         Coming Soon                     │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │  Free     │  │  Pro      │  │ API    ││
│  │           │  │           │  │        ││
│  │ Camera    │  │ Everything│  │ B2B    ││
│  │ scanning  │  │ in Free + │  │ pricing││
│  │ Text      │  │ Analytics │  │ badge  ││
│  │ search    │  │ Tracking  │  │ data   ││
│  │ MRP       │  │ Alerts    │  │ feeds  ││
│  │ results   │  │ Export    │  │        ││
│  │           │  │           │  │        ││
│  │ $0        │  │ TBD/mo    │  │ Custom ││
│  │           │  │           │  │        ││
│  │ [Current] │  │ [Notify]  │  │[Contact││
│  └──────────┘  └──────────┘  └────────┘│
│                                         │
│  "Get notified when Pro launches"       │
│  [email input] [Subscribe]              │
└────────────────────────────────────────┘
```

**Pricing Modal Implementation:**
```jsx
// Modal overlay
<AnimatePresence>
  {pricingOpen && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPricingOpen(false)} />
      {/* Modal */}
      <motion.div
        className="relative glass-card max-w-3xl w-full p-8 max-h-[85vh] overflow-y-auto"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
      >
        {/* Close button */}
        <button onClick={() => setPricingOpen(false)} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-white/40 hover:text-white" />
        </button>
        {/* Content: title, 3 tier cards, email signup */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

**Three tier cards** inside the modal (all glass-card style):

1. **Free** (current plan, active indicator with mint dot)
   - AI camera scanning
   - Text search
   - Full MRP results
   - VLU Certified badge
   - Price: **$0**
   - Button: "Current Plan" (disabled, mint outline)

2. **Pro** (coming soon, glass-mint card variant)
   - Everything in Free
   - Advanced analytics (volatility, liquidity)
   - Price tracking + alerts
   - Historical price charts
   - Export data
   - Negotiation insights
   - Price: **TBD/mo**
   - Button: "Get Notified" (mint bg)

3. **API** (coming soon)
   - B2B pricing engine access
   - VLU Certified badge licensing
   - Bulk valuation endpoints
   - Data feeds
   - Custom integrations
   - Price: **Custom**
   - Button: "Contact Us" (white outline)

Below the cards: email signup row — glass-pill input + "Subscribe" mint button. Label: "Get notified when Pro launches."

Mobile: tier cards stack to single column, modal becomes full-screen sheet sliding up from bottom.

---

### 2. Hero Section

The most important section. Must immediately communicate what MKTVLU is.

**Layout:**
- Overline pill: "Market Intelligence 2.0" — small rounded pill, mint border, mint text, centered
- Headline: large `Instrument Serif` italic. Text: `Bridging the` (white) + line break + `Information Gap.` (mint gradient: #34D399 to #6EE7B7, applied via background-clip text)
- Subtitle: Inter weight 400, white-60, max-width 480px, centered: "See through market noise. Find the real price — not the listed one."
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

**Stat Cards** (glass-card style — `background: rgba(255,255,255,0.03)`, `backdrop-filter: blur(24px)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 24px`, `padding: 32px`):
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

**Visual:** A stylized product card mock (glass-card style) showing:
- Product name: "iPhone 15 Pro Max · 256GB · Good"
- Large MRP number: "$987" in mint, Instrument Serif
- Below: price range bar showing Floor ($820) — MRP ($987) — Ceiling ($1,140)
- Small glass pills: "42 listings · 4 platforms · 94% confidence"
- **VLU Certified badge** in the top-right corner of the card (see Section 4b below for badge spec)
- Build this as an actual styled div (not an image) using the glass-card treatment

This card should have a very slight float animation (translateY oscillating 4px over 4 seconds, ease-in-out, infinite).

---

### 4b. VLU Certified Section — Proprietary Price Verification

This is a NEW section introducing the VLU Certified stamp as a proprietary trust layer. Place it immediately after the Solution section.

**Layout:**
- Overline: "TRUST LAYER"
- Headline: `Instrument Serif` italic — "VLU Certified."
- Body: "Not every listing is priced fairly. VLU Certified is our proprietary verification standard — a stamp that means a product's price has been cross-referenced against real market data and falls within a statistically validated range."

**VLU Certified Badge Design:**
Build the badge as a reusable component. It appears in two sizes — inline (small, on listing cards) and featured (large, for this section).

*Featured badge (centered in this section):*
```
┌─────────────────────────────────┐
│  ✓  VLU CERTIFIED               │
│     Fair Market Price            │
└─────────────────────────────────┘
```

```css
.vlu-certified {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 16px;
  background: rgba(52, 211, 153, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(52, 211, 153, 0.2);
  box-shadow:
    0 0 0 0.5px rgba(52, 211, 153, 0.1) inset,
    0 0 30px rgba(52, 211, 153, 0.05);
}
.vlu-certified-icon {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.15);
  display: flex; align-items: center; justify-content: center;
}
.vlu-certified-icon svg { /* Lucide ShieldCheck */ color: #34D399; width: 16px; }
.vlu-certified-label {
  font-family: Inter; font-size: 12px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase; color: #34D399;
}
.vlu-certified-sub {
  font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 400;
  letter-spacing: 0;
}
```

**Below the badge, show 3 glass cards explaining the verification criteria:**

1. **Price Range Validation** — "Listed price falls within the statistically filtered MRP range (10th to 90th percentile)."
2. **Source Diversity** — "Price verified against 3+ independent marketplace sources."
3. **Confidence Threshold** — "MRP confidence score exceeds 75%, ensuring sufficient market data."

Each card: glass-card with a Lucide icon (ShieldCheck, Globe, BarChart3), title in white weight 600, description in white-60. Cards should have the `.glass-mint` variant (subtle mint tint) to differentiate from regular glass cards.

**How VLU Certified appears on listings (small inline badge):**
```css
.vlu-certified-sm {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.15);
  font-size: 9px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: #34D399;
}
```

**Context note:** VLU Certified will appear in the live product on results pages (on the MRP section when confidence is high enough) and eventually as an embeddable badge for marketplace sellers and platforms via the B2B API. For the landing page, this section introduces the concept and builds trust.

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

### 5b. Product Showcase — "See What You Get"

This section gives visitors a concrete visual of the actual product output. Two-part layout: phone with real screenshot on one side, exploded breakdown on the other.

**Layout:**
- Overline: "THE PRODUCT"
- Anchor ID: `id="product"` (nav "Product" link scrolls here)
- Headline: `Instrument Serif` italic — "Everything you need to know. One scan."
- Two-column layout on desktop (stack on mobile)

**Left Column — Real App Screenshots in Phone Frame:**
Use ACTUAL SCREENSHOTS from the live product at mktvlu.co — NOT a CSS replica. The real app has a floating glass UI with camera feed background, translucent overlays, organic spacing, and depth layers that cannot be replicated in a miniature CSS mockup. Screenshots are the only way to show the real product accurately.

Take these screenshots from the live app on an iPhone:
1. **Results page** (scrolled to top showing MRP + chart + condition) — PRIMARY image
2. **Camera scanning** (with the particle sphere active and status text) — SECONDARY
3. **Price DNA radar** or **Negotiation mode** — optional THIRD

The phone frame should be minimal — just a thin border suggesting the device shape, letting the screenshot be the star:

```css
.phone-frame {
  width: 300px;
  border-radius: 44px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}
.phone-frame img {
  width: 100%;
  display: block;
  border-radius: 42px;
}
```

Upload screenshots to `/public/screenshots/results.png`, `/public/screenshots/scanning.png`, etc.

**Optional: Auto-cycling screenshots.** If multiple screenshots are provided, cycle between them with a crossfade every 4 seconds using Framer Motion's `AnimatePresence`:

```jsx
const screens = ['/screenshots/results.png', '/screenshots/scanning.png', '/screenshots/radar.png'];
const [current, setCurrent] = useState(0);
useEffect(() => {
  const t = setInterval(() => setCurrent(i => (i + 1) % screens.length), 4000);
  return () => clearInterval(t);
}, []);
```

The phone should have a subtle float animation (translateY 6px oscillation over 5s) and a soft glow shadow beneath.

**Right Column — Exploded Results Breakdown:**
A vertical stack of 6 mini glass-cards, each explaining one section of the results page. Each card has a numbered label in a glass-pill (mint), title in `Instrument Serif` italic, and one-line description. Stagger-reveal top to bottom on scroll with 0.1s delay between each.

**01 — Market Reference Price**
"The statistically filtered average across all marketplaces. Your single source of truth."

**02 — Price Range & Chart**
"Floor to ceiling range with a 30-day price trend showing market direction."

**03 — Condition Assessment**
"AI-detected condition with price adjustments. Good, Fair, or Poor — each with its own MRP."

**04 — Evidence & Sources**
"See exactly how many listings were analyzed and from which platforms."

**05 — Price DNA**
"Multi-axis radar scoring confidence, stability, liquidity, demand, and retention."

**06 — VLU Certified**
"When the listing price falls within the validated MRP range, it earns the VLU Certified stamp."

Each card: glass-card style with a subtle 2px left border in mint (accent line). Numbers use glass-pill treatment with mint text.

**Desktop layout:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502                                              \u2502
\u2502   [Real screenshot      [01. MRP          ]  \u2502
\u2502    in thin phone         02. Price Range   ]  \u2502
\u2502    bezel frame]          03. Condition     ]  \u2502
\u2502                          04. Evidence      ]  \u2502
\u2502                          05. Price DNA     ]  \u2502
\u2502                          06. VLU Certified ]  \u2502
\u2502                                              \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Mobile:** Phone screenshot centered above (scaled to ~280px width), exploded cards stacked below.

---

### 6. Features Grid

**Layout:**
- Overline: "CAPABILITIES"
- Headline: `Instrument Serif` italic — "Built for the resale economy."
- 2x3 grid of feature cards (2x2 then 1x2 on mobile, or stack to 1-column)

**Feature Cards** (glass-card style, padding 32px, rounded-2xl, hover lifts with border brightening):
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
- Anchor ID: `id="technology"` (nav "Technology" link scrolls here)
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
- **Hero Subtitle:** "See through market noise. Find the real price — not the listed one."
- **Mission:** "Empower users with accurate, real-time valuation of any product."
- **Vision:** "The resale market's price match guarantee."
- **Verb:** "VALU-ME" — the action of obtaining a reference price using MKTVLU
- **Positioning:** "MKTVLU is not a resale platform. It is the reference price layer of the resale economy."
- **VLU Certified:** Proprietary price verification stamp. "VLU Certified — Fair Market Price." Appears when a product's listed price falls within the statistically validated MRP range, verified against 3+ sources with confidence above 75%.
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
  mktvlu-logo.svg         (provided — globe + crosshair logo)
  screenshots/
    results.png           (screenshot of live results page from iPhone)
    scanning.png          (screenshot of camera with particle sphere)
    radar.png             (optional — Price DNA radar view)
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
    VLUCertified.tsx     (VLU Certified section + badge component)
    HowItWorks.tsx       (visual workflow pipeline with sphere + flow dots)
    ProductShowcase.tsx  (phone mockup + exploded results breakdown)
    Features.tsx
    Personas.tsx
    Technology.tsx
    Roadmap.tsx
    CTA.tsx
    Footer.tsx
    PricingModal.tsx     (modal overlay with 3 tier cards + email signup)
    ParticleSphere.tsx   (provided — animated canvas component)
    ui/
      CountUp.tsx        (animated number counter)
      SectionLabel.tsx   (overline pill component)
      GlassCard.tsx      (reusable glass-morphism card)
      GlassMintCard.tsx  (mint-tinted glass variant for VLU Certified)
      VLUBadge.tsx       (reusable VLU Certified badge — sm and lg sizes)
      FlowConnector.tsx  (animated dot connector between workflow stages)
```

---

## Implementation Notes for Replit

1. Create a new Next.js project in Replit (use Agent or fork the Next.js template)
2. Install dependencies: `npm install framer-motion lucide-react`
3. Add Google Fonts in `layout.tsx` using `next/font/google` — import `Instrument_Serif` and `Inter`
4. Drop in provided files: `ParticleSphere.tsx` → `src/components/`, `mktvlu-logo.svg` → `public/`
5. Build sections top-to-bottom following the order above
6. Test on mobile viewport (375px) throughout — this is a mobile-first product
7. Deploy via Replit's built-in hosting

---

## Domain Setup — Connecting about.mktvlu.co (Squarespace DNS)

**Prerequisites:** Your landing page must be deployed on Replit first. You'll get a URL like `your-project.replit.app`.

### Step 1: Get your Replit deployment URL
- In Replit, click **Deploy** → deploy your project
- Note the URL (e.g., `mktvlu-landing.yourusername.replit.app`)

### Step 2: Add CNAME in Squarespace
- Log into **Squarespace** → **Settings** → **Domains** → click **mktvlu.co**
- Go to **DNS Settings** → **Custom Records**
- Click **Add Record** and enter:
  - **Type:** CNAME
  - **Host:** `about` (this creates the about.mktvlu.co subdomain)
  - **Data/Value:** `your-project.yourusername.replit.app` (your Replit URL, without https://)
  - **TTL:** leave as default (automatic)
- Save

### Step 3: Configure custom domain in Replit
- In Replit, go to your project → **Deploy** tab → **Settings** → **Custom Domain**
- Enter: `about.mktvlu.co`
- Replit will check the CNAME and auto-provision an SSL certificate

### Step 4: Wait for DNS propagation
- Usually 5-30 minutes
- Test by visiting `https://about.mktvlu.co` — should load your landing page
- The main `mktvlu.co` (Netlify app) is unaffected — only the `about` subdomain is routed to Replit

### Troubleshooting
- If CNAME doesn't resolve: double-check there's no conflicting A record for `about` in Squarespace
- If SSL errors: wait up to 1 hour for Replit's certificate provisioning
- If you see Squarespace's default page: the CNAME hasn't propagated yet — wait and try again
