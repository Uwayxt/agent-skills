---
name: visual-responsive-regression-testing
description: Detect visual regressions and missing responsive transformations across breakpoints. Use when visual regression, screenshot comparison, layout broke on mobile, element overflowing, or component not transforming correctly.
---

**A visual regression is a change nobody intended. Catch it by comparing screenshots automatically — not by manually checking every screen after every change.**

### 1. Define the screenshot inventory
List every unique screen/view that needs visual regression coverage. For each view:
- Route/URL
- Authentication state required
- Data state (empty, populated, error state)
- Breakpoints to capture: all breakpoints from responsive-breakpoint-strategy

Priority: cover critical path screens first, then secondary screens.

### 2. Capture baseline screenshots
For the first run, capture baseline screenshots at every defined breakpoint for every screen. Store these as the "approved" reference images. These are the ground truth.

### 3. Generate Playwright visual regression scaffolds
Generate test files using Playwright's screenshot comparison:
```javascript
// Run: npx playwright test visual-regression/
// First run: npx playwright test --update-snapshots (captures baseline)
test('Homepage at mobile breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage-mobile.png', {
    maxDiffPixels: 100 // allow minor anti-aliasing differences
  });
});
```

### 4. Run comparison against baseline
After any code change, run the visual regression suite. The tool compares current screenshots pixel-by-pixel against the baseline. Flag any difference above the threshold.

### 5. Classify differences
Not all visual differences are bugs:
- **Intentional change**: design was updated intentionally → update baseline with `--update-snapshots`
- **Regression**: unintentional change that broke existing behavior → must be fixed
- **Environment noise**: font rendering differences, anti-aliasing → adjust threshold or ignore

For each flagged difference, classify it before acting.

### 6. Audit responsive transformations
Beyond pixel comparison, verify the transformation table from adaptive-component-behavior:
- At `bp-sm` (mobile): is the sidebar a bottom-nav? Is the table a card-list? Is the modal fullscreen?
- At `bp-md` (tablet): are intermediate transformations correct?

This cannot be done by pixel comparison alone — it requires semantic assertions (check that the element with role `navigation` has the correct structure at each breakpoint).

### 7. Report and escalate
For each regression:
- Screenshot before and after (diff highlighted)
- Breakpoint affected
- Route/component affected
- PRD requirement ID if the regression violates a specified behavior
- Recommended fix

### Completion Criteria
- Baseline screenshots captured for all critical screens at all breakpoints
- Visual regression suite runs in CI (or on-demand) after every change
- All regressions classified (intentional vs bug vs noise)
- Responsive transformation audit passed at each breakpoint
- Zero unresolved regressions at ship time

### Output
- Playwright visual regression test files (`visual-regression/*.spec.js`)
- Baseline screenshot library
- Regression report (diff images + classification + PRD reference)

### Anti-patterns
- Setting the diff threshold to 0 (every font-rendering difference becomes a false positive)
- Setting the threshold too high (real regressions get masked)
- Only testing at one or two breakpoints
- Not updating baselines after intentional design changes (leads to permanent failures)
- Relying only on pixel diff — missing the semantic transformation validation entirely
- Not running regression tests after every deploy (defeats the purpose of automated regression)
