---
name: design-system-builder
description: Construct a cohesive UI component library. Use when assembling reusable elements, setting up a UI kit, or auditing component consistency.
---
# Design System Builder

A design system is a **strict contract of composition**, not a loose collection of parts. 

## Pipeline Integration
- **Upstream:** This skill requires `design-tokens` and `typography-system` to be defined first — components are built ON tokens, not alongside them.
- **Downstream:** After defining each component, run it through `component-style-guide` to document all states. The design system is incomplete until every component has a full state matrix. Every interactive component must specify its motion behavior via `micro-interaction-motion-design`. Reference motion tokens, not raw CSS transitions.

### 1. Token Audit
Ensure the foundation exists. Do not build components with hardcoded hex codes, raw pixel values, or arbitrary spacing. Use semantic tokens exclusively.

### 2. Base Components First
Build the primitives: Buttons, Inputs, Cards. Compose larger organisms only from these stable atoms.

### 3. Define States and Behaviors
Every component must account for its lifecycle: Default, Hover, Active, Disabled, Focus, Error. Specify motion token behaviors for transitions.

### 4. Audit Existing Libraries
1. Inventory all instances of a component type in the product.
2. Identify the core variants actually needed.
3. Consolidate to the minimum set of flexible variants.
4. Replace raw values with tokens.

## Anti-Patterns
- **Premature Abstraction:** Building complex organisms before the atoms are stable.
- **Token Avoidance:** Hardcoding values "just for this one component."
- **State Neglect:** Forgetting to design focus and error states.

## Completion Criteria
- [ ] `design-tokens` and `typography-system` are defined and utilized.
- [ ] Every base component exists and relies purely on tokens.
- [ ] The `component-style-guide` contains a full state matrix.
- [ ] Interactive elements specify motion token behaviors.

## Output Format
A comprehensive Figma library or code component registry, accompanied by a Markdown inventory mapping components to their token dependencies.
