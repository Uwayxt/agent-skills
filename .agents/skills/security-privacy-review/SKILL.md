---
name: security-privacy-review
description: Audit interface for auth boundaries, sensitive data exposure, and privacy compliance. Use when security review, privacy audit, data exposure, GDPR, or auth UX.
---

**Security and privacy in product design are not back-end checkboxes — they are visual boundaries that prevent accidental data leaks, clarify consent, and protect user trust.**

### 1. Audit authentication and session lifecycle UX
Verify that sensitive areas have clear session handling:
- **Session expiration**: Modal warning prior to logout ("Your session expires in 2 minutes") with seamless renew action.
- **Sensitive actions re-authentication**: High-risk actions (changing password, deleting account, exporting customer data) require password or 2FA confirmation modal.
- **Remember-me clarity**: Clearly communicate session duration implications on shared devices.

### 2. Prevent UI data exposure & PII leakage
Audit screens for accidental exposure of Personally Identifiable Information (PII) and credentials:
- **Masking**: Passwords, API keys, credit card numbers, and secret tokens must be masked by default with explicit "Reveal" eye-icon toggles.
- **Copy-to-clipboard feedback**: Confirm copied items without echoing unmasked secrets in toast notifications.
- **Print / Screenshot safety**: Ensure sensitive account identifiers are truncated (`•••• 4242`) in exportable views and receipts.
- **URL parameters**: Verify no authentication tokens, emails, or sensitive IDs are exposed in query strings (`?token=...`).

### 3. Review role-based permission boundaries (RBAC)
- Ensure unauthorized actions are either gracefully disabled with an explanatory tooltip or hidden entirely.
- Never display a generic "403 Forbidden" page after a user clicks a visible button; prevent dead ends by reflecting permission limits in navigation and button states.

### 4. Verify privacy, consent, and GDPR compliance flows
- **Consent checkboxes**: Explicit opt-in (never pre-checked) for marketing communications and analytics cookies.
- **Data deletion & export**: Clear, accessible user paths to export personal data (JSON/CSV) and request account deletion with transparent confirmation warnings.
- **Destructive action safeguards**: Red destructive buttons with explicit confirmation inputs (e.g. typing workspace name "my-workspace" to delete).

## Completion Criteria
- [ ] Session expiry and re-authentication touchpoints designed
- [ ] PII, credentials, and API keys masked by default with safe reveal mechanisms
- [ ] No sensitive credentials exposed in URL query parameters
- [ ] Role-based action boundaries reflected gracefully in UI states
- [ ] Consent opt-in, data export, and destructive deletion flows verified

## Output
A `security-privacy-audit.md` listing potential data exposure risks, permission boundary violations, and actionable design remediation tasks.

## Anti-patterns
- Pre-checked consent boxes for terms or data sharing.
- Unmasked API keys or secrets displayed in plain text by default.
- Generic 403 / 401 error screens on primary navigation paths.
- Permanent data deletion executed with a single unverified click.
