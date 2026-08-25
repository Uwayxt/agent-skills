# ✍️ Contributing & Skill Authoring Guide

Standards and quality specifications for contributing new skills to the Agentway ecosystem.

# Skill Authoring Guide

A complete reference for writing new skills that integrate cleanly into the Agentway registry.

---

## What Is a Skill?

A skill is a folder containing a set of instruction files that tell an AI agent *how to think* about a specific type of task. When a user's request matches a skill's trigger phrases, the agent loads the skill's instructions and follows its workflow.

Skills are **not code**. They are structured natural language — written with the precision of a technical specification and the clarity of good documentation.

---

## Folder Structure

Every skill follows this exact layout:

```
.agents/skills/<skill-name>/
├── SKILL.md                    # Required. The main instruction file.
├── agents/
│   └── openai.yaml             # Required. Display metadata for IDEs.
└── <SIBLING-DOCS>.md           # Optional. Reference files for complex skills.
```

### Naming Conventions

- Folder name: `kebab-case`, lowercase, no spaces.
- Must match the `name` field in `SKILL.md` frontmatter exactly.
- Should describe what the skill *does*, not what it *is* (`user-flow-mapping`, not `user-flows`).

---

## SKILL.md Format

### Frontmatter

```yaml
---
name: your-skill-name
description: One sentence summary of what this skill does. Use when trigger phrase one, trigger phrase two, or trigger phrase three.
---
```

**Rules:**
- Only `name` and `description` are allowed in frontmatter. No other fields.
- `description` must follow the exact formula: `"<Summary>. Use when <trigger 1>, <trigger 2>, or <trigger 3>."`
- Trigger phrases are what users will naturally say. Think "what would someone type to invoke this?"
- Keep the full `description` under 160 characters.

### Body Structure

Every skill body follows this sequence:

```markdown
**[Thesis — one bold sentence that captures the core insight of this skill]**

### 1. [First step title]
[Instruction paragraph]

### 2. [Second step title]
[Instruction paragraph]

...

## Completion Criteria
[Bulleted checklist. What must be true for this skill to be "done"?]

## Output
[What the skill produces. Be specific about format (JSON, Markdown table, Playwright file, etc.)]

## Anti-patterns
- [Thing that looks right but is wrong]
- [Common shortcut that causes problems downstream]
```

### Tone and Style

| Do | Don't |
|----|-------|
| Write in the imperative mood ("Define the breakpoint scale") | Write in the passive voice ("The breakpoint scale should be defined") |
| Use specific numbers and thresholds ("≥ 44×44pt") | Use vague guidance ("make it big enough to tap") |
| Name the downstream skill ("feeds into design-to-code-handoff") | Leave handoffs implicit |
| Reference tokens by name ("use `bp-sm` token") | Use raw values ("use 480px") |
| Be dense and actionable | Write explanatory prose that adds length without adding value |

**The thesis line** is the most important sentence in the skill. It should capture an insight that a junior designer or engineer might not know — the "why" that makes the entire skill make sense. It is always **bold**.

---

## agents/openai.yaml Format

```yaml
interface:
  display_name: "Human Readable Name"
  short_description: "One line description shown in IDE skill pickers"
```

- `display_name`: Title case, human readable. What appears in the IDE skill list.
- `short_description`: One sentence, under 80 characters. Action-oriented ("Map PRD requirements to implementation status").

---

## Sibling Files (Progressive Disclosure)

For complex skills, heavy reference material goes in sibling `.md` files — not in `SKILL.md`. This keeps the main skill file lean and fast to load.

**When to use sibling files:**
- Reference tables that would make `SKILL.md` too long (e.g., `TRANSFORMATION-TABLE.md`)
- Templates that the skill instructs the agent to fill out (e.g., `MATRIX-TEMPLATE.md`)
- Protocol documents for orchestrators (e.g., `QA-LOOP-PROTOCOL.md`)

**Naming:** All caps with hyphens. `TRANSFORMATION-TABLE.md`, not `transformationTable.md`.

