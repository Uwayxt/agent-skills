# 📐 Pricing Tier Calculator & Behavioral Modeling

## 1. The Decoy Effect (Asymmetric Dominance) Formula

The Decoy Effect introduces a third option ($D$) that is completely dominated by the target option ($T$) in value, while pricing is deceptively close.

```
                  Price ($)
                     ▲
                     │
  Decoy Tier (D) ───►│       ● D ($45 / 500 exports)
                     │
 Target Pro Tier (T)►│       ● T ($49 / Unlimited exports)  <── Dominates D
                     │
                     │
Starter Tier (S) ───►│   ● S ($19 / 100 exports)
                     │
                     └──────────────────────────► Value / Utility
```

### Mathematical Formulation
$$\text{Dominance Factor} = \frac{\text{Features}(T) - \text{Features}(D)}{\text{Price}(T) - \text{Price}(D)}$$

When $\text{Price}(T) - \text{Price}(D) \le 15\%$ and $\text{Features}(T) \ge 2 \times \text{Features}(D)$, conversion rate to Tier $T$ typically increases by **$28\%–42\%$** compared to standard 2-tier models.

---

## 2. Annual Discounting & Cashflow Multiplier

| Monthly Price | Annual Monthly Equiv. | Annual Billed | Savings Pill Display |
| :---: | :---: | :---: | :---: |
| **$29 / mo** | **$23 / mo** *(20% Off)* | **$276 / yr** | `Save $72/year` |
| **$49 / mo** | **$39 / mo** *(20% Off)* | **$468 / yr** | `Save $120/year` |
| **$99 / mo** | **$79 / mo** *(20% Off)* | **$948 / yr** | `2 Months Free` |

---

## 3. Tier Distribution Rules (Freemium vs. Paid)

```json
{
  "starter": {
    "targetAudience": "Solopreneurs & Hobbyists",
    "priceMonthly": 19,
    "priceAnnual": 15,
    "limits": { "seats": 1, "projects": 3, "storageGb": 5 },
    "support": "Community Discord"
  },
  "pro": {
    "isTargetTier": true,
    "targetAudience": "Growing Teams & Power Users",
    "badge": "MOST POPULAR",
    "priceMonthly": 49,
    "priceAnnual": 39,
    "limits": { "seats": 5, "projects": "Unlimited", "storageGb": 100 },
    "support": "Priority Email & Live Chat"
  },
  "enterprise": {
    "targetAudience": "Organizations & Regulated Entities",
    "priceMonthly": "Custom",
    "limits": { "seats": "Custom", "projects": "Unlimited", "storageGb": "Unlimited" },
    "features": ["SAML / SSO", "Custom SLA", "Audit Logs", "Dedicated CSM"]
  }
}
```
