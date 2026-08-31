---
name: design-drift-detector
description: >
  Scans a codebase for design token violations — components bypassing the design
  system with hardcoded colors, magic number spacings, literal font sizes, and other
  CSS anti-patterns. Produces a severity-sorted drift report with auto-fix recipes.
  Use when: audit:drift, hardcoded CSS, token drift, design drift, hardcoded colors,
  magic numbers, CSS violations, design system enforcement.
version: 1.6.0
phase: 8
category: Project Intelligence & Drift Prevention
---

# 🔍 Skill: Design Drift Detector

## Purpose

AI coding agents are precision-correct but context-blind. They generate `#3B82F6` when they should generate `var(--color-primary)`. They write `margin: 16px` when the token is `var(--space-4)`. Over time, this silent drift disconnects the codebase from the design system — making future AI assistance increasingly inaccurate.

This skill detects that drift with surgical precision across **7 violation categories** and **50+ pattern signatures**.

---

## Trigger Phrases

| Phrase | Activation |
| :--- | :---: |
| "audit:drift" / "agentway audit:drift" | ✅ |
| "check hardcoded CSS" / "find hardcoded values" | ✅ |
| "token drift" / "design drift" | ✅ |
| "hardcoded colors" / "magic numbers" | ✅ |
| "CSS violations" / "token enforcement" | ✅ |
| "design system compliance" / "token coverage" | ✅ |
| "find non-token values" | ✅ |

---

## Protocol: 3-Pass Drift Audit

### PASS 1 — Critical Violations (Colors & Typography)

Scan for the highest-severity drift patterns that directly break visual consistency:

**Color Violations:**
- Hardcoded hex: `#[0-9a-fA-F]{3,6}`
- Hardcoded RGB: `rgb([0-9]+,\s*[0-9]+,\s*[0-9]+)`
- Hardcoded RGBA: `rgba([0-9]+,\s*[0-9]+,\s*[0-9]+,\s*[0-9.]+)`
- Hardcoded HSL: `hsl([0-9]+,\s*[0-9]+%,\s*[0-9]+%)`
- Named colors: `color: red`, `background: blue`, `border-color: black`

**Typography Violations:**
- Literal font-size: `font-size:\s*[0-9]+(px|rem|em)` (not using token)
- Literal font-weight: `font-weight:\s*(100|200|300|400|500|600|700|800|900)` (not using token)
- Literal line-height: `line-height:\s*[0-9]+(px|em)` (literal, not unitless token)

### PASS 2 — High Violations (Spacing & Layout)

**Spacing Violations:**
- Literal margin: `margin(-top|-right|-bottom|-left)?:\s*[0-9]+(px|rem)`
- Literal padding: `padding(-top|-right|-bottom|-left)?:\s*[0-9]+(px|rem)`
- Literal gap: `gap:\s*[0-9]+(px|rem)`
- Literal grid columns: `grid-template-columns:\s*repeat\([0-9]+,\s*[0-9]+(px|fr)`

**Dimension Violations:**
- Hardcoded width/height with non-semantic values:
  `(width|height):\s*[0-9]+(px)` (not 100%, auto, or a known breakpoint)

### PASS 3 — Medium/Low Violations (Radius, Shadow, Z-Index, Duration)

**Border Radius:**
- `border-radius:\s*[0-9]+(px|rem|%)` (not using `var(--radius-*)`)

**Box Shadow:**
- `box-shadow:\s*[0-9]+(px)` (hardcoded shadow, not using `var(--shadow-*)`)

**Z-Index:**
- `z-index:\s*[0-9]+` (not using named `var(--z-*)` token)
- Anti-pattern: `z-index:\s*(9999|99999|999)`

**Transition/Duration:**
- `transition(-duration)?:\s*[0-9]+(ms|s)` (not using `var(--duration-*)`)
- `animation-duration:\s*[0-9]+(ms|s)`

**Specificity Anti-Patterns:**
- `!important` usage (overrides token cascade)
- `style=` inline styles in component templates

---

## Severity Classification

| Level | Score Impact | Action Required |
| :--- | :---: | :--- |
| 🔴 **Critical** | −20 pts per violation | Fix before next AI session |
| 🟠 **High** | −10 pts per violation | Fix in current sprint |
| 🟡 **Medium** | −5 pts per violation | Fix in next sprint |
| 🟢 **Low** | −2 pts per violation | Fix in backlog cleanup |

### Severity Matrix by Category
| Category | Severity | Why |
| :--- | :---: | :--- |
| Hardcoded colors | 🔴 Critical | Breaks brand consistency, blocks dark mode |
| Hardcoded typography | 🟠 High | Breaks type scale, disables responsive text |
| Hardcoded spacing | 🟠 High | Breaks rhythm, causes layout inconsistency |
| Hardcoded radius | 🟡 Medium | Visual inconsistency but non-breaking |
| Hardcoded shadow | 🟡 Medium | Elevation inconsistency |
| Hardcoded z-index | 🟡 Medium | Stacking context bugs |
| Hardcoded duration | 🟢 Low | Motion inconsistency |
| `!important` flags | 🟡 Medium | Blocks token cascade override |
| Inline `style=` | 🟠 High | Unauditable, not token-resolved |

---

## Drift Report Output Format

### `drift-report.md`
```markdown
# 🔍 Design Drift Report — [project-name]
Scanned: [timestamp] | Files: [N] | Total Violations: [N]

## Summary
| Severity | Count | Files Affected |
| Critical | 12    | 8              |
| High     | 34    | 15             |
| Medium   | 47    | 22             |
| Low      | 18    | 9              |

## Critical Violations
### 🔴 Hardcoded Colors (12 violations)
| File | Line | Code | Fix |
| components/Button.css | 14 | `color: #3B82F6` | `color: var(--color-primary)` |
```

### `drift-report.json`
```json
{
  "version": "1.6.0",
  "scannedAt": "ISO8601",
  "summary": {
    "totalFiles": 47,
    "totalViolations": 111,
    "driftRate": "23.4%",
    "byCategory": {
      "hardcodedColors": { "count": 12, "severity": "critical" },
      "hardcodedSpacing": { "count": 34, "severity": "high" },
      "hardcodedTypography": { "count": 22, "severity": "high" }
    }
  },
  "violations": [
    {
      "file": "components/Button.css",
      "line": 14,
      "category": "hardcodedColor",
      "severity": "critical",
      "found": "color: #3B82F6",
      "fix": "color: var(--color-primary)"
    }
  ]
}
```

---

## Integration with project-health-diagnostics

The drift rate from this skill directly feeds Signal E in the TAI calculation:

```
drift_rate = (total_violations / (total_declarations × 100))

TAI_adjustment:
  drift_rate < 5%   → no penalty
  drift_rate 5–15%  → -5 from TAI
  drift_rate 15–30% → -15 from TAI
  drift_rate > 30%  → -25 from TAI
```

---

## Companion Skills

| Skill | Relationship |
| :--- | :--- |
| `project-health-diagnostics` | Parent skill — runs drift-detector as Signal E |
| `design-tokens` | Provides the token system that violations should reference |
| `dark-mode-theming-system` | Color hardcoding blocks dark mode token switching |
| `ux-chaos-monkey` | Chaos injector validates fixes hold under stress |