**Referencing in SKILL.md:** Use a markdown link: `See [TRANSFORMATION-TABLE.md](TRANSFORMATION-TABLE.md) for the canonical table.`

---

## Skills-Lock Registration

After creating a skill, add it to `skills-lock.json`:

```json
"your-skill-name": {
  "source": "uwayxt/product-design-skills",
  "sourceType": "github",
  "skillPath": "skills/<category>/your-skill-name/SKILL.md",
  "computedHash": "<sha256 of SKILL.md>"
}
```

Compute the hash:

```bash
shasum -a 256 .agents/skills/your-skill-name/SKILL.md | awk '{print $1}'
```

---

## Claude Symlink

Add a symlink in `.claude/skills/` so the skill works with Claude Code:

```bash
ln -s "../../.agents/skills/your-skill-name" ".claude/skills/your-skill-name"
```

---

## Quality Checklist

Before submitting a skill, verify:

- [ ] Folder name matches `name` in frontmatter
- [ ] `description` follows the formula and is under 160 characters
- [ ] Thesis line is bold and contains a genuine insight
- [ ] Every step is imperative and actionable
- [ ] Completion criteria are checkboxes that can be verified
- [ ] Output section names specific formats (not "a document")
- [ ] Anti-patterns list at least 2 common mistakes
- [ ] No vendor model references (no Claude, Gemini, GPT, etc.)
- [ ] No dashboard-specific language unless the skill is explicitly for dashboards
- [ ] `agents/openai.yaml` is present and valid
- [ ] Entry added to `skills-lock.json` with correct hash
- [ ] Symlink created in `.claude/skills/`

---

---

## 📊 Skill Quality Scoring & Token Budget Standards

Every skill in the Agentway registry is audited against strict token efficiency and structural standards:

| Dimension | Target Specification | Hard Limit | Quality Metric / Rationale |
| :--- | :--- | :--- | :--- |
| **Main File Length** | **80–180 lines** | **< 250 lines** | Keeps context injection lean; heavy reference moves to sibling files |
| **Description Length**| **100–140 characters** | **< 160 characters** | Optimizes IDE skill trigger search indexing and token consumption |
| **Imperative Action Ratio** | **100% active voice** | **0 passive sentences** | Eliminates ambiguity during autonomous LLM execution |
| **Verification Checklists**| **5–10 testable checkboxes**| **$\ge 4$ checkboxes** | Ensures deterministic self-evaluation before task completion |
| **Anti-Patterns Catalog** | **3–6 common failure cases**| **$\ge 2$ anti-patterns** | Prevents recurrent model hallucinations and bad UI practices |
| **Model Neutrality** | **100% Model Agnostic** | **Zero vendor names** | Ensures identical performance on Claude, GPT, Gemini, and DeepSeek |

---

## Example: A Well-Written Skill

```markdown
---
name: example-skill
description: Define the data hierarchy before building any list or table view. Use when data table, list view, organizing data, or column structure.
---

**The column order is a statement of priority. Put the most important data first — users read left to right, and their eye stops at the first column that answers their question.**

### 1. Identify the primary key
Every row represents one entity. Name it. The primary key column (e.g., "Invoice Number", "User Name") is always the first visible column and is never sortable away from its position.

### 2. Define column priority
Rank every data field: (a) identity — what is this row? (b) status — what is its current state? (c) key metrics — the numbers the user cares about most. (d) secondary data — timestamps, IDs, metadata. Columns appear in this order, left to right.

### 3. Decide sort and filter behavior
Primary column: always sortable. Status column: filterable. Metric columns: sortable. Secondary data: no default sort, accessible via column visibility toggle.

## Completion Criteria
- [ ] Primary key column identified and positioned first
- [ ] All columns ranked by priority type
- [ ] Sort and filter behavior specified per column

## Output
Column specification table: name | type | priority | sortable | filterable | default visible.

## Anti-patterns
- Putting timestamps as the first column (irrelevant to the primary question the user is answering).
- Making every column sortable (cognitive overload — only sort columns that answer meaningful questions).
```
