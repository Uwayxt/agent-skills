# 🗺️ Complete Skill Catalog (41 Skills)

This encyclopedia lists all **41 production-grade skills** across the 9 specialized domains of Agentway.

# Skill Map

A reference for understanding how Agentway 41 skills relate to each other — which skills feed data into which, and which order they activate in a typical product workflow.

---

## Dependency Flow

Skills are not independent. Each skill output becomes the input for downstream skills. Understanding this chain helps you get the most out of Agentway.

```
+---------------------------------------------------------------------+
|  PHASE 0: VISUAL INTELLIGENCE (Optional Entry Point)                |
|                                                                     |
|  [User Uploads Reference Screenshot / Mockup]                       |
|                         |                                           |
|                         v                                           |
|             visual-style-extractor                                  |
|             (outputs style-extraction.json token & component seed)  |
+-------------------------+-------------------------------------------+
                          |
                          v
+---------------------------------------------------------------------+
|  PHASE 1: UNDERSTAND THE PROBLEM                                    |
|                                                                     |
|  product-discovery ----------------------------------------------+  |
|  business-model-reading --------------------------------------+  |  |
|  stakeholder-requirement-mapping --------------------------+  |  |  |
|                                                            v  v  v  |
|                                              product-strategy       |
|                                              business-model-thinking|
|                                              mvp-scoping            |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|  PHASE 2: STRUCTURE THE PRODUCT                                     |
|                                                                     |
|  user-flow-mapping ----------------------------------------------+  |
|  information-architecture ---------------------------------------+  |
|  user-research-synthesis (feeds into both above)                    |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|  PHASE 3: BUILD THE VISUAL LANGUAGE & THEMES                        |
|                                                                     |
|  design-tokens (ingests style-extraction.json if available) -----+  |
|  typography-system ----------------------------------------------+  |
|  dark-mode-theming-system ---------------------------------------+  |
|  micro-interaction-motion-design --------------------------------+  |
|                  |                                                  |
|                  v                                                  |
|  responsive-breakpoint-strategy                                     |
|  adaptive-component-behavior (reads design-tokens)                  |
|  touch-gesture-interaction                                          |
|  i18n-localization-strategy (RTL & string expansion)                |
|  perceived-performance-loading                                      |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|  PHASE 4: BUILD THE COMPONENT & RESILIENCE SYSTEM                   |
|                                                                     |
|  design-system-builder ------------------------------------------+  |
|  component-style-guide (reads design-system-builder) ------------+  |
|  ai-feature-ux-patterns (streaming, confidence, overrides) ------+  |
|  error-boundary-resilience-design (empty, error, offline states) -+  |
|  dashboard-layout-patterns --------------------------------------+  |
|  visual-hierarchy-review                                            |
|  usability-heuristics-check                                         |
|  accessibility-review                                               |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|  PHASE 5: STRUCTURE FOR GROWTH                                      |
|                                                                     |
|  dashboard-scaffolding-contract (reads information-architecture)    |
|  module-registry-sync ---- runs on every new module                 |
|  route-integrity-checker -- runs on every new page                  |
|  growth-impact-review ------ runs after every addition              |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|  PHASE 6: DELIVER & SECURITY AUDIT                                  |
|                                                                     |
|  security-privacy-review (auth boundaries, PII masking, RBAC) ---+  |
|  design-to-code-handoff (consumes all Phase 3-5 outputs) --------+  |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|  PHASE 7: QA LOOP (runs continuously, not once)                     |
|                                                                     |
|  prd-traceability-matrix -------------------------------------+     |
|                                                               |     |
|  interactive-element-audit ---------------------------------+ |     |
|  flow-based-functional-testing -----------------------------+ |     |
|  visual-responsive-regression-testing ----------------------+ v     |
|  accessibility-runtime-audit (WCAG 2.2 AA) -----------------+       |
|  responsive-qa-audit (automated Playwright viewports) ------+       |
|                    |                                                |
|                    v                                                |
|  qa-feedback-loop-orchestrator                                      |
|  -> batches findings -> auto-fixes or triggers builder -> retests   |
|  -> after 3 failed attempts -> escalates to human                   |
|                    |                                                |
|                    +---- if all pass ----------------------------+  |
+------------------------------------------------------------------+--+
                              |                                    |
                              v                                    |
               cross-functional-review <---------------------------+
                              |
                              v
                    Ship / No-Ship verdict
```

