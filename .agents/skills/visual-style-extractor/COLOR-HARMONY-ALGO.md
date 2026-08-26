# 🎨 Color Harmony & Contrast Mathematics

Mathematical formulas used to derive harmonious semantic palettes and WCAG 2.2 compliant contrast ratios from raw image samples.

---

## 🔬 1. Relative Luminance Formula (W3C / WCAG)

Given $sRGB$ channels $R, G, B \in [0, 255]$:

$$R_s = R / 255, \quad G_s = G / 255, \quad B_s = B / 255$$

$$C_{lin} = \begin{cases} C_s / 12.92 & \text{if } C_s \le 0.04045 \\ \left( \frac{C_s + 0.055}{1.055} \right)^{2.4} & \text{if } C_s > 0.04045 \end{cases}$$

$$L = 0.2126 \cdot R_{lin} + 0.7152 \cdot G_{lin} + 0.0722 \cdot B_{lin}$$

---

## 📐 2. Contrast Ratio Equation

Given relative luminances $L_1$ (lighter) and $L_2$ (darker):

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

- **WCAG 2.2 AA Body Text**: $\text{Ratio} \ge 4.5:1$
- **WCAG 2.2 AA Large Text / UI Controls**: $\text{Ratio} \ge 3.0:1$
- **WCAG 2.2 AAA Enhanced**: $\text{Ratio} \ge 7.0:1$
