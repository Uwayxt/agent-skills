# 📖 Agentway Prompt Playbook & Tutorial
### *How to Orchestrate All 47 Production Skills with AI Coding Agents*

This guide provides **copy-paste prompt templates** and best practices for developers pairing with AI assistants (Google Antigravity IDE, Claude Code, Cursor, Windsurf) equipped with the Agentway skill registry (`@uwayxt/agent-skills`).

The goal is to ensure your AI agent executes the **full 9-phase engineering lifecycle** — from problem validation, pricing psychology, and architecture design to token extraction, spring physics motion, resilient UI components, autonomous QA, and project health diagnostics — rather than prematurely jumping straight into writing unstyled, unstructured code.

---

## 🧠 The 4 Cardinal Rules of Agentway Prompting

By design, Agentway uses **Progressive Disclosure** — skills are dynamically loaded into context when matched by semantic keywords or explicit names. To ensure an agent runs an exhaustive workflow without skipping crucial steps, follow these 4 rules:

1. **Explicitly Name the Skills:** Don't just say *"build me a dashboard"*. Name the exact skills (e.g. `product-discovery`, `behavioral-pricing-psychology`, `kinematic-motion-choreography`, `design-tokens`, `ux-chaos-monkey`). This guarantees the agent loads the exact protocol contracts.
2. **Demand Concrete Artifact Deliverables:** Require the agent to output specific files (e.g. `discovery_synthesis.md`, `pricing-matrix.json`, `spring-tokens.css`, `drift-report.md`). This creates verifiable audit checkpoints.
3. **Enforce Phase Sequencing:** Instruct the agent to complete each phase in order. Never let the agent bypass strategy or tokens to start writing JSX/HTML prematurely.
4. **Mandate Human-in-the-Loop Gate Approvals:** Require the agent to stop and wait for your explicit approval at the boundary of each phase before proceeding.

---

## 🚀 Prompt Variant 1: Greenfield Projects (Zero-to-One / New Project)

Use this prompt when starting from scratch (a concept, wireframe, or visual reference image) with **no existing code**.

```markdown
We are building a new project from scratch. Use the complete 47-skill Agentway registry 
in strict sequential order following the official 9-phase workflow. Do not skip any 
skill without my explicit permission, and pause for my approval at the end of each phase 
before proceeding to the next.

Project Context:
- Idea & Core Problem: [Describe in 1-3 sentences, e.g., "AI-powered CRM analytics for boutique coffee roasters"]
- Visual Reference (if any): [Attach image screenshot or URL]
- Target Platform: [Web / Mobile / Responsive Both]
- Desired Tech Stack: [e.g., Next.js 15 (App Router) + Tailwind / Vanilla CSS + Node.js or "Suggest best stack"]

────────────────────────────────────────────────────────────────────────
PHASE 1 — Problem, Strategy & Behavioral Monetization
Execute: product-discovery, product-strategy, business-model-thinking, 
mvp-scoping, stakeholder-requirement-mapping (if multiple personas), 
business-model-reading (if Business Model Canvas provided), 
behavioral-pricing-psychology (model Decoy Effect, Loss Aversion & annual toggle).
Deliverables:
- discovery_synthesis.md (Actor mapping, problem framing, JTBD)
- product_strategy_one_pager.md (Positioning, MoSCoW/RICE matrix)
- pricing-matrix.json & PricingTable.jsx (Decoy Effect tier architecture)
- Clear MVP cut-line scope definition
[STOP HERE: Wait for my review and approval before Phase 2]

PHASE 2 — Architecture & UX Flows
Execute: user-flow-mapping, information-architecture, 
dashboard-scaffolding-contract, responsive-breakpoint-strategy, 
i18n-localization-strategy (if multi-language).
Deliverables:
- End-to-end user decision flows & state journey maps
- Sitemap hierarchy (≤ 3 levels deep)
- Manifest-driven dashboard shell layout & breakpoint definitions
[STOP HERE: Wait for my review and approval before Phase 3]

PHASE 3 — Visual Language, Tokens & Kinematic Motion
Execute: visual-style-extractor (if visual reference attached), 
design-tokens, typography-system, dark-mode-theming-system, 
micro-interaction-motion-design, kinematic-motion-choreography 
(harmonic oscillator spring physics & asymmetric enter/exit curves).
Deliverables:
- design-tokens.json (4-tier color palette, 4px spacing scale, shadows, radius)
- spring-tokens.css & motion-choreography.js (Mass/Stiffness/Damping curves)
- typography-system.md (Fluid type scale, modular pairings)
- dark-mode elevation model (4-tier surface contrast)
[STOP HERE: Wait for my review and approval before Phase 4]

PHASE 4 — Resilient Component Engineering
Execute: design-system-builder, component-style-guide, 
ai-feature-ux-patterns (if AI features exist), error-boundary-resilience-design, 
dashboard-layout-patterns, visual-hierarchy-review, 
adaptive-component-behavior, touch-gesture-interaction, 
perceived-performance-loading.
Deliverables:
- Modular UI component library with 6-state interactive matrix 
  (Default, Hover, Focus-Visible, Active, Disabled, Error)
- 5-State Resilience contract per primary screen 
  (Empty, Loading/Skeleton, Partial, Offline Queue, Fatal Error Boundary)
- Touch targets strictly ≥ 44×44px with fluid viewport adaptability
[STOP HERE: Wait for my review and approval before Phase 5]

PHASE 5 — Delivery, Security & Integration
Execute: security-privacy-review, design-to-code-handoff, 
module-registry-sync, route-integrity-checker, growth-impact-review.
Deliverables:
- Sequenced engineering task backlog
- module.manifest.json & route integrity verification report
- Security/Privacy compliance audit (Auth boundaries, GDPR, data leakage)
[STOP HERE: Wait for my review and approval before Phase 6]

PHASE 6 — Autonomous QA Loop & Destructive Testing
Execute: prd-traceability-matrix, interactive-element-audit, 
flow-based-functional-testing, visual-responsive-regression-testing, 
accessibility-runtime-audit (WCAG 2.2 AA), responsive-qa-audit, 
ux-chaos-monkey (inject Text Explosion, Data Extremes & Flaky Network), 
concluding with qa-feedback-loop-orchestrator.
Deliverables:
- Playwright E2E & Multi-Viewport test suite
- PRD requirement-to-route traceability matrix (100% coverage)
- Zero WCAG 2.2 AA violations report
- Chaos monkey resilience stress test report
[STOP HERE: Wait for my review and approval before Phase 7]

PHASE 7 — Project Intelligence & Drift Prevention
Execute: project-health-diagnostics (Compute Token Adherence Index TAI), 
design-drift-detector (Scan 7 violation categories).
Deliverables:
- health-report.md + health-report.json (TAI score ≥ 85/100)
- drift-report.md (Zero unmanaged hardcoded colors, spacing, or magic z-indexes)
- prescription.md (Prioritized skill optimization queue)

FINAL GATE — Cross-Functional Review
Execute: cross-functional-review across 4 passes: Business · UX · UI · Technical.
Deliverable:
- Explicit SHIP / NO-SHIP verdict with documented rationale and risk ledger.

Operational Rules:
1. Prefix each tool output with the active skill tag, e.g. "[skill: product-discovery]".
2. If you believe a specific skill is not applicable, explain why and request my confirmation first.
3. Do NOT write production implementation code until Phases 1–3 are fully approved.
```

