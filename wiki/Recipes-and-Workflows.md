# 🍳 Product Recipes & Workflows

Battle-tested recipe sequences to achieve high-leverage product outcomes with minimal agent turns.

# Recipes

Worked examples of how Agentway skills combine for real product scenarios.
Use these as starting points when you begin a new project.

---
---

## 📊 Recipe Telemetry & Benchmark Matrix

| Recipe | Primary Objective | Skills Chain | Est. Agent Turns | Primary Output Artifacts | Dev Time Saved |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Recipe 0** | **Visual Reference Matching** | `visual-style-extractor` ➔ `design-tokens` ➔ `design-system-builder` | 3–4 turns | `style-extraction.json`, `tokens.css`, Fidelity Report | **~8 hours** |
| **Recipe 1** | **SaaS from Scratch** | `product-discovery` ➔ `mvp-scoping` ➔ `IA` ➔ `tokens` ➔ `scaffolding` | 6–8 turns | `discovery_synthesis.md`, `sitemap.md`, Scaffolding | **~24 hours** |
| **Recipe 2** | **Mobile & Touch Adaptation** | `responsive-breakpoints` ➔ `adaptive-behavior` ➔ `touch-gestures` | 4–6 turns | `TRANSFORMATION-TABLE.md`, Mobile Viewport tokens | **~12 hours** |
| **Recipe 3** | **Pre-Launch Full QA Loop** | `prd-traceability` ➔ `flow-testing` ➔ `a11y-runtime` ➔ `qa-orchestrator` | 4–8 turns | Live PRD Matrix, Playwright specs, A11y report | **~16 hours** |
| **Recipe 4** | **Adding Scalable Feature Modules** | `business-model-reading` ➔ `module-registry` ➔ `growth-review` | 3–5 turns | `module.manifest.json`, Updated route intents | **~6 hours** |
| **Recipe 5** | **Self-Healing QA Bug Fixing** | `interactive-element-audit` ➔ `route-integrity` ➔ `qa-orchestrator` | 3–5 turns | Auto-fixed markup, Closed feedback loop log | **~10 hours** |
| **Recipe 6** | **Design System Unification** | `design-tokens` ➔ `typography-system` ➔ `component-style-guide` | 4–6 turns | Unified `design-tokens.json`, Component state matrix | **~14 hours** |
| **Recipe 7** | **Stakeholder Priority Alignment** | `stakeholder-mapping` ➔ `product-strategy` ➔ `mvp-scoping` | 2–3 turns | Prioritized RICE table with OKR validation | **~6 hours** |
| **Recipe 8** | **Dual-Theme Dark Mode System** | `design-tokens` ➔ `dark-mode-theming` ➔ `regression-testing` | 3–5 turns | 4-tier dark elevation tokens, Theme switcher script | **~8 hours** |
| **Recipe 9** | **AI Feature & Streaming UX** | `ai-feature-ux` ➔ `error-boundary-resilience` ➔ `flow-testing` | 3–4 turns | AI spec, Streaming controls, 5-state resilience | **~10 hours** |
| **Recipe 10**| **Global Localization & RTL** | `i18n-localization` ➔ `adaptive-behavior` ➔ `responsive-qa` | 3–4 turns | Translation schema, CSS logical properties rules | **~8 hours** |

---

## Recipe 0: Matching a Visual Reference Image or Screenshot

**Situation:** You have a screenshot or design mockup of an interface you love. You want the agent to extract the exact design language, components, colors, and typography so generated UI matches the reference with high fidelity.

**Prompt sequence:**

```
1. "Here is a screenshot of our reference design: [upload image]. Extract the full visual style, colors, typography scale, spacing base, and component inventory."

2. "Generate the design token system using the extracted style-extraction.json manifest."

3. "Build the component style guide for our core components matching the extracted style DNA."

4. "Run the fidelity checklist against the original reference image. What is our fidelity score?"
```

**Skills activated in order:**
`visual-style-extractor` -> `design-tokens` -> `typography-system` -> `design-system-builder` -> `component-style-guide`

**What you get after this sequence:**
- `style-extraction.json` with extracted primitive and semantic tokens
- Precision-matched `design-tokens.json` and CSS variables
- Component inventory aligned with the reference radius, elevation, and typography
- Verified Fidelity Score (target >= 20/25) confirming near-identical visual resonance

---

## Recipe 1: Starting a SaaS from Scratch

**Situation:** You have a business idea and want to build a SaaS product. You know the domain but have not validated the problem or designed anything yet.

**Prompt sequence:**

