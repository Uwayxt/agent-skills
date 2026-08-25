---
name: dark-mode-theming-system
description: Define dual-theme token layer and elevation models for light and dark mode. Use when dark mode, theme switching, color scheme, or dark theme.
---

**Dark mode is not an inverted color palette — it is a dedicated semantic surface hierarchy where elevation is communicated through surface lightness and border contrast rather than drop shadows.**

### 1. Audit the primitive and semantic layers
Before introducing dark theme values, verify that all components consume semantic tokens (`color-surface`, `color-text-primary`, `color-border-subtle`), not raw hex or primitive tokens (`gray-100`, `blue-500`). Any hardcoded color will break when theme switches.

### 2. Establish the dark surface elevation scale
In light mode, elevation is communicated with drop shadows (`box-shadow: 0 4px 12px ...`). In dark mode, shadows are mostly invisible against dark backgrounds. Replace shadow depth with surface lightness:
- `color-surface-ground` (Base/Canvas): `#121212` or `#0A0A0C` (lowest luminance)
- `color-surface-base` (Default container/card): `#1E1E22` or `#16161A`
- `color-surface-elevated` (Dropdowns, modals, popovers): `#28282E` or `#222228`
- `color-surface-highest` (Tooltips, toasts, floating CTAs): `#34343C` or `#2E2E36`

### 3. Map text and icon contrast for dark backgrounds
Pure white (`#FFFFFF`) on pure black (`#000000`) causes visual halation and eye fatigue:
- `color-text-primary`: `#F0F0F3` (87–90% opacity white)
- `color-text-secondary`: `#A0A0AB` (60–70% opacity white)
- `color-text-muted`: `#6E6E7A` (38–45% opacity white)
- `color-border-subtle`: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`

### 4. Adjust brand and accent vibrancy
Saturated brand colors that work well on light backgrounds can vibrate or fail WCAG contrast on dark surfaces:
- Desaturate primary accents by 10–20% or use a lighter tonal variant (e.g. `blue-600` on light becomes `blue-400` on dark) to meet WCAG 4.5:1 contrast against dark card surfaces.
- Ensure state highlights (hover, active, focus) maintain clear delta without overwhelming the eye.

### 5. Define implementation and preference strategy
Support both explicit user toggle and OS preference:
- CSS token switching via `[data-theme="dark"]` attribute on the root document element.
- Auto-detect default with `@media (prefers-color-scheme: dark)` when user preference is unset.
- Persist user choice in `localStorage` and prevent flash of unstyled theme (FOUT/theme flicker) with an inline blocking script in the `<head>`.
- Set `color-scheme: dark` / `color-scheme: light` on `html` so native scrollbars, select dropdowns, and form inputs render with matching native browser chrome.

### 6. Audit images, illustrations, and third-party embeds
- Invert or swap line-art icons and illustrations that rely on dark lines.
- Lower the brightness or contrast of full-bleed photographs slightly (`filter: brightness(0.85) contrast(1.1)`) if they appear blinding in dark mode environments.
- Ensure charts, badges, and status pills retain clear semantic meaning and pass contrast checks in both modes.

## Completion Criteria
- [ ] Base canvas and 3+ elevation surface tiers defined for dark theme
- [ ] Text hierarchy defined without harsh pure white (`#FFFFFF`) on dark surfaces
- [ ] Brand/accent colors adjusted for WCAG 2.1 AA contrast against dark surfaces
- [ ] CSS custom properties architecture defined with `[data-theme]` and `color-scheme`
- [ ] Theme switcher anti-flicker strategy documented for runtime implementation
- [ ] Visual asset (illustrations, charts, images) dark mode strategy specified

## Output
A complete `dark-tokens.json` schema and CSS tokens mapping covering all surface tiers, text roles, border contrasts, brand adjustments, and the root theme switching contract.

## Anti-patterns
- Inverting the light palette mathematically with `filter: invert(1)` (produces muddy colors and distorted photography).
- Relying on pure black (`#000000`) for all cards and backgrounds (flattens visual hierarchy).
- Using identical high-opacity drop shadows from light mode in dark mode (invisible against dark surfaces).
- Forgetting to declare `color-scheme: dark`, causing blinding white native inputs or dropdowns.
