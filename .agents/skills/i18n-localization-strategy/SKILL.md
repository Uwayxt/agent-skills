---
name: i18n-localization-strategy
description: Define internationalization, RTL layout, translation tokens, and locale formatting. Use when i18n, localization, RTL, multi-language, translation, or locale support.
---

**Internationalization is a layout architecture challenge — translated text changes length by up to 40%, writing direction flips completely in RTL, and date/currency formats follow strict regional standards.**

### 1. Structure semantic translation token keys
Never hardcode strings in UI templates. Organize string tokens with namespaced dot-notation:
- `auth.login.title` -> "Sign In to Your Workspace"
- `dashboard.metrics.revenue.label` -> "Monthly Recurring Revenue"
- `common.actions.save` -> "Save Changes"

### 2. Design for text expansion and variable length
Languages like German, French, and Indonesian can be 20–40% longer than English; Chinese and Japanese are more compact:
- Avoid hardcoded component widths on buttons, badges, and table headers.
- Use auto-layout, flexible grids, and multi-line wrapping where appropriate.
- Ensure buttons and cards do not clip text when strings expand by 40%.

### 3. Architect Right-to-Left (RTL) directional layout
For Arabic, Hebrew, and Persian locales, the visual flow flips horizontally:
- **CSS Logical Properties**: Use `margin-inline-start`, `padding-inline-end`, `inset-inline`, and `text-align: start` instead of hardcoded `left` and `right`.
- **Directional Icons**: Flip forward/back arrows, breadcrumb chevrons, and progress bars.
- **Do NOT flip**: Media playback controls, telephone numbers, code blocks, or universal brand logos.

### 4. Handle pluralization and complex interpolation
Plural rules vary dramatically across languages (English has 2 plural forms: 1 item vs 2 items; Arabic has 6 grammatical plural forms):
- Structure messages with ICU MessageFormat or standardized plural keys: `zero`, `one`, `two`, `few`, `many`, `other`.
- Never concatenate sentences with inline variables (`"You have " + count + " items"` is untranslatable).

### 5. Standardize date, time, number, and currency formatting
- Use standard `Intl.DateTimeFormat` and `Intl.NumberFormat` APIs.
- Format currencies with correct ISO codes and regional symbol placements (`$100.00` vs `100,00 €` vs `Rp 100.000`).
- Store timestamps in UTC (ISO 8601) and format locally on client devices.

## Completion Criteria
- [ ] Dot-notated translation token hierarchy established
- [ ] Components tested for 40% text expansion without truncation or overlap
- [ ] CSS logical properties (`*-inline-*`) defined for bi-directional RTL support
- [ ] ICU MessageFormat or pluralization rules structured for dynamic counts
- [ ] Regional number, currency, and date formatting standards documented

## Output
An `i18n-architecture-guide.md` and translation schema template specifying namespace conventions, RTL logical styling rules, and locale formatting standards.

## Anti-patterns
- Hardcoding `margin-left` or `text-align: right` (breaks RTL flip).
- String concatenation with inline variables instead of parameterized translation strings.
- Assuming English singular/plural rules apply to all languages.
- Setting fixed pixel widths on buttons or labels that clip translated copy.
