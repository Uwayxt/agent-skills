# 🖼️ Visual Intelligence Engine

The **Visual Intelligence Engine** (`visual-style-extractor`) eliminates visual style drift between uploaded reference mockups/screenshots and generated UI code.

---

## 🎯 The 8-Stage Extraction Protocol

```
[Reference Image]
       │
       ├─► 1. Global Canvas & Theme Calibration (Light/Dark canvas luminance)
       ├─► 2. Palette Sampling (Hex codes, primitive vs. semantic roles)
       ├─► 3. Typography Reverse-Engineering (Typeface pairing, fluid clamp)
       ├─► 4. Spacing Base Derivation (4pt vs. 8pt grid anchor)
       ├─► 5. Surface & Elevation (Shadow offsets, border-radius, backdrop filters)
       ├─► 6. Component Style DNA (Buttons, Inputs, Cards, Badges)
       ├─► 7. Layout & Navigation Patterns (Sidebar, Topbar, Content grid)
       └─► 8. Motion & Micro-interaction Inferences (Transition tokens)
```

---

## 📊 25-Point Visual Fidelity Score

Every visual extraction is evaluated against a 5-dimension benchmark (5 points each, total 25 points):

| Dimension | Benchmark Criteria | Max Score |
| :--- | :--- | :---: |
| **1. Color Accuracy** | Primary, semantic, surface, and border contrast ratios matched | **5 pts** |
| **2. Typography Fidelity** | Heading/body font pairing, weight hierarchy, and line-height scale | **5 pts** |
| **3. Spacing & Rhythm** | 4pt/8pt grid adherence, component internal padding consistency | **5 pts** |
| **4. Component Anatomy** | Border-radius curvature, shadow depth, border stroke thickness | **5 pts** |
| **5. Layout Structure** | Navigation placement, card layout ratios, responsive transformation | **5 pts** |
| **TOTAL** | **Target Threshold: $\ge 20/25$ for High-Fidelity Verification** | **25 pts** |

---

## 📄 Output Artifact: `style-extraction.json`

```json
{
  "theme": "light",
  "palette": {
    "primary": "#4F46E5",
    "surface": {
      "base": "#FFFFFF",
      "subtle": "#F9FAFB"
    },
    "text": {
      "primary": "#111827",
      "muted": "#6B7280"
    }
  },
  "typography": {
    "fontFamilyHeading": "Inter, sans-serif",
    "fontFamilyBody": "Inter, sans-serif",
    "scale": { "h1": "2.25rem", "body": "1rem" }
  },
  "geometry": {
    "spacingBase": 8,
    "borderRadius": { "sm": "4px", "md": "8px", "lg": "16px" }
  },
  "fidelityScore": 23
}
```
