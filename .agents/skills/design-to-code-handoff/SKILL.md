---
name: design-to-code-handoff
description: Map design specs to implementation-ready code tasks. Use when handoff to dev, implement this design, turn spec into code, design to code, or start building from the design.
---

# Design-to-Code Handoff

The handoff is where designs go to die. Every missing spec forces an engineer to guess; every guess is a coin flip between "matches the design" and "doesn't." This skill eliminates guessing by producing a complete, implementation-ready spec that maps every visual decision to code.

## Process

### 1. Collect all design artifacts
Gather upstream outputs from the product design pipeline:
- **Design tokens** (from design-tokens) — color, spacing, radius, shadow, breakpoint definitions
- **Typography scale** (from typography-system) — font pairing, sizes, weights, line-heights
- **Component specs** (from design-system-builder) — atoms, molecules, organisms with props and states
- **State matrices** (from component-style-guide) — every variant × state combination
- **Layout spec** (from dashboard-layout-patterns) — shell pattern, grid, responsive behavior
- **Motion spec** (from micro-interaction-motion-design) — transitions, feedback animations, motion tokens
- **User flows** (from user-flow-mapping) — entry points, decision paths, error flows

If any artifact is missing, flag it — do not proceed with gaps. Every gap becomes a guess downstream.

### 2. Generate the component implementation checklist
For each component in the design:
- Which existing component in the codebase matches? (exact match / partial / none)
- If none, what new component is needed? Name it, describe its responsibility.
- Props/variants needed for this usage — cross-reference with component-style-guide.
- Token references for **all** visual properties: background, text color, padding, margin, border-radius, shadow, font-size, font-weight. No raw values allowed.
- Responsive behavior at each breakpoint — how does this component change across `breakpoint-sm` → `breakpoint-xl`?

### 3. Map layout to code structure
Translate the layout spec into a file/component tree:
- Which component owns which section of the layout?
- Where do data fetches live? (page level / component level / shared)
- How does routing work? Map routes from information-architecture.
- What shared state is needed? (user session, module data, UI state)

Produce a tree diagram showing the component hierarchy with file paths.

### 4. Spec interactions and states
For each interactive element: **trigger → action → visual feedback → state change**.
- Reference the component-style-guide state matrix for visual changes.
- Reference the motion spec for transition timing and easing.
- Don't leave any interaction as "obvious" — spell it out. "Button click saves form" is incomplete. "Button click → button enters loading state (spinner, disabled) → POST /api/form → on success: toast success, reset form, button returns to default → on error: toast error with message, button returns to default" is a spec.

### 5. Produce the implementation file list
Ordered list of files to create/modify. For each file:
- File path (following project conventions)
- Purpose (one sentence)
- Components involved (imported / exported)
- Tokens used (list token names)
- Dependencies (other files that must exist first)
- Estimated complexity: S / M / L

Order by dependency: files with no dependencies first, files that depend on others after.

### 6. Verify token coverage
Cross-reference every color, spacing, radius, shadow, and font-size in the spec against design-tokens. Flag any value that isn't a token — raw values are spec bugs that will diverge across components.

### 7. Verify flow coverage
Walk through every user flow from user-flow-mapping against the component tree:
- Can every flow be completed using the specced components?
- Are error states, loading states, and empty states covered?
- Does every CTA connect to a real route? (cross-reference with route-integrity-checker)

## Completion criteria

Done when:
- [ ] Every visual element maps to a component
- [ ] Every component maps to tokens (zero raw values)
- [ ] The file list is ordered, dependency-resolved, and actionable
- [ ] Every user flow is walkable through the component tree
- [ ] Every interactive element has a trigger → action → feedback → state chain

Not done if any element says "use appropriate styling" — that's a guess, not a spec.

## Output format
Implementation checklist artifact (Markdown):
1. Design artifact inventory (collected / missing)
2. Component implementation checklist (component → props → tokens → responsive)
3. Component hierarchy tree (with file paths)
4. Interaction specs (trigger → action → feedback → state)
5. Implementation file list (ordered by dependency)
6. Token coverage report (pass / violations)
7. Flow coverage report (complete / gaps)

## Anti-patterns
- Handing off a screenshot instead of a spec.
- Token references that say "see design system" without specifying which token.
- Specs that describe appearance but not behavior.
- File lists without dependency ordering — leads to blocked work and circular imports.
- Skipping the flow coverage check — leads to components that render but don't connect into a usable product.