---

---

## 📊 Skill Ecosystem Telemetry & Domain Distribution

| Domain | Skill Count | Primary Artifact Outputs | Upstream Input Required | Downstream Consumers |
| :--- | :---: | :--- | :--- | :--- |
| **Domain H: Visual Intelligence** | 1 | `style-extraction.json` | Reference Image / Mockup | `design-tokens`, `typography-system` |
| **Domain A: Product Thinking** | 6 | `discovery_synthesis.md`, `product_strategy_one_pager.md` | Business Model / Idea | `user-flow-mapping`, `information-architecture` |
| **Domain B: User Experience** | 4 | User Flow Diagrams, `sitemap.md`, Insight Matrices | Discovery synthesis | `design-tokens`, `dashboard-scaffolding` |
| **Domain C: UI & Design Systems** | 8 | `design-tokens.json`, `tokens.css`, Component Inventories | Extraction / Brand Brief | `adaptive-component-behavior`, `design-to-code` |
| **Domain I: Modern Platform Patterns** | 5 | Dual-theme configs, Resilience tables, AI specs | Design tokens, Architecture | `flow-testing`, `security-review`, Code |
| **Domain E: Growth-Aware Design** | 4 | `module.manifest.json`, `.agents/route-intents.json` | Information architecture | `growth-impact-review`, Navigation shell |
| **Domain F: Responsive & Adaptive** | 5 | `TRANSFORMATION-TABLE.md`, Viewport tokens | Design tokens, Screen flows | `responsive-qa-audit`, Mobile UI code |
| **Domain D: Delivery & Integration** | 2 | `handoff-spec.md`, 4-Pass Launch Review | Components & Scaffolding | Engineering execution & Ship verdict |
| **Domain G: Autonomous QA Loop** | 6 | Playwright specs, `a11y-report.md`, PRD Matrix | Live DOM, Route intents | `qa-feedback-loop-orchestrator` |
| **TOTAL** | **41 Skills** | **100% Interconnected Architecture** | **Continuous Flow** | **Autonomous Delivery** |

---

## ⏱️ Workflow Phase Execution Benchmarks

Typical autonomous agent turn budget and artifact yield when executing Agentway end-to-end:

| Workflow Phase | Typical Agent Turns | Key Output Files | Primary Quality Verification Gate |
| :--- | :---: | :--- | :--- |
| **Phase 0: Visual Extraction** | 1–2 turns | `style-extraction.json` | 25-Point Fidelity Score ($\ge 20/25$) |
| **Phase 1: Problem Framing** | 2–3 turns | `discovery_synthesis.md`, Strategy doc | RICE prioritization + Riskiest Assumption isolated |
| **Phase 2: Product Architecture** | 2–3 turns | `sitemap.md`, Flow diagrams | Max 7 top-level hubs, $\le 3$ tree depth |
| **Phase 3: Visual & Themes** | 2–3 turns | `design-tokens.json`, `tokens.css` | Light/Dark dual-theme parity + 4pt/8pt grid lock |
| **Phase 4: Component Engine** | 3–5 turns | Component registry & State matrix | All 6 interaction states (Default to Error) documented |
| **Phase 5: Growth Scaffolding** | 2–3 turns | Manifest contracts, Route intents | Zero hardcoded nav links; manifest discovery verified |
| **Phase 6: Code Delivery** | 4–8 turns | Production React/Vue/HTML/CSS | Token traceability + RBAC security boundary checked |
| **Phase 7: Autonomous QA Loop**| 3–6 turns | Playwright test runs, A11y report | Zero WCAG 2.2 AA violations + 0 horizontal overflows |