```
1. "Run product discovery for [your idea]. I want to validate the problem and map the main user types."

2. "Read this business model and derive the product modules we need to build: [paste your BMC or describe your business model]"

3. "Given the discovery findings, help me scope the MVP. What's the riskiest assumption we're testing?"

4. "Map the user flow for the core job-to-be-done we identified."

5. "Set up the information architecture for a [SaaS type] with [N] main modules."

6. "Create the design token system for this product. Brand direction: [describe]."

7. "Build the dashboard scaffolding contract using the modules we identified."
```

**Skills activated in order:**
`product-discovery` → `business-model-reading` → `mvp-scoping` → `user-flow-mapping` → `information-architecture` → `design-tokens` → `dashboard-scaffolding-contract`

**What you get after this sequence:**
- Validated problem statement with ranked assumptions
- List of product modules derived from business structure
- Clear MVP scope with the cut-line documented
- User flow diagram for the critical path
- Sitemap with navigation groups
- `design-tokens.json` with full token set
- Dashboard shell contract ready for development

---

## Recipe 2: Adding Mobile Support to an Existing Web Product

**Situation:** You have a desktop web product that was never designed for mobile. Users are complaining. You need to make it work — not just look less broken, but actually work natively on touch devices.

**Prompt sequence:**

```
1. "Run a responsive breakpoint strategy audit for our product. We are going mobile-first from this point forward."

2. "Identify which components need pattern transformation for mobile, not just resizing. Start with: [list your main components]"

3. "Define touch gesture interaction patterns for our core flows."

4. "Design loading states for our three heaviest pages: [page names]. Assume 3G connection."

5. "Run a responsive QA audit on [page name] at mobile breakpoint."
```

**Skills activated:**
`responsive-breakpoint-strategy` → `adaptive-component-behavior` → `touch-gesture-interaction` → `perceived-performance-loading` → `responsive-qa-audit`

**The critical insight from this recipe:**

The most common mistake: treating mobile as "desktop with smaller width." `adaptive-component-behavior` forces an explicit transformation decision for every component. If your data table stays a data table on mobile, that is a documented choice — not an oversight.

---

## Recipe 3: Landing Page That Grows Into a Multi-Page Product

**Situation:** You are building a landing page now, but you know it will grow into a multi-page website (pricing, features, about, blog, auth pages). You want to make sure buttons connect properly as new pages are created.

**Prompt sequence:**

```
1. "Map the information architecture for our full product website, even though most pages don't exist yet."

2. "Run route integrity check on the current landing page. Record the intent of every CTA, even if the destination page doesn't exist yet."

3. [Later, after building the Pricing page]
   "The Pricing page is now live at /pricing. Connect any pending route intents that were waiting for this page."

4. "Run a responsive QA audit on the landing page at all breakpoints."

5. "Check for any remaining dead-end buttons or links across the site."
```

**Skills activated:**
`information-architecture` → `route-integrity-checker` → (repeat `route-integrity-checker` as pages are built) → `responsive-qa-audit` → `interactive-element-audit`

**What this prevents:**

Without `route-integrity-checker`, every "Pelajari Lebih Lanjut" or "Get Started" button gets `href="#"` and stays there — forgotten until a user clicks it and lands nowhere. This recipe makes those intents explicit from day one.

---

## Recipe 4: Adding the Nth Module to an Existing Dashboard

**Situation:** Your dashboard was built for 4 modules. You now need to add module #5 through #12. The dashboard should update automatically — no manual edits to the shell.

**Prompt sequence:**

```
1. [Only once, before any modules are added]
   "Refactor the dashboard to use a manifest-driven shell. Use dashboard-scaffolding-contract to define the shell structure."

2. [For each new module]
   "Register the [module name] module. Create the module.manifest.json with route /dashboard/[route], navGroup [group], and widget type [type]."

3. [After each module addition]
   "Run growth impact review. We just added [module name]. Does anything in the nav, shortcuts, or sitemap need to update?"
```

**Skills activated:**
`dashboard-scaffolding-contract` → (for each module) `module-registry-sync` → `growth-impact-review`

**What this prevents:**

Without this recipe, each new module requires manually editing the sidebar nav, the shortcut grid, and the permission logic. With `module-registry-sync`, adding a manifest file is the only required action — the shell reads it on next build.

---

## Recipe 5: Pre-Ship QA Pass

**Situation:** A feature is "done" from an engineering perspective. Before shipping, you want to verify it actually works as designed — buttons have handlers, flows complete correctly, nothing broke on mobile, and accessibility passes.

**Prompt sequence:**

