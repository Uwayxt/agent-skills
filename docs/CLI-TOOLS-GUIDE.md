# 🛠️ Agentway CLI Automation Suite — Beginner's Guide & Manual
### *A Practical, Step-by-Step Guide to the 10 Built-In Development Tools*

Welcome to the **Agentway CLI Guide**! While Agentway equips AI coding assistants with autonomous design protocols, it also includes **10 standalone CLI automation generators** that you can run directly in your terminal at any stage of development.

Whether you are scaffolding a new feature from scratch, auditing an existing codebase for hardcoded CSS, or generating automated Playwright tests, this guide explains **what each tool does**, **when to use it**, and **what files it produces**.

---

## ⚡ Quick Decision Cheat Sheet: "Which tool do I need?"

| I want to... | Run this command | Output Generated |
| :--- | :--- | :--- |
| 🩺 **Check my overall project health & AI safety** | `agentway doctor ./` | `health-report.md`, `prescription.md` |
| 🔍 **Find and fix hardcoded colors & CSS drift** | `agentway audit:drift ./src` | `drift-report.md`, `drift-fixes.md` |
| 🎨 **Build a design token system (CSS/Tailwind/TS)** | `agentway tokens:build` | `tokens.css`, `tokens.tailwind.js` |
| 📦 **Scaffold a resilient UI component / page** | `agentway scaffold:module <Name>` | React JSX with 5-state resilience + CSS |
| 💡 **Create a high-converting pricing page** | `agentway gen:pricing` | `pricing-matrix.json`, `PricingTable.jsx` |
| 🌊 **Add physics-based spring animations** | `agentway gen:spring` | `spring-tokens.css`, `motion-choreography.js` |
| 🔗 **Find dead links, broken buttons & missing labels** | `agentway audit:routes ./src` | Terminal route integrity & A11y report |
| 🧠 **Check if my layout is too complex / overwhelming** | `agentway audit:cognitive ./src` | Cognitive Friction Index (CFI/100) |
| 🎭 **Stress-test UI with extreme text, data & offline bugs** | `agentway chaos:inject ./e2e` | 3 Playwright chaos test suites |
| 🧪 **Generate automated WCAG 2.2 accessibility tests** | `agentway gen:playwright ./e2e` | Playwright multi-viewport & a11y specs |

---

## 1. 🩺 Project Health & Diagnostics: `agentway doctor`

### What it does:
Scans your frontend repository and calculates an objective **Token Adherence Index (TAI)** score (0–100) across 4 dimensions: Token Coverage ($40\%$), Accessibility ($25\%$), State Resilience ($20\%$), and Responsive Architecture ($15\%$).

### When to use:
- At the start of a sprint or when taking over an existing codebase (Brownfield).
- Before shipping a release to verify your frontend health grade.

```bash
agentway doctor ./
```

### What it produces:
- `health-report.md` — Human-readable Health Report Card with letter grade.
- `health-report.json` — Machine-readable metrics for CI/CD pipelines.
- `prescription.md` — Prioritized P0/P1 roadmap of exact Agentway skills to run to heal the project.

---

## 2. 🔍 Design Token Drift Detector: `agentway audit:drift`

### What it does:
Scans your stylesheets (`.css`, `.scss`, `.module.css`) across **50+ regex patterns** to detect hardcoded CSS anti-patterns (e.g., `#3B82F6`, `margin: 17px`, `font-size: 14px`, `z-index: 99999`).

### When to use:
- After an AI assistant writes code to ensure it didn't bypass your design tokens.
- In pull request checks to prevent technical debt from entering the main branch.

```bash
agentway audit:drift ./src
```

### What it produces:
- `drift-report.md` — Table of every violation with file path, line number, and fix hint.
- `drift-fixes.md` — Ready-to-use search-and-replace recipes to tokenize the code.
- `drift-report.json` — Summary metrics (Critical / High / Medium / Low).

---

## 3. 🎨 Design Tokens Builder: `agentway tokens:build`

### What it does:
Takes a centralized token specification or builds a production-ready design token architecture, compiling it into **Vanilla CSS Variables**, **Tailwind CSS v4 config**, and **TypeScript definitions**.

### When to use:
- At the start of any new frontend project.
- When creating or updating your team's color palette, spacing scale, or elevation models.

```bash
agentway tokens:build
# Or with a custom JSON file:
agentway tokens:build ./styles/tokens.json
```

### What it produces:
- `styles/tokens.css` — CSS Custom Properties with Light & Dark mode support.
- `styles/tokens.tailwind.js` — Tailwind CSS theme extension.
- `styles/tokens.d.ts` — TypeScript type definitions for autocomplete in IDEs.

---

## 4. 📦 Modular Feature Scaffolder: `agentway scaffold:module`

### What it does:
Scaffolds a clean, production-ready React component slice engineered with **5-State Resilience** (Ideal, Empty, Loading/Skeleton, Partial Failure, Network/Offline Error).

