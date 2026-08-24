<div align="center">

<img src="https://raw.githubusercontent.com/Uwayxt/agent-skills/main/.github/banner.png" alt="Agentway — Think. Design. Build. Test." width="100%" />

# Agentway

**35 Agent Skills. Product Design to QA. Multi-IDE. Model-Agnostic.**

[![npm version](https://img.shields.io/npm/v/@uwayxt/agent-skills?style=flat-square&color=CB3837&label=npm)](https://www.npmjs.com/package/@uwayxt/agent-skills)
[![npm downloads](https://img.shields.io/npm/dm/@uwayxt/agent-skills?style=flat-square&color=4B9EDB&label=downloads)](https://www.npmjs.com/package/@uwayxt/agent-skills)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE-PRODUCT-SKILLS.md)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-compatible-D97757?style=flat-square)](https://claude.ai/code)
[![Antigravity IDE](https://img.shields.io/badge/Antigravity%20IDE-compatible-4285F4?style=flat-square)](https://deepmind.google/antigravity)

*Transform your AI coding agent into an autonomous Product Designer, UX Researcher, and QA Engineer.*

---

### 📚 Official Documentation
**[📖 Skill Authoring Guide](./docs/SKILL-AUTHORING-GUIDE.md)** &nbsp;•&nbsp; **[🗺️ Skill Map](./docs/SKILL-MAP.md)** &nbsp;•&nbsp; **[🍳 Recipes](./docs/RECIPES.md)** &nbsp;•&nbsp; **[📜 Changelog](./docs/CHANGELOG.md)**

---

**On this page:** [Get Started](#get-started) · [Skill Registry](#skill-registry) · [CLI Commands](#cli-reference) · [How It Works](#how-it-works) · [Contributing](#contributing)

</div>

---

## The Problem

Your AI coding agent is exceptional at writing code. Ask it to build a feature, and it will. Ask it to build the *right* feature — the one that fits your business model, serves your actual users, adapts correctly on mobile, and connects properly to the rest of your product — and it will need help.

**Agentway provides that help.**

It installs 35 curated skill definitions into your agent environment. From the moment you describe a product idea, your agent knows how to think through discovery, UX flows, design tokens, responsive behavior, modular architecture, and automated QA — not because it was trained differently, but because it now has the right instructions loaded on demand.

---

## Get Started

No installation required for a first try. Run this from any project directory:

```bash
npx @uwayxt/agent-skills init
```

For persistent access to the `agentway` command across all your projects:

```bash
npm install -g @uwayxt/agent-skills
agentway init
```

The CLI will ask where you want to install: **local** (current project only) or **global** (available in every workspace). Both work out of the box with Claude Code and Google Antigravity IDE.

---

## CLI Reference

```
agentway <command>
```

| Command | Description |
|---------|-------------|
| `agentway init` | Interactive setup — installs skills locally or globally |
| `agentway list` | Display all 35 skills organized by category |
| `agentway update` | Check for newer versions and show upgrade instructions |
| `agentway help` | Show all available commands |

> **After global install**, skills are available in every project automatically. Your IDE detects them on startup — no per-project setup required.

---

## How It Works

Skills are lightweight instruction files (`.agents/skills/`) that your agent loads **only when relevant** to the current task. They are not always-on prompts — they use progressive disclosure so they never bloat your context window.

```
your-project/
├── .agents/
│   └── skills/
│       ├── product-discovery/       ← loaded when you say "validate my idea"
│       │   ├── SKILL.md
│       │   └── agents/openai.yaml
│       ├── design-tokens/           ← loaded when you say "set up a design system"
│       ├── adaptive-component-behavior/
│       ├── qa-feedback-loop-orchestrator/
│       └── ... (35 skills total)
└── .claude/
    └── skills/                      ← symlinks to .agents/skills/ (Claude Code)
```

**Compatible runtimes:** Claude Code, Google Antigravity IDE, and any runtime that supports the Agent Skills open format.

---

## Skill Registry

35 skills across 7 domains covering the complete product development lifecycle.

### A — Product Thinking & Technopreneurship

> *Think before you build. Validate before you code.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `product-discovery` | "validate my idea", "who is the user" | Frames the problem, maps actors, ranks assumptions, defines success metrics |
| `product-strategy` | "prioritize features", "roadmap", "RICE" | Applies RICE/MoSCoW scoring, draws the feature cut-line |
| `business-model-thinking` | "how do we make money", "unit economics" | Sketches CAC/LTV, identifies the revenue model, flags unscalable structures |
| `mvp-scoping` | "MVP", "smallest version", "cut scope" | Names the riskiest assumption, ruthlessly classifies must-have vs out |
| `stakeholder-requirement-mapping` | "requirements from sales/ops", "conflicting needs" | Translates cross-department input into unified requirements |
| `business-model-reading` | "read this business model", "what modules do we need" | Parses a Business Model Canvas → derives product modules systematically |

### B — User Experience (UX)

> *Design the path before designing the screen.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `user-flow-mapping` | "user flow", "journey map", "how does the user get from A to B" | Maps decision paths from entry to goal with error branches |
| `information-architecture` | "sitemap", "navigation structure", "organize features" | Structures menus, groups pages, produces a navigable sitemap |
| `user-research-synthesis` | "synthesize interviews", "what did users say" | Groups raw observations, weights by frequency × severity, derives ranked insights |
| `accessibility-review` | "accessibility", "a11y", "WCAG", "contrast" | Audits against WCAG 2.1 AA: contrast, tap targets, semantic structure |
| `usability-heuristics-check` | "is this UI usable", "heuristic evaluation" | Evaluates against Nielsen's 10 heuristics with severity ratings |

### C — UI & Design System

> *Consistency is not an aesthetic choice — it is an engineering decision.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `design-tokens` | "design tokens", "color palette", "spacing scale" | Defines primitive → semantic → component token layers; outputs `design-tokens.json` |
| `typography-system` | "typography", "font pairing", "type scale" | Pairs fonts, builds a modular type scale, sets line-height and letter-spacing |
| `design-system-builder` | "component library", "UI kit", "build the design system" | Structures atoms → molecules → organisms with specs and props |
| `component-style-guide` | "component states", "hover/disabled states", "state matrix" | Documents every variant × state combination including touch/pressed states |
| `dashboard-layout-patterns` | "dashboard layout", "sidebar", "admin panel shell" | Selects shell pattern (sidebar+topbar, topbar-only, bottom-nav, full-bleed) and grid |
| `visual-hierarchy-review` | "visual hierarchy", "layout review", "what should the eye see first" | Audits focal point, contrast rhythm, size hierarchy, and CTA priority |
| `micro-interaction-motion-design` | "animation", "transitions", "make the UI feel alive" | Defines motion tokens, feedback animations, and reduced-motion compliance |

### D — Delivery & Integration

> *The handoff is where designs go to die. Make it airtight.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `design-to-code-handoff` | "implement this design", "handoff to dev", "turn spec into code" | Maps every design decision to a component, token, and file; produces an ordered file list |
| `cross-functional-review` | "is this ready to ship", "final review", "cross-functional check" | Runs 4 passes: Business · UX · UI · Technical — with a ship/no-ship verdict |

### E — Growth-Aware Design

> *Build for what the product will become, not just what it is today.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `module-registry-sync` | "add new module", "register this module", "wire into dashboard" | Creates a `module.manifest.json`; the dashboard shell reads it automatically |
| `dashboard-scaffolding-contract` | "design the dashboard shell", "modular dashboard" | Builds the shell to read manifests dynamically — no hardcoded nav items |
| `route-integrity-checker` | "broken links", "dead-end buttons", "route audit" | Records intent per CTA; auto-connects them when target pages are created |
| `growth-impact-review` | "adding a new module", "what breaks if I add this" | Checks nav density, shortcut grid, sitemap, and cross-references after every addition |

### F — Responsive, Adaptive & Cross-Device

> *Responsive means different interaction patterns, not just different sizes.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `responsive-breakpoint-strategy` | "breakpoints", "mobile-first layout", "fluid grid" | Defines 6-point `bp-*` token scale, grid system, container query candidates |
| `adaptive-component-behavior` | "adapt for mobile", "sidebar to bottom-nav", "component transformation" | Defines pattern transformations (not just scaling) per device; outputs TRANSFORMATION-TABLE.md |
| `touch-gesture-interaction` | "touch targets", "swipe gesture", "thumb reachability" | Enforces 44×44pt minimums, thumb-zone mapping, gesture definitions, safe-area insets |
| `perceived-performance-loading` | "skeleton loader", "lazy loading", "make it feel fast" | Classifies content by load priority; designs skeleton screens and progressive rendering |
| `responsive-qa-audit` | "responsive QA", "mobile audit", "elements overflowing" | Runs overflow, tap-target, typography, navigation, and transformation checks at every breakpoint |

### G — QA Autonomous & PRD Traceability

> *Quality is not a gate at the end. It is a loop that runs continuously.*

| Skill | Trigger Phrases | What It Does |
|-------|----------------|--------------|
| `prd-traceability-matrix` | "traceability", "which requirements are implemented", "PRD coverage" | Maps every requirement → UI element → route → status in a live matrix |
| `interactive-element-audit` | "buttons without actions", "orphaned elements", "dead links" | Scans every interactive element; generates Playwright scaffold to automate detection |
| `flow-based-functional-testing` | "test this flow", "end-to-end test", "verify the feature works" | Converts user flows to Given-When-Then test cases + Playwright test files |
| `visual-responsive-regression-testing` | "visual regression", "screenshot comparison", "layout broke" | Captures baseline screenshots; flags unintended visual changes at every breakpoint |
| `accessibility-runtime-audit` | "a11y runtime check", "WCAG on real build", "screen reader" | Runs axe-core + keyboard navigation + screen reader spot-check on the live product |
| `qa-feedback-loop-orchestrator` | "orchestrate QA", "self-healing QA", "close the feedback loop" | Batches all QA findings, triggers auto-fixes, retries (max 3×), escalates to human with context |

---

## The End-to-End Flow

When you describe a product to your agent, Agentway skills activate in sequence — each one building on the output of the last:

```
User Request
     │
     ▼
[product-discovery] [business-model-reading]
     │
     ▼
[product-strategy] [business-model-thinking] [mvp-scoping]
     │
     ▼
[user-flow-mapping] [information-architecture]
     │
     ▼
[dashboard-scaffolding-contract]  ← shell built for growth from day one
     │
     ▼
[design-tokens] [typography-system] [micro-interaction-motion-design]
     │
     ▼
[responsive-breakpoint-strategy] [adaptive-component-behavior]
     │
     ▼
[design-system-builder] [component-style-guide]
     │
     ▼
[design-to-code-handoff]  ← every visual decision mapped to code
     │
     ▼
[module-registry-sync] [route-integrity-checker]  ← runs on every new module/page
     │
     ▼
[prd-traceability-matrix]  ← requirements tracked continuously
     │
     ▼
┌─────────────────────────────────────────────┐
│  QA Loop (repeats until all checks pass)    │
│  interactive-element-audit                  │
│  flow-based-functional-testing              │
│  visual-responsive-regression-testing       │
│  accessibility-runtime-audit                │
│       │                                     │
│  qa-feedback-loop-orchestrator              │
│  → auto-fix → retest → escalate if needed   │
└─────────────────────────────────────────────┘
     │
     ▼
[cross-functional-review]  ← ship / no-ship verdict
     │
     ▼
     Output: Production-ready product
```

---

## Requirements

- Node.js 18 or later
- Compatible with Claude Code, Google Antigravity IDE, and any runtime supporting `.agents/skills/` or `.claude/skills/`

---

## Contributing

Agentway is open to contributions. To propose a new skill:

1. Fork the repository.
2. Create a skill folder under `.agents/skills/<your-skill-name>/`.
3. Write `SKILL.md` following the [Skill Authoring Guide](./docs/SKILL-AUTHORING-GUIDE.md).
4. Add an `agents/openai.yaml` with `display_name` and `short_description`.
5. Submit a pull request with a description of the trigger cases and workflow.

Skills must be model-agnostic. No references to specific AI vendors or models in the skill content.

---

## License

**Skills:** © Wahyudi ([@uwayxt](https://github.com/uwayxt)) — MIT License. See [LICENSE-PRODUCT-SKILLS.md](./LICENSE-PRODUCT-SKILLS.md).

**CLI:** MIT License.