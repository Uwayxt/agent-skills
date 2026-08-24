---
name: touch-gesture-interaction
description: Define touch targets, gestures, and thumb-zone layout for touch interfaces. Use when designing for mobile, touch targets, gesture patterns, swipe, pull-to-refresh, or thumb reachability.
---

**A finger is not a cursor. Touch interaction has no hover state, no precision, and no right-click. Design for the thumb first, then add everything else.**

### 1. Enforce minimum tap target sizes
Every interactive element must meet minimum 44×44pt (iOS HIG) / 48×48dp (Material Design). This is not a suggestion — elements smaller than this produce miss-taps. Audit every button, link, icon-button, toggle, and form input.

### 2. Map the thumb zones
Using the thumb-zone model (Green = easy reach, Yellow = stretch, Red = difficult):
- Green zone: bottom 40% of screen, centered horizontally
- Yellow zone: middle 40%
- Red zone: top 20%, far edges
Place primary actions (CTA, submit, nav) in the Green zone. Secondary actions can be Yellow. Destructive or rare actions can be Red (friction is intentional).

### 3. Define gesture patterns
For each gesture used in the product, specify:
- Gesture type: tap, double-tap, long-press, swipe (direction), pinch, pull-to-refresh
- What it triggers: action, reveal, navigation, dismiss
- Feedback: what visual/haptic response confirms the gesture was recognized
- Conflict check: does this gesture conflict with system-level gestures (back swipe, pull-down notification)?

### 4. Handle safe-area insets
For devices with notches, home indicators, and rounded corners: use `env(safe-area-inset-*)` CSS or platform equivalent. Navigation bars, bottom CTAs, and fixed elements must respect these insets.

### 5. Define touch-state variants
Pressed state (visual depression/highlight), long-press state, swipe-in-progress state. Coordinate with component-style-guide for the full state matrix.

### 6. Document no-hover fallbacks
For every interaction that uses hover on desktop (tooltip on hover, action revealed on hover, underline on hover), define the touch equivalent: tap to reveal, always visible, swipe-to-reveal, or eliminated.

### Completion Criteria
- All interactive elements verified ≥ 44×44pt
- Thumb zone map documented for each primary screen
- All gestures defined with trigger, feedback, and conflict check
- Safe-area insets handled for all fixed/sticky elements
- No-hover fallbacks documented for every hover interaction

### Output
Tap target audit report + thumb zone map + gesture inventory + safe-area spec.

### Anti-patterns
- Icon buttons without a label AND without an adequate tap target padding
- Placing primary CTA at the top of the screen (hardest to reach one-handed)
- Implementing custom gestures that conflict with system navigation (swipe-left-to-go-back)
- Relying on hover states to reveal critical information on touch devices
- Forgetting that long-press has no visual affordance — users will not discover it unless told
