---
name: dashboard-layout-patterns
description: Choose and configure the application shell, grid, and responsive behavior for data-dense layouts. Use when dashboard layout, admin panel, management interface, data grid layout, sidebar layout, or topbar vs sidebar.
---

A management-type layout — dashboard, admin panel, back-office tool — is not a website. It is a **workspace**. Users spend hours inside it, not minutes. Layout must optimize for efficiency, scan-ability, and navigation density — not for storytelling or first impressions.

### 1. Select the shell pattern
Four patterns — choose based on nav complexity from information-architecture:

**(a) Sidebar + topbar** (default for 5+ nav sections): collapsible sidebar for primary nav, topbar for user/search/notifications. The standard for complex management tools.

**(b) Topbar only**: horizontal nav for simple tools with ≤5 primary sections. Maximizes vertical content space.

**(c) Full-bleed content**: no persistent nav, used for single-purpose tools (analytics viewer, editor, report viewer). Navigation is contextual or back-button only.

**(d) Bottom-nav shell** (mobile-first or mobile-primary products): primary navigation lives in a 4–5 item bottom navigation bar. Used when the product is primarily used on touch devices. Pairs with a slide-over or modal for secondary navigation. Coordinate with adaptive-component-behavior when the same product needs a sidebar on desktop and a bottom-nav on mobile.

### 2. Define the grid system
Dashboard content area uses a grid: 12-column for wide layouts, 6-column for medium, stack for mobile. Widget sizes: 1/4, 1/3, 1/2, 2/3, full-width. Grid gaps use spacing tokens.

### 3. Define widget/card placement
Priority placement: most-used widgets top-left (F-pattern reading). Summary/KPI cards at the top, detail tables below, charts in the middle band. Action buttons in the topbar or card headers, never floating.

### 4. Responsive behavior
Sidebar: collapses to icons at `breakpoint-md`, becomes a drawer at `breakpoint-sm`. Grid: reflows from 3-column → 2-column → 1-column. Tables: horizontal scroll or card view on mobile. Define each behavior explicitly.

### 5. Fixed vs scrollable regions
Sidebar and topbar are fixed. Content area scrolls. Sticky table headers for long data tables. Sticky action bars at the bottom of form pages.

### 6. Density controls
Dashboards benefit from density options: compact (small padding, smaller text) vs comfortable (default). Reference spacing tokens for each density level.

## Output
Layout spec: shell pattern + grid system + widget placement + responsive breakpoint behavior + density settings.

## Anti-patterns
- Landing-page layouts on dashboard pages (hero images, excessive whitespace).
- Hiding primary actions in hamburger menus on desktop.
- Sidebars that can't collapse.
- Data tables without sticky headers.
