---
name: responsive-qa-audit
description: Audit the product across all breakpoints before shipping. Use when responsive QA, cross-device testing, mobile audit, breakpoint check, or elements overflowing on mobile.
---

**A layout that looks correct in a browser resize is not a tested layout. Test at real breakpoints, with real content, with real fingers.**

### 1. Set up the audit environment
Test at each defined breakpoint from responsive-breakpoint-strategy. Use browser DevTools device simulation for each breakpoint, PLUS a physical device test for at least the smallest supported screen size and one tablet.

### 2. Run the overflow audit
At each breakpoint:
- No element extends beyond the viewport width (check `document.body.scrollWidth > window.innerWidth`)
- No text overflows its container
- No images break out of their parent
- No fixed-width elements cause horizontal scroll

### 3. Run the tap target audit
On mobile breakpoints:
- Every interactive element ≥ 44×44px (use DevTools to inspect computed size)
- No two interactive elements closer than 8px apart
- Form inputs large enough to tap without zooming

### 4. Run the typography audit
At each breakpoint:
- Body text ≥ 14px on mobile (16px preferred)
- No text smaller than 12px anywhere
- Line length between 45–75 characters for body copy
- Headings scale down proportionally (not same size as desktop)

### 5. Run the navigation audit
At mobile breakpoints:
- Primary navigation is reachable without scrolling
- No navigation hidden in a hover state (no hover on touch)
- Back/cancel actions are always accessible
- Keyboard (virtual keyboard) does not obscure primary actions when open

### 6. Run the component transformation audit
Cross-reference against adaptive-component-behavior transformation table:
- Every "transform required" component has transformed (not just shrunk)
- Bottom-nav appears where sidebar was
- Tables are card-lists on mobile
- Modals are fullscreen on mobile

### 7. Run the image and content audit
- Images are not pixelated or over-compressed at any breakpoint
- Content priority is correct (most important content first on mobile)
- Safe-area insets are respected on devices with notches/home indicators

### Completion Criteria
- Audit run at every defined breakpoint
- Zero overflow violations
- Zero tap target violations
- All component transformations verified
- Physical device test completed for smallest supported size
- Findings documented with breakpoint, element, and fix required

### Output
Responsive QA report (breakpoint × check × pass/fail/issue). Each issue includes: breakpoint, element, description, screenshot reference, recommended fix.

### Anti-patterns
- Testing only at 375px and 1440px (misses tablet and intermediate states)
- Using only browser resize instead of actual device simulation
- Marking audit "passed" because there is no horizontal scroll (overflow hidden can mask the problem)
- Not testing with a real virtual keyboard open
- Skipping the physical device test (DevTools simulation is not 100% accurate for touch)
