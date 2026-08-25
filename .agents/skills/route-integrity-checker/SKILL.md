---
name: route-integrity-checker
description: Audit and maintain route connections across the application. Use when adding pages or refactoring navigation.
---

# Route Integrity Checker

**Broken routes shatter user trust instantly — every intended destination must resolve to a functioning view, and every dynamic entity link must handle missing records gracefully.**

### 1. Cross-reference with Information Architecture
Cross-reference the intent registry against the sitemap from `information-architecture`. Every nav item, footer link, and card CTA must map to a defined destination; every registered route must be reachable without dead ends.

### 2. Maintain the Intent Registry (`.agents/route-intents.json`)
Maintain a structured intent registry in the project root to track pending vs. live routes across iterations:
```json
{
  "intents": [
    {
      "id": "intent-nav-analytics",
      "sourceLocation": "components/sidebar/Sidebar.tsx",
      "sourceLabel": "Analytics",
      "expectedRoute": "/dashboard/analytics",
      "status": "connected",
      "isDynamic": false
    },
    {
      "id": "intent-invoice-detail",
      "sourceLocation": "pages/invoices/InvoiceRow.tsx",
      "sourceLabel": "View Invoice",
      "expectedRoute": "/invoices/:invoiceId",
      "status": "connected",
      "isDynamic": true,
      "paramKey": "invoiceId"
    }
  ]
}
```

### 3. Handle dynamic & parameterized routes
For parameterized paths (`/invoices/:id`, `/workspaces/:slug/settings`):
- **Pattern matching**: Verify router configuration matches the declared parameter format.
- **Entity existence check**: Verify that the destination view handles invalid or deleted IDs (e.g. `/invoices/invalid-999`) by rendering an inline "Entity Not Found" state rather than an unhandled client-side crash.
- **Breadcrumb resolution**: Ensure dynamic routes resolve parent crumbs correctly (`Home > Invoices > #INV-2024-001`).

### 4. Design the branded 404 & escape route
When a user encounters a nonexistent route:
- **Never display a default browser or framework 404**: Render a custom view aligned with the design system.
- **Provide clear escape paths**:
  1. Primary CTA: "Return to Dashboard" (`/dashboard`)
  2. Search input / Command Palette shortcut (`⌘K`)
  3. Quick links to recent or popular modules

### 5. Sync with Module Registry & Growth Review
When `module-registry-sync` registers a new module, scan pending intents. Auto-connect matching routes and trigger `growth-impact-review` to confirm breadcrumb and sitemap coherence.

## Completion Criteria
- [ ] All static navigation links and CTAs resolve to live routes (zero `href="#"`)
- [ ] Parameterized dynamic routes handle missing or malformed ID parameters
- [ ] Custom branded 404 page designed with search and return CTAs
- [ ] `.agents/route-intents.json` schema validated and updated
- [ ] Zero orphaned pages exist outside the IA sitemap

## Output Format
An updated `.agents/route-intents.json` registry file and a `route_integrity_report.md` artifact detailing connected routes, pending intents, and verified 404 escape behaviors.

## Anti-patterns
- Leaving `href="#"` or `onClick={() => {}}` placeholders on buttons shipped to production.
- Throwing unhandled exceptions on dynamic routes when an ID does not exist in the database.
- Generic 404 pages that trap users without search or navigation escape routes.
- Connecting routes by filename without verifying the view renders without runtime crashes.
