---
name: ai-feature-ux-patterns
description: Design intuitive UX patterns for AI interfaces including streaming, confidence, overrides, and prompts. Use when AI features, prompt UX, streaming UI, LLM interface, or AI assistant.
---

**AI features are non-deterministic by nature — exceptional AI design embraces uncertainty with progressive streaming, clear attribution, immediate human overrides, and predictable error states.**

### 1. Design progressive streaming & generation feedback
- **Streaming response**: Animate streaming tokens smoothly without jarring scroll jumps; provide an auto-scroll toggle that pauses when the user scrolls up.
- **Thinking / Processing state**: Differentiate between "Connecting/Thinking" (animated shimmering indicator or pulsing dot) vs "Rendering" (progressive text/card reveal).
- **Cancel affordance**: Always provide an immediate "Stop Generating" button (`motion-fast` reaction) during streaming.

### 2. Establish AI attribution and confidence indicators
- **Provenance & citation**: Highlight generated content clearly with distinct AI badging (e.g. subtle badge or sparkle icon) and clickable source links/tool citations.
- **Confidence levels**: When an AI output is probabilistic, display confidence badges or alternate suggestions instead of pretending certainty.
- **Non-destructive suggestions**: AI-generated code, text, or data edits should appear in a diff/staging preview (accept/reject controls) rather than overwriting user work directly.

### 3. Provide immediate human override & correction mechanisms
- Every AI output card must provide simple feedback buttons (👍 / 👎, "Copy", "Regenerate", "Edit").
- Allow users to edit generated text inline without re-prompting from scratch.
- If an agent task fails or hallucinates, provide a direct "Undo" or "Revert to Previous Version" action.

### 4. Optimize prompt input and conversational ergonomics
- **Expanding textarea**: Auto-grow prompt inputs up to a maximum height (e.g. 200px) before enabling internal scrolling.
- **Context attachments**: Visual chips indicating attached files, screenshots, or referenced documents with clear remove buttons.
- **Quick suggestions & shortcuts**: Provide one-tap starter prompt pills to reduce blank-slate anxiety.

### 5. Handle AI-specific failure modes
- **Rate limiting / Quota**: Clear message indicating when quota resets with an option to upgrade or switch models.
- **Safety / Policy refusal**: Transparent, non-accusatory explanation of why a request was filtered, with suggestions to rephrase.
- **Model degradation / Timeout**: Graceful fallback with cached responses or manual fallback options.

## Completion Criteria
- [ ] Streaming animation, autoscroll pause, and "Stop Generating" controls defined
- [ ] Generated content clearly marked with AI badges, citations, and confidence cues
- [ ] Inline editing, accept/reject diffs, and regeneration affordances designed
- [ ] Prompt input ergonomically designed with attachment chips and starter pills
- [ ] Error states defined for rate limits, safety refusals, and service timeouts

## Output
An `ai-interaction-spec.md` detailing the component states, streaming protocols, feedback loops, and human-in-the-loop override controls for all AI-enabled features.

## Anti-patterns
- Silently overwriting user documents with AI output without preview or undo.
- Infinite un-cancellable streaming that traps user interaction.
- Blaming the user when model safety blocks occur with accusatory error copy.
- Hiding the fact that content was machine-generated.
