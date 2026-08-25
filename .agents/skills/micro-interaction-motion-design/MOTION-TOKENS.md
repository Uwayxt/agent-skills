# Motion Token Schema

Motion tokens follow the same layering as design tokens: primitives → semantic → component. Every animation or transition in the product must reference a token from this file — no raw `200ms ease-in-out` in components.

---

## Duration Primitives

| Token | Value | Use For |
|-------|-------|---------|
| `motion-instant` | `0ms` | Press/active feedback, state toggles that feel instant, show/hide without animation |
| `motion-fast` | `100ms` | Hover effects, focus rings, icon swaps, small reveals |
| `motion-normal` | `200ms` | Modal open, dropdown appear, card expand, button state changes |
| `motion-slow` | `300ms` | Complex reveals, accordion expand, empty-state fade-in, slide-in panels |
| `motion-deliberate` | `500ms` | Loading pulse cycle, onboarding step transitions, skeleton shimmer period |

**Rule:** UI feedback (success, error, loading) must use `motion-normal` or faster. Longer feels broken.

---

## Easing Curves

| Token | Value | Character |
|-------|-------|-----------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Neutral, Material-standard — balanced in/out |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating — elements **leaving** the screen |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating — elements **entering** the screen |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Slight overshoot — playful confirms, toggles, switches |
| `ease-linear` | `linear` | Progress bars, spinners, continuous repeating animations |

**Rule:** Never use `ease-in` for entering elements — it starts slow and feels laggy. `ease-out` enters fast and settles — this is what feels responsive.

---

## Semantic Motion Tokens

Combine duration + easing for common interaction patterns:

| Token | Duration | Easing | Use For |
|-------|----------|--------|---------|
| `transition-hover` | `motion-fast` | `ease-default` | All hover state changes |
| `transition-focus` | `motion-fast` | `ease-out` | Focus ring appearance |
| `transition-modal-in` | `motion-normal` | `ease-out` | Modal/dialog/drawer opening |
| `transition-modal-out` | `motion-fast` | `ease-in` | Modal/dialog/drawer closing |
| `transition-feedback` | `motion-normal` | `ease-spring` | Success/error confirmation animations |
| `transition-page` | `motion-slow` | `ease-out` | Route/page transitions |
| `transition-skeleton` | `motion-deliberate` | `ease-linear` | Skeleton shimmer pulse (infinite) |

---

## CSS Custom Properties Implementation

```css
:root {
  /* Durations */
  --motion-instant:    0ms;
  --motion-fast:       100ms;
  --motion-normal:     200ms;
  --motion-slow:       300ms;
  --motion-deliberate: 500ms;

  /* Easing */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-linear:  linear;

  /* Semantic combinations */
  --transition-hover:     var(--motion-fast) var(--ease-default);
  --transition-focus:     var(--motion-fast) var(--ease-out);
  --transition-modal-in:  var(--motion-normal) var(--ease-out);
  --transition-modal-out: var(--motion-fast) var(--ease-in);
  --transition-feedback:  var(--motion-normal) var(--ease-spring);
  --transition-page:      var(--motion-slow) var(--ease-out);
}
```

### Common usage:
```css
.button { transition: background-color var(--transition-hover); }
.modal  { transition: opacity var(--transition-modal-in), transform var(--transition-modal-in); }
.switch-thumb { transition: transform var(--transition-feedback); }
```

---

## Reduced Motion

**Mandatory:** Wrap all non-functional animations in `@media (prefers-reduced-motion: reduce)`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Keep under reduced motion:** Loading spinners and progress indicators (functional — user needs to know something is happening).  
**Remove under reduced motion:** Slide reveals, parallax, auto-playing carousels, decorative bounces.  
**Replace under reduced motion:** Slide → fade, scale → opacity change, bounce → instant.

---

## Anti-patterns

- Raw `200ms ease` in components instead of `var(--transition-hover)`
- `motion-deliberate` on UI feedback — success toast should use `motion-normal`, not 500ms
- Animating `width`, `height`, `top`, `left` — always use `transform` and `opacity` (GPU-composited, no layout recalc)
- `ease-spring` on page transitions — overshoot at route level feels disorienting
- Any animation where the user must wait before interacting (never block interaction with animation)
- Skeleton shimmer using `motion-fast` — pulse must be slow enough to read as "loading", not "flickering"
