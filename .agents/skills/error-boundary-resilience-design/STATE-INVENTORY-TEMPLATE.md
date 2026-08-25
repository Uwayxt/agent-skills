# State Resilience Inventory Template

Use this template to audit and document resilience states across all key product views.

---

## View: `[View / Module Name]`

### 1. Ideal State
- **Description**: Standard screen with 5+ items loaded.
- **Components Active**: Full table, summary metrics cards, active filters.

---

### 2. First-Use Empty State
- **Headline**: "No invoices created yet"
- **Body Copy**: "Generate and send your first invoice in under 2 minutes to start tracking payments."
- **Illustration / Icon**: `receipt-outline` (muted token: `color-text-muted`)
- **Primary CTA**: `[+ Create First Invoice]` -> opens `/invoices/new`
- **Secondary Link**: "Learn how automated billing works ->"

---

### 3. Filtered Zero-Results State
- **Headline**: "No invoices match your filters"
- **Body Copy**: "Try adjusting your search terms or clearing date filters."
- **Action**: `[Clear All Filters]` -> resets query params in URL

---

### 4. Partial Failure / Degraded State
- **Condition**: Revenue metric API fails (500) while Invoice List succeeds.
- **Behavior**:
  - Invoice list displays normally.
  - Revenue card displays inline warning card:
    - Text: "Unable to calculate metrics right now"
    - Inline CTA: `[↻ Retry]`
- **Log Reference**: `err-metric-calc-timeout`

---

### 5. Offline & Network Error State
- **Condition**: User loses internet connection (`navigator.onLine === false`).
- **Banner**: Sticky top notification: "You are offline. Changes will sync when reconnected."
- **Form Submissions**: Stored in offline IndexedDB queue with badge indicator: `(2 unsynced changes)`.