### When to use:
- Whenever you need to build a new screen, dashboard widget, or settings page.

```bash
agentway scaffold:module AnalyticsDashboard ./src/modules
```

### What it produces:
- `AnalyticsDashboardModule.jsx` — React component with built-in 5-state state machine.
- `analytics-dashboard.css` — Tokenized styles for the module.
- `module.manifest.json` — Module contract for dynamic dashboard shells.
- `route-intent.json` — Navigation contract and RBAC permissions.

---

## 5. 💡 Behavioral Pricing Modeler: `agentway gen:pricing` *(v1.7.0)*

### What it does:
Generates a complete, mathematically optimized SaaS pricing tier architecture utilizing behavioral economics principles: **Decoy Effect (asymmetric dominance)**, **Loss Aversion copy**, and **Default Annual Billing Anchoring**.

### When to use:
- When building or redesigning a pricing page, paywall modal, or upgrade screen.

```bash
agentway gen:pricing ./src/components/pricing
```

### What it produces:
- `pricing-matrix.json` — Structured tiers (Starter / Decoy / Pro / Enterprise) and feature limits.
- `PricingTable.jsx` — Interactive React component with monthly/annual billing switch.
- `pricing.css` — Responsive, high-converting card styles with primary CTA highlighting.

---

## 6. 🌊 Kinematic Spring Motion Generator: `agentway gen:spring` *(v1.7.0)*

### What it does:
Replaces unnatural, robotic CSS transitions with physics-based **harmonic oscillator spring curves** ($\zeta = c / 2\sqrt{km}$) and asymmetric entry/exit choreography.

### When to use:
- When adding micro-interactions to buttons, dialog modals, dropdowns, or notifications.

```bash
agentway gen:spring ./src/styles
```

### What it produces:
- `spring-tokens.css` — CSS custom properties (`--spring-snappy`, `--spring-natural`, `--ease-in-kinetic`).
- `motion-choreography.js` — Analytical physics solver for dynamic JavaScript animations.

---

## 7. 🔗 Route & Interactive Element Auditor: `agentway audit:routes`

### What it does:
Scans your JSX/TSX/HTML templates for orphaned elements: buttons missing `onClick`/`type="submit"`, placeholder dead links (`href="#"`), and interactive elements missing accessible `aria-label` tags.

### When to use:
- Before shipping to ensure there are no dead-end clicks or broken navigation paths.

```bash
agentway audit:routes ./src
```

---

## 8. 🧠 Cognitive Friction Auditor: `agentway audit:cognitive`

### What it does:
Calculates **Hick's Law decision time** and **Fitts's Law motor effort** across your UI to produce a **Cognitive Friction Index (CFI/100)** score. It alerts you if a screen has too many competing buttons or visual clutter.

### When to use:
- When evaluating complex dashboards, onboarding wizards, or checkout funnels.

```bash
agentway audit:cognitive ./src
```

---

## 9. 🎭 UX Chaos Monkey Test Generator: `agentway chaos:inject`

### What it does:
Generates automated Playwright stress-test suites that inject destructive chaos vectors into your UI to prove resilience before real users find bugs.

### Vectors injected:
1. **Text Explosion:** German compound words, Russian Cyrillic, 300% oversize strings to test text wrapping and overflow.
2. **Data Extremes:** Extreme numbers ($0 \to \$999,999,999$), `NaN`, XSS payloads, 120-character names.
3. **Flaky Network:** Instant offline drops, mid-stream disconnections, 30-second timeouts.

```bash
agentway chaos:inject ./e2e
```

### What it produces:
- `chaos-tests/text-explosion.test.ts`
- `chaos-tests/data-extremes.test.ts`
- `chaos-tests/network-chaos.test.ts`
- `chaos-tests/chaos-vectors.json`

---

## 10. 🧪 Playwright QA Test Generator: `agentway gen:playwright`

### What it does:
Scaffolds automated end-to-end Playwright tests covering **WCAG 2.2 AA accessibility rules** (via axe-core) and responsive viewport checks (Desktop, Tablet, Mobile) to catch layout overflow.

### When to use:
- To establish automated regression testing for your application.

```bash
agentway gen:playwright ./e2e
```

### What it produces:
- `a11y.spec.ts` — Automated WCAG 2.2 AA compliance check.
- `flow.spec.ts` — Multi-viewport functional journey test.

---

## 💡 How CLI Tools and AI Agents Work Together

The best workflow combines **running CLI commands locally in your terminal** with **prompting your AI assistant**:

```bash
# 1. Run local diagnostic in your terminal:
agentway doctor ./
agentway audit:drift ./src

# 2. In your AI agent prompt (Claude Code, Antigravity, Cursor):
# "I ran `agentway doctor` and generated health-report.json and drift-fixes.md. 
# Review the findings and execute the P0 prescriptions using the corresponding Agentway skills."
```

By pairing instant CLI diagnostics with autonomous AI skill protocols, you eliminate guesswork and build mathematically sound, accessible, and resilient frontends.
