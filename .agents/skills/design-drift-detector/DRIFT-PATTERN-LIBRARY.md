# 📚 Drift Pattern Library — 50+ Violation Signatures

## How to Use

Each entry contains:
- **Pattern**: The regex or literal pattern to detect
- **Severity**: Critical / High / Medium / Low
- **Description**: What this violates
- **Auto-fix**: How to remediate

---

## CATEGORY C1: Hardcoded Colors 🔴 Critical

### C1.01 — Hex Color (3-digit)
```regex
(?<![a-zA-Z0-9_-])(#[0-9a-fA-F]{3})(?![0-9a-fA-F])
```
**Example:** `color: #fff` | `background: #F00`
**Fix:** Replace with semantic color token: `var(--color-surface)` / `var(--color-danger)`

### C1.02 — Hex Color (6-digit)
```regex
#[0-9a-fA-F]{6}(?![0-9a-fA-F])
```
**Example:** `color: #3B82F6` | `background-color: #1E293B`
**Fix:** Map to nearest design token. Reference TOKEN-SCHEMA.md for mapping.

### C1.03 — Hex Color (8-digit with alpha)
```regex
#[0-9a-fA-F]{8}
```
**Example:** `background: #3B82F680`
**Fix:** Use `color-mix()` with token or `var(--color-primary-alpha-50)`

### C1.04 — RGB Function
```regex
rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)
```
**Example:** `color: rgb(59, 130, 246)`
**Fix:** `color: var(--color-primary)`

### C1.05 — RGBA Function
```regex
rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)
```
**Example:** `background: rgba(0, 0, 0, 0.5)` | `box-shadow: 0 2px rgba(0,0,0,0.15)`
**Fix:** `background: var(--color-overlay)` or use CSS `color-mix()`

### C1.06 — HSL Function
```regex
hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)
```
**Example:** `color: hsl(217, 91%, 60%)`
**Fix:** `color: var(--color-primary)`

### C1.07 — HSLA Function
```regex
hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)
```
**Fix:** Same as RGBA — use token or `color-mix()`

### C1.08 — CSS Named Colors (Common)
```regex
(?:color|background(?:-color)?|border(?:-color)?|fill|stroke|outline-color)\s*:\s*(red|blue|green|black|white|gray|grey|orange|purple|pink|yellow|cyan|magenta|navy|teal|lime|silver|maroon|olive|aqua|fuchsia)
```
**Example:** `color: black` | `background: white`
**Fix:** `color: var(--color-text)` | `background: var(--color-background)`

### C1.09 — currentColor Used as Fallback (not a violation, informational)
```regex
currentColor
```
**Action:** Review context — ensure parent element uses a token-resolved color.

---

## CATEGORY C2: Hardcoded Spacing 🟠 High

### C2.01 — Literal Margin (single value)
```regex
margin\s*:\s*\d+(\.\d+)?(px|rem|em)
```
**Example:** `margin: 16px` | `margin: 1rem`
**Fix:** `margin: var(--space-4)` (where space-4 = 16px in 4px base scale)

### C2.02 — Literal Margin Shorthand
```regex
margin\s*:\s*[\d\s]+(px|rem)
```
**Example:** `margin: 8px 16px` | `margin: 4px 8px 12px 8px`
**Fix:** `margin: var(--space-2) var(--space-4)`

### C2.03 — Literal Margin Side
```regex
margin-(top|right|bottom|left)\s*:\s*\d+(\.\d+)?(px|rem)
```
**Example:** `margin-top: 24px`
**Fix:** `margin-top: var(--space-6)`

### C2.04 — Literal Padding
```regex
padding\s*:\s*[\d\s]+(px|rem)
```
**Fix:** `padding: var(--space-4)` or appropriate token

### C2.05 — Literal Padding Side
```regex
padding-(top|right|bottom|left)\s*:\s*\d+(\.\d+)?(px|rem)
```
**Fix:** Replace with corresponding spacing token

### C2.06 — Literal Gap
```regex
gap\s*:\s*\d+(\.\d+)?(px|rem)
```
**Example:** `gap: 24px`
**Fix:** `gap: var(--space-6)`

### C2.07 — Literal Column/Row Gap
```regex
(column|row)-gap\s*:\s*\d+(\.\d+)?(px|rem)
```
**Fix:** `column-gap: var(--space-4)`

---

## CATEGORY C3: Hardcoded Typography 🟠 High

### C3.01 — Literal Font Size (px)
```regex
font-size\s*:\s*\d+(\.\d+)?px
```
**Example:** `font-size: 14px` | `font-size: 18px`
**Fix:** `font-size: var(--text-sm)` | `font-size: var(--text-lg)`

### C3.02 — Literal Font Size (rem)
```regex
font-size\s*:\s*\d+(\.\d+)?rem
```
**Example:** `font-size: 0.875rem`
**Fix:** `font-size: var(--text-sm)`