---

## 🛠️ Prompt Variant 2: Brownfield Projects (Existing Codebase / Refactoring)

Use this prompt when working on an **existing codebase** (adding a new feature module, refactoring a legacy dashboard, or standardizing design tokens). This variant starts with a **Phase 0 Baseline Audit** to ensure the agent doesn't break established patterns or overwrite existing design decisions.

```markdown
This is an EXISTING codebase. Before proposing or modifying any code, execute a strict 
ANALYSIS & AUDIT phase using Agentway's diagnostic skills. Only after we align on the 
audit findings will we proceed into the phased build workflow.

Project Context:
- Repository / Directory Structure: [e.g., "Next.js App Router in /src with Tailwind CSS"]
- Current Tech Stack: [e.g., Next.js 14 + Tailwind + Prisma + Zustand]
- Current Objective: [e.g., "Integrate an Analytics Billing Module with Decoy Pricing and kinematic spring animations"]
- Reference Designs (if any): [Attach screenshots or Figma links]

────────────────────────────────────────────────────────────────────────
PHASE 0 — Baseline Diagnostics & Drift Audit (MANDATORY BEFORE ANY EDIT)
Execute: project-health-diagnostics, design-drift-detector, 
route-integrity-checker, interactive-element-audit, 
usability-heuristics-check, accessibility-review, visual-hierarchy-review.
Deliverables required before touching any code:
1. Baseline TAI (Token Adherence Index) score & Project Health Report Card
2. Design Drift Audit: list of hardcoded colors, magic spacing, and font size violations
3. Route & Interactive Element integrity map (broken links, orphaned handlers)
4. Strategic Refactoring Recommendation: What to retain vs. what to migrate
[DO NOT PROCEED PAST THIS PHASE UNTIL I CONFIRM THE AUDIT FINDINGS]

PHASE 1 — Strategic Alignment & Monetization Design
Execute: product-strategy (scoped strictly to current task), 
mvp-scoping (cut-line for current sprint), behavioral-pricing-psychology 
(if updating pricing tiers), growth-impact-review (blast radius on existing modules).
Deliverables:
- Scoped PRD addendum and dependency impact analysis.

PHASE 2 — Incremental Architecture & UX
Execute: information-architecture (verify navigation hierarchy updates), 
dashboard-scaffolding-contract, module-registry-sync (if new module), 
user-flow-mapping (new flows only), responsive-breakpoint-strategy.
Deliverables:
- Updated route intent and module manifest contracts.

PHASE 3 — Visual Language Harmonization & Kinetic Motion
Execute: visual-style-extractor (if reference images provided), 
design-tokens (cross-reference with existing tokens, highlight diffs), 
kinematic-motion-choreography (spring curves), typography-system, 
dark-mode-theming-system, micro-interaction-motion-design.
IMPORTANT: Never overwrite existing design tokens without presenting a diff first.

PHASE 4 — Component Implementation & Resilience
Execute: design-system-builder, component-style-guide, 
error-boundary-resilience-design, dashboard-layout-patterns, 
adaptive-component-behavior, touch-gesture-interaction, 
perceived-performance-loading, ai-feature-ux-patterns (if relevant).
Deliverables:
- Production components adhering to existing token schema with 5-state resilience.

PHASE 5 — Delivery & Security Integration
Execute: security-privacy-review, design-to-code-handoff.
Deliverables:
- Clean, decoupled PR tasks with zero security/privacy regressions.

PHASE 6 — Regression & Autonomous QA Loop
Execute: flow-based-functional-testing, visual-responsive-regression-testing 
(compare against baseline screenshots), accessibility-runtime-audit (WCAG 2.2 AA), 
ux-chaos-monkey (targeted stress test on new flows), qa-feedback-loop-orchestrator.
Deliverables:
- Passing E2E test suite + visual regression diff report.

PHASE 7 & FINAL GATE — Health Verification & Ship Verdict
Execute: project-health-diagnostics (verify TAI score improved), 
cross-functional-review.
Deliverable:
- Final Ship / No-Ship decision with technical debt audit.

Operational Rules:
1. Tag each response with "[skill: <skill-name>]".
2. If existing code conflicts with Agentway best practices (e.g., missing dark mode elevation), report it in Phase 0 rather than silently refactoring.
3. Prioritize architectural consistency with the existing codebase.
```

