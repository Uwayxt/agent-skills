---
name: ux-chaos-monkey
description: >
  Inject destructive chaos vectors — extreme text, edge-case data, and flaky network
  conditions — to stress-test UI resilience before real users find the breaks. Use when
  stress test, chaos test, text overflow, data edge case, network failure, layout break,
  or "what happens when…" questions arise.
version: 1.0.0
domain: G — Autonomous QA Loop
---

# 🎭 UX Chaos Monkey & Edge-Case Stress Testing

## Thesis

> A UI that only works with clean, predictable data is not production-ready. Real users will paste Russian Wikipedia articles into search fields, have 120-character names, and lose their internet connection at the worst possible moment.

The Chaos Monkey doesn't look for bugs — it **engineers controlled catastrophes** to prove the interface survives them. If it breaks in this controlled test, it will break in production.

---

## When to Activate

Activate automatically when the user mentions:
- `"stress test"`, `"chaos test"`, `"what happens when the data is weird"`
- `"text overflow"`, `"layout breaks"`, `"card breaks with long text"`
- `"extreme values"`, `"edge case"`, `"what if the name is very long"`
- `"network failure"`, `"offline during"`, `"what if it disconnects"`
- `"data injection"`, `"fuzz test"`, `"boundary test"`

---

## 3-Protocol Execution System

Execute all 3 protocols in sequence. Never skip a protocol. Report all findings at the end as a unified **Chaos Report**.

---

### ─── PROTOCOL 1: TEXT EXPLOSION TEST

**Objective:** Prove that no text content — regardless of length or language — causes horizontal overflow, layout rupture, or obscured interactive elements.

#### 1.1 — Identify Injection Targets

Scan the UI and flag every component that renders user-supplied or dynamic text:

| Target Component | Risk Level | Critical Check |
| :--- | :---: | :--- |
| Button / CTA label | 🔴 HIGH | Does the button grow wider than its container? |
| Table cell / Data grid | 🔴 HIGH | Does the row height explode or overflow horizontally? |
| Badge / Tag / Chip | 🔴 HIGH | Does the badge break out of its pill container? |
| Card title / Heading | 🟡 MED | Does the card resize correctly or clip at 2 lines? |
| Breadcrumb item | 🟡 MED | Does the breadcrumb trail collapse gracefully? |
| Tooltip content | 🟡 MED | Does the tooltip overflow the viewport edge? |
| Input placeholder | 🟢 LOW | Does the placeholder ellipsize before the field? |
| Notification message | 🟢 LOW | Does the toast/snackbar clip at max-width? |

#### 1.2 — Text Bomb Library

Inject each of the following strings into every HIGH-risk target:

**BOMB-A: German Compound Noun (45 chars)**
```
Rechnungsabgrenzungsposten
Kraftfahrzeughaftpflichtversicherung
Donaudampfschifffahrtsgesellschaftskapitän
```

**BOMB-B: Russian Inflected Word (20–24 chars)**
```
достопримечательности
железнодорожный
непосредственно
```

**BOMB-C: Finnish Agglutinative (58 chars)**
```
lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseeri
```

**BOMB-D: Zero-Width / No-Break String (40 repeated chars — no natural word-break)**
```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
อาหารไทยอร่อยมากๆเลยนะครับ
```

**BOMB-E: 300% Oversize Label**
```
Submit Order Confirmation and Send Invoice to Primary Billing Contact and CC Secondary Approver
```

#### 1.3 — Pass / Fail Criteria

For each injection, verify ALL of the following:

- [ ] **Zero horizontal scroll** introduced at any viewport width ≥ 320px
- [ ] **`text-overflow: ellipsis`** fires before overflow occurs
- [ ] **Button/CTA remains clickable** — not covered by overflowed sibling text
- [ ] **Table cell** does not push neighboring columns off-screen
- [ ] **Line-clamp** engages at correct max-line threshold
- [ ] **`word-break: break-word`** present on containers that cannot use ellipsis

#### 1.4 — Auto-Fix Rules (Deterministic)

1. Single-line targets: `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`
2. Multi-line targets: `overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;`
3. Prose containers: `word-break: break-word; overflow-wrap: anywhere;`
4. Parent with no max-width: add `max-width: 100%`

---

### ─── PROTOCOL 2: DATA EXTREMES INJECTION

**Objective:** Prove that every numeric, monetary, date, name, and identifier field renders correctly at the absolute boundaries of valid input.

#### 2.1 — Financial / Numeric Values

| Value | Type | What to Verify |
| :--- | :--- | :--- |
| `$0` | Zero | Displays as `$0.00`, not empty |
| `-$1,492.50` | Negative | Red color token applied |
| `$999,999,999.99` | Max | Cell truncates, no overflow |
| `$1,000,000,000.00` | Over-max | Abbreviates to `$1B` or ellipsis |
| `NaN` | Invalid | Renders `—`, never `"NaN"` |
| `null` / `undefined` | Missing | Renders `—`, not `"null"` |
| `Infinity` | Overflow | Caught by validation layer |
| `2^53` | Float precision | No rounding artifacts visible |

