# Skill Map

A reference for understanding how Agentway's 35 skills relate to each other — which skills feed data into which, and which order they activate in a typical product workflow.

---

## Dependency Flow

Skills are not independent. Each skill's output becomes the input for downstream skills. Understanding this chain helps you get the most out of Agentway.

```
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 1: UNDERSTAND THE PROBLEM                                    │
│                                                                     │
│  product-discovery ──────────────────────────────────────────────┐  │
│  business-model-reading ──────────────────────────────────────┐  │  │
│  stakeholder-requirement-mapping ──────────────────────────┐  │  │  │
│                                                            ▼  ▼  ▼  │
│                                              product-strategy        │
│                                              business-model-thinking │
│                                              mvp-scoping            │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 2: STRUCTURE THE PRODUCT                                     │
│                                                                     │
│  user-flow-mapping ──────────────────────────────────────────────┐  │
│  information-architecture ───────────────────────────────────────┘  │
│  user-research-synthesis (feeds into both above)                    │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 3: BUILD THE VISUAL LANGUAGE                                 │
│                                                                     │
│  design-tokens ──────────────────────────────────────────────────┐  │
│  typography-system ──────────────────────────────────────────────┤  │
│  micro-interaction-motion-design ────────────────────────────────┘  │
│                  │                                                  │
│                  ▼                                                  │
│  responsive-breakpoint-strategy                                     │
│  adaptive-component-behavior (reads design-tokens)                  │
│  touch-gesture-interaction                                          │
│  perceived-performance-loading                                      │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 4: BUILD THE COMPONENT SYSTEM                                │
│                                                                     │
│  design-system-builder ──────────────────────────────────────────┐  │
│  component-style-guide (reads design-system-builder) ────────────┤  │
│  dashboard-layout-patterns ──────────────────────────────────────┘  │
│  visual-hierarchy-review                                            │
│  usability-heuristics-check                                         │
│  accessibility-review                                               │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 5: STRUCTURE FOR GROWTH                                      │
│                                                                     │
│  dashboard-scaffolding-contract (reads information-architecture)    │
│  module-registry-sync ──── runs on every new module                 │
│  route-integrity-checker ── runs on every new page                  │
│  growth-impact-review ────── runs after every addition              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 6: DELIVER                                                   │
│                                                                     │
│  design-to-code-handoff (consumes all Phase 3–5 outputs)            │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 7: QA LOOP (runs continuously, not once)                     │
│                                                                     │
│  prd-traceability-matrix ─────────────────────────────────────┐    │
│                                                               │    │
│  interactive-element-audit ─────────────────────────────────┐ │    │
│  flow-based-functional-testing ─────────────────────────────┤ │    │
│  visual-responsive-regression-testing ──────────────────────┤ ▼    │
│  accessibility-runtime-audit ───────────────────────────────┤      │
│  responsive-qa-audit ───────────────────────────────────────┘      │
│                    │                                               │
│                    ▼                                               │
│  qa-feedback-loop-orchestrator                                     │
│  → batches findings → triggers builder skills → retests            │
│  → after 3 failed attempts → escalates to human                   │
│                    │                                               │
│                    └──── if all pass ────────────────────────────┐ │
└──────────────────────────────────────────────────────────────────┼─┘
                              │                                    │
                              ▼                                    │
               cross-functional-review ◄──────────────────────────┘
                              │
                              ▼
                    Ship / No-Ship verdict
```

---

## Skill Trigger Quick Reference

Use this table to quickly find the right skill for a given task.

### When you want to...

| Intent | Skill to invoke |
|--------|----------------|
| Validate a business idea before building | `product-discovery` |
| Understand the business model and derive modules | `business-model-reading` |
| Figure out what to build first | `mvp-scoping` + `product-strategy` |
| Map how users navigate the product | `user-flow-mapping` + `information-architecture` |
| Set up the visual design language | `design-tokens` → `typography-system` |
| Define motion and animation | `micro-interaction-motion-design` |
| Build a component library | `design-system-builder` → `component-style-guide` |
| Choose a layout shell (sidebar, topbar, bottom-nav) | `dashboard-layout-patterns` |
| Make the product work on mobile correctly | `responsive-breakpoint-strategy` → `adaptive-component-behavior` → `touch-gesture-interaction` |
| Design loading states | `perceived-performance-loading` |
| Wire a dashboard to auto-show new modules | `dashboard-scaffolding-contract` → `module-registry-sync` |
| Audit for dead-end buttons or broken links | `route-integrity-checker` + `interactive-element-audit` |
| Check what breaks when a new module is added | `growth-impact-review` |
| Hand off design to engineers | `design-to-code-handoff` |
| Track which PRD requirements are implemented | `prd-traceability-matrix` |
| Test a user flow end-to-end | `flow-based-functional-testing` |
| Catch visual regressions across breakpoints | `visual-responsive-regression-testing` |
| Run accessibility on the real build | `accessibility-runtime-audit` |
| Audit mobile layout before shipping | `responsive-qa-audit` |
| Orchestrate all QA and auto-fix findings | `qa-feedback-loop-orchestrator` |
| Do a final review before shipping | `cross-functional-review` |

---

## Skills by Context

Not every project needs every skill. Here is which skills are relevant by product type.

### SaaS / Web Application
**All 35 skills apply.** Follow the complete end-to-end flow.

### Mobile-First Product (iOS/Android/PWA)
Priority skills:
- `touch-gesture-interaction` — mandatory
- `adaptive-component-behavior` — mandatory
- `responsive-breakpoint-strategy` — mandatory
- `perceived-performance-loading` — mandatory
- `responsive-qa-audit` — mandatory
- `dashboard-layout-patterns` — use the bottom-nav shell pattern

### Landing Page / Marketing Site
Focus on:
- `product-discovery`, `user-flow-mapping`
- `design-tokens`, `typography-system`, `visual-hierarchy-review`
- `route-integrity-checker` — critical for CTA → page connections
- `responsive-qa-audit`, `accessibility-review`

### Internal Dashboard / Back-Office Tool
Focus on:
- `information-architecture`, `dashboard-layout-patterns`, `dashboard-scaffolding-contract`
- `module-registry-sync`, `growth-impact-review`
- `component-style-guide`, `design-tokens`
- Skip `touch-gesture-interaction` unless tablet usage is expected

### Design System (Standalone)
Focus on:
- `design-tokens` → `typography-system` → `design-system-builder` → `component-style-guide`
- `micro-interaction-motion-design`
- `visual-hierarchy-review`, `accessibility-review`
