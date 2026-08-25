---
name: user-research-synthesis
description: Turn raw user data into ranked design insights. Use when synthesize interviews, user feedback, what did users say, research findings, analyze survey, or interview notes.
---

**Synthesis is the translation of raw user noise into ranked, actionable product decisions.** Summarizing repeats what people said; synthesis uncovers the underlying behavioral patterns that dictate what you must build.

### 1. Collect & classify data by type
Separate input signals into two complementary streams:
- **Qualitative Data**: User interview transcripts, open-ended support tickets, usability test session notes, observational recordings.
- **Quantitative Telemetry**: Funnel drop-off percentages, feature click rates, search query logs, NPS scores, time-on-task metrics.

### 2. Triangulate qualitative insights with quantitative baselines
Never analyze qualitative complaints in a vacuum. Pair the "What" with the "Why":
- Example: *"Users abandon at Checkout Step 2"* (Quantitative: 42% drop-off) + *"I didn't trust that my credit card info was secure without a lock badge"* (Qualitative: 7/10 users) = **Single High-Confidence Insight**.

### 3. Extract atomic observations
Break transcripts and notes into atomic observations (1 observation = 1 discrete action, quote, or blocker).
- *Valid atomic observation*: "User #4 clicked the disabled 'Next' button 5 times because the required checkbox was scrolled out of view."
- *Invalid vague summary*: "User was confused by the form."

### 4. Affinity clustering & thematic grouping
Group atomic observations into emerging behavioral themes (e.g. Mental Model Mismatch, Discoverability Gap, Trust Deficit, Operational Friction).

### 5. Weigh by Frequency × Severity Matrix
Plot themes on a 2×2 grid:
- **Frequency**: Isolated (1 user) ↔ Pervasive (≥ 70% of sample).
- **Severity**: Annoyance (cosmetic) ↔ Task Blocker (churn risk / fatal drop-off).
Themes in **Pervasive + Task Blocker** are critical release-blocking priorities.

### 6. Derive actionable Insight Statements
Formulate structured insight statements:
`"[Target Segment] experiences [struggle/behavior] because [underlying root cause], which means we should [specific design/architectural remediation]."`

## Completion Criteria
- [ ] Raw input parsed into discrete atomic observations (not premature conclusions)
- [ ] Qualitative feedback triangulated with quantitative telemetry where available
- [ ] Frequency × Severity matrix calculated for all identified clusters
- [ ] Insight statements follow the `[Segment] + [Behavior] + [Root Cause] + [Remediation]` formula
- [ ] Prioritized design recommendations ranked by impact and implementation effort

## Output Format
A `research_synthesis_report.md` artifact containing the raw observation catalog, thematic clusters, Frequency × Severity matrix, and ranked actionable design recommendations.

## Anti-patterns
- Treating one vocal enterprise customer's feature demand as a universal product pattern.
- Reporting raw transcript quotes without extracting the underlying root need.
- Confusing feature requests ("they asked for an Excel export") with user needs ("reporting is fragmented across tools").
- Ignoring quantitative baseline data when qualitative feedback contradicts real telemetry behavior.
