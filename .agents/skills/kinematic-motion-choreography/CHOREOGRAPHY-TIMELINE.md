# ⏱️ Choreography Timeline & Asymmetric Curves

## 1. Asymmetric Entry vs. Exit Timeline

```
0ms                   150ms                 300ms                 450ms
├───────────────────────┼─────────────────────┼─────────────────────┤
[ENTRANCE: Modal Body]  ════════════════════► (Decelerates sharply to rest at 180ms)
[ENTRANCE: Backdrop]    ══════════════════════════════════════════► (Fades smoothly to 300ms)

0ms                   120ms                 240ms                 360ms
├───────────────────────┼─────────────────────┼─────────────────────┤
[EXIT: Modal Body]      ════════════► (Accelerates rapidly off-screen in 140ms)
[EXIT: Backdrop]        ════════════════════════════► (Fades out by 240ms)
```

---

## 2. Cascading List Stagger Choreography

```
Item 1:  [0ms  ────────► 180ms]
Item 2:    [35ms ────────► 215ms]
Item 3:      [70ms ────────► 250ms]
Item 4:        [105ms ────────► 285ms]
Item 5:          [140ms ────────► 320ms]
```

### CSS Implementation with Stagger Index Custom Property

```css
.stagger-item {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
  animation: springCascadeIn var(--spring-duration-normal) var(--spring-natural) forwards;
  animation-delay: calc(var(--stagger-index, 0) * 35ms);
}

@keyframes springCascadeIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```
