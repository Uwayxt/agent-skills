---
name: product-strategy
description: Prioritize features with positioning and RICE/MoSCoW. Use when prioritize features, what should we build first, roadmap, MoSCoW, or RICE.
---

# Product Strategy

**Strategy is saying no to good ideas so you can say yes to the right ones. A feature backlog without explicit prioritization is merely a wish list.**

### 1. Articulate positioning (The Positioning Anchor)
Formulate the unequivocal product anchor:
`"For [target persona], [Product Name] is a [product category] that [primary compelling value / superpower], unlike [status quo alternative] which [primary limitation of alternative]."`

### 2. Harvest & normalize candidate features
Collect candidate items from `product-discovery` findings, stakeholder requests, and user feedback. Define each item as a discrete user capability, not a vague project theme.

### 3. Apply quantitative scoring (RICE Framework)
Score each feature using RICE methodology (See [RICE-SCORING-GUIDE.md](RICE-SCORING-GUIDE.md)):
$$\text{RICE Score} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}$$
- **Reach**: Users impacted per quarter (e.g. 500 users).
- **Impact**: Massive (3x), High (2x), Medium (1x), Low (0.5x), Minimal (0.25x).
- **Confidence**: High (100%), Medium (80%), Low (50%).
- **Effort**: Person-months or sprint points estimate (e.g. 2).

### 4. Validate against Strategic OKRs & Tie-breaking
Before finalizing the cut line:
- Map each top-scoring item against current quarterly OKRs. High RICE items with zero OKR alignment are deferred.
- **Tie-Breaking Rule**: When two features have identical RICE scores, prioritize the one that **eliminates friction on the existing critical path** over the one introducing a brand-new surface area.

### 5. Establish the cut-line & explicit "Not Doing" list
Clearly segment features into:
- **Now (Sprint / Phase 1)**: Above the cut-line.
- **Next (Phase 2 Roadmap)**: High value, but waiting on upstream dependencies.
- **Later / Won't Do**: Documented explicit "No" with strategic rationale to prevent zombie feature creep.

## Completion Criteria
- [ ] Positioning statement articulated with target user, category, and differentiator
- [ ] All features scored with Reach, Impact, Confidence, and Effort values
- [ ] High-ranking features validated against quarterly OKRs
- [ ] Tie-breaking rules applied to identical scores
- [ ] Explicit "Won't Do / Deferred" list generated with documented business rationale

## Output Format
A `product_strategy_one_pager.md` artifact containing the positioning anchor, scored prioritization table, and explicit deferred list.

## Anti-patterns
- Assigning 100% confidence to unvalidated assumptions.
- Treating effort as 1 for everything to manipulate the RICE score.
- Leaving low-priority items lingering in limbo without explicitly marking them as "Won't Do."
- Prioritizing executive pet features that score low on user reach and OKR alignment.
