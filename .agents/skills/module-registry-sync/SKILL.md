---
name: module-registry-sync
description: Maintain the single source of truth for modules. Use when defining new feature modules, auditing module manifests, or wiring dashboard scaffolding.
---
# Module Registry Sync

The registry is the **immutable spine** of the application. If it's not in the manifest, it doesn't render.

## Pipeline Integration
- **Upstream:** Module IDs and metadata should trace back to `business-model-reading`'s module derivation table. Every manifest should link to a business justification.
- **Styling:** Widget card styling in `shortcutPreview` follows `design-tokens`. If a module needs a custom accent color, add it as a semantic token, not a hardcoded value.

### 1. Define the Manifest
Create a comprehensive `module.manifest.json`.

```json
{
  "moduleId": "inventory_core",
  "businessJustification": "BM-04: Stock Management",
  "displayName": "Inventory",
  "navGroup": "Operations",
  "permissions": ["read:inventory", "write:inventory"],
  "entryRoute": "/app/inventory",
  "shortcutPreview": {
    "icon": "box",
    "accentToken": "color-semantic-accent-primary",
    "description": "Manage stock and suppliers."
  }
}
```

### 2. Bulk Registration
If retrofitting, create manifests for all existing modules before modifying the dashboard shell. Validate all manifests, then switch the shell to manifest-driven rendering in one changeset.

### 3. Validate Manifest
- [ ] Manifest includes ID, Name, Group, Permissions, and Route.
- [ ] Manifest explicitly links to a business justification.
- [ ] `navGroup` aligns with established IA.
- [ ] `shortcutPreview` strictly references design tokens (no raw hex codes).
- [ ] JSON is syntactically valid and passes schema checks.

## Anti-Patterns
- **Rogue Routing:** Hardcoding links in the UI instead of reading from the registry.
- **Orphan Modules:** Creating a manifest without tying it to a business justification.
- **Magic Strings:** Using arbitrary strings for groups or colors.

## Completion Criteria
- [ ] All modules are represented by valid manifests.
- [ ] Validation checklist completed successfully.
- [ ] Dashboard shell utilizes manifests for rendering.

## Output Format
A validated `module.manifest.json` file or array, and a confirmation summary of its integration.
