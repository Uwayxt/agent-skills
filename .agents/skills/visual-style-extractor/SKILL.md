---
name: visual-style-extractor
description: Extract design tokens, component structure, and visual language from a reference image. Use when reference image, match this design, copy this style, extract colors from screenshot, or replicate this UI.
---

**A reference image is a complete design specification — it contains every token, every component, every spacing decision. The agent's job is to read it with precision, not approximate it.**

### 1. Pre-extraction classification
Before extracting anything, classify the reference image into one of four types:

- **Screenshot of real product**: extract as-is, do not infer — what you see is the spec. Highest fidelity target.
- **Design mockup / wireframe**: extract intent, allow interpretation of fidelity level. Values are designed, not measured.
- **Mood board / inspiration**: extract style direction only, not exact values. Output is a style brief, not token values.
- **Partial reference** (one component, one section): extract only what is visible, explicitly flag everything that needs inference for areas not shown.

State the classification explicitly before proceeding. Different classifications trigger different precision tiers. See [EXTRACTION-PROTOCOL.md](EXTRACTION-PROTOCOL.md) for precision tier definitions.

### 2. Color extraction
Systematically sample colors across the entire image. Work in this order:

**(a) Background surfaces** — identify every distinct background layer:
- Page background, card/panel background, sidebar background, modal overlay
- For each: extract the hex value from the dominant color of that region (avoid edge pixels and anti-aliasing artifacts)

**(b) Text colors** — identify every distinct text color used:
- Primary text, secondary/muted text, placeholder text, disabled text, link text, error text
- Map each to a semantic role — do not output a list of hex codes without semantic meaning

**(c) Brand/accent colors** — identify the primary and secondary accent colors:
- Used on CTAs, active nav items, highlights, badges, data visualizations
- Extract the full accent range: base, hover (usually 10–15% darker), active/pressed state

**(d) Border and separator colors** — subtle lines between sections, card outlines, input borders

**(e) Feedback colors** — success, warning, error, info variants:
- Extract only if visible; explicitly flag which feedback colors are not present in the reference

Output format: primitive color table → semantic token mapping
```
| Hex      | Extracted Role         | Semantic Token Name  |
|----------|------------------------|----------------------|
| #1A73E8  | Primary CTA background | color-primary        |
| #FFFFFF  | Card surface           | color-surface        |
| #5F6368  | Body text secondary    | color-text-secondary |
```

### 3. Typography extraction
For every distinct text element visible in the image:

**(a) Estimate font size** using known reference anchors:
- Standard button text = 14–16px → use as calibration base
- Standard body copy = 14–16px, h1 is typically 2–2.5× body
- If multiple text sizes are visible, establish the ratio between them

**(b) Identify font weight** from stroke width:
- Very thin strokes = 300 (Light)
- Normal strokes = 400 (Regular)
- Slightly thicker = 500–600 (Medium/SemiBold)
- Clearly bold = 700 (Bold)
- Very heavy = 800–900 (ExtraBold/Black)

**(c) Identify font family** from letterform characteristics:
- Geometric sans (Circular, Futura, Nunito): perfect round 'O', uniform stroke width throughout
- Humanist sans (Inter, Source Sans Pro, Lato): slight stroke variation, open 'e', natural apertures
- Transitional/Classical sans (Helvetica, Arial): more neutral, moderate x-height
- Serif: visible serifs on letter terminals
- Monospace: characters occupy equal horizontal width

**(d) Map to type scale roles:**
Page title / H1 / H2 / H3 / Body-large / Body / Label / Caption / Badge / Code

If font cannot be identified with confidence: name the closest widely-available alternative (Google Fonts preferred) and flag the value as `(inferred)`.

### 4. Spacing and layout extraction

**(a) Identify the base grid unit:**
- Find the smallest repeated spacing value in the design
- Most designs use 4px or 8px as base unit — verify by checking multiple spacing instances
- Cross-check: card padding, button padding, and item gaps should all be multiples of the base unit

