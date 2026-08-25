# Dark Mode Token Schema

Canonical token comparison between Light and Dark themes.

---

## 1. Surface Elevation Tokens

| Semantic Token | Light Mode Value | Dark Mode Value | Elevation Role |
|----------------|------------------|-----------------|----------------|
| `color-surface-ground` | `#F8F9FA` | `#0D0E11` | Page viewport canvas / background |
| `color-surface-base` | `#FFFFFF` | `#16181D` | Standard cards, panels, sidebar |
| `color-surface-elevated` | `#FFFFFF` (with shadow) | `#22252C` | Modals, dropdowns, popovers, sticky headers |
| `color-surface-highest` | `#FFFFFF` (with heavy shadow) | `#2D313A` | Floating action buttons, toasts, tooltips |
| `color-surface-interactive` | `#F1F3F5` | `#282C35` | Hover/active state on rows and list items |

---

## 2. Text & Content Tokens

| Semantic Token | Light Mode Value | Dark Mode Value | WCAG Target |
|----------------|------------------|-----------------|-------------|
| `color-text-primary` | `#111827` | `#F3F4F6` | > 7:1 (AAA) |
| `color-text-secondary` | `#4B5563` | `#9CA3AF` | > 4.5:1 (AA) |
| `color-text-muted` | `#9CA3AF` | `#6B7280` | > 3:1 (Muted/Placeholder) |
| `color-text-inverse` | `#FFFFFF` | `#111827` | High contrast on inverse fills |

---

## 3. Border & Divider Tokens

| Semantic Token | Light Mode Value | Dark Mode Value |
|----------------|------------------|-----------------|
| `color-border-subtle` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `color-border-default` | `rgba(0, 0, 0, 0.16)` | `rgba(255, 255, 255, 0.16)` |
| `color-border-strong` | `rgba(0, 0, 0, 0.28)` | `rgba(255, 255, 255, 0.28)` |

---

## 4. CSS Custom Properties Reference

```css
:root {
  color-scheme: light;
  --color-surface-ground: #F8F9FA;
  --color-surface-base: #FFFFFF;
  --color-surface-elevated: #FFFFFF;
  --color-surface-highest: #FFFFFF;
  --color-text-primary: #111827;
  --color-text-secondary: #4B5563;
  --color-text-muted: #9CA3AF;
  --color-border-subtle: rgba(0, 0, 0, 0.08);
  --color-border-default: rgba(0, 0, 0, 0.16);
  --shadow-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-elevation-2: 0 4px 12px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-surface-ground: #0D0E11;
  --color-surface-base: #16181D;
  --color-surface-elevated: #22252C;
  --color-surface-highest: #2D313A;
  --color-text-primary: #F3F4F6;
  --color-text-secondary: #9CA3AF;
  --color-text-muted: #6B7280;
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-default: rgba(255, 255, 255, 0.16);
  --shadow-elevation-1: none;
  --shadow-elevation-2: 0 4px 16px rgba(0, 0, 0, 0.4);
}
```
