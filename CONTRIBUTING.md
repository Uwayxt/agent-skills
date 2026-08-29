# 🤝 Contributing to Agentway

Thank you for your interest in contributing to **Agentway**! We are committed to building a world-class, model-agnostic operating system for autonomous product design, front-end architecture, and QA engineering.

This document outlines the corporate standards, engineering conventions, and workflows required for contributing to the Agentway repository and skills registry.

---

## 📜 Table of Contents
1. [Code of Conduct](#-code-of-conduct)
2. [How to Contribute](#-how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Features](#suggesting-features)
   - [Contributing a New Skill](#contributing-a-new-skill)
   - [Improving Existing Skills or Tooling](#improving-existing-skills-or-tooling)
3. [Development Environment Setup](#-development-environment-setup)
4. [Branching & Git Workflow](#-branching--git-workflow)
5. [Conventional Commits Specification](#-conventional-commits-specification)
6. [Skill Authoring Standards & Token Budget](#-skill-authoring-standards--token-budget)
7. [Pull Request & Review Lifecycle](#-pull-request--review-lifecycle)
8. [Release Protocol & SLA](#-release-protocol--sla)

---

## 🛡️ Code of Conduct

All contributors and maintainers are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please ensure respectful, inclusive, and professional collaboration across issues, discussions, and pull requests.

---

## 🚀 How to Contribute

### Reporting Bugs
If you identify unexpected behavior in the CLI, broken skill logic, or a11y violations:
1. Search existing [GitHub Issues](https://github.com/Uwayxt/agent-skills/issues) to verify it has not been reported.
2. Submit a new issue using our **Bug Report Template**.
3. Include your Node.js version, OS, IDE runtime (Claude Code, Antigravity, Cursor, etc.), and steps to reproduce.

### Suggesting Features
Have an idea for a new CLI generator tool or architectural enhancement?
1. Open a **Feature Request** issue describing the problem, proposed solution, and downstream value.
2. Allow maintainers to review before creating large PRs.

### Contributing a New Skill
Skills in Agentway represent deterministic engineering contracts. Before authoring a skill:
1. Review the [Skill Authoring Guide](./docs/SKILL-AUTHORING-GUIDE.md).
2. Check the [Skill Map](./docs/SKILL-MAP.md) to ensure the domain does not already have an equivalent skill.
3. Open a **Skill Proposal** issue for architectural alignment.

---

## 🛠️ Development Environment Setup

1. **Fork and Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/agent-skills.git
   cd agent-skills
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Verify Local CLI Execution:**
   ```bash
   node ./bin/cli.js list
   node ./bin/cli.js help
   ```

4. **Verify Skills Integrity:**
   ```bash
   node ./bin/generators/cognitive-evaluator.js
   ```

---

## 🌿 Branching & Git Workflow

We use a modified GitHub Flow. All development must occur on dedicated feature/bugfix branches:

| Branch Type | Naming Convention | Example |
| :--- | :--- | :--- |
| **New Skill** | `feat/skill-<name>` | `feat/skill-ethical-ux-guardian` |
| **CLI Feature** | `feat/cli-<feature>` | `feat/cli-tokens-export` |
| **Bug Fix** | `fix/<description>` | `fix/hicks-law-formula-offset` |
| **Documentation** | `docs/<description>` | `docs/update-recipes-saas` |
| **Refactor** | `refactor/<description>` | `refactor/tokens-builder-ast` |

---

## 📝 Conventional Commits Specification

Agentway strictly enforces [Conventional Commits v1.0.0](https://www.conventionalcommits.org/). Commit messages must follow this structure:

```
<type>(<scope>): <short imperative summary>

[optional multi-line body explaining context and rationale]

[optional footer(s), e.g., Closes #123]
```

### Allowed Types:
- `feat`: A new skill, CLI subcommand, or major capability.
- `fix`: A bug fix in CLI, skill logic, or markdown formula.
- `docs`: Documentation updates, changelogs, wiki syncing.
- `refactor`: Code or skill restructuring without functional changes.
- `perf`: Optimizations that reduce token weight or improve runtime speed.
- `test`: Adding or updating test suites (Playwright, AST tests).
- `chore`: Maintenance, dependencies, release bumps.

### Examples:
```bash
feat(domain-h): add cognitive-load-heatmap-prediction skill
fix(cli): resolve dead anchor regex false positive on valid hash routes
docs(recipes): add behavioral pricing and decoy effect workflow
```

---

## 📐 Skill Authoring Standards & Token Budget

Every skill must comply with our strict quality and token efficiency standards:

| Dimension | Specification | Hard Limit | Verification Rule |
| :--- | :--- | :--- | :--- |
| **Main File Length** | `80–180 lines` | `< 250 lines` | Move complex reference tables to sibling files |
| **Description Length** | `100–140 chars` | `< 160 chars` | Must follow: `"<Summary>. Use when <t1>, <t2>, or <t3>."` |
| **Voice & Tone** | `100% Imperative` | `0 passive voice` | Active instructions: *"Define..."*, *"Calculate..."* |
| **Checklist** | `5–10 items` | `≥ 4 items` | Every item must be verifiable with yes/no |
| **Anti-Patterns** | `3–6 patterns` | `≥ 2 patterns` | Concrete common mistakes with mandatory fixes |
| **Model Agnostic** | `100% Neutral` | `0 vendor names` | No hardcoded references to Claude, GPT, Gemini, etc. |

---

## 🔄 Pull Request & Review Lifecycle

1. **Pre-Submission Checklist:**
   - [ ] All `.agents/skills/<name>/SKILL.md` files comply with the token budget.
   - [ ] Symlink added in `.claude/skills/<name>`.
   - [ ] SHA-256 hash computed and recorded in `skills-lock.json`.
   - [ ] `README.md`, `docs/SKILL-MAP.md`, and `docs/CHANGELOG.md` updated.
   - [ ] `package.json` semver version incremented if applicable.

2. **Opening the Pull Request:**
   - Target the `main` branch.
   - Fill out the **Pull Request Template** completely.
   - Link any related issue (`Closes #XY`).

3. **Review SLA:**
   - The maintainer team reviews PRs within **48–72 hours**.
   - Constructive feedback will be provided via GitHub line comments.

---

## 💖 Sponsorship & Donations

If you'd like to support the ongoing development and open-source maintenance of Agentway:
- ☕ **Saweria:** [Support on Saweria](https://saweria.co/widgets/qr?streamKey=fec16e11208ec84149f95f4194556cfa)
- 🐙 **GitHub Sponsors:** [sponsor @uwayxt](https://github.com/sponsors/uwayxt)

---

## 📄 License

By contributing to Agentway, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE-PRODUCT-SKILLS.md).