**(b) Extract component padding** from visible cards, buttons, inputs:
- Button: horizontal padding separately from vertical padding
- Card: all four sides if asymmetric, or shorthand if symmetric
- Input field: padding around the text content

**(c) Extract gap values:**
- Between items in a list or nav
- Between cards in a grid
- Between sections on a page (section-to-section gap is always the largest)

**(d) Identify the layout structure:**
- Single column / two column / sidebar + main content / grid
- Fixed sidebar width (estimate from proportional analysis)
- Topbar height (estimate from proportional analysis)
- Max-width of the main content area if visible

Output format:
```
| Token   | Estimated Value | Evidence                                      |
|---------|-----------------|-----------------------------------------------|
| space-2 | 8px             | Button vertical padding, consistent 3 buttons |
| space-4 | 16px            | Card inner padding, consistent across 4 cards |
| space-8 | 32px            | Gap between page sections                    |
```

### 5. Component inventory
Systematically identify every UI component visible in the reference. For each component:

- **Component type**: Button / Input / Card / Badge / Navigation item / Table / Modal / Tab / Toggle / etc.
- **Variant visible**: Primary / Secondary / Ghost / Outlined / Destructive / etc.
- **States visible**: Default / Hover (if shown) / Active / Disabled / Error / etc.
- **Border radius**: Sharp (0px) / Slight (2–4px) / Moderate (6–8px) / Rounded (12–16px) / Pill (9999px)
- **Shadow level**: None / Subtle (0 1px 3px) / Medium (0 4px 12px) / Elevated (0 8px 24px)
- **Token references**: reference the extracted color and spacing tokens by name, not by raw value

### 6. Visual style signature
Synthesize a single paragraph "style DNA" that captures the overall visual language. This paragraph becomes the north star for all downstream generation — every generated component should match this description.

Use this template:
> "The reference uses a [light / dark / mid-tone neutral] palette anchored by [primary accent description]. Typography is [geometric / humanist / transitional / serif] with [compact / balanced / generous] line-height and [tight / normal / loose] letter-spacing. Components use [sharp / slight / moderate / rounded / pill] border radius, [no / subtle / medium / elevated] shadows, and [dense / comfortable / spacious] content density. The overall aesthetic registers as [minimalist / material / glassmorphic / neumorphic / flat / illustrated / brutalist]."

### 7. Fidelity gap analysis
Before passing outputs downstream, explicitly state what CANNOT be extracted from this static image:
- Motion and animation behavior (not visible in a screenshot)
- Interaction states not shown (hover, focus, loading, error — if not in the image)
- Contextual data vs. placeholder content
- Components that exist in the product but are not in this specific screenshot

For each gap, state the resolution strategy:
- **(a) Infer from style signature** — the gap can be reasonably extrapolated from the established style DNA
- **(b) Use Agentway defaults** — use the standard from the relevant skill (e.g., use accessibility minimum for touch targets)
- **(c) Ask user** — the decision cannot be made without additional input

### 8. Generate the extraction manifest
Output a structured `style-extraction.json` that all downstream skills can consume directly:

