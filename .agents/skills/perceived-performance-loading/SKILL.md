---
name: perceived-performance-loading
description: Define loading strategies that make the product feel fast regardless of actual load time. Use when skeleton loaders, lazy loading, progressive rendering, perceived performance, or mobile loading speed.
---

**Perceived performance is a design problem, not only an engineering problem. A blank screen for 2 seconds feels slower than a skeleton loader for 3 seconds. Design the loading experience first.**

### 1. Classify content by load priority
Three tiers:
- **Critical (above-the-fold)**: must be visible within the first meaningful paint. No lazy loading.
- **Important (below-the-fold)**: load after critical content, can use lazy loading with a low threshold.
- **Deferred (off-screen, secondary)**: load on demand (scroll, tab change, user action).

### 2. Design skeleton screens
For every content block that takes >300ms to load, design a skeleton version:
- Match the exact layout and dimensions of the real content (not generic gray bars)
- Use a shimmer animation (left-to-right highlight sweep) for active loading
- Transition from skeleton → real content with a subtle fade (no jarring replacement)
Reference motion tokens from micro-interaction-motion-design for animation timing.

### 3. Define progressive rendering
For data-heavy views (tables, lists, feeds):
- Render the first N items immediately
- Load remaining items as user scrolls (virtual scrolling for very long lists)
- Show a count indicator ("Showing 20 of 342 results")

### 4. Optimize image loading
Specify:
- Use native `loading="lazy"` for below-fold images
- Define image size hints (`width` and `height` attributes) to prevent layout shift
- Use blur-up placeholder (low-res image → full-res) for hero images
- Specify acceptable image formats (WebP with fallback, AVIF where supported)

### 5. Handle connection variability (mobile-critical)
Define behavior for:
- Slow 3G: show skeleton, load text first, images last
- Offline: show cached content with a clear "You are offline" indicator, not a blank screen
- Connection restored: auto-refresh without losing scroll position

### 6. Set loading time budgets
First Contentful Paint target, Largest Contentful Paint target, Total Blocking Time target. These are design constraints, not just engineering metrics.

### Completion Criteria
- All content classified (critical / important / deferred)
- Skeleton screens designed for all content blocks >300ms
- Progressive rendering defined for all lists/tables >20 items
- Image loading strategy specified
- Offline state handled
- Performance budgets set

### Output
Loading strategy document + skeleton screen specifications + performance budget targets.

### Anti-patterns
- Generic spinner as the only loading indicator (tells the user nothing about structure)
- Skeleton that does not match real content dimensions (causes layout shift on load)
- Lazy loading images that are above the fold (delays critical content)
- No offline state — blank screen or broken layout when connection drops
- Loading all data upfront for large lists (defeats the purpose of pagination/virtual scroll)
