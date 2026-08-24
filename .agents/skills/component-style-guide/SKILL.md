---
name: component-style-guide
description: Document every component state and variant. Use when component states, button variants, how should this component look in all states, state matrix, or interactive states.
---

A component isn't designed until every state is designed. The default state is maybe 40% of the work; hover, active, disabled, loading, error, empty, and skeleton are the other 60% — and they're the states users actually notice.

### 1. Enumerate all states
For every component, list exhaustively: default, hover, focus (keyboard), active/pressed, disabled, loading, error, success, empty, skeleton/placeholder. Not every component has every state — but you must explicitly decide which ones apply.

**Touch-device states (required for any component used on mobile):**
- `pressed`: visual depression on tap-down — distinct from desktop `active`. Typically a darker background or scale(0.97).
- `swiping`: for swipeable components (cards, list rows, carousels) — visual offset showing swipe progress.
- `long-press`: for components that use long-press to reveal actions — a brief visual pulse before the action appears.
- `no-hover rule`: any state that is only triggered by mouse hover is NOT available on touch devices. Every hover-revealed action or tooltip must have a touch equivalent (tap to reveal, always visible, or swipe-to-reveal). Coordinate with touch-gesture-interaction.

### 2. Specify visual changes per state
For each applicable state: what changes visually? Background color, border, shadow, opacity, cursor, icon, text, animation/transition. Use token names, not raw values. Specify separately for pointer devices (mouse) and touch devices where behavior differs.

### 3. Specify interaction behavior
Pointer: Hover (mouse enter, 150ms ease-out), focus ring (style + offset), active (scale or color shift). Touch: pressed (tap-down visual, no hover equivalent), long-press (300ms threshold + visual pulse), swipe (direction + visual offset). Disabled: no pointer events, no focus, no touch response.

### 4. Document transitions between states
State changes are not instant unless intentionally so. Document: from-state → to-state → duration → easing. Reference motion tokens from micro-interaction-motion-design if available.

### 5. Build the state matrix
A table per component: rows = states, columns = visual properties (bg, border, shadow, text-color, cursor, transition).

### 6. Cover variant × state combinations
A primary button's hover looks different from a ghost button's hover. The matrix applies to each variant. If variant × state = too many cells, only document the deltas from primary variant.

## Output
State matrix per component (variant × state → visual properties + tokens + transitions).

## Anti-patterns
- Designing only the default state.
- Copy-pasting hover styles from one component to another without checking token consistency.
- Using `opacity: 0.5` as a universal disabled style (it often breaks contrast ratios).
