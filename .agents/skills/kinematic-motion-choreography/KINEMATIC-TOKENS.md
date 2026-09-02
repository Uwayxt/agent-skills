# 🌊 Kinematic Motion Tokens Reference

## CSS Custom Properties Token Layer

```css
:root {
  /* Physics-Based Spring Curves (Bezier Approximations) */
  --spring-snappy: cubic-bezier(0.34, 1.56, 0.64, 1);
  --spring-bouncy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --spring-natural: cubic-bezier(0.22, 1, 0.36, 1);
  --spring-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --spring-subtle: cubic-bezier(0.25, 1, 0.5, 1);

  /* Asymmetric Directional Curves */
  --ease-in-kinetic: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-out-kinetic: cubic-bezier(0.16, 1, 0.3, 1);

  /* Kinematic Duration Scale */
  --motion-instant: 75ms;
  --motion-fast: 150ms;
  --motion-normal: 240ms;
  --motion-deliberate: 360ms;
  --motion-extended: 500ms;

  /* Stagger Steps */
  --stagger-step: 35ms;
  --stagger-max-cap: 350ms;
}

/* Reduced Motion Accessible Fallback */
@media (prefers-reduced-motion: reduce) {
  :root {
    --spring-snappy: ease;
    --spring-bouncy: ease;
    --spring-natural: ease;
    --spring-smooth: ease;
    --spring-subtle: ease;
    --motion-instant: 0.01ms;
    --motion-fast: 0.01ms;
    --motion-normal: 0.01ms;
    --motion-deliberate: 0.01ms;
    --motion-extended: 0.01ms;
  }
}
```
