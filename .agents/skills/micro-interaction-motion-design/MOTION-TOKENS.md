# Motion Token Schema

Motion tokens follow the same layering as design tokens: primitives → semantic → component.

## Duration Primitives
| Token | Value | Use For |
|-------|-------|---------|
| motion-instant | 0ms | Press/active feedback, state toggles that feel instant |
| motion-fast | 100ms | Hover effects, focus rings, small reveals |
| motion-normal | 200ms | Modal open, page transitions, card expand |
| motion-slow | 300ms | Complex reveals, accordion expand, empty-state fade-in |
| motion-deliberate | 500ms | Loading pulse cycle, onboarding step transitions |

## Easing Curves
| Token | Value | Character |
|-------|-------|-----------|
| ease-default | cubic-bezier(0.4, 0, 0.2, 1) | Neutral, Material-standard |
| ease-in | cubic-bezier(0.4, 0, 1, 1) | Accelerating — elements leaving the screen |
| ease-out | cubic-bezier(0, 0, 0.2, 1) | Decelerating — elements entering the screen |
| ease-spring | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Slight overshoot — playful confirms, toggles |

## Semantic Motion Tokens
Combine duration + easing for common patterns:
| Token | Duration | Easing | Use For |
|-------|----------|--------|---------|
| transition-hover | motion-fast | ease-default | All hover state changes |
| transition-focus | motion-fast | ease-out | Focus ring appearance |
| transition-modal-in | motion-normal | ease-out | Modal/dialog opening |
| transition-modal-out | motion-fast | ease-in | Modal/dialog closing |
| transition-feedback | motion-normal | ease-spring | Success/error confirmations |

## Reduced Motion
Wrap in `@media (prefers-reduced-motion: reduce)`: replace all motion tokens with `motion-instant`, except loading indicators which keep their duration.