---

## ⚡ Quick-Command Reference Matrix

You can trigger specific capabilities on-demand using CLI commands or agent prompt shortcuts:

| Goal | CLI Command | Agent Prompt Trigger |
| :--- | :--- | :--- |
| **Model Pricing & Decoy Tier** | `agentway gen:pricing [dir]` | `"Run behavioral-pricing-psychology to model pricing tiers"` |
| **Generate Spring Motion Tokens** | `agentway gen:spring [dir]` | `"Run kinematic-motion-choreography for harmonic spring curves"` |
| **Full Project Health Audit** | `agentway doctor ./` | `"Run project-health-diagnostics and compute our TAI score"` |
| **Scan Hardcoded CSS & Drift** | `agentway audit:drift ./src` | `"Run design-drift-detector to audit all non-token values"` |
| **Stress-Test Edge Cases** | `agentway chaos:inject ./e2e` | `"Inject ux-chaos-monkey vectors into our form and network states"` |
| **Cognitive Friction Audit** | `agentway audit:cognitive ./src` | `"Run cognitive-load-heatmap-prediction to check Hick's & Fitts's Law"` |
| **Build Token Schema** | `agentway tokens:build` | `"Compile tokens using design-tokens into CSS variables and TS types"` |
| **Scaffold Resilient Slice** | `agentway scaffold:module <name>` | `"Scaffold module using dashboard-scaffolding-contract"` |
| **Check Broken Links & Buttons**| `agentway audit:routes ./` | `"Run route-integrity-checker and interactive-element-audit"` |
| **Generate WCAG Playwright QA** | `agentway gen:playwright ./e2e` | `"Generate tests using flow-based-functional-testing"` |

---

## 💡 Pro Tips & Troubleshooting

### 1. What to do if the agent skips a skill?
If your agent gets ahead of itself and writes code without running a required skill, prompt it directly:
> *"You skipped `[skill-name]`. Please stop, run the `[skill-name]` protocol now, and provide the required artifact before writing any further code."*
Because the skill is already registered in `.agents/skills/`, the agent will immediately pivot and execute the protocol.

### 2. Tracking your 47-skill checklist
Keep the [Skill Catalog](https://github.com/Uwayxt/agent-skills/wiki/Skill-Catalog) open during complex sessions. Check off skills as the agent presents each tagged deliverable.

### 3. Combining CLI with Interactive Prompts
For the fastest workflow, run the CLI tools locally to generate baseline files, then prompt your agent to refine them:
```bash
# In your terminal:
agentway doctor ./
agentway audit:drift ./src
agentway gen:pricing ./components/pricing

# In your agent prompt:
# "I've generated health-report.json and pricing-matrix.json using Agentway CLI. 
# Review the findings and refine the Pro tier value proposition using behavioral-pricing-psychology."
```
