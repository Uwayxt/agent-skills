---
name: accessibility-runtime-audit
description: Run accessibility checks on the actual built product, not just the design. Use when accessibility audit, a11y runtime check, WCAG on real build, screen reader, keyboard navigation, or ARIA attributes.
---

**A design that meets WCAG on paper can still fail in the browser. Runtime accessibility audit runs against the DOM that users actually experience — not the design file, not the code review, the live product.**

### 1. Run automated axe-core scan (WCAG 2.2 AA target)
Use axe-core via Playwright to scan every route for automated violations.
```javascript
// Playwright + axe-core scaffold
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility audit (WCAG 2.2 AA)', async ({ page }) => {
  await page.goto('/');
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### 2. Manual keyboard navigation & focus appearance test
Automated tools catch only ~30% of accessibility issues. Manually verify:
- **Tab order**: Follows logical reading order (left-to-right, top-to-bottom).
- **Focus visibility & contrast (WCAG 2.2 Focus Appearance)**: Focus ring must have at least a 3:1 contrast ratio against both the focused element and the surrounding background, with a minimum 2px thickness. Never use `outline: none` without a high-contrast replacement.
- **Keyboard traps**: Verify user can tab in AND out of all modals, dropdowns, code blocks, and data tables.
- **Escape / Enter / Space**: `Escape` dismisses overlays; `Enter`/`Space` activates buttons and toggles.

### 3. Verify WCAG 2.2 Target Size & Dragging Alternatives
- **Target Size (Minimum 2.5.8)**: All interactive targets (buttons, links, icon toggles) must be at least 24×24 CSS pixels, or have sufficient spacing offset, unless inline within a sentence.
- **Dragging Movements (2.5.7)**: Any drag-and-drop flow (e.g. Kanban boards, reordering lists) must offer a single-pointer alternative (e.g. "Move Up", "Move Down" buttons or keyboard shortcuts).

### 4. Verify rendered contrast ratios
Measure actual computed pixel colors in the browser (accounting for opacity and alpha blending):
- Body text (< 18pt normal): ≥ 4.5:1 (WCAG AA)
- Large text (≥ 18pt normal or ≥ 14pt bold): ≥ 3:1
- UI components and graphical objects: ≥ 3:1

### 5. Audit ARIA attributes & live regions
- Dynamic asynchronous updates (toasts, streaming tokens, search counts) must use `aria-live="polite"` (or `assertive` for urgent alerts).
- Icon buttons without text MUST have `aria-label` or `<title>`.
- Decorative graphics must have `aria-hidden="true"` or `alt=""`.

### 6. Screen reader spot-check
Conduct a walkthrough on the critical path using native screen readers:

#### macOS VoiceOver Quick Reference:
- **Toggle VoiceOver**: `Cmd + F5`
- **Read next element**: `Ctrl + Option + Right Arrow`
- **Activate element**: `Ctrl + Option + Space`
- **Rotor (Headings/Landmarks menu)**: `Ctrl + Option + U`
- **Read from top**: `Ctrl + Option + Home`

#### Windows NVDA Quick Reference:
- **Next element**: `Down Arrow`
- **Next heading**: `H`
- **Next button**: `B`
- **Next landmark**: `D`

## Completion Criteria
- [ ] axe-core scan completed with 0 critical or serious violations against WCAG 2.2 AA
- [ ] Focus indicator clearly visible on all interactive elements (≥ 3:1 contrast against surface)
- [ ] All interactive touch/click targets meet WCAG 2.2 minimum 24×24px requirement
- [ ] Drag-and-drop workflows provide keyboard/click alternative actions
- [ ] ARIA live regions tested for asynchronous updates
- [ ] VoiceOver or NVDA spot-check completed on critical path (Login -> Core Task -> Success)

## Output
- Playwright automated audit suite (`tests/a11y.spec.js`)
- `a11y-runtime-report.md` classifying all findings by severity (Critical / Serious / Moderate / Minor) with explicit WCAG 2.2 criterion tags and DOM selector locations.

## Anti-patterns
- Treating automated axe-core as 100% test coverage (misses keyboard traps and logical reading flow).
- Using `outline: none` in CSS to remove the default browser ring without custom focus styling.
- Slapping `aria-label` on every container instead of using semantic HTML5 elements (`<main>`, `<nav>`, `<button>`).
- Silencing screen readers with blanket `aria-hidden="true"` on complex interactive widgets.
