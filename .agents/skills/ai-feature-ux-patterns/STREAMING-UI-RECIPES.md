# 🤖 AI Streaming & Interaction UX Recipes

A blueprint for intuitive, resilient AI generation interfaces with autoscroll pause, thinking states, and non-destructive diffs.

---

## 📜 1. Autoscroll Lock & User Scroll Override

When streaming LLM tokens into a chat or code window:

```javascript
// Autoscroll logic with manual scroll detection
let isUserScrolledUp = false;

chatContainer.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = chatContainer;
  const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
  isUserScrolledUp = !isAtBottom;
  
  if (isUserScrolledUp) {
    showJumpToBottomButton();
  } else {
    hideJumpToBottomButton();
  }
});

function onNewTokenReceived() {
  renderToken();
  if (!isUserScrolledUp) {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
  }
}
```

---

## 💡 2. Non-Destructive Diff & Undo Control

AI modifications to existing user content must never overwrite destructively without preview:

1. **Side-by-Side or Inline Diff**: Show additions in green (`+`), deletions in red (`-`).
2. **Granular Acceptance**: Provide **"Accept All"**, **"Reject All"**, or line-by-line toggle.
3. **Undo Guarantee**: Keep previous snapshot in session memory for instant 1-click reversion.

---

## ⏳ 3. Thinking & Latency Animations

- Display an animated status badge (`"Analyzing architecture..."` $\rightarrow$ `"Generating component..."`).
- Never freeze the UI thread while waiting for the first token (TTFT).
- Provide a clear **"Stop Generating"** action button.
