---
name: product-discovery
description: Execute product discovery. Use when framing new problems, mapping actors, or synthesizing initial product hypotheses.
---

# Product Discovery

**Product discovery surfaces the bedrock truth of user pain before writing a single line of code.** Everything built on false premises rots.

### 1. Frame the problem with Jobs-to-be-Done (JTBD)
State the core struggle without referencing potential features or technologies:
- Format as JTBD: `"When I [struggling situation], I want to [motivation/progress], so I can [expected functional and emotional outcome]."`
- Differentiate between the functional job ("send invoices"), the emotional job ("feel confident I am not being cheated"), and the social job ("look professional to clients").
- For live or simulated user interviews, utilize structured prompts from [INTERVIEW-TEMPLATES.md](INTERVIEW-TEMPLATES.md).

### 2. Map the actors & decision dynamics
Identify every role interacting with or affected by the workflow:
| Persona / Role | Core Goal | Primary Frustration / Current Workaround | Decision Power (Buyer / Champion / User) | Frequency |
|---|---|---|---|---|

### 3. Inventory existing workarounds
Document what users do *today* without your product: spreadsheets, WhatsApp groups, manual copy-pasting, custom scripts. These workarounds demonstrate both real demand and the switching cost threshold your product must overcome.

### 4. Scan the competitive landscape & gaps
Map out direct alternatives and substitute behaviors:
- Where do existing market leaders leave underserved edge cases?
- What are the common complaints in customer reviews or support forums?

### 5. Prioritize assumptions (The 2x2 Matrix)
List all beliefs that must hold true for the product to succeed. Plot them on a matrix:
- **X-axis**: Known with high evidence ↔ High uncertainty / Guesswork
- **Y-axis**: Low operational impact ↔ Fatal if wrong (High risk)
The items in the **High Uncertainty + Fatal if Wrong** quadrant are your *Riskiest Assumptions* (feeds directly into `mvp-scoping`).

### 6. Design lightweight validation experiments
Before committing engineering resources, define test mechanisms to validate riskiest assumptions:
- **Smoke test / Fake-door**: Landing page or in-app CTA button measuring conversion intent.
- **Concierge / Wizard of Oz test**: Fulfilling the service manually behind the scenes to test willingness to pay.
- **Pass/Fail Criteria**: Define measurable threshold before testing (e.g. "≥15% clickthrough on CTA indicates sufficient problem urgency").

## Completion Criteria
- [ ] Problem framed in JTBD format (Situation -> Motivation -> Expected Outcome)
- [ ] Actor map completed with decision-making power and current workarounds
- [ ] Assumptions prioritized on the Uncertainty vs. Criticality matrix
- [ ] Top 3 riskiest assumptions isolated with quantitative pass/fail validation tests defined
- [ ] Synthesis captured in `discovery_synthesis.md`

## Output Format
A structured `discovery_synthesis.md` artifact detailing JTBD statements, actor maps, workaround inventories, assumption prioritization matrix, and validation experiment recipes.

## Anti-patterns
- Skipping discovery because the founder or stakeholder "already knows what the market needs."
- Confusing a surface feature request ("add an export to CSV button") with the root problem ("reporting is fragmented").
- Leaving assumption exit criteria unquantified ("we will see if users like it").
- Generating unorganized 20-page interview transcripts without synthesizing actionable themes.
