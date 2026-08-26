# 🛡️ 5-State Module Resilience Contracts

Every product module must declare and handle 5 distinct lifecycle states without unhandled exceptions or blank screens.

---

## 📋 The 5-State Standard Matrix

```
                          ┌───────────────────────────┐
                          │    Module Request Sent    │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │  State 0: Loading/Skeleton │
                          └─────────────┬─────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             │                          │                          │
             ▼                          ▼                          ▼
┌─────────────────────────┐┌─────────────────────────┐┌─────────────────────────┐
│ State 1: Ideal Payload  ││ State 2: First-Use Empty││ State 4: Offline / Fallback│
└─────────────────────────┘└─────────────────────────┘└─────────────────────────┘
             │                          │
             ▼                          ▼
┌─────────────────────────┐┌─────────────────────────┐
│ State 3: Filtered Empty ││ State 5: Partial Failure│
└─────────────────────────┘└─────────────────────────┘
```

### 1. State 0: Skeleton / Perceived Loading
- Maintain exact layout dimensions of the destination components.
- Animate with smooth `pulse` opacity ($0.4 \leftrightarrow 1.0$).
- Mark container with `aria-busy="true"`.

### 2. State 1: Ideal Payload
- Normal rendering with complete data models.

### 3. State 2: First-Use Empty
- Zero data in database. Provide clear primary action CTA to create first record.
- Do not display scary "No data" warning badges. Use inviting copy.

### 4. State 3: Filtered Empty
- User query/filter yielded 0 results.
- Provide immediate **"Clear All Filters"** button.

### 5. State 4: Partial Failure / Degraded
- Secondary API failed (e.g. avatar or analytics failed, but table loaded).
- Render table with silent fallback badge instead of crashing whole page.

### 6. State 5: Offline / Network Error
- Retain cached state if available (`localStorage` / IndexedDB).
- Provide explicit **"Retry Connection"** action.
