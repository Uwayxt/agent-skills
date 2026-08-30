# 📡 Network State Protocol — UX Chaos Monkey

A 5-phase protocol for systematically simulating every network failure mode that real users encounter. Execute phases in order. Document results in the Chaos Report.

---

## Pre-Flight Checklist

Before starting any network chaos test:
- [ ] Test environment is isolated (not production)
- [ ] All baseline interactions documented at normal speed (Phase 1)
- [ ] Browser DevTools Network tab open and recording
- [ ] Application console open (watch for unhandled promise rejections)
- [ ] Any local service workers noted (they may cache and mask failures)

---

## Phase 1: Baseline Capture (Control)

**Objective:** Document normal behavior before any chaos is introduced.

Execute the following flows at full connection speed and record:
1. Page load → time to interactive
2. Form submit → success confirmation time
3. Data fetch → data rendered time
4. Any streaming/AI response → first token time → completion time

**Artifacts to capture:**
- Screenshot of every success state
- Network waterfall (HAR export)
- Console: zero errors baseline

---

## Phase 2: Throttled Connection (2G Simulation)

**Tool:** Chrome DevTools → Network → Throttling → "Slow 3G" or custom:
```
Download: 400 Kbps
Upload: 150 Kbps
Latency: 400ms
```

**What to observe:**
- [ ] Loading skeletons appear within 300ms of navigation (not blank white)
- [ ] Images use LQIP or blur-up placeholder
- [ ] Primary text content renders before images (content-visibility / LCP)
- [ ] No layout shift (CLS = 0) when images load in after text
- [ ] Timeout UX triggers if operation > 5s: spinner must show progress, not freeze

**Pass criteria:** The page remains fully usable at 400 Kbps. Core task completion is possible even if slow.

---

## Phase 3: Latency Spike Injection (Worst-Case RTT)

**Tool:** Chrome DevTools custom throttling:
```
Latency: 3000ms (3-second RTT — satellite connection simulation)
```
Or via code:
```javascript
// In Playwright
await page.route('**/*', async route => {
  await new Promise(r => setTimeout(r, 3000)); // 3s artificial delay
  await route.continue();
});
```

**What to test:**
1. **Optimistic UI:** Does clicking "Like" / "Save" / "Toggle" update the UI immediately, before the server responds?
2. **Debounce on search:** Does the search input debounce correctly (300–500ms) — not sending 20 requests for "hel", "hell", "hello"?
3. **Double-submit guard:** Can the user accidentally submit a form twice by clicking "Submit" again while waiting?
4. **Request cancellation:** If user navigates away while a 3s request is in-flight, is the request cancelled (`AbortController`)?

**Pass criteria:**
- [ ] Optimistic mutations applied within 16ms of user action
- [ ] Double-submit button disabled after first click
- [ ] No duplicate API calls from repeated user actions
- [ ] Stale response from cancelled navigation does not corrupt new page state

---

## Phase 4: Hard Disconnect (Mid-Operation Cut)

Cut the network connection during active operations. Test each of the following cut points:

### 4A — Cut Before Page Load
```javascript
// Playwright
await context.setOffline(true);
await page.goto('/dashboard');
```
**Expected:** Offline page or Service Worker cached shell — NOT browser "no connection" error page
**Fail:** White screen / "ERR_INTERNET_DISCONNECTED" with no app UI

### 4B — Cut Mid-Navigation (After Click, Before Response)
```javascript
await page.click('[data-testid="nav-orders"]');
await context.setOffline(true); // Cut immediately after click
```
**Expected:** User stays on current page; offline banner appears; link shows retry CTA
**Fail:** Broken loading state; user stranded on half-loaded page

### 4C — Cut Mid-Form Submit
```javascript
await page.fill('[data-testid="checkout-form"]', formData);
await page.click('[data-testid="submit-order"]');
await context.setOffline(true); // Cut after click, before response
```
**Expected:**
- Form data preserved in component state (not lost)
- Queue indicator: `"Your order will be submitted when connection is restored"`
- LocalStorage / IndexedDB queue entry created
**Fail:** Form blanked out; order lost; no indication to user

