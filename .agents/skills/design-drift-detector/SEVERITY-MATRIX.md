# 🎯 Severity Matrix — Design Drift Scoring

## Overview

Each violation category is weighted by its impact on:
1. **Visual consistency** — How visible is the drift to users?
2. **AI drift risk** — How much does this mislead future AI generation?
3. **Cascade impact** — Does fixing this unblock other token migrations?
4. **Dark mode blocker** — Does this prevent dark mode from working correctly?

---

## Severity Weights

| Category | ID | Severity | TAI Penalty | Visual Impact | AI Drift Risk | Dark Mode Block |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Hardcoded Colors | C1 | 🔴 Critical | −20 pts | Very High | Very High | ✅ Yes |
| Hardcoded Typography | C3 | 🟠 High | −10 pts | High | High | ❌ No |
| Hardcoded Spacing | C2 | 🟠 High | −10 pts | High | High | ❌ No |
| Inline `style=` Attr | AP.02 | 🟠 High | −10 pts | High | Very High | ✅ Yes |
| Hardcoded Radius | C4 | 🟡 Medium | −5 pts | Medium | Medium | ❌ No |
| Hardcoded Shadows | C5 | 🟡 Medium | −5 pts | Medium | Medium | ⚠️ Partial |
| Hardcoded Z-Index | C6 | 🟡 Medium | −5 pts | Low | Low | ❌ No |
| `!important` Flags | AP.01 | 🟡 Medium | −5 pts | Low | High | ⚠️ Partial |
| Hardcoded Duration | C7 | 🟢 Low | −2 pts | Low | Low | ❌ No |
| Magic calc() Numbers | AP.03 | 🟡 Medium | −5 pts | Medium | Medium | ❌ No |

---

## Drift Rate Thresholds

```
Drift Rate = (Total Violations / Total CSS Declarations) × 100

Thresholds:
  < 5%   → ✅ Token-Compliant   (excellent AI-safe design system)
  5–15%  → ⚠️ Minor Drift       (advisory: clean up in next sprint)
  15–30% → 🟠 Significant Drift (sprint-blocking: P1 remediation)
  > 30%  → 🔴 Design Breakdown  (P0: stop AI generation until resolved)
```

---

## TAI Impact Calculation

The drift rate is used as Signal E to adjust the TAI score:

```
Base TAI = (tokenCoverage × 0.40) + (wcagScore × 0.25) + 
           (resilience × 0.20) + (responsive × 0.15)

Drift Adjustment:
  drift_rate < 5%   → TAI_adjustment = 0       (no penalty)
  drift_rate 5–15%  → TAI_adjustment = -5       (advisory)
  drift_rate 15–30% → TAI_adjustment = -15      (significant)
  drift_rate > 30%  → TAI_adjustment = -25      (critical)

Final TAI = Base TAI + TAI_adjustment (minimum 0)
```

---

## Pass/Fail Thresholds per Project Type

| Project Type | Acceptable Drift Rate | TAI Minimum |
| :--- | :---: | :---: |
| **Production App (Public)** | < 5% | 80 |
| **Internal Dashboard** | < 10% | 70 |
| **MVP / Prototype** | < 20% | 60 |
| **Design System Package** | < 2% | 90 |
| **AI-Generated Codebase** | < 15% | 70 |

---

## Violation Priority Decision Matrix

Use this matrix to decide which violations to fix first when time is limited:

```
Is it a color violation?
├── YES → Fix immediately (dark mode blocker + AI drift root cause)
│
└── NO → Is it blocking dark mode?
         ├── YES → Fix before dark mode implementation
         │
         └── NO → Does it affect more than 20 files?
                  ├── YES → Fix in current sprint (high spread)
                  │
                  └── NO → Add to token migration backlog
```

---

## Red Flags: Automatic Critical Escalation

The following patterns automatically escalate to **Critical severity** regardless of category:

| Pattern | Reason for Escalation |
| :--- | :--- |
| `z-index: 9999` / `99999` | Arms race pattern — entire z-index stack is unmanaged |
| `!important` on color/background | Blocks token cascade propagation globally |
| `style=` on core UI primitives (Button, Input, Card) | Permanent AI confusion pattern |
| > 50 hardcoded color instances in a single file | Component is 100% design-system-independent |
| 0 `var(--` usages in a CSS file > 50 lines | Token system completely bypassed |

---

## Remediation Effort Estimates

| Severity | Avg. Time per Violation | Automatable? |
| :--- | :---: | :---: |
| 🔴 Critical (color) | 2–5 min | 70% (with token map) |
| 🟠 High (spacing) | 1–3 min | 90% (with spacing map) |
| 🟠 High (typography) | 2–4 min | 80% (with type map) |
| 🟡 Medium (radius) | 30 sec | 95% (direct mapping) |
| 🟡 Medium (shadow) | 1 min | 85% (shadow map) |
| 🟡 Medium (z-index) | 1 min | 90% (z-scale) |
| 🟢 Low (duration) | 30 sec | 95% (duration map) |
