# 🏛️ Architecture & Core Philosophy

Agentway is built on one foundational insight: **AI agents should not guess product architecture.**

---

## 🧠 Core Engineering Principles

### 1. Progressive Context Disclosure (0 Idle Tokens)
Traditional agent toolchains inject thousands of lines of prompt instructions into the system prompt at start time. This wastes tokens, slows down inference, and degrades reasoning accuracy.
Agentway uses **Progressive Disclosure**:
- **Layer 1 (Indexed):** Only skill names and trigger phrases (< 160 chars) exist in IDE memory.
- **Layer 2 (On-Demand):** When a trigger matches, the agent reads `SKILL.md` (80–180 lines).
- **Layer 3 (Deep Reference):** Detailed templates (`EXTRACTION-PROTOCOL.md`, `DARK-TOKEN-SCHEMA.md`) are loaded **only if needed**.

### 2. Contract-Driven Handshake
Every skill generates a structured, machine-readable artifact (JSON manifest, Markdown spec table, or Playwright test script) that serves as the deterministic input for the next downstream skill.

```
[Visual Extraction] ──► style-extraction.json ──► [Design Tokens]
                                                        │
                                                        ▼
[Scaffolding] ◄── sitemap.md ◄── [Information Architecture]
```

### 3. Model & Vendor Agnosticism
Agentway is 100% vendor-agnostic. No references to proprietary model features exist in skill instructions. The same contracts execute identically across Claude 3.7, GPT-4o, Gemini 2.0, and DeepSeek V3.

---

## 🔄 The 8-Phase Lifecycle Pipeline

```
  Phase 0: Visual Intelligence (visual-style-extractor)
     │
     ▼
  Phase 1: Product Thinking & Strategy (JTBD + RICE Scoring)
     │
     ▼
  Phase 2: Product Architecture & IA (Sitemaps + RBAC Overlays)
     │
     ▼
  Phase 3: Visual Language & Themes (Design Tokens + Dark Mode)
     │
     ▼
  Phase 4: Component Engine & Resilience (5-State Matrices)
     │
     ▼
  Phase 5: Growth & Modular Scaffolding (Manifest Discovery)
     │
     ▼
  Phase 6: Code Delivery & Security Audit (Handoff + PII Masking)
     │
     ▼
  Phase 7: Autonomous QA Loop (Playwright + WCAG 2.2 + Auto-Fix)
```
