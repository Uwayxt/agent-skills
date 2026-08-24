# CHANGELOG

All notable changes to `@uwayxt/agent-skills` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) conventions.
Versions follow [Semantic Versioning](https://semver.org/).

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

[1.1.0]: https://github.com/uwayxt/agent-skills/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/uwayxt/agent-skills/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/uwayxt/agent-skills/releases/tag/v1.0.0
