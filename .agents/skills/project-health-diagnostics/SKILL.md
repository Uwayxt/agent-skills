---
name: project-health-diagnostics
description: >
  Autonomous project health audit engine that computes a Token Adherence Index (TAI)
  score (0–100), maps quality gaps to specific Agentway skills, and generates a
  structured Health Report Card with a prioritized prescription queue.
  Use when: health check, diagnose project, TAI score, what skills do I need,
  agentway doctor, project quality audit, skill recommender.
version: 1.6.0
phase: 8
category: Project Intelligence & Drift Prevention
---

# 🩺 Skill: Project Health Diagnostics

## Purpose

After months of AI-assisted development, codebases silently drift. Components bypass design tokens. Accessibility gaps accumulate. Error states get skipped. This skill gives agents the ability to **run a structured diagnostic and prescribe exactly what's missing** — turning "something feels off" into an actionable, scored health report.

---

## Trigger Phrases

| Phrase | Activation |
| :--- | :---: |
| "health check" / "health report" | ✅ |
| "diagnose my project" / "audit this codebase" | ✅ |
| "TAI score" / "token adherence" | ✅ |
| "what skills do I need?" | ✅ |
| "agentway doctor" | ✅ |
| "what's missing from my design system?" | ✅ |
| "project quality audit" | ✅ |

---

## Protocol: 5-Step Diagnostic Engine

### STEP 1 — Scan (2–3 turns)

Detect the project's current state across 5 signal categories:

```
SIGNAL A: Token Architecture
  - Are CSS custom properties used? (var(--color-*), var(--space-*))
  - Is there a token file? (tokens.css, design-tokens.json, theme.ts)
  - Token coverage estimate: % of color/spacing/type using tokens vs hardcoded

SIGNAL B: WCAG Compliance
  - Presence of aria-*, role=*, alt="", tabindex
  - Color contrast annotations in component comments
  - Focus state styles (:focus-visible)
  - Skip navigation links

SIGNAL C: Resilience Coverage
  - Are empty/loading/error/offline/partial states handled in components?
  - Is there an Error Boundary component?
  - Are network failure states covered (offline queue, timeout fallback)?

SIGNAL D: Responsive Architecture
  - Breakpoint system defined? (@media, container queries)
  - Mobile-first CSS cascade?
  - Touch target minimum sizes (44×44px)?
  - Adaptive component transformations (sidebar → bottom-nav)?

SIGNAL E: AI Drift Indicators
  - Frequency of hardcoded hex colors, px values, magic numbers
  - Ratio of var(--token) vs literal values in stylesheets
  - Presence of z-index: 9999 or !important flags
```

### STEP 2 — Score: Token Adherence Index (TAI)

Compute the TAI score using the weighted formula:

```
TAI = (token_coverage   × 0.40) +
      (wcag_score        × 0.25) +
      (resilience_cover  × 0.20) +
      (responsive_score  × 0.15)

Each sub-score: 0–100 based on signal presence and coverage

Grade Thresholds:
  90–100 → 🟢 Excellent  (production-ready, autonomous AI-safe)
  70–89  → 🟡 Good       (minor gaps, advisory remediation)
  50–69  → 🟠 Needs Work (significant gaps, blocking issues)
  0–49   → 🔴 Critical   (design system not enforced, high drift risk)
```

### STEP 3 — Identify: Gap Mapping

For each sub-score below threshold, map to the responsible Agentway skill:

| Sub-Score Low | Root Cause | Prescribe |
| :--- | :--- | :--- |
| Token Coverage < 80% | No token architecture | `design-tokens` (P0) |
| WCAG Score < 75% | Accessibility gaps | `accessibility-review` (P0) |
| Resilience Coverage < 70% | Missing state contracts | `error-boundary-resilience-design` (P1) |
| Responsive Score < 70% | No breakpoint system | `responsive-breakpoint-strategy` (P1) |
| Any hardcoded values > 10% | AI drift detected | `design-drift-detector` (P0) |
| No motion tokens | Animation inconsistency | `micro-interaction-motion-design` (P2) |
| No dark mode tokens | Theme system absent | `dark-mode-theming-system` (P2) |

### STEP 4 — Prescribe: Skill Activation Queue

Output a prioritized prescription using this priority model:

```
P0 — CRITICAL: Run immediately. Blocks production quality.
P1 — HIGH:     Run in current sprint. Significant UX impact.
P2 — MEDIUM:   Run in next sprint. Polish and consistency.
P3 — LOW:      Run when capacity allows. Nice-to-have improvement.
```

### STEP 5 — Report: Generate Health Report Card

Produce two artifacts:

**`health-report.md`** — Human-readable with:
- TAI Score badge (0–100 with grade emoji)
- Radar breakdown (token / WCAG / resilience / responsive)
- Top 3 critical gaps with 1-line explanations
- Prioritized prescription table

**`health-report.json`** — Machine-readable for CI integration:
```json
{
  "version": "1.6.0",
  "scannedAt": "ISO8601",
  "tai": { "score": 74, "grade": "Good",
    "breakdown": { "tokenCoverage": 82, "wcagScore": 78,
                   "resilienceCoverage": 65, "responsiveScore": 71 }},
  "drift": { "critical": 3, "high": 7, "medium": 12, "low": 4 },
  "prescription": [
    { "skill": "design-tokens", "priority": "P0",
      "reason": "Token coverage 63% — below 80% threshold" }
  ]
}
```

---

## Diagnostic Reference Thresholds

| Sub-Metric | Green (≥) | Yellow (≥) | Red (<) |
| :--- | :---: | :---: | :---: |
| Token Coverage | 85% | 70% | 70% |
| WCAG Score | 80% | 65% | 65% |
| Resilience Coverage | 75% | 55% | 55% |
| Responsive Score | 75% | 60% | 60% |
| AI Drift Rate | < 5% | < 15% | ≥ 15% |

---

## CI Integration Pattern

```yaml
# .github/workflows/quality-gate.yml
- name: Run Agentway Health Check
  run: agentway doctor ./ --json > health-report.json
  continue-on-error: true  # Advisory in v1.6.0

- name: Check TAI Threshold
  run: |
    TAI=$(node -e "console.log(require('./health-report.json').tai.score)")
    echo "TAI Score: $TAI"
    if [ "$TAI" -lt 60 ]; then
      echo "⚠️ TAI score below 60 — review health-report.json"
    fi
```

---

## Companion Skills

| Skill | Relationship |
| :--- | :--- |
| `design-drift-detector` | Runs automatically as part of TAI scan (Signal E) |
| `design-tokens` | Most commonly prescribed for token_coverage gaps |
| `accessibility-review` | Prescribed when WCAG score is red |
| `error-boundary-resilience-design` | Prescribed when resilience coverage is low |
| `responsive-breakpoint-strategy` | Prescribed when responsive score is low |
| `ux-chaos-monkey` | Prescribed when drift rate is high (AI hallucination risk) |
