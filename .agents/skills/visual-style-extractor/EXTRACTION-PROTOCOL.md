# Visual Extraction Protocol

Defines how extraction precision is determined and how to handle different levels of measurability. Always reference this document when in doubt about how precise an extracted value should be.

---

## Precision Tiers

Every extracted value must be assigned a precision tier before it is recorded.

### Tier 1 — Direct Measurement (Highest confidence — no flag required)
Apply when element boundaries are clearly visible and dimensions can be directly estimated:
- Use known anchor sizes as calibration:
  - Standard button height: 36–44px (tap target minimum: 44px)
  - Standard input height: 40–48px
  - Standard topbar height: 48–64px
  - Standard sidebar width: 200–280px
- Count visible grid columns and infer column width from proportions
- Verify by checking the same value appears consistently across multiple instances of the same element

> Output format: `16px` (no flag needed)

### Tier 2 — Proportional Inference (Medium confidence — document the anchor)
Apply when direct measurement isn't possible but a reference anchor exists:
- Establish a known anchor (card width, page margin, button height)
- Express all other values as ratios to that anchor
- Round to nearest 4px (designs almost always snap to 4pt or 8pt grid)

> Output format: `24px (proportional from card padding anchor)` — document the anchor used

### Tier 3 — Style Inference (Lower confidence — must be flagged as inferred)
Apply for values that cannot be measured from the image:
- Font family identification from letterform analysis
- Shadow blur radius from visual appearance
- Exact border-radius from rounded corners
- Hover state colors (not visible in static image)

> Output format: `Inter (inferred — humanist sans letterforms, open aperture on 'e')`

**Critical rule:** A Tier 3 value that reaches a downstream skill without its `(inferred)` flag becomes an assumed fact. This is how style drift propagates — one guessed value multiplies into every component that inherits it. Never strip the inference flag.

---

## Color Sampling Protocol

When extracting color values from a reference image:

1. **Identify the region of interest** — define it before sampling (e.g., "the primary button background")
2. **Find the representative pixel** — sample from the center of the region, avoiding:
   - Edge pixels (affected by anti-aliasing)
   - Pixels near gradients or shadows
   - Pixels at text/background boundaries
3. **Convert to HEX** — use the sampled RGB values
4. **Cross-check for gradients** — sample 3 pixels from the same region:
   - If all three match within ±5 per channel: solid color → record single hex
   - If they vary by more than ±10 per channel: gradient → document as `linear-gradient(...)` with approximate start and end hex values
5. **Group similar colors** — two grays that are only 3% apart should be one token, not two. Merge similar values before assigning token names.

### Minimum extraction per image:
Before declaring color extraction complete, verify you have identified values for:
- [ ] At least one background surface color
- [ ] At least one primary text color
- [ ] At least one secondary/muted text color
- [ ] At least one brand/accent color
- [ ] Border/separator color (if any borders are visible)

---

## Typography Calibration Anchors

Use these known reference sizes to calibrate font size estimation:

| Element | Typical Size Range | Notes |
|---------|-------------------|-------|
| Body copy | 14–16px | Most common: 16px |
| Small label / caption | 11–13px | Below 11px is usually inaccessible |
| Button label | 14–16px | Should match or be slightly smaller than body |
| H1 / Page title | 28–40px | Typically 2–2.5× body |
| H2 / Section heading | 20–28px | Typically 1.5–1.75× body |
| H3 / Card heading | 16–20px | Typically 1–1.25× body |
| Navigation items | 13–15px | Often slightly smaller than body |
| Badge text | 10–12px | Usually very small, sometimes caps |

**Calibration workflow:**
1. Identify one element whose size you can estimate with high confidence (buttons or body text)
2. Establish that as your anchor (e.g., "body text appears to be ~16px")
3. Express all other text sizes as multiples of the anchor
4. Map to closest standard pixel value

---

## Component Border Radius Classification

| Visual Appearance | Classified Radius |
|-------------------|-------------------|
| Hard corners — 90° right angle | `0px` |
| Just barely softened corners | `2–4px` |
| Noticeable but not dramatic rounding | `6–8px` |
| Clearly rounded — a dominant visual feature | `12–16px` |
| Very rounded — almost pill | `20–24px` |
| Full pill shape | `9999px` (use for any pill) |
| Perfect circle | `50%` |

---

## Component Shadow Classification

| Visual Appearance | Estimated Shadow |
|-------------------|------------------|
| No shadow visible | `none` |
| Just a slightly darker border on bottom (1px) | `0 1px 0 rgba(0,0,0,0.12)` |
| Subtle elevation, very soft | `0 1px 3px rgba(0,0,0,0.12)` |
| Clear card elevation, still soft | `0 4px 12px rgba(0,0,0,0.10)` |
| Clearly elevated, visible spread | `0 8px 24px rgba(0,0,0,0.12)` |
| High elevation — modal/drawer | `0 16px 48px rgba(0,0,0,0.18)` |

---

## Layout Structure Patterns

When identifying the overall layout structure, match it to one of these known patterns:

| Pattern Name | Description | Common In |
|-------------|-------------|-----------|
| `single-column` | No sidebar, content centered | Landing pages, blogs |
| `sidebar-left` | Fixed left sidebar + main content | Dashboards, admin panels |
| `sidebar-right` | Content + right contextual panel | Detail pages, editors |
| `dual-sidebar` | Left nav + right context panel | IDEs, complex tools |
| `top-nav-only` | Topbar navigation, no sidebar | Marketing sites, simple apps |
| `split-panel` | Two equal panels side by side | Editors, compare views |
| `grid-home` | Card grid homepage/gallery | Marketplaces, portfolios |

---

## Gap Resolution Decision Tree

When a gap is identified (something that cannot be extracted from the image):

```
Is the gap a minor style detail (hover color, focus ring)?
  YES → Infer from style signature
    Hover: darken primary by 10–15%
    Focus: use primary color at 30% opacity as ring

Is the gap an interaction behavior (animation, transition)?
  YES → Use Agentway defaults from micro-interaction-motion-design

Is the gap a layout decision for a state not shown (mobile, error)?
  YES → Can it be reasonably extrapolated from visible patterns?
    YES → Infer from style signature + document the inference
    NO  → Ask user

Is the gap a missing component (not visible in this screenshot)?
  YES → Mark as not-extracted, do not fabricate
        List it in the gaps array with resolution: "ask user"
```