### 4D — Cut Mid-Streaming Response
```javascript
// During AI/streaming output, kill the connection
await context.setOffline(true); // Cut while stream is rendering
```
**Expected:**
- Stream pauses at last complete rendered token (not mid-word if possible)
- Streaming cursor stops blinking
- Message shows: `"Connection lost — [Retry] to resume"` or auto-reconnect with resume
**Fail:** Frozen spinner with no recovery path; partial message displays with broken character

### 4E — Cut During File Upload (if applicable)
```javascript
await page.setInputFiles('[data-testid="file-upload"]', 'large-file.pdf');
// Start upload, then cut
await context.setOffline(true);
```
**Expected:** Upload progress pauses; retry offered when reconnected; file selection not cleared
**Fail:** Upload silently fails; user must re-select file

---

## Phase 5: Reconnect & Sync Verification

After each Phase 4 disconnect test, reconnect and verify:

```javascript
await context.setOffline(false); // Restore connection
```

### 5A — Queue Execution Verification
- [ ] Queued mutations execute automatically on reconnect
- [ ] Execution order is FIFO (first queued = first sent)
- [ ] UI shows sync progress: `"Syncing 2 pending actions..."`
- [ ] After sync: `"All changes saved"` confirmation shown

### 5B — Duplicate Request Guard
- [ ] If user manually retried while offline AND auto-reconnect fires: only ONE request sent
- [ ] Server-side idempotency key respected (if applicable)

### 5C — Stale Data Handling
- [ ] If another user changed the same data while this user was offline: conflict resolved gracefully
- [ ] Options presented: "Keep your version" / "Load latest" — never silent overwrite

### 5D — Stream Resume (for AI/streaming)
- [ ] Stream resumes from last received token (not from start)
- [ ] OR if resume not supported: clear state reset + "Start over" option offered

---

## Rapid Toggle Stress Test

**Purpose:** Simulate users in areas with intermittent signal (elevator, subway, rural area).

```javascript
// Toggle offline/online every 500ms for 5 seconds
for (let i = 0; i < 10; i++) {
  await context.setOffline(i % 2 === 0);
  await page.waitForTimeout(500);
}
await context.setOffline(false); // End online
```

**What to verify:**
- [ ] Status banner debounces: does NOT flicker 10 times
- [ ] Debounce threshold: banner appears only after 1500ms of continuous offline
- [ ] No duplicate queued requests accumulate during toggle
- [ ] No memory leak from repeated event listener attachment/detachment
- [ ] Final state (online) is correctly detected and reflected in UI

---

## Network Chaos Results Template

```markdown
## Phase 1: Baseline
- Page TTI: [X]ms
- Form submit: [X]ms
- Stream first token: [X]ms

## Phase 2: 2G Throttle
- [ ] Skeleton appears < 300ms: PASS / FAIL
- [ ] No layout shift: PASS / FAIL
- [ ] Timeout UX at 5s: PASS / FAIL

## Phase 3: 3s Latency Spike
- [ ] Optimistic UI fires < 16ms: PASS / FAIL
- [ ] Double-submit guard: PASS / FAIL
- [ ] Request cancellation on nav: PASS / FAIL

## Phase 4: Hard Disconnect
- 4A (before load): PASS / FAIL — [Notes]
- 4B (mid-nav): PASS / FAIL — [Notes]
- 4C (mid-form): PASS / FAIL — [Notes]
- 4D (mid-stream): PASS / FAIL — [Notes]
- 4E (mid-upload): PASS / FAIL — [Notes]

## Phase 5: Reconnect & Sync
- [ ] FIFO queue executed: PASS / FAIL
- [ ] No duplicates: PASS / FAIL
- [ ] Sync confirmation shown: PASS / FAIL
- [ ] Stream resumed or cleanly reset: PASS / FAIL

## Rapid Toggle
- [ ] Banner debounced: PASS / FAIL
- [ ] No duplicate requests: PASS / FAIL
```