#### 2.2 — User Identity / Name Fields

| Input | Length | What to Verify |
| :--- | :---: | :--- |
| `""` (empty) | 0 | Avatar shows `?`, not blank |
| `"A"` | 1 | Single char centered in avatar |
| `"A".repeat(120)` | 120 | Ellipsis + tooltip on hover |
| `"🚀🔥💥🎯🧠"` | 5 emoji | First emoji or fallback shown |
| `"🚀".repeat(40)` | 40 emoji | Line-clamped, no explosion |
| `"'; DROP TABLE users;--"` | — | Plain text, not executed |
| `"<script>alert(1)</script>"` | — | HTML-escaped, not rendered |

#### 2.3 — Date / Time Edge Cases

| Value | What to Verify |
| :--- | :--- |
| `0001-01-01` | No `NaN` or `Invalid Date` |
| `9999-12-31` | Renders, no picker overflow |
| `2024-02-30` | Normalized or clear error state |
| UTC `+14:00` | Date label does not flip wrong |
| Unix `0` (1970-01-01) | Proper date, not `"Invalid Date"` |

#### 2.4 — List / Table Extremes

- **0 items:** Empty state with CTA shown
- **1 item:** Singular label (`"1 result"` not `"1 results"`)
- **10,000 items:** Virtualization active — no page freeze
- **10,000 items filtered to 0:** Filtered empty state (not first-use empty state)

---

### ─── PROTOCOL 3: FLAKY NETWORK STATE

**Objective:** Prove every network-dependent operation has defined, non-destructive behavior when the connection is degraded or lost.

#### 3.1 — Network Failure Matrix

| Scenario | Trigger Point | Expected Behavior |
| :--- | :--- | :--- |
| Offline on page load | Before first request | Offline banner + skeleton |
| Offline mid-navigation | After click | Origin preserved, retry CTA |
| Offline mid-form submit | After submit click | Data queued locally, queue indicator |
| Offline mid-stream | During AI response | Pauses at last token, auto-resumes |
| Timeout at 5s | Long API call | Spinner → timeout state → retry |
| Timeout at 30s | Very slow endpoint | Never blank screen; escalation CTA |
| Partial JSON | Truncated response | Error caught → degraded state |
| Rapid toggle (500ms) | Fast on/off | Debounced — no banner flicker |
| Reconnect after queue | Back online | FIFO queue executes, sync shown |

#### 3.2 — Streaming-Specific Tests

1. **Cut at first token:** Spinner appears before stream starts
2. **Cut mid-word:** Broken character avoided; cursor/fade shown
3. **Cut at 847 chars:** "Continue" or "Retry" offered — not frozen spinner
4. **No response for 10s:** `"Taking longer than expected... [Cancel] [Retry]"`
5. **Empty stream response:** Empty state renders — not a blank message bubble

#### 3.3 — Offline Queue Verification

- [ ] Queued count shown: `"2 actions pending sync"`
- [ ] FIFO execution on reconnect
- [ ] Duplicate-safe on rapid toggling
- [ ] Rollback-safe: failed queue item reverts UI and shows error

---

## Chaos Report Format

```markdown
## 🎭 Chaos Report — [Page / Component]
**Date:** [ISO]   **Skill:** ux-chaos-monkey v1.0.0

### Protocol 1: Text Explosion
| Target | Bomb | Result | Auto-Fixed? |
|---|---|---|---|
| Button "Submit" | BOMB-A | ❌ Overflow 320px | ✅ overflow:hidden |
| Table: User Name | BOMB-E | ✅ Pass | — |

### Protocol 2: Data Extremes
| Field | Value | Result | Action |
|---|---|---|---|
| Price | $999,999,999.99 | ❌ Card overflow | ✅ text-overflow added |
| Username | 120-char | ✅ Ellipsis correct | — |

### Protocol 3: Flaky Network
| Scenario | Result | Action |
|---|---|---|
| Offline mid-form | ✅ Data queued | — |
| 30s timeout | ❌ White screen | 🔴 Escalate |

### Summary
- ✅ PASS: [n]   🔧 AUTO-FIXED: [n]   🔴 ESCALATE: [n]
```

---

## Completion Criteria

- [ ] All HIGH-risk text targets tested with all 5 BOMB categories
- [ ] All financial fields tested with full numeric edge-case set
- [ ] All date fields tested with boundary and invalid date inputs
- [ ] All 9 network failure scenarios covered
- [ ] Chaos Report generated with all findings documented
- [ ] Auto-fixable issues resolved and re-tested
- [ ] Escalations packaged with full context

## Output

`chaos-report-[date].md` — unified 3-protocol test matrix with findings, fixes applied, and escalation packages.

## Anti-patterns

- Testing only happy-path data (clean names, round numbers, fast connections)
- Treating `null` rendering as acceptable because "it rarely happens"
- Fixing overflow with `overflow: hidden` alone without checking content accessibility
- Stopping after the first failure — always run all scenarios before reporting
- Not re-testing after auto-fixes (fix may introduce new overflow elsewhere)
