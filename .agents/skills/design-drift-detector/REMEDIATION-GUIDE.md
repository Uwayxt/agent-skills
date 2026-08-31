# 🔧 Remediation Guide — Hardcoded → Token Auto-Fix Recipes

## Purpose

For each drift violation category, this guide provides exact find-and-replace recipes to migrate from hardcoded values to design token references.

---

## Prerequisites

Before remediating, ensure your design token file exists:

```css
/* tokens.css or design-tokens.css */
:root {
  /* Colors */
  --color-primary: #3B82F6;
  --color-primary-hover: #2563EB;
  --color-surface: #FFFFFF;
  --color-background: #F8FAFC;
  --color-text: #1E293B;
  --color-text-muted: #64748B;
  --color-border: #E2E8F0;
  --color-danger: #EF4444;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-overlay: rgba(0, 0, 0, 0.5);

  /* Spacing (4px base scale) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px;

  /* Typography */
  --text-xs: 0.75rem;    --text-sm: 0.875rem;  --text-base: 1rem;
  --text-lg: 1.125rem;   --text-xl: 1.25rem;   --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;  --text-4xl: 2.25rem;  --text-5xl: 3rem;
  --font-normal: 400;    --font-medium: 500;
  --font-semibold: 600;  --font-bold: 700;
  --leading-tight: 1.25; --leading-normal: 1.5; --leading-relaxed: 1.625;

  /* Border Radius */
  --radius-sm: 4px;  --radius-md: 8px;   --radius-lg: 12px;
  --radius-xl: 16px; --radius-2xl: 24px; --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Z-Index Scale */
  --z-base: 0;       --z-raised: 10;    --z-dropdown: 100;
  --z-sticky: 200;   --z-overlay: 300;  --z-modal: 400;
  --z-popover: 500;  --z-toast: 600;    --z-tooltip: 700;

  /* Duration */
  --duration-instant: 50ms;   --duration-fast: 150ms;
  --duration-normal: 300ms;   --duration-slow: 500ms;
  --duration-slower: 700ms;

  /* Easing */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## C1 — Color Remediation Recipes

### Migrate hardcoded hex to semantic token

**Before (❌ drifted):**
```css
.button-primary {
  background-color: #3B82F6;
  color: #ffffff;
  border: 1px solid #2563EB;
}

.button-primary:hover {
  background-color: #2563EB;
}
```

**After (✅ token-resolved):**
```css
.button-primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary, #fff);
  border: 1px solid var(--color-primary-hover);
}

.button-primary:hover {
  background-color: var(--color-primary-hover);
}
```

### Migrate RGBA overlay to token

**Before:** `background: rgba(0, 0, 0, 0.5);`
**After:** `background: var(--color-overlay);`

### Migrate hardcoded shadow color to token

**Before:** `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`
**After:** `box-shadow: var(--shadow-md);`

---

## C2 — Spacing Remediation Recipes

### Migrate literal margin/padding to spacing token

**Before (❌ drifted):**
```css
.card {
  padding: 24px;
  margin-bottom: 16px;
}

.card-header {
  padding: 16px 24px;
  gap: 12px;
}
```

**After (✅ token-resolved):**
```css
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-4);
}

.card-header {
  padding: var(--space-4) var(--space-6);
  gap: var(--space-3);
}
```

### Spacing Conversion Reference
| Literal | Token |
| :---: | :--- |
| `4px` | `var(--space-1)` |
| `8px` | `var(--space-2)` |
| `12px` | `var(--space-3)` |
| `16px` | `var(--space-4)` |
| `20px` | `var(--space-5)` |
| `24px` | `var(--space-6)` |
| `32px` | `var(--space-8)` |
| `40px` | `var(--space-10)` |
| `48px` | `var(--space-12)` |
| `64px` | `var(--space-16)` |

---

## C3 — Typography Remediation Recipes

**Before (❌ drifted):**
```css
.heading {
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.025em;
}

.body-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
```

**After (✅ token-resolved):**
```css
.heading {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight, -0.025em);
}

.body-text {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

---

## C4 — Border Radius Remediation

**Before:** `border-radius: 8px;`
**After:** `border-radius: var(--radius-md);`

| Literal | Token |
| :---: | :--- |
| `2px` | `var(--radius-xs)` |
| `4px` | `var(--radius-sm)` |
| `8px` | `var(--radius-md)` |
| `12px` | `var(--radius-lg)` |
| `16px` | `var(--radius-xl)` |
| `24px` | `var(--radius-2xl)` |
| `50%` / `9999px` | `var(--radius-full)` |

---

## C6 — Z-Index Remediation

**Before (❌ anti-pattern):**
```css
.dropdown { z-index: 9999; }
.modal { z-index: 99999; }
.toast { z-index: 999999; }
```

**After (✅ semantic z-index):**
```css
.dropdown { z-index: var(--z-dropdown); }   /* 100 */
.modal { z-index: var(--z-modal); }         /* 400 */
.toast { z-index: var(--z-toast); }         /* 600 */
```

---

## C7 — Duration Remediation

**Before:**
```css
.fade { transition: opacity 0.3s ease; }
.slide { animation: slideIn 0.5s ease-in-out; }
```

**After:**
```css
.fade { transition: opacity var(--duration-normal) var(--ease-in-out); }
.slide { animation: slideIn var(--duration-slow) var(--ease-in-out); }
```

---

## Automated Migration Script (Node.js)

For bulk remediation of spacing values in a CSS file:

```javascript
const fs = require('fs');

const SPACING_MAP = {
  '4px': 'var(--space-1)',   '8px': 'var(--space-2)',
  '12px': 'var(--space-3)', '16px': 'var(--space-4)',
  '20px': 'var(--space-5)', '24px': 'var(--space-6)',
  '32px': 'var(--space-8)', '40px': 'var(--space-10)',
  '48px': 'var(--space-12)','64px': 'var(--space-16)',
};

function migrateSpacing(css) {
  return css.replace(
    /(margin|padding|gap)(\s*:\s*)([\d\s]+(px))/g,
    (match, prop, colon, value) => {
      const tokens = value.trim().split(/\s+/).map(v => SPACING_MAP[v] || v);
      return `${prop}${colon}${tokens.join(' ')}`;
    }
  );
}

const file = process.argv[2];
const css = fs.readFileSync(file, 'utf8');
fs.writeFileSync(file, migrateSpacing(css));
console.log(`✅ Migrated spacing tokens in ${file}`);
```

Usage: `node migrate-spacing.js ./components/Button.css`
