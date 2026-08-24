---
name: micro-interaction-motion-design
description: Define motion tokens, interaction patterns, and feedback animations. Use when animation, transitions, micro-interaction, hover effects, loading states, motion, or make the UI feel alive.
---

Motion is communication, not decoration. Every animation answers a question the user didn't ask out loud: "Did that work?", "Where did it go?", "What changed?" Motion without purpose is noise; motion with purpose is clarity.

### 1. Define motion tokens
Like design tokens but for time and movement. See [MOTION-TOKENS.md](MOTION-TOKENS.md) for the canonical schema. Core tokens:
(a) Durations: `motion-instant: 0ms`, `motion-fast: 100ms`, `motion-normal: 200ms`, `motion-slow: 300ms`, `motion-deliberate: 500ms`.
(b) Easing curves: `ease-default: cubic-bezier(0.4, 0, 0.2, 1)`, `ease-in: cubic-bezier(0.4, 0, 1, 1)`, `ease-out: cubic-bezier(0, 0, 0.2, 1)`, `ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)`.

### 2. Catalog interaction patterns
For each interactive element type, define the motion:
(a) **Hover**: subtle bg shift or elevation change, `motion-fast` + `ease-default`.
(b) **Press/active**: scale down slightly (0.97–0.98) or darken, `motion-instant`.
(c) **Focus**: ring appears, `motion-fast` + `ease-out`.
(d) **Drag**: element follows cursor with slight lag, `ease-out`.
(e) **Toggle/switch**: slides with `motion-normal` + `ease-spring`.

### 3. Define feedback state animations
(a) **Loading**: spinner or skeleton pulse. Pulse = opacity oscillation 0.5–1.0, `motion-deliberate`, infinite. Skeleton shimmer = gradient slide, `1.5s`, infinite.
(b) **Success**: checkmark appears with scale-in, `motion-normal` + `ease-spring`. Brief green flash on container.
(c) **Error**: shake animation (horizontal 3-frame oscillation, `motion-normal`). Error message slides in from top.
(d) **Empty state**: gentle fade-in of illustration + text, `motion-slow` + `ease-out`.

### 4. Transition animations
(a) **Page/route transitions**: crossfade or slide, `motion-normal`.
(b) **Modal open**: fade backdrop + scale-up content from 0.95, `motion-normal` + `ease-out`. Modal close: reverse, `motion-fast`.
(c) **Dropdown/popover**: scale-Y from 0 to 1, origin at top, `motion-fast` + `ease-out`.
(d) **Toast/notification**: slide-in from edge, `motion-normal` + `ease-out`. Auto-dismiss after 5s with fade-out.

### 5. Respect user preferences
Always wrap non-essential animations in `@media (prefers-reduced-motion: reduce)`. Under reduced motion: keep functional transitions (loading indicators), remove decorative ones (bounces, slides), replace motion with instant opacity changes.

## Output
Motion spec: token definitions + interaction pattern catalog + feedback state specs + transition specs + reduced-motion behavior.

## Anti-patterns
- Animations longer than 500ms for UI feedback (feels sluggish).
- Bounce easing on everything (feels toy-like).
- Animating layout properties (width, height, top, left) instead of transform/opacity (causes jank).
- Motion that blocks interaction (user has to wait for animation to finish before clicking).
