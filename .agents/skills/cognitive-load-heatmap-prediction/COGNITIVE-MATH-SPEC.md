# 📐 Cognitive Load — Mathematical Specification Reference

Full mathematical derivations and lookup tables for all formulas used in the `cognitive-load-heatmap-prediction` skill.

---

## 1. Hick-Hyman Law — Reaction Time

**Formula:**
$$RT = b \cdot \log_2(n + 1)$$

| Variable | Description | Value |
| :--- | :--- | :--- |
| $RT$ | Mean reaction / decision time | seconds |
| $b$ | Empirical constant (trained users) | `0.155 s/bit` |
| $n$ | Number of equally-weighted options | count |

**Derivation Note:** The `+1` accounts for the null option (doing nothing). Hick (1952) and Hyman (1953) independently confirmed this logarithmic relationship between choice count and reaction time.

**Lookup Table:**
| $n$ | $RT$ (s) | Binary Entropy $H(bits)$ |
| --- | --- | --- |
| 1 | 0.155 | 1.00 |
| 2 | 0.247 | 1.58 |
| 3 | 0.310 | 2.00 |
| 4 | 0.358 | 2.32 |
| 5 | 0.397 | 2.58 |
| 6 | 0.430 | 2.81 |
| 7 | 0.459 | 3.00 |
| 9 | 0.506 | 3.32 |
| 12 | 0.556 | 3.70 |

---

## 2. Fitts's Law — Index of Difficulty

**Original Shannon Formulation (preferred):**
$$ID = \log_2\!\left(\frac{2D}{W}\right)$$

**Alternative (Welford's):**
$$ID = \log_2\!\left(\frac{D}{W} + 0.5\right)$$

| Variable | Description |
| :--- | :--- |
| $ID$ | Index of Difficulty (bits) |
| $D$ | Distance from starting position to target center (px) |
| $W$ | Width of the target (px) — smallest dimension for irregular shapes |

**Acquisition Time:**
$$MT = a + b \cdot ID$$

Where: $a \approx 0$ (intercept) and $b \approx 0.1$ seconds/bit (mouse), $b \approx 0.15$ s/bit (finger/touch).

**Standard Targets:** Primary CTA minimum touch target: `W = 44px` (Apple HIG), `W = 48px` (Material 3).

---

## 3. Visual Saliency Score

**Saliency Weight Function:**
$$S = CR \times A \times T$$

| Variable | Description |
| :--- | :--- |
| $CR$ | WCAG Contrast Ratio vs background (e.g., `4.5`) |
| $A$ | Element area in pixels ($\text{width} \times \text{height}$) |
| $T$ | Color Temperature Boost Factor |

**Color Temperature Boost Factor $T$:**
| Hue Range | Category | $T$ |
| :--- | :--- | :--- |
| Red, Orange, Yellow ($H \in [0°, 60°]$) | Warm | `1.30` |
| Green ($H \in [100°, 160°]$) | Neutral-Warm | `1.10` |
| Blue, Indigo ($H \in [200°, 260°]$) | Cool | `1.00` |
| Purple, Violet ($H \in [270°, 320°]$) | Cool-Neutral | `0.95` |
| Grey, Monochrome (Saturation `< 10%`) | Achromatic | `0.85` |

**Saliency Weight Ratio:**
$$SWR = \frac{S_{\text{primary}}}{S_{\text{secondary}}}$$

Target: $SWR \ge 2.5$

---

## 4. Cognitive Friction Index (CFI)

**Unified Formula:**
$$CFI = \left(\frac{RT}{0.70} \times 30\right) + \left(\frac{ID}{3.5} \times 30\right) + \left(\frac{\max(0,\ 2.5 - SWR)}{2.5} \times 25\right) + P$$

| Term | Max Contribution | Description |
| :--- | :---: | :--- |
| Decision Load $(RT)$ | 30 pts | Normalized Hick's RT against worst-case 0.70s |
| Motor Friction $(ID)$ | 30 pts | Normalized Fitts's ID against worst-case 3.5 bits |
| Saliency Deficit $(SWR)$ | 25 pts | Only contributes if $SWR < 2.5$ |
| Misc Penalties $(P)$ | 15 pts | Dead zone anchor, form wall, competing primaries |

**CFI Grade Thresholds:**
| Range | Grade | Shipping Gate |
| --- | --- | --- |
| 0–25 | **A — Optimal** | ✅ Green light |
| 26–40 | **B — Good** | ✅ Ship with minor notes |
| 41–55 | **C — Monitor** | ⚠️ Fix within 1 sprint |
| 56–70 | **D — High Friction** | ❌ Block: Requires UX iteration |
| 71–100 | **F — Redesign** | 🚨 Do not ship |

---

## 5. Information Entropy of Decision Set

**Shannon Entropy (for equally-probable choices):**
$$H = \log_2(n)$$

**Shannon Entropy (for weighted probabilities):**
$$H = -\sum_{i=1}^{n} p_i \log_2(p_i)$$

When one option dominates (e.g., 80% of users click CTA, 20% others), entropy drops significantly:
$$H = -(0.80 \log_2 0.80 + 0.20 \log_2 0.20) \approx 0.72 \text{ bits}$$

This is why **clear primary CTAs with muted secondaries dramatically reduce cognitive load** even when technically showing many options.

---

## 6. Miller's Magic Number — Chunking Law

**Working Memory Capacity:**
$$\text{Chunks} = 7 \pm 2$$

Applications in UI:
- Navigation menus: **≤ 7 items** max (ideally 5).
- Form fields per section: **≤ 5–6** before requiring a visual separator.
- Feature list items: **Group every 5–7** items under a heading.
- Dashboard metric cards: **≤ 6** prominently placed KPIs per screen.
