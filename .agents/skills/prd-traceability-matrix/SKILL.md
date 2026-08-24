---
name: prd-traceability-matrix
description: Map every PRD requirement to its UI element, route, and implementation status. Use when traceability, requirement tracking, PRD coverage, what has been built, or which requirements are missing.
---

**A requirement without a trace is a requirement that will be forgotten. Every user story, acceptance criterion, and feature in the PRD must map to exactly one or more UI elements — or be explicitly marked as not yet implemented.**

### 1. Parse the PRD
Extract every requirement. Isolate the minimum unit: one user story or acceptance criterion. Assign each a unique ID (US-001, AC-001, etc.) if not already numbered. Record:
- ID
- Requirement text (one sentence)
- Category (functional / non-functional / UX / business rule)
- Priority (must-have / should-have / nice-to-have)

### 2. Map to UI elements
For each requirement, identify:
- Which page/screen implements it
- Which component handles it (button, form, table, etc.)
- Which route is involved
- Which function/handler is responsible (if known)

### 3. Assign implementation status
Determine current status against four discrete states:
- `DONE`: implemented and verified
- `IN_PROGRESS`: partially implemented
- `NOT_STARTED`: not yet implemented
- `DEFERRED`: explicitly deferred to later phase
- `BLOCKED`: cannot proceed (dependency or decision needed)

### 4. Identify gaps
Locate requirements with status `NOT_STARTED` that are must-have priority. Flag them explicitly as blockers. Requirements with no UI mapping at all are critical gaps.

### 5. Generate the matrix
Output as a structured table based on `MATRIX-TEMPLATE.md`. Treat the matrix as a living document. Update it every time a feature is completed.

### 6. Link to downstream QA
Feed this matrix to the `qa-feedback-loop-orchestrator` as the authoritative source for "which PRD requirement does this bug violate?". Never let the QA loop report a bug without citing its PRD requirement ID.

## Completion Criteria
- Every PRD requirement has a unique ID
- Every requirement has a status (no blank status cells)
- Every must-have requirement is either DONE or explicitly flagged
- All gaps are documented with rationale
- Matrix is saved as a file in the workspace

## Output
- `prd-traceability-matrix.md` — structured table with columns: ID | Requirement | Category | Priority | Screen/Page | Component | Route | Status | Notes

## Anti-patterns
- Writing requirements as vague goals instead of testable statements
- Not assigning IDs — makes cross-referencing in QA loop impossible
- Treating the matrix as a one-time artifact — it must be updated continuously
- Marking requirements as DONE based on visual inspection without functional verification
- Including implementation details in the requirements column (the matrix captures WHAT, not HOW)
