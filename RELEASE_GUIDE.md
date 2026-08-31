# 🚀 Agentway Release Playbook & Protocol

This document establishes the official corporate release engineering procedures for **Agentway** (`@uwayxt/agent-skills`).

---

## 📌 Semantic Versioning (SemVer 2.0.0)

Agentway strictly follows [SemVer 2.0.0](https://semver.org/):

$$\text{Version} = \text{MAJOR}.\text{MINOR}.\text{PATCH}$$

| Increment | Trigger Condition | Example |
| :--- | :--- | :--- |
| **MAJOR (v2.0.0)** | Breaking changes to skill contracts, CLI command deprecations, or complete registry architectural shifts. | `1.4.0` → `2.0.0` |
| **MINOR (v1.6.0)** | Adding new skills, new CLI generator subcommands, or major domain capabilities without breaking existing setups. | `1.4.0` → `1.6.0` |
| **PATCH (v1.4.1)** | Bug fixes, typo corrections, mathematical formula adjustments, documentation updates, or non-breaking CLI patches. | `1.4.0` → `1.4.1` |

---

## 📋 Pre-Release Quality Assurance Checklist

Before tagging any release or running `npm publish`:

1. **Lockfile Hash Verification:**
   Ensure all 45 skills have exact SHA-256 hashes in `skills-lock.json`:
   ```bash
   python3 -c "import json, subprocess, os; lock=json.load(open('skills-lock.json')); [meta.update({'computedHash': subprocess.run(['shasum', '-a', '256', f'.agents/skills/{k}/SKILL.md'], stdout=subprocess.PIPE, text=True).stdout.split()[0]}) for k, meta in lock['skills'].items() if os.path.exists(f'.agents/skills/{k}/SKILL.md')]; json.dump(lock, open('skills-lock.json', 'w'), indent=2); print('All hashes synced.')"
   ```

2. **CLI Test Suite Run:**
   ```bash
   node ./bin/cli.js help
   node ./bin/cli.js list
   node ./bin/cli.js tokens:build
   node ./bin/cli.js audit:cognitive .agents/skills
   ```

3. **Changelog & Documentation Consistency:**
   - Add new version section in `docs/CHANGELOG.md` following Keep-A-Changelog.
   - Update `package.json` version field.
   - Update `README.md` badge counts, telemetry table, and CLI reference.
   - Update `wiki/Home.md` and `wiki/Roadmap-and-Vision.md`.

---

## 🏷️ Tagging & Release Protocol

1. **Commit and Tag:**
   ```bash
   git add .
   git commit -m "chore(release): bump version to vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z — <Title>"
   ```

2. **Push to Remote (When explicitly instructed by maintainer):**
   ```bash
   git push origin main --tags
   ```

3. **Create GitHub Release via API / Web UI:**
   Ensure release notes contain:
   - Summary of changes (Added, Changed, Fixed)
   - CLI command reference
   - Sibling engineering contracts updated
   - Upgrade instructions

---

## 📦 NPM Publishing Procedure

1. **Verify `.npmignore` and Pack Contents:**
   ```bash
   npm pack --dry-run
   ```
   Ensure temporary files, `.wiki-git-sync/`, `.DS_Store`, and unnecessary test caches are excluded.

2. **Execute Publish (With 2FA / OTP):**
   ```bash
   npm publish --access public
   ```

3. **Verify Live Registry Deployment:**
   ```bash
   npm view @uwayxt/agent-skills version
   ```
