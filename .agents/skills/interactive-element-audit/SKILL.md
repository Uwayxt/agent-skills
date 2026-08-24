---
name: interactive-element-audit
description: Scan all interactive elements for missing handlers, broken links, and unconnected state changes. Use when buttons without actions, orphaned interactive elements, dead links, form without submit, or incomplete interactions.
---

**Every interactive element is a promise to the user. A button that does nothing breaks trust. An audit that only checks if buttons exist — but not if they work — is not an audit.**

### 1. Enumerate all interactive elements
Systematically collect every element that a user can interact with across the application:
- Buttons (submit, CTA, icon buttons, toggle buttons)
- Links and anchor tags (internal routes, external URLs)
- Form inputs (text, select, checkbox, radio, file upload)
- Form submit controls
- Toggle controls (switch, accordion, tab, collapse)
- Drag handles, resize handles
- Keyboard-navigable elements (anything with `tabindex`)

### 2. Classify each element's required behavior
For each element, define what MUST happen upon interaction:
- Button: what action fires on click/tap?
- Link: what route/URL does it navigate to?
- Form: what happens on submit? Where does data go?
- Toggle: what state changes occur and what persists?

### 3. Detect orphaned elements
Identify elements that fail to fulfill their promise. An element is "orphaned" if:
- Button has no `onClick` / event handler attached
- Link has `href="#"` or `href=""` or missing `href`
- Form has no `onSubmit` or `action`
- Toggle changes visual state but does not update application state

*Note: Intentionally disabled vs actually broken. An element is NOT orphaned if it is disabled by explicit logic (e.g., `disabled` attribute with a condition). Check for the presence of a disable condition before flagging.*

### 4. Cross-reference with PRD traceability matrix
For each orphaned element, look up which PRD requirement it should satisfy. Report context precisely: "Button 'X' on page 'Y' has no handler. PRD requirement US-014 requires this button to trigger export."

### 5. Generate the audit report
For each orphaned element, document:
- Element type and identifier (label, ID, or selector)
- Location (page, route, component)
- Expected behavior (from PRD or design spec)
- PRD requirement ID (from prd-traceability-matrix)
- Recommended fix

### 6. Generate a Playwright test scaffold
Output an automated test file that verifies the expected behavior of all interactive elements.

```javascript
// Playwright scaffold for interactive element audit
// Run: npx playwright test element-audit.spec.js
```

The scaffold must programmatically click every enumerated button and assert that something changes (URL, DOM content, or network request). Forms must be filled and submitted. Links must navigate.

## Completion Criteria
- Every interactive element enumerated
- Every element classified as: functional / orphaned / intentionally-disabled
- Every orphaned element linked to a PRD requirement
- Playwright scaffold generated and runnable
- Zero orphaned elements remaining (or explicitly deferred with justification)

## Output
- Interactive element audit report document
- Playwright test scaffold (`element-audit.spec.js`)

## Anti-patterns
- Auditing only buttons and missing links, forms, toggles
- Flagging disabled elements as orphaned without checking if the disabled state is conditional
- Reporting orphaned elements without linking them to PRD requirements
- Running the audit only once at the end — it must run after every new page/component is added
