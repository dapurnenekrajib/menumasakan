# Dapur Nenek Rajib — Vue 3 + Vite Restaurant Site

A mobile-first, cinematic restaurant/food website built with Vue 3 (Composition API)
and Vite. WhatsApp ordering only — no payment gateway. Cart, category filters,
food detail modal, Pre-Order flow, and a DP 50% via DANA payment section are all
included and wired to real component state.

## Getting started

```bash
npm install
cp .env.example .env    # then edit .env with your real WhatsApp/DANA details
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## What to customize before launch

1. **`.env`** — your real WhatsApp number (`VITE_WA_NUMBER`), DANA number/name,
   business name, address, hours, and Instagram handle.
2. **`src/data/menu.js`** — replace placeholder `picsum.photos` images with real
   food photos (ideally `.webp`, ~800×600, compressed) and update names/prices/
   categories/badges. Add or remove items freely — the grid and category filter
   read straight from this file.
3. **`src/data/business.js`** — tagline/subtitle copy for the hero section.
4. **Hero background** — currently a placeholder image in `Hero.vue`
   (`heroImage` constant); swap for a real cinematic food photo.

## Project structure

```
src/
├── components/
│   ├── Navbar.vue          — glassmorphism-on-scroll nav, mobile hamburger
│   ├── AnnouncementBar.vue — dismissible top banner
│   ├── Hero.vue             — Ken Burns background, parallax, text reveal
│   ├── CategoryFilter.vue
│   ├── MenuGrid.vue
│   ├── FoodCard.vue
│   ├── FoodDetailModal.vue  — modal on desktop, bottom sheet on mobile
│   ├── CartDrawer.vue       — floating cart -> bottom sheet on mobile
│   ├── OrderType.vue        — Order Now vs Pre-Order (PO) toggle
│   ├── PaymentInfo.vue      — DP 50% / DANA instructions
│   ├── HowToOrder.vue       — 4-step timeline
│   ├── WhatsAppButton.vue   — floating WA button, pulse animation
│   └── Footer.vue
├── composables/
│   ├── useCart.js            — shared reactive cart state
│   ├── useWhatsApp.js        — builds the wa.me order/payment messages
│   └── useScrollReveal.js    — v-reveal directive (IntersectionObserver)
├── data/
│   ├── menu.js
│   └── business.js
├── App.vue
├── main.js
└── style.css                 — design tokens (dark + warm gold), globals
```

## Notes

- All scroll/reveal animations respect `prefers-reduced-motion`.
- No payment gateway is implemented anywhere — the DP flow is instructions +
  a WhatsApp confirmation link only, as specified.
- Images use `loading="lazy"` where relevant; swap placeholder URLs for
  optimized local assets for best performance.
