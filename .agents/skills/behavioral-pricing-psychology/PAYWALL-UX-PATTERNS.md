# 💳 Paywall UX & Conversion Design Patterns

## 1. Visual Elevation Hierarchy for Pricing Cards

```
┌─────────────────┐   ┌─────────────────────────┐   ┌─────────────────┐
│     STARTER     │   │      PRO (TARGET)       │   │   ENTERPRISE    │
│                 │   │  ╔═══════════════════╗  │   │                 │
│                 │   │  ║   MOST POPULAR    ║  │   │                 │
│      $19/mo     │   │  ╚═══════════════════╝  │   │     Custom      │
│                 │   │         $39/mo          │   │                 │
│                 │   │                         │   │                 │
│  [Get Started]  │   │   [★ Start 14-Day Free] │   │  [Talk to Sales]│
│  (Ghost Button) │   │   (Solid Primary CTA)   │   │  (Outline Btn)  │
└─────────────────┘   └─────────────────────────┘   └─────────────────┘
```

### Visual Specifications
1. **Target Card Elevation:** Scale card to `transform: scale(1.05)` on desktop with a glowing accent border (`border: 2px solid var(--color-primary)`).
2. **Primary CTA Dominance:** The Pro tier CTA must use the primary brand fill (`var(--color-primary)`), while adjacent tiers use outline or ghost styles.
3. **Proration Transparency:** Always show explicit billing math below button: *"Billed annually at $468/yr. Cancel anytime with 1 click."*

---

## 2. In-App Upgrade Modal Pattern

```jsx
// React In-App Paywall Modal Contract
export function UpgradePaywallModal({ featureName, currentTier, onUpgrade, onClose }) {
  return (
    <div className="paywall-backdrop">
      <div className="paywall-card">
        <span className="paywall-badge">PRO FEATURE</span>
        <h2>Unlock {featureName}</h2>
        <p className="paywall-subtext">
          Never let workflow limits slow your velocity. Upgrade to Pro for unlimited access.
        </p>
        <div className="paywall-cta-group">
          <button className="btn-primary" onClick={() => onUpgrade('pro')}>
            Upgrade to Pro — $39/mo
          </button>
          <button className="btn-ghost" onClick={onClose}>
            Maybe Later
          </button>
        </div>
        <p className="paywall-guarantee">🛡️ 30-day money-back guarantee · No setup fees</p>
      </div>
    </div>
  );
}
```
