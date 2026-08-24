---
name: accessibility-review
description: Audit against WCAG 2.1 AA across perceivable, operable, understandable, robust. Use when accessibility, a11y, WCAG, contrast, screen reader, tap target, or is this accessible.
---

# Accessibility is a Constraint, Not a Checkbox

Accessibility is not a checkbox at the end — it's a constraint from the start. Every inaccessible element is a user you've locked out. Audit against WCAG 2.1 AA as the baseline; anything less is a known risk.

### 1. Perceivable
- **Color contrast:** Text against background meets 4.5:1 for normal text, 3:1 for large text. Check every color pairing in the design tokens.
- **Non-text content:** Every image, icon, and chart has alt text or aria-label.
- **State indicators:** Color is not the sole indicator of state (error = red + icon + text, not just red).

### 2. Operable
- **Keyboard navigation:** Every interactive element is reachable via Tab and activatable via Enter/Space. Tab order follows visual order.
- **Focus indicators:** Visible focus ring on every focusable element. Never `outline: none` without a replacement.
- **Tap targets:** Minimum 44×44px on touch devices.
- **No keyboard traps:** Modals, dropdowns, and popovers must allow escape via Esc.

### 3. Understandable
- **Labels:** Every form input has a visible label (not just placeholder text).
- **Error messages:** Specific ("Email must contain @"), not generic ("Invalid input").
- **Language:** Page declares `lang` attribute.
- **Predictable:** Similar things behave similarly across the product.

### 4. Robust
- **Semantic HTML:** Use `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<header>`, `<footer>` for landmarks.
- **ARIA:** Use ARIA roles/properties only when semantic HTML is insufficient.
- **Heading hierarchy:** `h1` → `h2` → `h3`, no skipping levels.

## Output Format
- Accessibility audit checklist: criterion → pass/fail → evidence → fix recommendation.
- Summary: total pass, total fail, severity of failures.

## Completion Criteria
Done when every criterion in the 4 categories has been evaluated. Not done if "we'll check accessibility later."
