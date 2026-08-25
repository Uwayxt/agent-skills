# RICE Scoring Guide & Calibration Reference

A guide to calibrate Reach, Impact, Confidence, and Effort to eliminate subjective bias.

---

## 1. Reach (Users impacted per quarter)
Measure total unique users directly interacting with the feature:
- `1000`: Used by entire active customer base.
- `200`: Used by power users or specific administrative roles.
- `50`: Niche feature or enterprise edge case.

---

## 2. Impact (Progress toward core objective)
Estimate the magnitude of positive effect per user:
- `3.0` (Massive): Direct driver of conversion, retention, or core activation.
- `2.0` (High): Significant improvement to a daily workflow.
- `1.0` (Medium): Noticeable quality-of-life polish or friction reduction.
- `0.5` (Low): Minor visual improvement or secondary option.
- `0.25` (Minimal): Barely perceptible enhancement.

---

## 3. Confidence (Evidence discount factor)
Discount optimistic bias with hard evidence:
- `1.0` (100% - High): Supported by quantitative user analytics + direct qualitative interview verification.
- `0.8` (80% - Medium): Supported by strong qualitative feedback or customer support trends, but lacking telemetry data.
- `0.5` (50% - Low): Unvalidated hypothesis or subjective stakeholder request.

---

## 4. Effort (Resource cost in person-months or sprints)
Estimate total cross-functional effort (Design + Frontend + Backend + QA):
- `0.5`: 1 engineer, 1–2 days.
- `1.0`: 1 sprint (2 weeks), standard component.
- `3.0`: 1 quarter feature, multiple backend/database schema migrations.
- `6.0+`: Major architectural overhaul.

---

## Worked Example Calculation Table

| Feature Candidate | Reach | Impact | Confidence | Effort | RICE Score | Disposition |
|---|---|---|---|---|---|---|
| **One-Click Invoice Export** | 800 | 2.0 | 100% (1.0) | 1.0 | **1600** | **Now (Phase 1)** |
| **Custom Dashboard Widgets** | 200 | 3.0 | 50% (0.5) | 3.0 | **100** | **Later (Phase 2)** |
| **Dark Mode Theming** | 1000 | 1.0 | 80% (0.8) | 2.0 | **400** | **Now (Phase 1)** |
| **Multi-Currency Support** | 150 | 3.0 | 80% (0.8) | 4.0 | **90** | **Deferred / Won't Do** |