## Skill Trigger Quick Reference

Use this table to quickly find the right skill for a given task.

### When you want to...

| Intent | Skill to invoke |
|--------|----------------|
| Extract tokens and components from an uploaded reference image | `visual-style-extractor` |
| Validate a business idea before building | `product-discovery` |
| Understand the business model and derive modules | `business-model-reading` |
| Figure out what to build first | `mvp-scoping` + `product-strategy` |
| Map how users navigate the product | `user-flow-mapping` + `information-architecture` |
| Set up the visual design language | `design-tokens` -> `typography-system` |
| Architect light and dark theme switching | `dark-mode-theming-system` |
| Define motion and animation | `micro-interaction-motion-design` |
| Build a component library | `design-system-builder` -> `component-style-guide` |
| Design streaming, prompts, and generative AI features | `ai-feature-ux-patterns` |
| Design empty, offline, timeout, and degraded states | `error-boundary-resilience-design` |
| Prepare product for RTL layout and internationalization | `i18n-localization-strategy` |
| Choose a layout shell (sidebar, topbar, bottom-nav) | `dashboard-layout-patterns` |
| Make the product work on mobile correctly | `responsive-breakpoint-strategy` -> `adaptive-component-behavior` -> `touch-gesture-interaction` |
| Design loading states | `perceived-performance-loading` |
| Wire a dashboard to auto-show new modules | `dashboard-scaffolding-contract` -> `module-registry-sync` |
| Audit for dead-end buttons or broken routes | `route-integrity-checker` + `interactive-element-audit` |
| Audit for security, auth boundaries, and PII leakage | `security-privacy-review` |
| Check what breaks when a new module is added | `growth-impact-review` |
| Hand off design to engineers | `design-to-code-handoff` |
| Track which PRD requirements are implemented | `prd-traceability-matrix` |
| Test a user flow end-to-end | `flow-based-functional-testing` |
| Catch visual regressions across breakpoints | `visual-responsive-regression-testing` |
| Run accessibility on the real build (WCAG 2.2) | `accessibility-runtime-audit` |
| Audit mobile layout before shipping | `responsive-qa-audit` |
| Orchestrate all QA and auto-fix findings | `qa-feedback-loop-orchestrator` |
| Do a final review before shipping | `cross-functional-review` |

---

## Skills by Context

Not every project needs every skill. Here is which skills are relevant by product type.

### SaaS / Web Application
**All 41 skills apply.** Follow the complete end-to-end flow.

### Mobile-First Product (iOS/Android/PWA)
Priority skills:
- `touch-gesture-interaction` -- mandatory
- `adaptive-component-behavior` -- mandatory
- `responsive-breakpoint-strategy` -- mandatory
- `i18n-localization-strategy` -- mandatory for global apps
- `perceived-performance-loading` -- mandatory
- `responsive-qa-audit` -- mandatory
- `dashboard-layout-patterns` -- use the bottom-nav shell pattern

### Landing Page / Marketing Site
Focus on:
- `visual-style-extractor` (if reference design exists), `product-discovery`, `user-flow-mapping`
- `design-tokens`, `typography-system`, `visual-hierarchy-review`
- `route-integrity-checker` -- critical for CTA -> page connections
- `responsive-qa-audit`, `accessibility-review`

### Internal Dashboard / Back-Office Tool
Focus on:
- `information-architecture`, `dashboard-layout-patterns`, `dashboard-scaffolding-contract`
- `module-registry-sync`, `growth-impact-review`
- `component-style-guide`, `design-tokens`, `dark-mode-theming-system`
- `security-privacy-review` (RBAC permissions)

### Standalone Design System
Focus on:
- `visual-style-extractor` -> `design-tokens` -> `typography-system` -> `dark-mode-theming-system` -> `design-system-builder` -> `component-style-guide`
- `micro-interaction-motion-design`
- `visual-hierarchy-review`, `accessibility-review`
