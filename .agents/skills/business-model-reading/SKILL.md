---
name: business-model-reading
description: Translate a Business Model Canvas into product modules. Use when bridging business strategy to product architecture.
---

# Business Model Reading

**The business model dictates the system architecture.** If the product doesn't manifest the business's revenue and operational structure, it's a vanity project.

### 1. Parse the Business Model Canvas (BMC)
Extract the core value propositions, customer segments, channels, and revenue streams.

### 2. Derive functional modules
Map every BMC component to a distinct software module. Use a derivation table:
| BMC Element | Derived Module | Purpose | Revenue / Cost Impact |

### 3. Map modules to dashboard structure
Feed the module table into `dashboard-scaffolding-contract` to design a shell that accommodates all derived modules. Use `module-registry-sync` manifest schema for each module.

### 4. Identify growth trajectory
Which modules are MVP (build now) vs expansion (build later)? This feeds directly into `mvp-scoping`.

### Completion criteria
- Every revenue stream and key activity has a corresponding software module.
- MVP vs expansion modules are clearly separated.
- Dashboard shell integration is mapped.

### Output format
Produce a `business_to_module_map.md` artifact containing the derivation table and growth trajectory.

### Next Steps
Module table feeds → `mvp-scoping` (which modules first), `dashboard-scaffolding-contract` (dashboard shell design), `module-registry-sync` (manifest per module).

### Anti-patterns
- Inventing modules that don't trace to any revenue stream or operational process.
- Treating the BMC as a one-time exercise — it should be revisited when the business model pivots.
- Creating monolithic architectures that cannot isolate revenue-generating modules.
