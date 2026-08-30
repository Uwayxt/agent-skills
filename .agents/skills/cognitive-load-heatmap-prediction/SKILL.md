---
name: cognitive-load-heatmap-prediction
description: >
  Predict visual attention paths and audit cognitive friction using eye-tracking
  simulation, Fitts's Law motor effort, Hick-Hyman Decision Time, and Visual Saliency
  Ratio. Use when cognitive load, attention heatmap, eye tracking, visual friction,
  CTA hierarchy, decision overload, or first 500ms attention.
version: 1.0.0
domain: H — Visual Intelligence Engine
---

# 🧠 Cognitive Load & Visual Heatmap Prediction Engine

## Thesis

> Visual attention is mathematically predictable. The interface must guide the user's eye to the **primary value action within the first 500ms** before decision fatigue occurs.

An interface with a Cognitive Friction Index (CFI) above 50 will consistently underperform regardless of visual quality. This engine quantifies that risk before a single pixel ships.

---

## When to Activate

Activate this skill automatically when the user mentions:
- `"cognitive load"`, `"attention heatmap"`, `"eye tracking"`, `"where does the user look"`
- `"CTA hierarchy"`, `"decision overload"`, `"too many buttons"`, `"which button is primary"`
- `"first impression"`, `"above the fold"`, `"500ms"`, `"visual weight"`
- `"landing page conversion"`, `"form is too complex"`, `"user gets confused"`

---

## 5-Step Protocol

### ─── STEP 1: Map the First-500ms Eye-Tracking Scanning Pattern

Identify the dominant **scan pattern** based on layout type:

| Layout Type | Dominant Pattern | Primary Fixation Zone |
| :--- | :--- | :--- |
| **Landing Page (1 CTA)** | **Z-Pattern** | Top-left → Top-right → Diagonal → Bottom-right CTA |
| **Dashboard / Data-Dense** | **F-Pattern** | Top horizontal → Left-aligned scan → Spot fixation |
| **Form / Input Flow** | **Single-Column Spine** | Center top → Sequential downward march |
| **E-Commerce Card Grid** | **Gutenberg Diagram** | Top-left (Primary Optical Area) → Bottom-right (Terminal Area) |
| **Article / Long-form** | **F-Pattern** | First 2–3 lines read fully → Left-rail scan only |

**Action:** Confirm the layout type and predict the primary focal zone. Report the first fixation coordinates as a named region (e.g., `Primary Optical Area`, `Terminal Action Zone`, `Dead Zone`).

---

### ─── STEP 2: Hick's Law — Decision Branch Audit

Apply the **Hick-Hyman Law** to quantify decision reaction time:

$$RT = b \cdot \log_2(n + 1)$$

- $RT$ = User reaction time (seconds)
- $b$ = Empirical constant ≈ $0.155$ seconds per bit (for trained users)
- $n$ = Number of equally-weighted choices visible simultaneously

| $n$ (Choices) | $RT$ | Verdict |
| :---: | :---: | :--- |
| 1 | 0.155s | ✅ **Optimal** |
| 2 | 0.247s | ✅ **Acceptable** |
| 3–5 | 0.40–0.52s | ⚠️ **Monitor** |
| 6–9 | 0.56–0.65s | ❌ **Cognitive Overload — Progressive Disclosure Required** |
| ≥ 10 | > 0.70s | 🚨 **Redesign Mandatory** |

**Action:** Count all equally-weighted interactive actions visible in one unscrolled viewport. If $n > 5$, mandatory resolution:
1. Promote the single highest-value action to **Primary CTA** with strong visual hierarchy.
2. Demote remaining actions to secondary text links or a collapsed overflow menu.
3. Apply **2-Step Progressive Disclosure** for advanced/destructive actions.

---

### ─── STEP 3: Fitts's Law — Primary CTA Motor Effort Index

Calculate the **Index of Difficulty (ID)** for the Primary CTA:

$$ID = \log_2\!\left(\frac{2D}{W}\right) \text{ (bits)}$$

- $D$ = Distance from the estimated starting cursor/thumb position (pixels)
- $W$ = Width of the target element (pixels)

| $ID$ (bits) | Effort | Verdict |
| :---: | :--- | :--- |
| ≤ 1.5 | Effortless | ✅ **Optimal** |
| 1.5–2.5 | Low effort | ✅ **Acceptable** |
| 2.5–3.5 | Moderate effort | ⚠️ **Reduce D or increase W** |
| > 3.5 | High friction | ❌ **Requires immediate resize / repositioning** |

**Touch-Specific Fitts's Law — Mobile Thumb Zone Rules:**
- Thumb start position on a 375px wide screen: `x = 187px, y = 720px` (bottom-center).
- Safe reach zone: Bottom 40% of screen height.
- If Primary CTA is placed in the **top 30% of a mobile screen**, automatically flag as **Thumb-Hostile** ($ID$ penalty $+1.5$ bits).

