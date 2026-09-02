---
name: behavioral-pricing-psychology
description: >
  Architects high-converting SaaS pricing models and paywall UX using behavioral
  economics principles: Decoy Effect (asymmetric dominance), Loss Aversion framing,
  Default Anchoring (annual billing toggle), and strategic Feature Gating hierarchies.
  Use when: pricing table, paywall, monetization, pricing tiers, decoy effect,
  how to price this product, subscription pricing, feature gating, upgrade UX.
version: 1.7.0
phase: 9
category: Behavioral Psychology & Kinetic Motion
---

# 💡 Skill: Behavioral Pricing Psychology

## Purpose

Most developer teams build pricing pages as flat 3-column tables with generic bullet points. This skill equips agents with **behavioral economics protocols** to mathematically model and design high-converting SaaS pricing structures — leveraging cognitive biases (Decoy Effect, Loss Aversion, Anchoring) while maintaining strict ethical clarity.

---

## Trigger Phrases

| Phrase | Activation |
| :--- | :---: |
| "pricing table" / "pricing page" | ✅ |
| "how should we price this" / "pricing tiers" | ✅ |
| "decoy effect" / "pricing psychology" | ✅ |
| "paywall UX" / "upgrade modal" | ✅ |
| "feature gating" / "freemium vs pro" | ✅ |
| "annual vs monthly toggle" | ✅ |
| "agentway gen:pricing" | ✅ |

---

## Protocol: 5-Step Pricing Architecture Engine

### STEP 1 — Value Metric & Persona Mapping

Isolate the single value metric that scales with customer utility:
- **Per-Seat / User** (e.g. Collaboration tools, CRM)
- **Usage / Volume** (e.g. API requests, GB storage, emails sent)
- **Feature Access / Tier-based** (e.g. Advanced analytics, Custom domain)
- **Hybrid** (Base fee + Overages)

Define 3 distinct buyer personas (Starter / Core Professional / Enterprise Organization).

### STEP 2 — Decoy Effect & Asymmetric Dominance Modeling

Structure pricing to steer users toward the **Target Tier (Pro/Growth)**:
1. **Tier A (Starter):** Low price, limited utility (establishes price floor).
2. **Tier B (Decoy):** Priced close to Tier C ($80\%–90\%$ of Tier C cost) but with significantly inferior features compared to Tier C.
3. **Tier C (Target Pro):** The optimal package with superior utility, making Tier B appear irrational to choose.

$$\text{Decoy Efficiency Ratio} = \frac{\Delta \text{Value}(C - B)}{\Delta \text{Price}(C - B)} > 3.0$$

### STEP 3 — Default Anchoring & Annual Discount Psychology

1. **Pre-selected Toggle:** Set Annual Billing as the default active state.
2. **Discount Framing:** Highlight savings as a percentage (`Save 20%`) or time equivalent (`2 Months Free`), positioned directly on the toggle switch.
3. **Badge Hierarchy:** Position an eye-catching pill badge on the target tier (`MOST POPULAR` or `RECOMMENDED`) with high-contrast background tokens.

### STEP 4 — Loss Aversion & Benefit Framing

Replace static feature checkmarks with value-oriented framing:
- ❌ Weak: *"Export to CSV"*
- ✅ Loss-Averse: *"Never lose custom reports with automated cloud CSV backups"*
- ❌ Weak: *"5 Team Members"*
- ✅ Value-Framed: *"Collaborate seamlessly across 5 team members with real-time sync"*

### STEP 5 — Paywall UX & Feature Gating

Establish clear state transitions when users encounter locked features:
1. **Soft Paywall (Teaser):** Render the UI with blurred preview or lock icon + *"Unlock Advanced Analytics on Pro"*.
2. **In-Context Upgrade Modal:** 1-click upgrade flow with instant proration calculation.
3. **No-Surprise Billing Guarantee:** State clear refund/cancellation terms directly under the CTA button.

---

## Deliverables Generated

1. `pricing-matrix.json` — Machine-readable tiers, limits, and pricing metadata.
2. `PricingTable.jsx` — Interactive React component with annual/monthly toggle and decoy tier.
3. `pricing.css` — High-contrast, responsive CSS with light/dark mode tokens.

---

## Companion Skills

| Skill | Relationship |
| :--- | :--- |
| `business-model-thinking` | Sets unit economics and gross margin floor |
| `design-tokens` | Provides semantic colors for CTA and highlight badges |
| `micro-interaction-motion-design` | Animates the annual/monthly price transition |
| `ethical-ux-guardian` | Ensures cancellation and pricing transparency |
