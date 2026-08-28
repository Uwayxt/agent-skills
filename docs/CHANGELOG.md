# CHANGELOG

All notable changes to `@uwayxt/agent-skills` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) conventions.
Versions follow [Semantic Versioning](https://semver.org/).

---

## [1.4.0] — 2026-08-28

### 🧠 Cognitive Intelligence Release — Heatmap Prediction & CFI Engine

This release introduces the first **cognitive science-based audit tool** in the Agentway registry — the `cognitive-load-heatmap-prediction` skill and `agentway audit:cognitive` CLI engine.

#### Added — Skill
- `cognitive-load-heatmap-prediction`: Predicts visual attention heatmap paths (Z-Pattern, F-Pattern, Single-Column Spine, Gutenberg Diagram). Calculates **Hick's Law Reaction Time** ($RT = b \cdot \log_2(n+1)$), **Fitts's Law Index of Difficulty** ($ID = \log_2(2D/W)$), **Visual Saliency Weight Ratio** (SWR), and outputs a unified **Cognitive Friction Index (CFI)** score (0–100, Grade A–F).

#### Added — Sibling Contracts
- `COGNITIVE-MATH-SPEC.md`: Full mathematical derivations for Hick-Hyman Law, Fitts's Law (Shannon + Welford formulations), Visual Saliency Score, CFI formula, Shannon Information Entropy, and Miller's Magic Number ($7 \pm 2$).
- `EYE-TRACKING-SIMULATION.md`: Foveal/peripheral vision anatomy, 4 scanning pattern maps (Z, F, Single-Column, Gutenberg), fixation/saccade sequence predictions, and 5-level heatmap zone classification system.

#### Added — CLI Automation Engine
- `agentway audit:cognitive [dir]`: Scans UI files (HTML/JSX/TSX/Vue/Svelte) for decision density, competing Primary CTAs, form walls > 6 fields, dead zone anchors, and icon buttons missing `aria-label`. Outputs CFI score per file and aggregate summary.

#### Registry Milestone
- Total skills: **42** across **9 domains**.

---

## [1.3.0] — 2026-08-26


### ⚡ Feature Release — Expert Automation Tools & Engineering Contracts

This release equips Agentway with **4 built-in CLI automation engines** and **deep sibling engineering contracts** to convert skills from passive guidelines into active, zero-token generation power-tools.

#### Added — CLI Automation Engines
- `agentway tokens:build [inputFile] [outputDir]`: Compiles JSON design tokens into Vanilla CSS Variables (Light/Dark dual-theme), Tailwind CSS config extension, and TypeScript definitions.
- `agentway scaffold:module <name> [baseDir]`: Scaffolds a modular feature slice with manifest, route intent, and 5-state resilience React/JSX container.
- `agentway audit:routes [scanDir]`: Audits codebase for dead links (`href="#"`), orphaned buttons without action handlers, and missing `aria-label` tags.
- `agentway gen:playwright [outDir]`: Generates Playwright automated test suites covering WCAG 2.2 AA and multi-viewport responsive checks (`375px`, `393px`, `768px`, `1280px`).

#### Added — Sibling Engineering Contracts
- `dark-mode-theming-system/THEME-SWITCHER-RUNTIME.js`: Zero-flicker client-side theme switcher script.
- `dark-mode-theming-system/ELEVATION-CALCULATOR.md`: 4-tier dark surface elevation and text contrast math.
- `error-boundary-resilience-design/RESILIENCE-CONTRACTS.md`: 5-state module resilience lifecycle blueprint.
- `ai-feature-ux-patterns/STREAMING-UI-RECIPES.md`: Autoscroll lock, thinking animations, and non-destructive diffs.
- `qa-feedback-loop-orchestrator/AUTO-FIX-RECIPES.md`: Deterministic AST & regex transform rules for auto-fixing.
- `visual-style-extractor/COLOR-HARMONY-ALGO.md`: Relative luminance and contrast ratio mathematics.

---

## [1.2.1] — 2026-08-26

### Fixed
- Fixed package metadata author email schema validation in `package.json`.
- Updated CLI list categorized groupings and local version comparison logic.

---

## [1.2.0] — 2026-08-26

### 🚀 Major Architecture Milestone — 41 Agent Skills & Visual Intelligence

This major release introduces **Domain H (Visual Intelligence)** and **Domain I (Modern Platform Patterns)**, expanding the registry from 35 to **41 production-grade skills** and upgrading 8 existing skills to contemporary web and AI interaction standards.

#### Registry Telemetry Evolution

| Milestone | Active Skills | Domains | New Capabilities & Milestones |
| :--- | :---: | :---: | :--- |
| **v1.0.0** | 24 | 5 | Core Product, UX, UI, Delivery, and Growth foundation |
| **v1.1.0** | 35 | 7 | Category F (Responsive/Adaptive) & Category G (Autonomous QA Loop) |
| **v1.2.0** | **41** | **9** | Visual Extraction Engine, Dual-Theme Theming, AI UX Patterns, WCAG 2.2 |

---

### Added — Category H: Visual Intelligence Engine

Eliminates visual style drift by parsing reference screenshots and mockups directly into deterministic tokens and component inventories.

| Skill | Purpose |
| :--- | :--- |
| `visual-style-extractor` | 8-stage visual extraction engine producing `style-extraction.json` with a 25-point visual fidelity scoring protocol. |

**Sibling files added:**
- `visual-style-extractor/EXTRACTION-PROTOCOL.md` — Precision tiers (Tier 1 Direct Measurement to Tier 3 Inference), color sampling rules, and calibration anchors.
- `visual-style-extractor/FIDELITY-CHECKLIST.md` — 25-point 5-level visual benchmark checklist with scoring thresholds ($\ge 20/25$ target).

---

### Added — Category I: Modern Platform Patterns

Standardizes contemporary platform requirements: dual-theme elevation, AI streaming interfaces, error resilience, security UX, and internationalization.

| Skill | Purpose |
| :--- | :--- |
| `dark-mode-theming-system` | 4-tier dark surface elevation (Ground, Base, Elevated, Highest), anti-halasi text contrast, and anti-flicker runtime scripts. |
| `error-boundary-resilience-design` | 5-state resilience matrix (Ideal, First-Use Empty, Filtered Empty, Partial Failure, Network Error/Offline) with recovery CTAs. |
| `security-privacy-review` | Audits session lifecycles, PII/secret masking by default, URL query safety, RBAC permissions, and GDPR export/deletion flows. |
| `ai-feature-ux-patterns` | Guides progressive streaming, autoscroll pause, thinking animations, AI provenance badges, and non-destructive diff previews. |
| `i18n-localization-strategy` | Standardizes translation namespaces, CSS Logical Properties (`*-inline-*`) for automatic RTL support, and 40% text expansion tolerance. |

**Sibling files added:**
- `dark-mode-theming-system/DARK-TOKEN-SCHEMA.md` — Light vs. Dark surface, text, and border comparison tokens.
- `error-boundary-resilience-design/STATE-INVENTORY-TEMPLATE.md` — 5-state module resilience audit template.

---

### Upgraded — 8 Existing Skills (P2 Deepening)

| Skill | Enhancement |
| :--- | :--- |
| `product-discovery` | Integrated Jobs-to-be-Done (JTBD) framing, Assumption Prioritization Matrix (Uncertainty × Risk), and validation experiment recipes (smoke test/concierge). Added sibling `INTERVIEW-TEMPLATES.md`. |
| `information-architecture` | Added multi-role RBAC navigation visibility overlays and ⌘K Command Palette search architecture. |
| `accessibility-runtime-audit` | Upgraded to **WCAG 2.2 AA** standards (Target Size min 24×24px, Focus Appearance, Dragging Alternatives), ARIA live regions, and VoiceOver/NVDA command cheat sheets. |
| `product-strategy` | Added OKR quarterly alignment validation, friction-reduction tie-breaking rules, and sibling `RICE-SCORING-GUIDE.md`. |
| `responsive-qa-audit` | Added automated Playwright multi-viewport overflow test scaffold (`375px`, `393px`, `768px`, `1280px`), safe-area insets, and virtual keyboard testing. |
| `design-tokens` | Added direct ingestion of `style-extraction.json` and dual-theme (Light/Dark) token layer mapping. |
| `user-research-synthesis` | Added qualitative + quantitative telemetry triangulation, atomic observation extraction, and Frequency × Severity matrix. |
| `route-integrity-checker` | Added parameterized dynamic route handling (`/invoices/:id`) and branded 404 escape experience design. |

---

### Infrastructure & Tooling
- `skills-lock.json` updated with SHA-256 hashes for all 41 skills.
- Created symlinks in `.claude/skills/` for all 6 new skills.
- Master documentation (`README.md`, `SKILL-MAP.md`, `RECIPES.md`) fully synchronized to 41 skills.

---

## [1.1.0] — 2026-08-24

### Added — Category F: Responsive, Adaptive & Cross-Device Experience

Five new skills covering the full responsive design lifecycle. These skills establish that "responsive" means **pattern transformation**, not just CSS scaling. A sidebar that becomes a 200px icon column on mobile is not adaptive — it is broken.

| Skill | Purpose |
|-------|---------|
| `responsive-breakpoint-strategy` | Define a 6-point `bp-*` breakpoint token scale, mobile-first vs desktop-first decision, and grid system |
| `adaptive-component-behavior` | Specify pattern transformations per device (sidebar → bottom-nav, table → card-list, modal → fullscreen) |
| `touch-gesture-interaction` | Enforce 44×44pt tap targets, thumb-zone mapping, gesture definitions, safe-area insets |
| `perceived-performance-loading` | Design skeleton screens, progressive rendering, and offline states for perceived speed |
| `responsive-qa-audit` | Audit every breakpoint: overflow, tap targets, typography, navigation reachability, and transformation compliance |

Sibling file added: `adaptive-component-behavior/TRANSFORMATION-TABLE.md` — canonical pattern transformation reference table.

### Added — Category G: QA Autonomous & PRD Traceability Loop

Six new skills forming a closed-loop, self-healing QA system. The key innovation: every finding is traced to a specific PRD requirement ID, every fixable issue is resolved automatically (up to 3 attempts), and only genuinely ambiguous issues reach a human.

| Skill | Purpose |
|-------|---------|
| `prd-traceability-matrix` | Map every PRD requirement → UI element → route → implementation status |
| `interactive-element-audit` | Detect orphaned buttons, broken links, and forms without submit logic; generate Playwright scaffolds |
| `flow-based-functional-testing` | Convert user flows to Given-When-Then test cases + Playwright test files |
| `visual-responsive-regression-testing` | Screenshot comparison at every breakpoint; detects visual regressions and missing transformations |
| `accessibility-runtime-audit` | Run axe-core, keyboard navigation, and screen reader audit on the actual built product |
| `qa-feedback-loop-orchestrator` | Batch all QA findings, trigger auto-fixes, enforce 3-iteration retry limit, escalate to human with full context |

Sibling files added:
- `prd-traceability-matrix/MATRIX-TEMPLATE.md` — blank traceability matrix template with instructions
- `qa-feedback-loop-orchestrator/QA-LOOP-PROTOCOL.md` — detailed closed-loop protocol spec

### Updated — Existing Skills

| Skill | Change |
|-------|--------|
| `component-style-guide` | Added touch-device states: `pressed`, `swiping`, `long-press`. Added no-hover rule for touch devices. |
| `dashboard-layout-patterns` | Added bottom-nav shell pattern for mobile-primary products. Broadened scope beyond dashboards to all management-type layouts. |

### Added — Documentation

- `docs/SKILL-AUTHORING-GUIDE.md` — Complete guide for writing new skills
- `docs/CHANGELOG.md` — This file
- `docs/SKILL-MAP.md` — Visual skill dependency and trigger map
- `docs/RECIPES.md` — Worked examples for common product scenarios

### Infrastructure

- `skills-lock.json` updated: 35 total entries (was 24)
- 11 new symlinks created in `.claude/skills/`
- `LICENSE-PRODUCT-SKILLS.md` updated to list all 35 skills across 7 categories

---

## [1.0.1] — 2026-08-23

### Fixed

- Resolved NPM publish conflict caused by attempting to re-publish version `1.0.0`.
- No functional changes.

---

## [1.0.0] — 2026-08-23

### Added — Initial Release

First release of the Agentway skill registry. Includes 24 skills across 5 categories:

**Category A — Product Thinking & Technopreneurship (6 skills)**
`product-discovery`, `product-strategy`, `business-model-thinking`, `mvp-scoping`, `stakeholder-requirement-mapping`, `business-model-reading`

**Category B — UX (5 skills)**
`user-flow-mapping`, `information-architecture`, `user-research-synthesis`, `accessibility-review`, `usability-heuristics-check`

**Category C — UI & Design System (7 skills)**
`design-tokens`, `typography-system`, `design-system-builder`, `component-style-guide`, `dashboard-layout-patterns`, `visual-hierarchy-review`, `micro-interaction-motion-design`

**Category D — Delivery (2 skills)**
`design-to-code-handoff`, `cross-functional-review`

**Category E — Growth-Aware Design (4 skills)**
`module-registry-sync`, `dashboard-scaffolding-contract`, `route-integrity-checker`, `growth-impact-review`

**CLI features:**
- `agentway init` — Interactive local or global setup
- `agentway list` — Display skill registry
- `agentway update` — Check for newer versions
- `agentway help` — Command reference
- Auto-update checker on every command invocation
- Automatic `.gitignore` update on local install
- Automatic `.claude/skills/` symlink generation

---

[1.2.0]: https://github.com/uwayxt/agent-skills/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/uwayxt/agent-skills/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/uwayxt/agent-skills/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/uwayxt/agent-skills/releases/tag/v1.0.0
