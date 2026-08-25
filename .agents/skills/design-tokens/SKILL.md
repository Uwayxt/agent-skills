---
name: design-tokens
description: Define color, spacing, shadow, and radius tokens as single source of truth. Use when design tokens, color palette, spacing scale, create a design system, consistent styling, or at the start of any new UI project.
---

**A design token is a single source of truth for a visual decision.** Raw hex codes, pixel values, and shadow strings in component files are not decisions — they are accidents waiting to diverge. Tokens make visual decisions explicit, named, and enforceable.

## Upstream Integration
- If `style-extraction.json` is present (from `visual-style-extractor`), **ingest extracted colors, typography, spacing, and radius directly** instead of authoring tokens from scratch.
- If creating from scratch, establish the token hierarchy defined below.

### 1. Color tokens (Primitives vs. Semantics)
Define the palette in strict tiers:
- **Primitives**: Named raw values (`blue-500: #3B82F6`, `gray-900: #111827`).
- **Semantic Tokens (Light Theme Contract)**: Role-based aliases (`color-primary: blue-500`, `color-surface: #FFFFFF`, `color-text-primary: gray-900`).
- Components MUST reference semantic tokens, never primitives.

### 2. Dark mode semantic extension
For every semantic surface, text, and border token, define its dark mode counterpart (feeds into `dark-mode-theming-system`):
- `color-surface` -> Light: `#FFFFFF` / Dark: `#16181D`
- `color-surface-ground` -> Light: `#F8F9FA` / Dark: `#0D0E11`
- `color-text-primary` -> Light: `#111827` / Dark: `#F3F4F6`

### 3. Spacing tokens (4pt / 8pt Scale)
Pick a single base unit (4px or 8px). Build an immutable scale:
- `space-1`: 4px | `space-2`: 8px | `space-3`: 12px | `space-4`: 16px | `space-6`: 24px | `space-8`: 32px | `space-12`: 48px | `space-16`: 64px
Every margin, padding, and layout gap MUST reference a token.

### 4. Border radius tokens
Scale: `radius-none: 0px`, `radius-sm: 4px`, `radius-md: 8px`, `radius-lg: 12px`, `radius-xl: 16px`, `radius-full: 9999px`.

### 5. Elevation & shadow tokens
Layered elevation model:
- `shadow-sm`: Subtle border/container accent (`0 1px 3px rgba(0,0,0,0.1)`)
- `shadow-md`: Standard card elevation (`0 4px 12px rgba(0,0,0,0.08)`)
- `shadow-lg`: Modals and dropdowns (`0 8px 24px rgba(0,0,0,0.12)`)
- In dark mode, drop shadows are complemented or replaced by surface lightness adjustments (`color-surface-elevated`).

### 6. Responsive breakpoint tokens
Name by viewport intent: `breakpoint-sm: 640px`, `breakpoint-md: 768px`, `breakpoint-lg: 1024px`, `breakpoint-xl: 1280px`.

### 7. Output the token file & CSS Custom Properties
Generate `design-tokens.json` structured by category with ready-to-use `:root` and `[data-theme="dark"]` CSS variable blocks.

## Output
- `design-tokens.json` (Structured JSON tokens)
- `tokens.css` (CSS custom properties with light and dark mode mappings)
- Reference [TOKEN-SCHEMA.md](TOKEN-SCHEMA.md) for naming taxonomy.

## Completion Criteria
- [ ] Every visual decision (colors, spacing, radius, shadow, breakpoints) mapped to semantic tokens
- [ ] Dual-theme (Light/Dark) mapping defined for all surface, text, and border tokens
- [ ] Zero raw hex or magic pixel values in generated component CSS
- [ ] If extracted from image, `style-extraction.json` values faithfully mapped

## Anti-patterns
- Defining 47 shades of gray with no semantic assignment.
- Hardcoding hex values inside component styles ("just for this one button").
- Skipping the semantic layer and pointing components directly to raw primitives.
- Inverting shadow values in dark mode without adjusting surface elevation luminance.
