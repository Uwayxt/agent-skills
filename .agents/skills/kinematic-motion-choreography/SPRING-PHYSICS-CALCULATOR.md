# 🧮 Spring Physics Calculator & Mathematical Approximations

## 1. The Damped Harmonic Oscillator Model

$$\ddot{x} + 2\zeta\omega_0 \dot{x} + \omega_0^2 x = 0$$

Where:
- $\omega_0 = \sqrt{\frac{k}{m}}$ (Natural angular frequency)
- $\zeta = \frac{c}{2\sqrt{km}}$ (Damping ratio)

---

## 2. Standard Spring Presets & Cubic-Bezier Approximations

| Preset Name | Mass ($m$) | Stiffness ($k$) | Damping ($c$) | $\zeta$ | Equivalent CSS Cubic-Bezier | Best Used For |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Snappy** | 0.8 | 280 | 18 | 0.60 | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Buttons, Like toggles, Badge pops |
| **Bouncy** | 1.0 | 180 | 12 | 0.45 | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Notification toasts, Confetti drops |
| **Natural** | 1.0 | 220 | 25 | 0.84 | `cubic-bezier(0.22, 1, 0.36, 1)` | Dropdown menus, Tooltips, Tabs |
| **Smooth** | 1.2 | 140 | 26 | 1.00 | `cubic-bezier(0.16, 1, 0.3, 1)` | Bottom sheets, Dialog modals |
| **Subtle** | 1.5 | 100 | 28 | 1.14 | `cubic-bezier(0.25, 1, 0.5, 1)` | Background overlays, Page transitions |

---

## 3. JavaScript Spring Solver Generator

```javascript
/**
 * Computes an analytical spring trajectory at time t (seconds)
 */
export function solveSpring(t, { mass = 1, stiffness = 100, damping = 10, initialVelocity = 0 }) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 1) {
    // Underdamped
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * w0 * t);
    return 1 - envelope * (Math.cos(wd * t) + ((zeta * w0 - initialVelocity) / wd) * Math.sin(wd * t));
  } else {
    // Critically damped or overdamped
    return 1 - Math.exp(-w0 * t) * (1 + (w0 - initialVelocity) * t);
  }
}
```
