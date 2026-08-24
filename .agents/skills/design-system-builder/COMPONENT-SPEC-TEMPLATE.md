# Component Spec: [Component Name]

## Description
One sentence: what this component is and when to use it.

## Variants
| Variant | Description | Use When |
|---------|-------------|----------|
| primary | ... | Main action |
| secondary | ... | Supporting action |

## Props / API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | enum | primary | Visual variant |
| size | sm \| md \| lg | md | Size variant |
| disabled | boolean | false | Disable interaction |

## States
| State | Visual Change | Token(s) Used |
|-------|--------------|---------------|
| default | ... | color-primary, shadow-sm |
| hover | ... | color-primary-hover |
| active / pressed | ... | color-primary-active |
| disabled | opacity 0.5, no pointer | color-disabled |
| loading | spinner replaces content | ... |

## Composition
- Used inside: [parent components]
- Contains: [child components]
- Spacing: [token names for internal/external spacing]

## Do / Don't
- ✅ Do: ...
- ❌ Don't: ...
