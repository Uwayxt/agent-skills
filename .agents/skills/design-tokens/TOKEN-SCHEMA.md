# Token Naming Schema

Tokens follow a `category-property-variant-state` convention.

## Categories
- `color-*` — all color decisions
- `space-*` — margins, paddings, gaps
- `radius-*` — border radii
- `shadow-*` — box shadows / elevation
- `breakpoint-*` — responsive breakpoints
- `font-*` — font families (see typography-system)
- `text-*` — font sizes, line heights, letter spacing (see typography-system)
- `motion-*` — durations, easing curves (see micro-interaction-motion-design)

## Layers
1. **Primitives** — raw values with descriptive names (`blue-500`, `space-4`)
2. **Semantic** — role-based aliases (`color-primary`, `color-error`, `space-section-gap`)
3. **Component** — component-specific overrides, only when semantic tokens don't fit

## JSON Structure
```json
{
  "color": {
    "primitive": { "blue-500": "#3B82F6" },
    "semantic": { "primary": "{color.primitive.blue-500}" }
  },
  "space": {
    "1": "4px",
    "2": "8px"
  }
}
```

The semantic layer is the contract. Components reference semantics, never primitives directly.
