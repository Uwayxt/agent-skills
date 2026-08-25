---
name: visual-hierarchy-review
description: Audit layout for focal point, contrast, rhythm, and CTA hierarchy. Use when visual hierarchy, does this layout read well, check contrast and rhythm, what should the eye see first, or layout review.
---

Visual hierarchy is the order in which the eye processes a page. If everything is bold, nothing is bold. If everything is the same size, nothing is important. Hierarchy is created by contrast — in size, color, weight, and spacing — not by decoration.

### 1. Squint test
Blur the layout (mentally or literally). What stands out? The things that stand out are the visual priorities. If the wrong things stand out (decorative elements, secondary actions), the hierarchy is broken.

### 2. Check the focal point
Every screen should have one primary focal point: the most important element. What is it? Is it the biggest/boldest/most contrasted thing on the page? If not, fix it.

### 3. Verify size hierarchy
Headings > subheadings > body > captions. If two text elements are the same size but have different importance, one of them is wrong. Cross-reference with typography-system tokens.

### 4. Check color contrast ratios
Primary actions should be the most visually prominent color. Secondary actions should be visually subdued. Destructive actions should be visually distinct (red/warning). Disabled elements should be clearly muted.

### 5. Verify spacing rhythm
Spacing should create groups: related items are close together, unrelated items are far apart (Gestalt proximity). Check that section gaps > group gaps > item gaps. Consistent spacing rhythm creates a sense of order.

### 6. Check alignment
Everything should align to something. Ragged left edges = visual noise. Use the grid — if something breaks the grid, it should be intentional and obvious, not accidental.

### 7. CTA hierarchy
One primary CTA per view (filled, high-contrast). Supporting actions are secondary (outlined or text). Destructive actions are visually separated. If there are 3+ primary-styled buttons visible at once, the hierarchy is flat.

## Output
Visual hierarchy audit: focal point assessment, size hierarchy check, contrast ratio check, spacing rhythm check, alignment check, CTA hierarchy check. Per-issue: observation → severity → fix recommendation.

## Completion Criteria
- [ ] Squint test performed — primary focal point named explicitly
- [ ] Every screen's most important element confirmed as the visually dominant element
- [ ] Size hierarchy verified against typography-system token scale (no two elements of different importance at the same size)
- [ ] Color contrast ratios checked for primary, secondary, and destructive CTA variants
- [ ] Spacing rhythm verified: section gap > group gap > item gap at every level
- [ ] Alignment verified against grid — any grid breaks are intentional and documented
- [ ] CTA hierarchy verified: maximum 1 primary-styled CTA per view
- [ ] Every violation rated with severity (critical / major / minor) and a fix recommendation

## Anti-patterns
- Treating contrast ratio issues as hierarchy issues — they are separate dimensions (accessibility vs. visual priority)
- Flagging a layout as broken when there is intentionally no single focal point (e.g., a gallery, a settings page) — flat hierarchy is sometimes correct
- Recommending font size increases as the default fix for hierarchy issues — weight, color, and spacing are often more effective
- Checking only headings and ignoring interactive element hierarchy (buttons, links, badges can break hierarchy too)
