# 🚀 Getting Started with Agentway

This guide walks you through setting up Agentway across your IDEs and running your first autonomous workflow.

---

## 📦 Installation Options

### Method A: Local Project Installation (Recommended for Team Repos)
Installs skills inside `.agents/` and creates symlinks in `.claude/skills/` within your current repository.

```bash
cd /path/to/your-project
npx @uwayxt/agent-skills@latest init
```
When prompted, select **Local Project**.

### Method B: Global Installation (Recommended for Solo Developers)
Installs skills in `~/.uwayxt-agents` and links them globally to `~/.claude/skills/` so all current and future workspaces instantly have access.

```bash
npm install -g @uwayxt/agent-skills@latest
agentway init
```
When prompted, select **Global Setup**.

---

## 💻 IDE Integration Guide

| IDE / Agent Runtime | Discovery Mechanism | Setup Instruction |
| :--- | :--- | :--- |
| **Claude Code** | Reads `.claude/skills/` symlinks | Auto-discovered immediately after running `agentway init`. |
| **Google Antigravity IDE** | Reads `.agents/skills/` in workspace | Automatically indexed upon opening the repository workspace. |
| **Cursor IDE** | Custom Instructions / Rules | Point Cursor system instructions to `.agents/skills/` triggers. |
| **Windsurf / Cascade** | Cascade Memories & Rules | Add `@.agents/skills` reference in Cascade configuration. |

---

## ⚡ First Execution Example

Once initialized, you do not need special CLI commands to invoke skills. Simply prompt your AI agent using natural language:

```
"Here is a screenshot of our reference app: [upload image].
Extract the full visual design tokens, typography, and component styling."
```

Your agent will automatically detect and load `visual-style-extractor`, execute the 8-stage protocol, and produce `style-extraction.json` with zero manual prompt gymnastics.

---

## 🔍 CLI Utility Reference

```bash
# Core Commands
agentway list                  # View active skill count and categories
agentway update                # Check for updates and sync skills-lock
agentway init                  # Provision skills locally or globally

# ⚡ Expert Automation Tools
agentway tokens:build          # Compile design tokens to CSS Vars, Tailwind & TS
agentway scaffold:module <name> # Scaffold modular slice with 5-state resilience
agentway audit:routes          # Audit codebase for dead links & orphaned buttons
agentway gen:playwright        # Generate Playwright WCAG 2.2 multi-viewport tests
```

