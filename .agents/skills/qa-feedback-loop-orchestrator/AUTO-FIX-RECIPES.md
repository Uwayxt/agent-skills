# 🔧 Deterministic Auto-Fix Recipes for QA Loop

Standardized transformation patterns used by `qa-feedback-loop-orchestrator` to automatically repair common QA and a11y violations without manual human intervention.

---

## 🛠️ Auto-Fix Rule 1: Missing Tap Target Size ($< 44\times 44\text{pt}$)

**Problem:** Touch button or icon element is too small ($24\times 24\text{px}$).  
**Transformation:** Inject CSS pseudo-element hit-area expander or increase token padding:

```css
/* Auto-fix patch */
.touch-target-fix {
  position: relative;
}
.touch-target-fix::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
}
```

---

## 🛠️ Auto-Fix Rule 2: Horizontal Viewport Overflow on Mobile ($w \le 393\text{px}$)

**Problem:** Element with fixed width (`width: 500px`) causing page horizontal scrollbar.  
**Transformation:** Replace fixed width with responsive container constraints:

```css
/* Before */
.card-container { width: 500px; }

/* Auto-fix After */
.card-container {
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
}
```

---

## 🛠️ Auto-Fix Rule 3: Unlinked Dead Anchors (`href="#"`)

**Problem:** `<a href="#">` creates confusing URL jumps to `#` without routing.  
**Transformation:** Convert to `<button type="button">` or bind explicit route-intent.

---

## 🛠️ Auto-Fix Rule 4: Icon-Only Controls Missing `aria-label`

**Problem:** `<button><svg>...</svg></button>` has no accessible text name.  
**Transformation:** Inject `aria-label="<Action Name>"` and `aria-hidden="true"` on inner SVG.
