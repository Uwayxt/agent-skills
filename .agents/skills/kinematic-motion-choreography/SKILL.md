---
name: kinematic-motion-choreography
description: >
  Designs physics-based UI motion systems using harmonic spring oscillator equations
  (mass, stiffness, damping), asymmetric entrance/exit curves, staggered cascading
  delays, and mandatory reduced-motion fallbacks.
  Use when: spring animation, physics motion, cubic-bezier, enter exit animation,
  staggered list animation, modal transition, interactive gestures, agentway gen:spring.
version: 1.7.0
phase: 9
category: Behavioral Psychology & Kinetic Motion
---

# 🌊 Skill: Kinematic Motion Choreography

## Purpose

Standard web transitions often feel robotic because they use arbitrary linear or symmetrical curves (`ease-in-out`). Real-world physical objects possess mass, friction, and momentum. This skill equips agents with **harmonic oscillator physics and asymmetric choreography protocols** to create natural, high-performance UI motion.

---

## Trigger Phrases

| Phrase | Activation |
| :--- | :---: |
| "spring animation" / "spring physics" | ✅ |
| "asymmetric motion" / "enter exit animation" | ✅ |
| "staggered animation" / "choreography" | ✅ |
| "modal animation" / "drawer physics" | ✅ |
| "kinematic tokens" / "motion curves" | ✅ |
| "agentway gen:spring" | ✅ |

---

## Protocol: 5-Step Kinematic Motion Engine

### STEP 1 — Physical Parameter Definition

Define the harmonic oscillator parameters for each UI element category:
- **Mass ($m$):** Weight of the element ($0.5\text{kg}$ for tooltips, $1.0\text{kg}$ for cards, $2.0\text{kg}$ for dialog modals).
- **Stiffness ($k$):** Spring tension/snap ($120\text{N/m}$ to $400\text{N/m}$).
- **Damping ($c$):** Friction resisting motion ($10\text{Ns/m}$ to $35\text{Ns/m}$).

$$\text{Damping Ratio } \zeta = \frac{c}{2\sqrt{km}}$$

- **Snappy Spring ($\zeta \approx 0.65$):** Micro-interactions, button presses, like animations.
- **Natural Smooth ($\zeta \approx 0.85$):** Dropdowns, tooltips, toasts, tab indicators.
- **Critically Damped ($\zeta = 1.0$):** Heavy modals, route transitions (Zero overshoot).

### STEP 2 — Asymmetric Directional Choreography

Never use the same timing curve for entrances and exits:
1. **Entrances (High Energy Deceleration):**
   - Duration: Fast ($150\text{ms}–220\text{ms}$).
   - Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (Decelerates sharply as it snaps into place).
2. **Exits (Deliberate Acceleration):**
   - Duration: Slightly slower ($250\text{ms}–320\text{ms}$).
   - Curve: `cubic-bezier(0.7, 0, 0.84, 0)` (Accelerates off-screen so user isn't kept waiting).

### STEP 3 — Cascading Stagger Calculations

When animating collections (lists, grids, dashboard widgets):
$$t_{\text{delay}}(n) = \min(n \times 35\text{ms}, 350\text{ms})$$
Cap total stagger at $350\text{ms}$ so large lists don't introduce perceived latency.

### STEP 4 — Gestural Spatial Cohesion

Ensure motion originates from the trigger element:
- Modals scale up from the click origin (`transform-origin: var(--origin-x) var(--origin-y)`).
- Menus expand outward from the trigger button icon.

### STEP 5 — Accessibility & Reduced Motion Gate

Mandate strict reduced-motion overrides:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Deliverables Generated

1. `spring-tokens.css` — CSS Custom Properties with mathematical Bezier approximations.
2. `motion-choreography.js` — Lightweight spring timing helper.
3. `CHOREOGRAPHY-TIMELINE.md` — Visual timeline diagram of micro-interactions.

---

## Companion Skills

| Skill | Relationship |
| :--- | :--- |
| `micro-interaction-motion-design` | Sets foundation duration tokens |
| `touch-gesture-interaction` | Connects gesture velocity to spring release |
| `perceived-performance-loading` | Coordinates skeleton reveal transitions |
