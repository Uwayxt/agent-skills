# 🎭 Chaos Scenarios Library — 30 Predefined Stress Tests

Use this library as a checklist. Run relevant scenarios against any UI component or page.
Each scenario has an ID (SC-001 to SC-030), severity, vector type, and pass criteria.

---

## Vector A: Text Explosion (SC-001 ~ SC-010)

| ID | Scenario | Severity | Inject Into | Pass Criteria |
|---|---|---|---|---|
| **SC-001** | German compound noun (45 chars) in a primary CTA button | 🔴 HIGH | Button label | Ellipsis fires; button width does not exceed container |
| **SC-002** | Russian 24-char word in a table "Name" column cell | 🔴 HIGH | Table cell | No horizontal table scroll introduced |
| **SC-003** | Finnish 58-char word in a Badge/Tag component | 🔴 HIGH | Badge | Badge clips at pill boundary; text does not escape pill shape |
| **SC-004** | 120-char no-space string in breadcrumb | 🟡 MED | Breadcrumb | Last crumb truncates or collapses to `...`; no overflow |
| **SC-005** | 300% oversize label in a dropdown option | 🟡 MED | Select option | Option wraps or clips; select width does not exceed parent |
| **SC-006** | Emoji-only string `"🚀🔥💥🎯🧠🌍💡🔑"` in notification toast | 🟡 MED | Toast/Snackbar | Toast max-width respected; emoji line-wraps correctly |
| **SC-007** | Arabic RTL text `"مرحبا بالعالم"` in a LTR layout card | 🟡 MED | Card body | No layout flip of surrounding LTR elements |
| **SC-008** | Thai text with zero word-break in table column | 🟡 MED | Table cell | `overflow-wrap: anywhere` active; no horizontal scroll |
| **SC-009** | 40-char all-uppercase string in a mobile nav label | 🟢 LOW | Nav item | Nav item wraps or truncates; does not push sibling items off |
| **SC-010** | Mixed RTL+LTR in single cell: `"Price: $1,200 — السعر"` | 🟡 MED | Table cell | BiDi rendering correct; number not mirrored |

---

## Vector B: Data Extremes (SC-011 ~ SC-020)

| ID | Scenario | Severity | Component | Pass Criteria |
|---|---|---|---|---|
| **SC-011** | Price display `$0.00` | 🟡 MED | Price/Currency | Shows `$0.00`, not blank or `$` |
| **SC-012** | Price display `$999,999,999.99` | 🔴 HIGH | Price card | Truncates or abbreviates; no card overflow |
| **SC-013** | Price display `-$1,492.50` | 🔴 HIGH | Balance widget | Red/error color token applied; sign clearly visible |
| **SC-014** | Price field receives `NaN` | 🔴 HIGH | Any price field | Renders `—` or `N/A`; never shows literal `"NaN"` |
| **SC-015** | Username = `""` (empty string) | 🟡 MED | Avatar | Shows `?` initials or generic avatar; not blank |
| **SC-016** | Username = `"A".repeat(120)` | 🔴 HIGH | User profile header | Truncated with ellipsis; tooltip on hover shows full name |
| **SC-017** | Username = `"'; DROP TABLE users;--"` | 🔴 HIGH | Any input rendered | Displayed as plain text; no SQL execution |
| **SC-018** | Username = `"<img src=x onerror=alert(1)>"` | 🔴 HIGH | Any rendered field | HTML-escaped; no XSS execution |
| **SC-019** | Date input `"2024-02-30"` (invalid) | 🟡 MED | Date picker/display | Error state shown; not silently rendered as March 1 |
| **SC-020** | Date input `"0001-01-01"` (min) | 🟢 LOW | Date field | No `Invalid Date` or `NaN` rendered; shows year `1` |

---

## Vector C: List / Table Extremes (SC-021 ~ SC-025)

| ID | Scenario | Severity | Component | Pass Criteria |
|---|---|---|---|---|
| **SC-021** | List with 0 items | 🔴 HIGH | Any list/table | First-use empty state shown with primary CTA |
| **SC-022** | List filtered to 0 items | 🔴 HIGH | Filtered list | Filtered empty state shown; "Clear filters" CTA present |
| **SC-023** | List with 1 item | 🟡 MED | Any list | Singular label used (`"1 result"` not `"1 results"`) |
| **SC-024** | List with 10,000 items | 🟡 MED | Virtual list | Page does not freeze; scroll renders at 60fps |
| **SC-025** | Table with 20+ columns | 🟡 MED | Data table | Horizontal scroll within table container; not full-page scroll |

---

## Vector D: Flaky Network (SC-026 ~ SC-030)

| ID | Scenario | Severity | Trigger | Pass Criteria |
|---|---|---|---|---|
| **SC-026** | Page loads while completely offline | 🔴 HIGH | Navigator offline on load | Offline banner shown; skeleton or cached content visible |
| **SC-027** | User submits form, network cuts at 99% | 🔴 HIGH | Kill network after submit click | Form data preserved locally; queue indicator shown |
| **SC-028** | Streaming AI response cut at token 847 | 🔴 HIGH | Kill network mid-stream | Last complete token shown; "Retry" or "Continue" offered |
| **SC-029** | API times out after 30 seconds | 🟡 MED | 30s no response | Never white screen; `"Taking too long"` + retry CTA visible |
| **SC-030** | Network toggles every 500ms for 5 seconds | 🟡 MED | Rapid on/off toggle | Status banner debounced; no duplicate queued requests |

---

## How to Use This Library

1. Select all scenarios relevant to the page/feature being tested
2. Run in order — complete all scenarios before reporting
3. Mark each: ✅ PASS / ❌ FAIL / 🔧 AUTO-FIXED / 🔴 ESCALATE
4. Include scenario IDs in the Chaos Report output
5. Re-test any scenario that received an auto-fix before closing
