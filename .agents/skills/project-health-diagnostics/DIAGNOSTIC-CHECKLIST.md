# ✅ Diagnostic Checklist — 45-Point Project Audit

## How to Use

Work through each section systematically. Mark each item:
- `✅` — Present and correctly implemented
- `⚠️` — Partially present or needs improvement
- `❌` — Missing or broken

Score each section: `(✅ count / total) × 100 = section score`

---

## Section A: Token Architecture (Weight: 40% of TAI)

### A1. Color Token System
- [ ] CSS custom properties defined for primary/secondary/neutral colors (`--color-primary`, `--color-surface`, etc.)
- [ ] Semantic color tokens used (`--color-text`, `--color-border`, `--color-background`)
- [ ] Interactive state tokens (`--color-hover`, `--color-focus`, `--color-disabled`)
- [ ] No hardcoded hex values in component files

### A2. Spacing Token System
- [ ] Spacing scale defined (`--space-1` through `--space-16` or equivalent)
- [ ] All margin/padding uses spacing tokens (not literal `px` values)
- [ ] Gap/grid spacing uses tokens

### A3. Typography Token System
- [ ] Font size scale defined (`--text-xs` through `--text-5xl` or equivalent)
- [ ] Font weight tokens defined (`--font-normal`, `--font-semibold`, `--font-bold`)
- [ ] Line height and letter spacing tokenized

### A4. Motion Token System
- [ ] Duration tokens (`--duration-fast: 150ms`, `--duration-normal: 300ms`)
- [ ] Easing tokens (`--ease-in-out`, `--ease-spring`)

### A5. Elevation & Shadow Tokens
- [ ] Shadow tokens defined (`--shadow-sm`, `--shadow-md`, `--shadow-xl`)
- [ ] Z-index scale defined (`--z-dropdown`, `--z-modal`, `--z-toast`)

### A6. Border Radius Tokens
- [ ] Radius tokens defined (`--radius-sm`, `--radius-md`, `--radius-full`)

**Section Score: __ / 18 = __%**

---

## Section B: WCAG Compliance (Weight: 25% of TAI)

### B1. Color Contrast
- [ ] All text/background combinations meet WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Interactive elements (buttons, links) meet 3:1 contrast minimum

### B2. Keyboard & Focus
- [ ] All interactive elements reachable via Tab key
- [ ] `:focus-visible` styles defined (not just `:focus`)
- [ ] Skip navigation link present
- [ ] Focus order follows visual reading order

### B3. Semantic HTML
- [ ] Heading hierarchy correct (single `<h1>`, no skipped levels)
- [ ] Landmark regions present (`<main>`, `<nav>`, `<aside>`, `<footer>`)
- [ ] Interactive elements use correct HTML elements (not `<div onclick>`)

### B4. ARIA & Screen Readers
- [ ] All images have `alt` attributes (empty for decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Dynamic content updates announced (`aria-live`, `aria-atomic`)
- [ ] Icon-only buttons have `aria-label`

### B5. Touch & Motor
- [ ] All tap targets minimum 44×44px
- [ ] Sufficient spacing between adjacent targets

**Section Score: __ / 14 = __%**

---

## Section C: Resilience Coverage (Weight: 20% of TAI)

### C1. Loading States
- [ ] Skeleton loader or spinner for async data
- [ ] Perceived performance: instant visual feedback on interaction

### C2. Error States
- [ ] Network error state (lost connection message + retry)
- [ ] API error state (server down, 500 error handling)
- [ ] Form validation error states (inline, accessible)

### C3. Empty States
- [ ] Empty list/table state with helpful message
- [ ] Zero-result search state
- [ ] First-time user empty dashboard state

### C4. Partial Failure States
- [ ] Graceful degradation when partial data loads
- [ ] Error boundary component wraps async content

### C5. Offline Support
- [ ] Offline detection (navigator.onLine or Service Worker)
- [ ] Offline queue for mutations (IndexedDB FIFO)

**Section Score: __ / 10 = __%**

---

## Section D: Responsive Architecture (Weight: 15% of TAI)

### D1. Breakpoint System
- [ ] Defined breakpoint scale (sm/md/lg/xl or equivalent)
- [ ] Mobile-first CSS (min-width media queries)

### D2. Layout Adaptations
- [ ] Sidebar transforms to bottom nav on mobile
- [ ] Data tables transform to card stacks on mobile
- [ ] Navigation collapses to hamburger/bottom bar

### D3. Typography Scaling
- [ ] Font sizes scale down on small screens
- [ ] Line lengths stay within 45–80 characters on all screens

### D4. Images & Media
- [ ] Images use `width: 100%; height: auto` or `object-fit`
- [ ] Responsive images (`srcset` or CSS `max-width`)

**Section Score: __ / 8 = __%**

---

## Section E: AI Drift Indicators (Supplementary)

### E1. CSS Hygiene
- [ ] < 5% of color values are hardcoded (not using tokens)
- [ ] < 5% of spacing values are hardcoded
- [ ] No `!important` flags (or fewer than 5)
- [ ] No `z-index: 9999` patterns

### E2. Consistency Signals
- [ ] Component spacing follows the token scale (multiples of base unit)
- [ ] Button sizes consistent across the app
- [ ] Icon sizes consistent (using a defined set: 16/20/24px)

**Section E: Qualitative — Inform drift_rate but not included in TAI formula**

---

## TAI Calculation Summary

```
Section A score: __% × 0.40 = __
Section B score: __% × 0.25 = __
Section C score: __% × 0.20 = __
Section D score: __% × 0.15 = __

TAI = __ (Grade: [Excellent/Good/Needs Work/Critical])
```
