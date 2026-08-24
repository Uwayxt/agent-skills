---
name: user-flow-mapping
description: Map user decisions from entry to goal. Use when user flow, journey map, how does the user get from A to B, task flow, or map the steps.
---

# Map Decisions, Not Just Screens

A user flow is a map of decisions, not a list of screens. Every diamond (decision point) the user hits is a place the product can lose them or guide them. Map decisions first, screens second.

### 1. Identify the Goal
What is the user trying to accomplish? One flow = one goal. "Complete a purchase" is one flow. "Browse and maybe buy" is two flows crammed together — split them.

### 2. Name the Entry Points
Where does the user start? Direct link, dashboard shortcut, notification, search result. Multiple entry points = multiple paths to map.

### 3. Map the Happy Path
The straight line from entry to goal. Fewest steps, no errors, no edge cases. Use a decision-free sequence: Step → Step → Step → Done.

### 4. Map Decision Points
Where does the user choose? Each choice branches the flow. Use diamond notation in Mermaid or ASCII. Common decisions: "Has account?" / "Valid input?" / "Has permission?".

### 5. Map Error and Edge Paths
What happens when things go wrong? Form validation fails, payment declined, session expired, no results found. Each error path must either recover (back to happy path) or exit gracefully.

### 6. Annotate with Data Needs
At each step, what data does the screen need to display? Where does it come from? This bridges UX and engineering.

## Output Format
- Flow diagram (Mermaid `flowchart TD` or ASCII).
- Annotated step list (step → screen → data needed → decisions).

## Completion Criteria
Done when happy path, at least 2 error paths, and all decision points are mapped. Not done if the flow is a linear list without any decision diamonds.

## Anti-patterns
- Mapping screens instead of decisions.
- Flows that assume the happy path is the only path.
- Vague actions like "The user clicks the button" — which button? Where? What if it's disabled?