```
1. "Check the PRD traceability matrix for [feature name]. Are all requirements accounted for?"

2. "Run an interactive element audit on [page name]. Find any buttons or links without actions."

3. "Run the user flow test for [flow name]. Use the scenarios from our user flow mapping."

4. "Run a visual responsive regression test on [page name] at all breakpoints."

5. "Run the accessibility runtime audit on [page name]."

6. "Orchestrate the QA feedback loop. Batch all findings and fix what can be fixed automatically."

7. "Run the cross-functional review. Is this ready to ship?"
```

**Skills activated:**
`prd-traceability-matrix` → `interactive-element-audit` → `flow-based-functional-testing` → `visual-responsive-regression-testing` → `accessibility-runtime-audit` → `qa-feedback-loop-orchestrator` → `cross-functional-review`

**What makes this powerful:**

Each finding is automatically linked to the PRD requirement it violates. The QA orchestrator fixes what it can (missing `aria-label`, known route connections) in up to 3 automated iterations. Only genuinely ambiguous decisions reach you — with full context, not just "button doesn't work."

---

## Recipe 6: Design System Audit

**Situation:** Your product has been built by multiple people over time. There are inconsistencies everywhere: random hex colors, multiple font sizes that don't follow a scale, component hover states that differ across the product.

**Prompt sequence:**

```
1. "Audit the existing product and define a design token system that captures what we already have, then normalizes it."

2. "Review the typography and define a proper type scale for the product."

3. "Run a visual hierarchy review on the three most important pages."

4. "Build a component style guide for [Button, Card, Form Input, Modal]. Document every state."

5. "Run the design-to-code handoff for the normalized token system. What needs to change in the codebase?"
```

**Skills activated:**
`design-tokens` → `typography-system` → `visual-hierarchy-review` → `component-style-guide` → `design-to-code-handoff`

---

## Recipe 7: Stakeholder Alignment Before a Sprint

**Situation:** Sales wants feature A, Operations wants feature B, Finance needs compliance feature C. Engineering has capacity for one. You need to align everyone.

**Prompt sequence:**

```
1. "Run stakeholder requirement mapping. Here are the requests: [paste requests from each stakeholder]"

2. "Apply product strategy prioritization to the requirements we surfaced. Use RICE scoring."

3. "Cross-reference with the MVP scope. Which of these are must-haves for our current phase?"
```

**Skills activated:**
`stakeholder-requirement-mapping` → `product-strategy` → `mvp-scoping`

**Output:** A ranked requirements list with RICE scores and a clear, documented rationale for what is in-scope and what is deferred — something you can show every stakeholder without subjective judgment.

---

## Recipe 8: Building a Dual-Theme (Dark Mode) System

**Situation:** You have a working light theme and need to add dark mode without color vibration, halation, or invisible drop shadows.

**Prompt sequence:**

```
1. "Audit our design tokens and define the dark mode semantic layer using dark-mode-theming-system."

2. "Map our 4 surface elevation tiers for dark mode with surface lightness instead of shadows."

3. "Adjust our brand accent vibrancy to guarantee WCAG 4.5:1 contrast on dark surfaces."

4. "Generate the [data-theme="dark"] CSS custom property overrides and anti-flicker head script."
```

**Skills activated in order:**
`design-tokens` -> `dark-mode-theming-system` -> `component-style-guide` -> `visual-responsive-regression-testing`

---

## Recipe 9: Designing AI-Enabled Features & Streaming UX

**Situation:** You are adding generative AI, chat assistants, or automated suggestions into your product. You need to ensure the streaming UX is responsive and users can override hallucinations.

**Prompt sequence:**

```
1. "Design the AI interaction patterns for our assistant feature using ai-feature-ux-patterns. Include streaming tokens, thinking state, and cancel affordances."

2. "Define the human override and inline editing controls for AI-generated drafts."

3. "Design the resilience states using error-boundary-resilience-design for AI rate limits and timeout failures."
```

**Skills activated in order:**
`ai-feature-ux-patterns` -> `error-boundary-resilience-design` -> `flow-based-functional-testing`

---

## Recipe 10: Preparing for Global Internationalization & RTL

**Situation:** Your product is expanding to international markets requiring Right-to-Left (Arabic/Hebrew) support and long-string translations (German/French).

**Prompt sequence:**

```
1. "Architect our translation token namespace and RTL logical properties strategy using i18n-localization-strategy."

2. "Audit our layout containers for 40% text expansion tolerance."

3. "Run responsive QA audit with RTL directionality enabled."
```

**Skills activated in order:**
`i18n-localization-strategy` -> `adaptive-component-behavior` -> `responsive-qa-audit`
