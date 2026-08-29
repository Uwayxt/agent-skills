# 🛡️ Security Policy

Agentway takes the security and integrity of our skills registry, CLI tooling, and developer workflows seriously. We appreciate your efforts to responsibly disclose vulnerabilities.

---

## 📦 Supported Versions

Security updates and patches are actively maintained for the following versions:

| Version | Supported | Notes |
| :--- | :---: | :--- |
| `1.4.x` | ✅ Yes | Current stable release line. |
| `1.3.x` | ⚠️ Critical Only | Critical security fixes only. |
| `< 1.3.0` | ❌ No | Please upgrade to the latest version immediately. |

---

## 🚨 Reporting a Vulnerability

**Please DO NOT report security vulnerabilities via public GitHub issues, discussions, or social media.**

To report a vulnerability responsibly:

1. **Email the Maintainer directly:**
   - **Contact:** Wahyudi (`idwahyudi523@gmail.com`)
   - **Subject Line:** `[SECURITY VULNERABILITY] Agentway - <Brief Description>`
   - **PGP/GPG:** If sending encrypted data, request public key via email first.

2. **Include in your report:**
   - Description of the vulnerability and its potential impact.
   - Affected CLI subcommand, generator script, or skill file.
   - Step-by-step reproduction instructions or a minimal Proof of Concept (PoC).
   - Any suggested mitigations or patches.

---

## ⏱️ Response Timelines & SLAs

Our maintainer team adheres to the following response timeline:

| Milestone | Target Timeframe |
| :--- | :--- |
| **Initial Acknowledgment** | Within **24–48 hours** |
| **Triage & Severity Assessment** | Within **72 hours** |
| **Patch Development & Testing** | Within **7–14 business days** |
| **Public Release & Security Advisory** | Coordinated disclosure upon patch deployment |

---

## 🔒 Security Best Practices for Users & Contributors

- **Token Safety:** Agentway skills operate model-agnostically and do not store or transmit API keys or personal access tokens.
- **Dependency Hygiene:** We routinely audit dependencies using `npm audit`.
- **Integrity Verification:** Always verify that `.agents/skills-lock.json` matches published SHA-256 hashes when updating skill packages locally.
