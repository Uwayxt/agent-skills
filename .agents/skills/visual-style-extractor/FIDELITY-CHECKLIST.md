# Fidelity Checklist

After generating UI components or layouts from an extracted style manifest, verify against the original reference image using this checklist. Run this before passing output to `design-to-code-handoff` or delivering to the user.

---

## How to Use This Checklist

1. Open the original reference image alongside the generated output
2. Work through each level in order — earlier levels have higher visual impact
3. Mark each item ✅ (pass) or ❌ (fail — note the specific issue)
4. Calculate the fidelity score at the end
5. Use the score to determine whether to proceed or revise

---

## Level 1 — Color Fidelity (Highest visual impact)

- [ ] **Primary CTA color** matches the reference (within 10% luminance tolerance)
- [ ] **Background / surface color** matches the reference — no unexpected warmth or coolness
- [ ] **Text primary color** matches — dark enough vs. the background
- [ ] **Text secondary color** is visually distinct from primary text but in the same family
- [ ] **No color appears in the generated UI that does not exist in the extracted palette** — no out-of-palette decisions

**Level 1 Score:** __ / 5

---

## Level 2 — Typography Fidelity

- [ ] **Heading vs. body size ratio** matches the reference — heading should feel proportionally dominant
- [ ] **Font weight distribution** matches — heavier headings, lighter body text
- [ ] **Text color hierarchy** matches — primary text is darker than secondary
- [ ] **Line-height/density** feels similar — text is not more cramped or more airy than the reference
- [ ] **Font family character** matches — geometric vs. humanist vs. serif feel is preserved

**Level 2 Score:** __ / 5

---

## Level 3 — Spacing Fidelity

- [ ] **Card / panel padding** feels proportionally similar — not too tight, not too spacious
- [ ] **Gap between list items** matches the reference density
- [ ] **Section spacing** (the largest gap on the page) feels proportionally similar
- [ ] **Button padding** (both horizontal and vertical) matches reference proportions
- [ ] **Consistent rhythm** — spacing relationships between elements look intentional, not random

**Level 3 Score:** __ / 5

---

## Level 4 — Component Shape Fidelity

- [ ] **Button border radius** matches the reference classification (sharp / slight / moderate / rounded / pill)
- [ ] **Card border radius** matches the reference classification
- [ ] **Shadow level** matches (flat / subtle / elevated) — generated output is not more raised or flatter than reference
- [ ] **Border visibility** matches — if the reference has no visible borders, the output should not either
- [ ] **Component density** matches — elements inside components are spaced proportionally

**Level 4 Score:** __ / 5

---

## Level 5 — Style DNA Fidelity (Subjective impression)

- [ ] **Aesthetic register** matches — minimal vs. rich, flat vs. elevated, corporate vs. playful
- [ ] **Color temperature** matches — warm vs. cool vs. neutral overall feeling
- [ ] **Overall density** matches — dense data-heavy vs. spacious content-sparse
- [ ] **First impression** — someone who sees both images back-to-back would say "this is clearly inspired by that"
- [ ] **Nothing feels incongruous** — there are no elements that look like they came from a different design system

**Level 5 Score:** __ / 5

---

## Total Fidelity Score

| Score | Rating | Action |
|-------|--------|--------|
| **23–25** | ⭐ Excellent | < 5% visual deviation. Proceed to delivery. |
| **19–22** | ✅ Good | Noticeable but acceptable differences. Optionally revise Level 1 or 2 failures. |
| **14–18** | ⚠️ Needs Revision | Significant gaps visible at first glance. Identify which levels failed and re-run extraction for those dimensions. |
| **10–13** | 🔴 Major Rework | Multiple dimensions off. Re-run the extraction with more careful sampling before regenerating. |
| **< 10** | ❌ Failed | Extraction was incorrect at a fundamental level. Restart extraction with a clearer or higher-resolution image if possible. |

---

## Level-by-Level Failure Diagnosis

If specific levels fail, focus revision on these areas:

| Level Failed | Most Likely Root Cause | Fix |
|-------------|------------------------|-----|
| Level 1 (Color) | Color was approximated instead of sampled | Re-extract color with closer attention to the region's dominant pixel |
| Level 2 (Typography) | Font size ratio was wrong | Recalibrate using the button text as a 14–16px anchor |
| Level 3 (Spacing) | Base grid unit wrong | Re-identify the base unit by checking 3+ consistent gaps |
| Level 4 (Components) | Radius/shadow misread | Re-classify using EXTRACTION-PROTOCOL.md tables |
| Level 5 (Style DNA) | Style DNA paragraph was inaccurate | Rewrite the style DNA paragraph and regenerate with it as the explicit north star |

---

## Inference Audit (Run This Before Finalizing)

Before submitting, review all values in `style-extraction.json` marked as `(inferred)`. For each:

- [ ] Is the inferred value plausible given the style DNA?
- [ ] Is it consistent with other extracted values (e.g., font weight inference matches visual stroke width)?
- [ ] Has it been flagged in the gaps array so downstream skills can treat it appropriately?

If any inferred value cannot pass these three checks, escalate to user for clarification rather than proceeding with a weak inference.
