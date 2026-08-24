# PRD Traceability Matrix

**Project Name:** [Project Name]
**Version:** [Version]
**Last Updated:** [YYYY-MM-DD]

## Instructions for Updates
Update this matrix continuously as development progresses. When a component is merged or a feature completed, locate its corresponding ID and update the `Status`. Add new requirements to the bottom. Never delete a requirement; mark it as `DEFERRED` or `BLOCKED` if it is dropped. 

## Matrix

| ID | Requirement | Category | Priority | Screen/Page | Component | Route | Status | Notes | QA Test Reference |
|---|---|---|---|---|---|---|---|---|---|
| US-001 | User can log in with email and password | functional | must-have | Login Screen | LoginForm | `/login` | DONE | Validated on staging | TEST-001 |
| AC-001.1 | Password input masks characters | UX | must-have | Login Screen | PasswordInput | `/login` | NOT_STARTED | Pending design specs | |
| US-002 | Export data to CSV | functional | should-have | Dashboard | ExportButton | `/dashboard` | IN_PROGRESS | Backend API ready, UI missing | |

## Summary

- **Total Requirements:** 0
- **Total By Status:**
  - DONE: 0
  - IN_PROGRESS: 0
  - NOT_STARTED: 0
  - DEFERRED: 0
  - BLOCKED: 0
- **Total By Priority:**
  - must-have: 0
  - should-have: 0
  - nice-to-have: 0
- **Coverage Percentage (DONE / Total Must-Have):** 0%
