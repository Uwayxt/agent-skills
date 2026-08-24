# Recipes

Worked examples of how Agentway skills combine for real product scenarios.
Use these as starting points when you begin a new project.

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