---

### ─── STEP 4: Visual Saliency & CTA Hierarchy Contrast Weight Ratio

Calculate the **Saliency Weight Ratio (SWR)** between Primary and Secondary CTAs:

$$SWR = \frac{S_{\text{primary}}}{S_{\text{secondary}}}$$

Where Saliency Score $S$ is computed as:

$$S = \text{ContrastRatio} \times \text{Area}_{px} \times \text{ColorTemperatureBoost}$$

- `ContrastRatio`: WCAG contrast ratio of the element vs its background.
- `Area_px`: Button area in pixels (`width × height`).
- `ColorTemperatureBoost`: `×1.3` for warm hues (red, orange, yellow), `×1.0` for neutral, `×0.9` for cool (grey, muted).

**Targets:**
- $SWR \ge 2.5$ → ✅ **Primary CTA dominates correctly**
- $SWR < 2.5$ → ❌ **Visual competition detected — users will hesitate**

**Common Anti-Patterns to Flag:**
- Two buttons with identical fill color and size ("Ghost Button Wars").
- Primary CTA using `outline` / `ghost` variant while secondary uses solid fill.
- CTA buried below the fold on mobile without sticky placement.

---

### ─── STEP 5: Cognitive Friction Index (CFI) — Final Score

Compute the unified **Cognitive Friction Index (CFI)** from 0 (frictionless) to 100 (maximum overload):

$$CFI = \left(\frac{RT_{norm}}{0.70} \times 30\right) + \left(\frac{ID_{norm}}{3.5} \times 30\right) + \left(\frac{\max(0,\, 2.5 - SWR)}{2.5} \times 25\right) + \text{Penalty}_{misc}$$

Where $\text{Penalty}_{misc}$ (max 15 points) includes:
- `+5` if scan pattern primary focal zone is in a **Dead Zone** (bottom-left).
- `+5` if a form has $> 6$ consecutive fields without a visual chunk separator.
- `+5` if the page has more than **1 Primary CTA** in the same viewport.

| CFI Score | Grade | Action |
| :---: | :---: | :--- |
| 0–25 | **A — Optimal** | ✅ Ship immediately |
| 26–40 | **B — Good** | ✅ Minor polish recommended |
| 41–55 | **C — Monitor** | ⚠️ Address before launch |
| 56–70 | **D — High Friction** | ❌ Mandatory UX revision |
| 71–100 | **F — Redesign Required** | 🚨 Block shipping |

---

## Completion Checklist

Before marking cognitive audit complete, verify ALL items:

- [ ] Scan pattern identified and primary focal zone confirmed.
- [ ] Hick's Law audit: $n \le 5$ or Progressive Disclosure applied.
- [ ] Fitts's Law: Primary CTA $ID \le 2.5$ bits (desktop) and $\le 3.0$ bits (mobile).
- [ ] SWR: Primary CTA $SWR \ge 2.5$ vs nearest secondary action.
- [ ] CFI Score calculated and documented.
- [ ] CFI $\le 40$ (Grade B or better) — or escalate with specific remediation plan.
- [ ] No "Ghost Button Wars" (two equally-styled competing actions).
- [ ] Mobile: Primary CTA in bottom 60% of screen height.
- [ ] Forms: $\le 6$ consecutive fields per visual chunk.

---

## Output Artifacts

After executing this skill, produce:
1. **`cognitive-audit.md`** — Eye-tracking path prediction, all calculated scores (RT, ID, SWR, CFI), and remediation tasks.
2. **`heatmap-prediction.md`** — Heatmap zone labels with predicted fixation sequence, saccade paths, and dead zones marked per layout region.

---

## Anti-Patterns Reference

| Anti-Pattern | Cognitive Impact | Mandatory Fix |
| :--- | :--- | :--- |
| **Paradox of Choice** ($n > 7$) | Decision paralysis, abandonment | Progressive Disclosure + single promoted CTA |
| **Primary CTA Demotion** (ghost style) | Eye skips CTA, no conversion | Solid filled Primary, demote all secondaries to text links |
| **Form Wall** ($> 6$ fields) | Overwhelm, form abandonment | Split into named fieldset sections with progress indicator |
| **Dead Zone Anchor** (Bottom-left focal point) | CTA never seen | Relocate CTA to Terminal Zone or add thumb-reachable sticky footer |
| **Above-Fold Mobile CTA** (top 30%) | Thumb inaccessible | Move to bottom-sheet or sticky bottom bar |
| **Competing Primaries** (2+ solid CTA buttons) | User hesitation, lower CVR | One Primary, one Secondary max — all others as links |
