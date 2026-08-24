---
name: route-integrity-checker
description: Audit and maintain route connections across the application. Use when adding pages or refactoring navigation.
---

# Route Integrity Checker

**Broken routes shatter user trust instantly.** Every intended destination must exist, and every existing page must be reachable.

### 1. Cross-reference Information Architecture
Cross-reference the intent registry against the sitemap from `information-architecture`. Every nav item in the IA should have a corresponding route; every route should be reachable from nav.

### 2. Define the Intent Registry
Maintain a strict map of intended navigation paths. The intent registry is stored as `.agents/route-intents.json` in the project root, version-controlled, and updated by this skill on every run.
Example format:
```json
{
  "intents": [
    { "source": "sidebar", "label": "Analytics", "expectedRoute": "/dashboard/analytics", "status": "pending" }
  ]
}
```

### 3. Sync with Module Registry
When a new module manifest is registered via `module-registry-sync`, scan its route against pending intents. If a pending intent matches the module's route, auto-connect it.

### 4. Review Growth Impact
After auto-connecting routes, trigger `growth-impact-review` to check if the connection changes any dependent pages or metrics tracking.

### Completion criteria
- All navigation intents resolve to valid, rendering routes.
- The intent registry JSON is updated and committed.
- No orphan routes exist outside the IA sitemap.

### Output format
Update the `.agents/route-intents.json` file and output a summary artifact of connected vs pending intents.

### Anti-patterns
- Recording intents only for buttons, ignoring nav menu items and breadcrumbs.
- Auto-connecting by route name without verifying the target page actually renders the expected content.
- Relying on manual QA to catch 404s.
