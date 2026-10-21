# MktVlu landing page — design and motion refinement

Date: October 12, 2026

## Reference cues

- [Apple AirPods Pro](https://www.apple.com/airpods-pro/): large product photography, a quiet hierarchy, purposeful reveals, and progressive feature storytelling.
- [Linear](https://linear.app/): precise typography, fine borders, meaningful interface demonstrations, and measured spacing.
- [Bang & Olufsen](https://www.bang-olufsen.com/en/us): warm materials, photographs that make objects tangible, and generous compositions.

These sites informed the direction. Their photographs, branding, and text were not copied into MktVlu.

## Current-run audit and resulting changes

1. **Hero — improved.** The original hero in 02-before-hero.jpg communicated the product, but provided no photograph and pushed the sample result below the first mobile screen. The rebuilt composition pairs concise typography with real photography and a labeled example valuation. Desktop proof: 03-after-hero-desktop.jpg; mobile proof: 07-after-hero-mobile.jpg.
2. **Process — improved.** 01-before-process.jpg showed repeated dark cards, decorative particles, and provider terminology. The new process uses one sticky photograph on desktop with three explanatory chapters and panel transitions. Mobile reflows to a normal document. Proof: 06-after-scroll-story-desktop.jpg.
3. **Examples and report — functional.** The gallery selects the matching product and scrolls to its report. Category buttons, condition adjustments, and evidence disclosure were exercised on desktop and mobile. Camera/Fair produced $952, a $833–$1,097 range, and 31 comparable listings; Audio/Poor produced $164, a $141–$191 range, and 28 listings. These values are illustrative, not market quotes. Proof: 04-after-gallery-desktop.jpg, 05-after-report-desktop.jpg.
4. **Navigation and answers — functional.** Mobile menu opens and closes, section selection closes the menu, pricing uses a focus-managed Radix dialog that closes with Escape, and the live-price FAQ expands. App links point to https://mktvlu.co; contact links open an email draft rather than claiming a submitted form.

## Photography provenance

All four assets were downloaded from the free photo pages below, inspected, and served locally. The [Unsplash License](https://unsplash.com/license) permits downloading and using these photographs, including commercial use. Photographer credits are also available in the footer.

| Local asset | Photographer | Source |
| --- | --- | --- |
| client/public/images/iphone-titanium.jpg | Yuheng Ouyang | [iPhone 15 Pro titanium](https://unsplash.com/photos/a-close-up-of-a-cell-phone-on-a-blanket-aUtmNs6iMos) |
| client/public/images/camera.jpg | insung yoon | [Black camera](https://unsplash.com/photos/a-black-and-white-photo-of-a-camera-MGgrhLg07Sg) |
| client/public/images/headphones.jpg | Petr Macháček | [Headphones on a beige surface](https://unsplash.com/photos/black-headset-on-beige-surface-j9MV1gV0l50) |
| client/public/images/design-chair.jpg | Agata Create | [White molded chair](https://unsplash.com/photos/white-armless-chair-BsQxAIl2LdA) |

The photographs illustrate product categories. They do not imply manufacturer endorsements or represent actual listings.

## Motion system

- Masked heading reveals: 1 second, ease [0.22, 1, 0.36, 1].
- Section entrances: 24px travel, 0.75 seconds, once per section.
- Hero photo movement follows scrolling; there are no continuously looping decorative animations.
- Product-photo crossfades: 0.35 seconds. Price changes: 0.2 seconds.
- Sticky process panels: 0.32 seconds, driven by chapter progress.
- Chart drawing: 0.85 seconds. Chart code loads when the report approaches the viewport.
- MotionConfig, useReducedMotion, and CSS reduced-motion rules suppress movement when requested.

## Verification and limits

- Production build completed successfully.
- Focused check:landing checks the entry point, its imported UI tree, and Vite configuration.
- Full-project npm run check still reports pre-existing errors in Features, MarketEdgeBanner, Personas, Problem, Roadmap, Solution, and VLUCertified. Those unused legacy components were not modified.
- Tested at 1280 × 720 desktop and 390 × 844 mobile. No document-width overflow, no completed images with zero natural width, and one H1.
- Browser checks exercised example selection, condition changes, evidence disclosure, navigation, pricing, and FAQ expansion.
- This is not a full accessibility certification. System-level reduced-motion emulation and screen-reader testing were not performed.
