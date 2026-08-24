---
name: flow-based-functional-testing
description: Execute user flows as functional test cases and verify outcomes match the design. Use when functional testing, user flow testing, end-to-end test, verify the flow works, or test this feature.
---

**A feature is not done when it is built — it is done when a user can complete the flow you designed for them. Testing the flow is the only way to know.**

### 1. Extract test scenarios from user-flow-mapping
Every user flow defined in `user-flow-mapping` becomes a test scenario. Define the scenario attributes:
- Entry point (URL or starting state)
- Actor (user role/permission level)
- Steps (sequence of actions)
- Expected outcome (what MUST be true at the end)
- Error paths (what happens if a step fails)

### 2. Prioritize scenarios
Not all flows are equal. Order execution by business impact:
- Critical path (the flow that delivers the product's core value)
- Authentication and permission flows (most security-critical)
- Data mutation flows (create, update, delete — irreversible actions)
- Error and recovery flows (what happens when things go wrong)
- Edge cases (empty state, max length inputs, concurrent operations)

### 3. Write test cases
Use Given-When-Then format for absolute clarity. For each scenario:
- **Given:** initial state and preconditions
- **When:** sequence of user actions
- **Then:** expected outcomes (UI changes, data changes, navigation, notifications)

### 4. Generate Playwright test scaffolds
Produce an executable Playwright test for every scenario. Ensure assertions test outcomes, not implementation details.

```javascript
// Run: npx playwright test flow-tests/
test('Critical path: User completes [flow name]', async ({ page }) => {
  // Given
  await page.goto('/start-url');
  // When
  await page.click('[data-testid="action-button"]');
  // Then
  await expect(page.locator('[data-testid="success-state"]')).toBeVisible();
});
```

*Note: Use `data-testid` attributes for selectors — never CSS classes or text content.*

### 5. Execute tests and record results
Run the test suite. Record states: pass / fail / blocked (environment issue, not a product bug). For failures, capture:
- Step that failed
- Expected vs actual outcome
- Screenshot or DOM snapshot at point of failure

### 6. Map failures to PRD requirements
For every failed test, resolve the corresponding PRD requirement ID from the `prd-traceability-matrix`. The failure report must include the requirement ID. This feeds the `qa-feedback-loop-orchestrator`.

## Completion Criteria
- Every user flow from `user-flow-mapping` has at least one test scenario
- Critical path tests pass 100%
- All failures are documented with PRD requirement reference
- Playwright scaffolds are in version control and runnable
- Test results are recorded in an output report

## Output
- Test case document (Given-When-Then format for each scenario)
- Playwright test files (`flow-tests/*.spec.js`)
- Test results report (scenario × pass/fail × failure details × PRD requirement ID)

## Anti-patterns
- Writing tests only for the happy path and ignoring error flows
- Using CSS classes or display text as selectors
- Running tests only locally — they should be reproducible in any environment
- Not recording results — "it passed on my machine" is not a result
- Testing implementation details instead of user outcomes
