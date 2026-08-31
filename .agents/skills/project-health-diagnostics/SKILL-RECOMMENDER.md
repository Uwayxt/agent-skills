# 🧭 Skill Recommender — Symptom → Prescription Decision Tree

## Purpose

Use this decision tree to map a specific project symptom to the exact Agentway skill that resolves it. Cross-reference with TAI sub-scores from the diagnostic scan.

---

## Primary Decision Tree

```
Project Symptom
│
├─ "AI generates inconsistent colors/spacing"
│  ├─ TAI token_coverage < 80%   → design-tokens (P0)
│  └─ TAI drift_rate > 10%       → design-drift-detector (P0)
│
├─ "Components break at certain screen sizes"
│  ├─ No breakpoint system       → responsive-breakpoint-strategy (P0)
│  ├─ Sidebar doesn't transform  → adaptive-component-behavior (P1)
│  └─ Touch targets too small    → touch-gesture-interaction (P1)
│
├─ "Users complain about accessibility"
│  ├─ WCAG score < 75%           → accessibility-review (P0)
│  ├─ Runtime a11y failures      → accessibility-runtime-audit (P0)
│  └─ Focus states missing       → accessibility-review (P0)
│
├─ "App crashes or shows blank screens"
│  ├─ No error boundary          → error-boundary-resilience-design (P0)
│  ├─ Missing loading states     → perceived-performance-loading (P1)
│  └─ Offline not handled        → error-boundary-resilience-design (P0)
│
├─ "Dark mode looks broken"
│  └─ No theme token layer       → dark-mode-theming-system (P0)
│
├─ "UI feels static / no personality"
│  ├─ No motion tokens           → micro-interaction-motion-design (P1)
│  └─ Spring physics needed      → micro-interaction-motion-design (P2)
│
├─ "AI assistant generates wrong UI patterns"
│  ├─ No design context          → visual-style-extractor (P1)
│  └─ AI UX patterns wrong       → ai-feature-ux-patterns (P1)
│
├─ "PRD requirements not traceable to UI"
│  └─ No traceability matrix     → prd-traceability-matrix (P1)
│
├─ "Routes/pages are broken or orphaned"
│  └─ Navigation integrity issue → route-integrity-checker (P1)
│
├─ "Users confused by the interface"
│  ├─ Heuristic violations       → usability-heuristics-check (P0)
│  ├─ Hierarchy unclear          → visual-hierarchy-review (P1)
│  └─ CTA hierarchy wrong        → cognitive-load-heatmap-prediction (P1)
│
├─ "Edge cases crash the UI"
│  └─ No stress testing          → ux-chaos-monkey (P1)
│
├─ "Need to support multiple languages"
│  └─ No i18n architecture       → i18n-localization-strategy (P1)
│
├─ "Buttons/links not working"
│  └─ Dead interactive elements  → interactive-element-audit (P0)
│
├─ "Hard to onboard new designers"
│  ├─ No component documentation → component-style-guide (P2)
│  └─ No design tokens doc       → design-tokens (P2)
│
├─ "Visual regression after update"
│  └─ No screenshot baseline     → visual-responsive-regression-testing (P1)
│
├─ "Need to validate user flows end-to-end"
│  ├─ No flow mapping            → user-flow-mapping (P1)
│  └─ No functional test cases   → flow-based-functional-testing (P1)
│
├─ "Security concerns in UI"
│  └─ No auth/privacy audit      → security-privacy-review (P0)
│
└─ "Ready for launch but not sure"
   └─ Final pre-launch review    → cross-functional-review (P0)
```

---

## TAI Score → Skill Priority Matrix

| TAI Score | Immediate P0 Skills | Sprint P1 Skills |
| :---: | :--- | :--- |
| 0–49 | `design-tokens`, `accessibility-review`, `error-boundary-resilience-design` | `design-drift-detector`, `responsive-breakpoint-strategy` |
| 50–69 | `design-drift-detector`, `accessibility-review` | `dark-mode-theming-system`, `ux-chaos-monkey` |
| 70–79 | `micro-interaction-motion-design` | `cognitive-load-heatmap-prediction`, `visual-hierarchy-review` |
| 80–89 | `cross-functional-review`, `security-privacy-review` | `i18n-localization-strategy`, `component-style-guide` |
| 90–100 | — (maintain) | `ux-chaos-monkey` stress test |

---

## Quick Lookup: Symptom → Skill (Alphabetical)

| Symptom Keyword | Recommended Skill |
| :--- | :--- |
| animation, motion, transitions | `micro-interaction-motion-design` |
| breakpoints, responsive, mobile | `responsive-breakpoint-strategy` |
| buttons, links, dead clicks | `interactive-element-audit` |
| chaos, stress test, edge cases | `ux-chaos-monkey` |
| colors, tokens, CSS variables | `design-tokens` |
| component states, variants | `component-style-guide` |
| dark mode, theme | `dark-mode-theming-system` |
| design drift, hardcoded | `design-drift-detector` |
| error, crash, blank screen | `error-boundary-resilience-design` |
| flow, journey, navigation path | `user-flow-mapping` |
| font, typography, scale | `typography-system` |
| heatmap, attention, CTA | `cognitive-load-heatmap-prediction` |
| hierarchy, layout, contrast | `visual-hierarchy-review` |
| i18n, RTL, multi-language | `i18n-localization-strategy` |
| keyboard, screen reader, aria | `accessibility-review` |
| loading, skeleton, lazy | `perceived-performance-loading` |
| offline, queue, IndexedDB | `error-boundary-resilience-design` |
| PRD, requirements, traceability | `prd-traceability-matrix` |
| privacy, auth, GDPR | `security-privacy-review` |
| routes, pages, navigation | `route-integrity-checker` |
| screenshot, regression, visual | `visual-responsive-regression-testing` |
| sidebar, tablet, transform | `adaptive-component-behavior` |
| swipe, touch, gesture | `touch-gesture-interaction` |
| usability, heuristics, UX | `usability-heuristics-check` |
