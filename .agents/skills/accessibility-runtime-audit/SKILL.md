---
name: accessibility-runtime-audit
description: Run accessibility checks on the actual built product, not just the design. Use when accessibility audit, a11y runtime check, WCAG on real build, screen reader, keyboard navigation, or ARIA attributes.
---

**A design that meets WCAG on paper can still fail in the browser. Runtime accessibility audit runs against the DOM that users actually experience — not the design file, not the code review, the live product.**

### 1. Run automated axe-core scan
Use axe-core (via Playwright or browser extension) to scan every route for automated WCAG violations. Generate and save the report.
```javascript
// Playwright + axe-core scaffold
import { checkA11y } from 'axe-playwright';
test('Accessibility audit: Homepage', async ({ page }) => {
  await page.goto('/');
  await checkA11y(page, null, {
    runOnly: ['wcag2a', 'wcag2aa'],
    detailedReport: true,
    detailedReportOptions: { html: true }
  });
});
```
Scope: run against all routes defined in information-architecture sitemap.

### 2. Manual keyboard navigation test
Automated tools miss many keyboard issues. Manually verify:
- Tab order follows visual reading order (left-to-right, top-to-bottom)
- Every interactive element is reachable by Tab
- Focus is visible at all times (never disappears between elements)
- `Escape` closes modals, dropdowns, and drawers
- `Enter` and `Space` activate buttons and toggle controls
- No keyboard trap (user cannot be stuck inside a component)

### 3. Verify contrast ratios on actual rendered colors
design-tokens define colors, but CSS overrides, opacity, and background layering can change actual contrast in the browser. Test with the browser color picker:
- Body text on background: >= 4.5:1 (WCAG AA)
- Large text (>=18pt or bold >=14pt) on background: >= 3:1
- Interactive element boundaries: >= 3:1
- Disabled text is exempt but should still be readable

### 4. Audit ARIA attributes
Common ARIA mistakes to check:
- `role` attributes are valid and appropriate
- All ARIA `labelledby` and `describedby` references point to existing elements
- Dynamic content updates use `aria-live` regions where appropriate
- Icons without text have `aria-label` or `aria-hidden="true"` (never both missing)
- Custom components implement the correct ARIA pattern (e.g., custom dropdown uses `role="combobox"` correctly)

### 5. Screen reader spot-check
Use VoiceOver (macOS/iOS) or NVDA (Windows) for at minimum the critical path:
- Announce meaningful content in the correct order
- Buttons announce their purpose (not just "button")
- Form errors are announced when they appear
- Loading states are announced
- Images have meaningful alt text (or are marked decorative)

### 6. Classify violations by severity
axe-core uses: critical / serious / moderate / minor. At minimum:
- Critical and serious violations are release blockers
- Moderate violations should be fixed in the same release
- Minor violations are tracked for next iteration

### Completion Criteria
- axe-core scan run on all routes, zero critical/serious violations
- Keyboard navigation manually verified for critical path
- Contrast ratios verified on actual rendered output
- ARIA audit complete
- Screen reader spot-check done on critical path
- All violations classified and tracked

### Output
- axe-core Playwright test files (`a11y-audit/*.spec.js`)
- Accessibility audit report (violation x severity x route x recommended fix)
- Keyboard navigation checklist (completed)

### Anti-patterns
- Treating automated axe-core as a complete a11y audit — it catches ~30% of WCAG issues
- Testing only with keyboard, ignoring screen readers (different experience)
- Using `aria-label` on everything instead of proper semantic HTML (masks the real problem)
- Marking contrast as "passed" based on design file colors without checking actual rendered output
- Fixing violations by hiding elements from accessibility tree (`aria-hidden`) instead of making them accessible
