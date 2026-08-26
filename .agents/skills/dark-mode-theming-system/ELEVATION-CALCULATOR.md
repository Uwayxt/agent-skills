# 🌓 Dark Mode Surface Elevation Calculator & Math Spec

In dark mode, elevation is expressed through **surface lightness increments**, not drop shadows. Humans cannot perceive dark shadows on a black canvas.

---

## 📐 The 4-Tier Surface Lightness Elevation Formula

Given a canvas base hue $H$ and saturation $S$:

| Surface Level | Semantic Role | Target Lightness ($L$) | Hex Benchmark ($S \approx 10\%$) |
| :--- | :--- | :---: | :--- |
| **Level 0 (Ground)** | Root app canvas / backdrop | **$4\% - 6\%$** | `#090A0F` |
| **Level 1 (Base)** | Main content cards, sidebars | **$7\% - 10\%$** | `#12141A` |
| **Level 2 (Elevated)**| Hovered cards, dropdowns, popovers | **$11\% - 15\%$**| `#1A1D24` |
| **Level 3 (Highest)** | Modals, dialogs, toasts | **$16\% - 20\%$**| `#242832` |

$$\Delta L \ge 3\% \text{ between adjacent elevation tiers}$$

---

## 🚫 Anti-Halation Text Contrast Formula

Never use pure white text (`#FFFFFF`) on dark surfaces ($L < 10\%$) for continuous reading; it causes ocular vibration (halation).

| Text Role | Target Hex | Contrast Ratio vs Level 1 Surface |
| :--- | :--- | :---: |
| **Primary Text** | `#F3F4F6` (95% Lightness) | **$\ge 13.5:1$ (AAA Pass)** |
| **Secondary Text**| `#9CA3AF` (68% Lightness) | **$\ge 6.8:1$ (AA Pass)** |
| **Muted / Placeholder** | `#6B7280` (48% Lightness) | **$\ge 4.5:1$ (AA Pass)** |
