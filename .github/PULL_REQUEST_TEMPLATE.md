## 📌 Pull Request Summary
A clear and concise summary of the changes proposed in this PR.

## 🎯 Type of Change
- [ ] 🧠 New Skill addition (`.agents/skills/<name>`)
- [ ] ⚡ CLI tool / generator enhancement (`bin/generators/`)
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] 📖 Documentation / Wiki update (`README.md`, `docs/`, `wiki/`)
- [ ] 🧹 Refactor or maintenance chore

## 🧪 Quality & Standards Checklist
Please review all items below before requesting a review:

- [ ] **Token Budget:** Main `SKILL.md` is under 200 lines and `description` is under 160 chars.
- [ ] **Model Agnostic:** Zero vendor-specific model mentions (no Claude/GPT/Gemini in skill instructions).
- [ ] **Tone:** 100% active voice / imperative instructions.
- [ ] **Lockfile:** SHA-256 hash computed and updated in `skills-lock.json`.
- [ ] **Symlink:** Local Claude Code symlink added in `.claude/skills/<name>`.
- [ ] **Documentation:** `README.md`, `docs/SKILL-MAP.md`, and `docs/CHANGELOG.md` updated.
- [ ] **Local Verification:** Verified with `agentway list` and relevant generator tests.

## 🔗 Related Issues
Closes #[Issue Number]