### C3.03 — Literal Font Weight (numeric)
```regex
font-weight\s*:\s*(100|200|300|400|500|600|700|800|900)
```
**Example:** `font-weight: 600`
**Fix:** `font-weight: var(--font-semibold)`

### C3.04 — Literal Line Height (px or em)
```regex
line-height\s*:\s*\d+(\.\d+)?(px|em)
```
**Example:** `line-height: 24px` | `line-height: 1.5em`
**Fix:** `line-height: var(--leading-normal)` or unitless `1.5`

### C3.05 — Literal Letter Spacing
```regex
letter-spacing\s*:\s*-?\d+(\.\d+)?(px|em)
```
**Example:** `letter-spacing: -0.025em`
**Fix:** `letter-spacing: var(--tracking-tight)`

---

## CATEGORY C4: Hardcoded Border Radius 🟡 Medium

### C4.01 — Literal Border Radius
```regex
border-radius\s*:\s*\d+(\.\d+)?(px|rem|%)
```
**Example:** `border-radius: 8px` | `border-radius: 50%`
**Fix:** `border-radius: var(--radius-md)` | `border-radius: var(--radius-full)`

### C4.02 — Literal Corner Radius
```regex
border-(top|bottom)-(left|right)-radius\s*:\s*\d+(\.\d+)?px
```
**Fix:** `border-top-left-radius: var(--radius-sm)`

---

## CATEGORY C5: Hardcoded Shadows 🟡 Medium

### C5.01 — Literal Box Shadow
```regex
box-shadow\s*:\s*[\d-]+(px)
```
**Example:** `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`
**Fix:** `box-shadow: var(--shadow-md)`

### C5.02 — Inset Shadow Literal
```regex
box-shadow\s*:\s*inset\s*[\d-]+(px)
```
**Fix:** `box-shadow: var(--shadow-inset-sm)`

### C5.03 — Text Shadow Literal
```regex
text-shadow\s*:\s*[\d-]+(px)
```
**Fix:** `text-shadow: var(--shadow-text-sm)`

---

## CATEGORY C6: Hardcoded Z-Index 🟡 Medium

### C6.01 — Magic Z-Index
```regex
z-index\s*:\s*\d+
```
**Example:** `z-index: 100` | `z-index: 9999`
**Fix:** `z-index: var(--z-dropdown)` / `var(--z-modal)` / `var(--z-toast)`

### C6.02 — Anti-Pattern: Z-Index Arms Race
```regex
z-index\s*:\s*(9999|99999|999999)
```
**Severity upgrade:** 🔴 Critical when detected — immediately create a z-index token scale.

---

## CATEGORY C7: Hardcoded Duration 🟢 Low

### C7.01 — Literal Transition Duration
```regex
transition(-duration)?\s*:\s*\d+(\.\d+)?(ms|s)
```
**Example:** `transition: all 0.3s ease`
**Fix:** `transition: all var(--duration-normal) var(--ease-in-out)`

### C7.02 — Literal Animation Duration
```regex
animation(-duration)?\s*:\s*\d+(\.\d+)?(ms|s)
```
**Example:** `animation: fadeIn 0.5s ease`
**Fix:** `animation: fadeIn var(--duration-slow) var(--ease-spring)`

---

## ANTI-PATTERNS (Cross-Category)

### AP.01 — `!important` Flag 🟡 Medium
```regex
!important
```
**Why critical context:** Overrides the token cascade. Any `!important` on a color/spacing property breaks the design system's ability to propagate token changes.

### AP.02 — Inline Style Attribute 🟠 High
```regex
style\s*=\s*["'][^"']*["']
```
**Example:** `<div style="color: #3B82F6; padding: 16px">`
**Fix:** Move to CSS module / token-referenced class

### AP.03 — CSS `calc()` with Magic Numbers 🟡 Medium
```regex
calc\([^)]*\d+px[^)]*\)
```
**Example:** `width: calc(100% - 64px)`
**Fix:** `width: calc(100% - var(--space-16))`

---

## Token Reference Map (Common Violations → Token)

| Hardcoded Value | Likely Token |
| :--- | :--- |
| `#3B82F6`, `rgb(59,130,246)` | `var(--color-primary)` |
| `rgba(0,0,0,0.5)` | `var(--color-overlay)` |
| `rgba(0,0,0,0.1)` | `var(--color-shadow)` |
| `#1E293B` | `var(--color-neutral-900)` |
| `#F8FAFC` | `var(--color-surface)` |
| `16px` (space) | `var(--space-4)` |
| `24px` (space) | `var(--space-6)` |
| `32px` (space) | `var(--space-8)` |
| `14px` (font) | `var(--text-sm)` |
| `16px` (font) | `var(--text-base)` |
| `24px` (font) | `var(--text-2xl)` |
| `8px` (radius) | `var(--radius-md)` |
| `9999` (z-index) | `var(--z-modal)` |
| `0.3s` (duration) | `var(--duration-normal)` |
