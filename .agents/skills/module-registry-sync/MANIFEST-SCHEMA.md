# Module Manifest Schema

Every module declares itself with a `module.manifest.json` at its root directory.

## Schema

```json
{
  "moduleId": "inventory-management",
  "displayName": "Manajemen Inventory",
  "description": "Track stock levels, purchase orders, and warehouse operations",
  "icon": "package",
  "route": "/dashboard/inventory",
  "navGroup": "Operasional",
  "shortcutPreview": {
    "widgetType": "summary-card",
    "dataSource": "inventory.summary",
    "metrics": ["stok-total", "stok-menipis", "nilai-inventory"]
  },
  "permissions": ["admin", "warehouse-staff"],
  "status": "active",
  "order": 3
}
```

## Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| moduleId | string | ✓ | Unique kebab-case identifier |
| displayName | string | ✓ | Human-readable name for nav and shortcuts |
| description | string | | One-line description of the module |
| icon | string | ✓ | Icon name from the project's icon set |
| route | string | ✓ | Base URL path this module owns |
| navGroup | string | ✓ | Navigation group label (sidebar section) |
| shortcutPreview | object | | Dashboard homepage widget configuration |
| shortcutPreview.widgetType | string | | Widget template: summary-card, chart-mini, table-preview, action-list |
| shortcutPreview.dataSource | string | | API endpoint or data key for the widget |
| shortcutPreview.metrics | string[] | | Key metrics to display in the widget |
| permissions | string[] | ✓ | Roles that can access this module |
| status | enum | ✓ | active, coming-soon, deprecated |
| order | number | ✓ | Sort order within navGroup (lower = higher) |

## Conventions
- One manifest per module directory: `modules/<module-id>/module.manifest.json`
- Dashboard shell reads all manifests at build/startup — never hardcode nav items
- `coming-soon` modules appear in nav as disabled with a badge
- `deprecated` modules are hidden from nav but routes still resolve (for bookmarks)
