---
name: responsive-qa-audit
description: Audit the product across all breakpoints before shipping. Use when responsive QA, cross-device testing, mobile audit, breakpoint check, or elements overflowing on mobile.
---

**A layout that looks correct in a browser resize is not a tested layout. Test at real breakpoints, with real content, with real fingers.**

### 1. Set up the audit environment & viewports
Test across all defined breakpoints from `responsive-breakpoint-strategy`:
- Mobile Small (375×667 - iPhone SE)
- Mobile Standard (393×852 - iPhone 15 / Pixel 8)
- Tablet (768×1024 - iPad Mini/Air)
- Desktop (1280×800)
- Ultra-wide (1440×900+)

### 2. Automated Playwright overflow & layout test
Run automated checks to detect un-intended horizontal overflows and viewport clipping:
```javascript
// tests/responsive-overflow.spec.js
import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-sm', width: 375, height: 667 },
  { name: 'mobile-std', width: 393, height: 852 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const vp of VIEWPORTS) {
  test(`No horizontal overflow at ${vp.name} (${vp.width}px)`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasOverflow).toBe(false);
  });
}
```

### 3. Run tap target & thumb-zone audit
On mobile breakpoints:
- Verify all interactive targets ≥ 44×44 CSS pixels.
- Minimum 8px spacing between adjacent touch elements.
- Primary CTA located within the thumb reach zone (lower 40% of viewport).

### 4. Typography & line-length check
- Body text ≥ 14px (16px strongly recommended on mobile).
- Reading line-length between 45–75 characters per line (no runaway text containers).
- Headings scale fluidly using `clamp()` or breakpoint tokens.

### 5. Component transformation audit
Verify component state against `adaptive-component-behavior`:
- Data tables transform into stacked card lists on mobile.
- Desktop sticky sidebar transforms into mobile bottom-bar or sliding drawer.
- Modals transform into bottom action-sheets (`drawer-bottom`).

### 6. Mobile viewport edge-case testing
- **Virtual Keyboard**: Ensure inputs stay visible above the virtual keyboard without covering the submit CTA.
- **Safe Area Insets**: Verify `padding-bottom: env(safe-area-inset-bottom)` prevents content collision with OS home indicator bars.
- **Landscape Orientation**: Verify layout does not break when rotated horizontally on mobile.

### 7. Remote & real device testing strategy
- For teams without physical hardware, execute cloud testing via BrowserStack or Playwright WebKit mobile emulation.
- Physical device spot-check mandatory on at least 1 iOS Safari device and 1 Android Chrome device before production shipping.

## Completion Criteria
- [ ] Automated Playwright overflow test passes across all 4+ viewport configurations
- [ ] Tap targets ≥ 44×44px with zero touch target overlap
- [ ] Component transformations verified (table -> cards, sidebar -> bottom-nav)
- [ ] Safe-area insets (`env(safe-area-inset-*)`) tested on notched devices
- [ ] Virtual keyboard open state tested on form inputs

## Output
A `responsive-qa-report.md` artifact detailing pass/fail status per breakpoint, automated Playwright test scripts, and actionable remediation tasks.

## Anti-patterns
- Testing only at desktop (1440px) and a single mobile width (375px), skipping tablets.
- Relying on `overflow-x: hidden` to hide horizontal layout overflow instead of fixing the root element width.
- Forgetting iOS Safari address bar height variations when calculating `100vh` (use `100dvh`).
- Using hover tooltips to convey critical data on touch devices.
