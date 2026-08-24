---
name: design-tokens
description: Define color, spacing, shadow, and radius tokens as single source of truth. Use when design tokens, color palette, spacing scale, create a design system, consistent styling, or at the start of any new UI project.
---

A design token is a **single source of truth for a visual decision**. Raw hex codes, pixel values, and shadow strings in component files are not decisions — they're accidents waiting to diverge. Tokens make decisions explicit, named, and enforceable.

### 1. Color tokens
Define the palette in layers: (a) Primitives: named raw values (`blue-500: #3B82F6`). (b) Semantic: role-based aliases (`color-primary: blue-500`, `color-error: red-500`, `color-surface: gray-50`). (c) Component-level: if needed (`button-primary-bg: color-primary`). The semantic layer is the contract — components reference semantics, never primitives.

### 2. Spacing tokens
Pick a base unit (4px or 8px). Build a scale: `space-1: 4px`, `space-2: 8px`, `space-3: 12px`, `space-4: 16px`, ... up to `space-16: 64px`. Every margin, padding, and gap uses a token, never a magic number.

### 3. Border radius
Scale: `radius-sm: 4px`, `radius-md: 8px`, `radius-lg: 12px`, `radius-full: 9999px`. Pick a default (usually `radius-md`).

### 4. Shadow / elevation
Layered: `shadow-sm` (subtle), `shadow-md` (cards), `shadow-lg` (modals/dropdowns), `shadow-xl` (popovers). Each shadow definition includes x/y offset, blur, spread, and color with alpha.

### 5. Breakpoints
Name them by intent, not device: `breakpoint-sm: 640px`, `breakpoint-md: 768px`, `breakpoint-lg: 1024px`, `breakpoint-xl: 1280px`.

### 6. Output the token file
Generate `design-tokens.json` with the full token set, structured by category. Provide implementation mappings: CSS custom properties, Tailwind config extension, or whatever the project's styling system needs.

## Output
`design-tokens.json` + CSS custom properties block + implementation notes. Reference [TOKEN-SCHEMA.md](TOKEN-SCHEMA.md) for the canonical naming convention.

## Completion Criteria
Done when every visual decision (color, spacing, radius, shadow, breakpoint) is a named token. Not done if any component uses a raw value that should be a token.

## Anti-patterns
- Defining 47 shades of gray.
- Using device names for breakpoints ("mobile", "tablet").
- Semantic tokens that reference other semantic tokens (circular).
- Tokens that are never referenced by any component.
