---
name: dashboard-scaffolding-contract
description: Establish a manifest-driven dashboard shell. Use when designing scalable, module-agnostic layouts.
---

# Dashboard Scaffolding Contract

**The dashboard shell is a strict contract, not a bespoke painting.** It must blindly host modules via manifests without knowing their internal logic.

### 1. Establish the Shell Pattern
The shell pattern (sidebar+topbar, topbar-only, full-bleed) is selected via `dashboard-layout-patterns`. This skill implements that selection as a manifest-driven shell.

### 2. Apply Design Systems
Integrate visual and interaction foundations:
- **Styling**: The shell's visual styling (sidebar colors, topbar height, grid gaps) references `design-tokens`, not raw values.
- **Typography**: Nav item labels, section headers, and widget text follow the `typography-system` scale.
- **Motion**: Sidebar collapse/expand uses `micro-interaction-motion-design` tokens. Widget card hover uses transition-hover.

### 3. Implement the Manifest Contract
Design the shell to parse `module.manifest.json` files. The shell reads navigation labels, icons, routes, and permissions directly from the registry, hardcoding nothing.

### 4. Retrofit Hardcoded Dashboards
For existing legacy dashboards:
1. Extract hardcoded nav items into temporary JSON manifests.
2. Replace hardcoded React/Vue nav components with a dynamic map function iterating over the manifests.
3. Migrate the temporary manifests into standard `module.manifest.json` files per module.
4. Delete the legacy hardcoded routing table.

### Growth Contract
The shell guarantees: adding a valid `module.manifest.json` to the modules directory results in the module appearing in nav + shortcuts within one build/deploy cycle, with zero changes to the shell code.

### Completion criteria
- Shell layout reads purely from manifest data.
- All styling and typography use system tokens.
- Adding a new module requires zero shell code modification.

### Output format
Produce the shell layout components and the manifest parsing utility logic.

### Anti-patterns
- Hardcoding a new nav item just this once because "it's faster."
- Letting modules dictate shell layout rules.
- Mixing shell state with module state.