```json
{
  "classification": "product-screenshot",
  "extractedAt": "ISO-8601 timestamp",
  "sourceDescription": "brief description of the reference image",
  "colorTokens": {
    "primitives": {
      "blue-500": "#1A73E8",
      "blue-600": "#1557B0",
      "gray-900": "#202124",
      "gray-600": "#5F6368",
      "white": "#FFFFFF"
    },
    "semantic": {
      "color-primary": "blue-500",
      "color-primary-hover": "blue-600",
      "color-surface": "white",
      "color-text-primary": "gray-900",
      "color-text-secondary": "gray-600"
    }
  },
  "typographyTokens": {
    "fontFamily": {
      "heading": "Inter (inferred — humanist sans characteristics)",
      "body": "Inter (inferred)"
    },
    "scale": {
      "display": "40px / weight 700",
      "h1": "32px / weight 700",
      "h2": "24px / weight 600",
      "h3": "20px / weight 600",
      "body-lg": "18px / weight 400",
      "body": "16px / weight 400",
      "label": "14px / weight 500",
      "caption": "12px / weight 400"
    }
  },
  "spacingTokens": {
    "baseUnit": "8px",
    "scale": {
      "space-1": "4px",
      "space-2": "8px",
      "space-3": "12px",
      "space-4": "16px",
      "space-6": "24px",
      "space-8": "32px",
      "space-12": "48px"
    }
  },
  "components": [
    {
      "type": "Button",
      "variant": "Primary",
      "radius": "6px",
      "shadow": "none",
      "paddingH": "16px",
      "paddingV": "8px",
      "colorBackground": "color-primary",
      "colorText": "white"
    }
  ],
  "layoutStructure": {
    "type": "sidebar-left",
    "sidebarWidth": "240px (estimated)",
    "topbarHeight": "56px (estimated)",
    "contentMaxWidth": "1200px (estimated)"
  },
  "styleDNA": "The reference uses a light palette anchored by a blue primary accent (#1A73E8). Typography is humanist sans-serif with comfortable line-height. Components use moderate border radius (6px), no shadows, and comfortable content density. The overall aesthetic registers as clean and minimalist.",
  "gaps": [
    { "item": "hover states", "resolution": "infer from style signature — primary darkens by ~15%" },
    { "item": "mobile layout", "resolution": "ask user" },
    { "item": "error states", "resolution": "use Agentway defaults from error-boundary-resilience-design" }
  ]
}
```

## Downstream Integration

After extraction, the manifest feeds directly into downstream skills — they must use it instead of starting from scratch:

| Downstream Skill | How It Uses the Manifest |
|-----------------|--------------------------|
| `design-tokens` | Populate token file with extracted `colorTokens` and `spacingTokens` |
| `typography-system` | Use extracted `typographyTokens` as the starting scale |
| `component-style-guide` | Use `components` array as the inventory to document |
| `design-system-builder` | Build components to match extracted component specs and `styleDNA` |
| `design-to-code-handoff` | Reference `style-extraction.json` as the canonical ground truth |
| `dark-mode-theming-system` | Use semantic color tokens as the light-mode layer to extend |

**Mandatory rule:** When `style-extraction.json` is available, no downstream skill may guess or assume style values. All style decisions must be traceable to an extracted value or a documented gap resolution.

## Completion Criteria
- [ ] Image classified into one of four types, stated explicitly
- [ ] All visible background surfaces extracted with semantic token names
- [ ] All visible text colors extracted and mapped to semantic roles
- [ ] Brand/accent color range extracted (base + hover state)
- [ ] Font family identified with letterform evidence, or flagged as inference
- [ ] Font size scale estimated with calibration anchor named
- [ ] Font weights identified for all text elements
- [ ] Base grid unit identified with cross-check evidence
- [ ] Component padding and gap values extracted with evidence
- [ ] Layout structure identified (sidebar width, topbar height if present)
- [ ] All visible components inventoried with type, variant, radius, and shadow
- [ ] Style DNA paragraph written
- [ ] Gap analysis complete with resolution strategy for each gap
- [ ] `style-extraction.json` generated and valid JSON
- [ ] Downstream skills notified that manifest is available

## Anti-patterns
- Approximating colors ("it looks like a blue") instead of extracting the hex value
- Skipping classification — treating a mood board as a screenshot produces wrong precision targets
- Extracting raw hex values without mapping them to semantic token names
- Claiming "font is Inter" without naming the letterform characteristics that support that identification
- Not flagging inferences — every estimated value that is not directly measurable must be marked `(inferred)`
- Passing gaps downstream silently — unresolved gaps must be documented with a resolution strategy
- Extracting only what is easy (colors) and skipping what is harder (spacing, component structure)
