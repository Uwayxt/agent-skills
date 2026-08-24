---
name: responsive-breakpoint-strategy
description: Define the breakpoint system and grid strategy for cross-device layouts. Use when setting up responsive design, breakpoints, mobile-first layout, fluid grid, or container queries.
---

**A breakpoint is a contract, not a guess. Define it once, reference it everywhere — never hard-code a pixel value that already has a token.**

### 1. Choose the layout approach
Mobile-first (default, recommended) or desktop-first (only for admin-heavy tools where mobile is explicitly secondary). Document the choice and its rationale.

### 2. Define the breakpoint scale
Standard 5-point system:
- `bp-xs`: < 480px (small phones)
- `bp-sm`: 480px (phones, landscape)
- `bp-md`: 768px (tablets, portrait)
- `bp-lg`: 1024px (tablets landscape, small laptops)
- `bp-xl`: 1280px (desktops)
- `bp-2xl`: 1536px (large desktops, widescreen)
Document which breakpoints are "content breakpoints" (layout changes) vs "fine-tune breakpoints" (minor adjustments).

### 3. Define the grid system
Columns per breakpoint (e.g., 4-col mobile, 8-col tablet, 12-col desktop), gutter size (token reference), max-content-width. Use CSS Grid or framework equivalent.

### 4. Evaluate container queries
For components that need to adapt based on their container width (not the viewport), flag them for container query usage. These are components that appear in multiple layout contexts (e.g., a card that appears in a sidebar AND in a main grid).

### 5. Output the breakpoint token file
Add breakpoints to design-tokens output (`bp-*` token set). Provide CSS custom properties + framework config (Tailwind, CSS-in-JS, or native CSS as appropriate to the project).

### 6. Document the decision
Which breakpoints trigger layout changes vs style adjustments. This feeds into adaptive-component-behavior.

### Completion Criteria
- Every breakpoint has a name, value, and documented purpose
- Grid system defined for all breakpoints
- Breakpoints added to design-tokens
- Container query candidates identified
- mobile-first vs desktop-first decision documented

### Output
Breakpoint token set (JSON) + grid spec + CSS custom properties block + framework config.

### Anti-patterns
- Defining breakpoints by device name ("iPhone breakpoint") instead of content needs
- Hardcoding pixel values in components that should reference `bp-*` tokens
- Adding a breakpoint for every pixel difference — 5–6 breakpoints is almost always enough
- Forgetting to handle the space between breakpoints (the "in-between" states)
