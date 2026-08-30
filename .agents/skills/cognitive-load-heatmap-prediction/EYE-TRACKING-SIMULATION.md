# 👁️ Eye-Tracking Simulation & Heatmap Prediction Guide

Reference for predicting visual attention paths in UI layouts using established oculomotor research patterns (Nielsen, 2006; Pernice & Nielsen, 2017; Buscher et al., 2009).

---

## 🔬 Core Vision Science Concepts

### Foveal vs. Peripheral Vision
| Zone | Acuity | Angle from Fixation | UI Implication |
| :--- | :--- | :--- | :--- |
| **Foveal** | Maximum (20/20) | 0–2° | User can read text, parse icons, identify colors |
| **Parafoveal** | Moderate | 2–5° | User can detect contrast changes and motion |
| **Peripheral** | Low | > 5° | User detects only large shapes, brightness contrast, movement |

**Implication:** A CTA button placed > 5° from the predicted first fixation point will not be consciously registered until a deliberate saccade moves the eye there.

---

## 🗺️ Eye-Tracking Scanning Patterns

### Z-Pattern (Landing Pages / Hero Sections)
```
START ───────────────────────────────► END (Top Right: Logo / CTA)
  │                                       │
  │      (Peripheral scan, low reading)   │
  ▼ ◄──────────────────────────────────── ┘  (diagonal saccade)
ANCHOR ──────────────────────────────► TERMINAL (Bottom-Right: Primary CTA)
```
- **Use when:** Single CTA conversion pages, minimal text layouts, hero-first design.
- **Primary Optical Area:** Top-left quadrant.
- **Terminal Action Zone:** Bottom-right quadrant — optimal CTA placement.
- **Dead Zone:** Bottom-left quadrant — avoid placing anything critical here.

---

### F-Pattern (Dashboards / Content-Dense Pages)
```
█████████████████████████████████████  ← First horizontal sweep (full)
█████████████████████              ←── Second horizontal sweep (shorter)
█                                      ← Vertical spine scan (left only)
█
█
```
- **Use when:** Data-dense dashboards, admin panels, news feeds, documentation.
- **Primary Fixation:** First line (top-left) — this must contain the most critical label or nav.
- **Hot Zone:** Top 20% of content area, left 30% of width.
- **Dead Zone:** Center-right and bottom-right of content area.
- **Action:** Place key metric cards and primary navigation in F-Pattern hot zone.

---

### Single-Column Spine (Form / Checkout Flows)
```
         ┌────────────────────┐
         │   Form Header      │  ← Fixation 1 (100%)
         ├────────────────────┤
         │   Label + Input 1  │  ← Fixation 2
         │   Label + Input 2  │  ← Fixation 3
         │   Label + Input 3  │  ← Fixation 4
         ├────────────────────┤
         │     [Submit CTA]   │  ← Terminal fixation
         └────────────────────┘
```
- **Use when:** Registration forms, checkout flows, onboarding wizards.
- **Rule:** All inputs must align to a single vertical spine (no multi-column forms).
- **Hot Zone:** Center column, full height.
- **Dead Zone:** Anything placed left or right of the primary form column.

---

### Gutenberg Diagram (E-Commerce / Card Grids)
```
┌─────────────────────────────────────────┐
│  PRIMARY OPTICAL AREA (top-left)  ░░░░  │  ← Highest fixation density
│  ░░░░░░░░░░░░░░░░  STRONG FOLLOW  ░░░░  │
│  WEAK FOLLOW (bottom-left)  ░░░░░░░░░░  │
│  ░░░░░░░░░░░░  TERMINAL AREA (btm-rgt)  │  ← CTA placement zone
└─────────────────────────────────────────┘
```
- **Primary Optical Area:** Top-left — hero image or most prominent product card.
- **Terminal Area:** Bottom-right — "Add to Cart" / primary CTA / checkout button.
- **Weak Follow:** Bottom-left — avoid critical info. Good for: legal text, secondary links.
- **Strong Follow:** Top-right — good for trust badges, price anchors.

---

## 🎯 Fixation & Saccade Predictions

### Typical First-Fixation Sequence
| Rank | Typical First Fixation Target | Avg. Duration | Notes |
| :---: | :--- | :---: | :--- |
| 1st | **Logo or brand mark** | 180ms | Orientation and context |
| 2nd | **Primary headline (H1)** | 310ms | Value proposition reading |
| 3rd | **Hero image / visual anchor** | 250ms | Emotional engagement |
| 4th | **Primary CTA button** | 220ms | Decision point |
| 5th | **Supporting copy / subheadline** | 290ms | Validation reading |

**Total typical path:** 500ms–1.25 seconds before user forms their first behavioral intent.

### Saccade Jump Distance Rules
- Users typically saccade in jumps of **2–10 degrees** (100–400px on a 24" monitor at 60cm).
- Jumps **> 15 degrees** require deliberate conscious effort → increased cognitive load.
- **Implication:** Place Primary CTA within **~400px** of the predicted primary fixation point.

---

## 🔴 Heatmap Zone Classification

When producing a heatmap prediction output, classify every region into one of 5 heat levels:

| Level | Label | Predicted Fixation % | Visual Indicator |
| :---: | :--- | :---: | :--- |
| 5 | 🔴 **Hotspot** | > 40% | Highest attention — primary content/CTA only |
| 4 | 🟠 **Warm** | 20–40% | Secondary labels, price anchors |
| 3 | 🟡 **Moderate** | 10–20% | Supporting features, trust badges |
| 2 | 🟢 **Cool** | 5–10% | Footer links, tertiary info |
| 1 | ⚫ **Dead Zone** | < 5% | Avoid placing any high-value content here |

---

## 📄 Output Template: `heatmap-prediction.md`

```markdown
# Heatmap Prediction — [Page Name]

## Layout Classification
- **Scan Pattern:** Z-Pattern / F-Pattern / Single-Column / Gutenberg
- **Viewport:** Desktop (1280px) / Tablet (768px) / Mobile (375px)

## Fixation Sequence Prediction
1. [Region Name] — Predicted Fixation: ~[X]ms — 🔴 Hotspot
2. [Region Name] — Predicted Fixation: ~[X]ms — 🟠 Warm
3. [Region Name] — Predicted Fixation: ~[X]ms — 🟡 Moderate
...

## Zone Classification Map
| Zone | Region | Heat Level | Notes |
| :--- | :--- | :---: | :--- |
| Top-left | Brand logo | 🟠 Warm | — |
| Top-center | H1 Headline | 🔴 Hotspot | Must contain value proposition |
| Bottom-right | Primary CTA | 🔴 Hotspot | Terminal action zone — must be here |
| Bottom-left | Legal/secondary links | ⚫ Dead Zone | OK for non-critical content |

## Dead Zone Violations (if any)
- ❌ [Element] placed in Dead Zone — recommended relocation: [zone]

## Recommendations
- ...
```
