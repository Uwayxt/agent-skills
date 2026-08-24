---
name: adaptive-component-behavior
description: Define how components change interaction patterns across devices, not just size. Use when adapting UI for mobile, component transformation, sidebar to bottom-nav, table to card, or touch interaction patterns.
---

**Responsive is not the same as adaptive. Responsive shrinks. Adaptive transforms. A sidebar that becomes a 200px-wide icon column on mobile is not adaptive — it is broken.**

### 1. Inventory the components
List every distinct component type in the project: navigation, data tables, forms, modals, dropdowns, tooltips, sidebars, tabs, carousels, etc.

### 2. Classify by transformation need
Three classes:
- **Transform required**: component needs a fundamentally different pattern on mobile (sidebar → bottom-nav, table → card-list, modal → fullscreen)
- **Resize + reflow**: component keeps its pattern but adjusts layout (multi-column form → single column, wide card → full-width card)
- **Unchanged**: component works identically at all sizes (standalone button, icon, badge)

### 3. Define transformations explicitly
For every "Transform required" component, specify:
- Desktop pattern: what it is and how it works
- Tablet adaptation: intermediate transformation
- Mobile pattern: the new interaction model
Reference the TRANSFORMATION-TABLE.md for the canonical table.

### 4. Coordinate with design-tokens
Ensure breakpoints used in transformations reference `bp-*` tokens, not raw pixel values.

### 5. Coordinate with component-style-guide
Each transformed variant needs its own state matrix (hover/tap states differ between pointer and touch devices).

### 6. Output the adaptive spec
For each component: transformation table (device → pattern → notes). This feeds directly into design-to-code-handoff.

### Completion Criteria
- Every component classified (transform / resize / unchanged)
- Every "transform required" component has explicit desktop + tablet + mobile patterns
- No component left as "just shrinks" without justification
- Adaptive spec referenced in design-to-code-handoff artifact

### Output
Adaptive component spec (table per component) + TRANSFORMATION-TABLE.md filled for the project.

### Anti-patterns
- Calling a component "responsive" because it has `width: 100%` on mobile
- Sidebar that becomes a tiny icon strip instead of a bottom-nav
- Data table with horizontal scroll on mobile instead of card-list transformation
- Assuming hover states work on touch devices (they do not reliably)
