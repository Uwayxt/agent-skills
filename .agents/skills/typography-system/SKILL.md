---
name: typography-system
description: Define type scale, font pairing, and text hierarchy. Use when typography, font pairing, type scale, heading sizes, text hierarchy, or which font.
---

Typography is the skeleton of visual hierarchy. Users scan headings, read body text, and ignore everything in between — unless the hierarchy is broken, in which case they scan randomly and leave. A type system makes hierarchy automatic.

### 1. Choose font pairing
One font for headings (personality), one for body (readability). Safe defaults: Inter/system-ui for body, plus a distinctive heading font if brand requires it. If brand doesn't require a specific font, a single family for both (e.g. Inter) is better than a bad pairing. Always check license (Google Fonts = free, Adobe Fonts = subscription, custom = verify).

### 2. Define the type scale
Pick a ratio. Common ratios: 1.200 (minor third — compact), 1.250 (major third — balanced, recommended default), 1.333 (perfect fourth — generous). Generate sizes from a base (16px default): `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`. Each size = previous × ratio, rounded to nearest 0.5px.

### 3. Map sizes to roles
`text-4xl` → page title (h1). `text-2xl` → section heading (h2). `text-xl` → sub-heading (h3). `text-base` → body. `text-sm` → captions/labels. `text-xs` → legal/meta. Document which role uses which size.

### 4. Set line height per size
Larger text needs tighter line height. Guideline: display (h1-h2): 1.1–1.25, body: 1.5–1.625, small text: 1.4–1.5.

### 5. Set letter spacing
Large headings: slightly negative (-0.01em to -0.02em). Body: default (0). Small/uppercase text: slightly positive (+0.02em to +0.05em).

### 6. Responsive adjustments
Type scale may shift at breakpoints. Mobile base might be 14px–15px; desktop stays at 16px. Define which sizes change and at which breakpoints.

### 7. Define font weights
Map to roles: headings = 600–700, body = 400, emphasis = 500, bold = 700. No more than 3–4 weights loaded (performance).

## Output
Type scale table (role → size → line-height → letter-spacing → weight) + font pairing recommendation + license status + responsive notes.

## Completion Criteria
Done when every text role (h1–h6, body, caption, label, overline) has an explicit size, line-height, and weight. Not done if sizes exist without roles or roles exist without sizes.
