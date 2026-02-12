# Mercury Risk Operations Platform — Todo List

Status key: `[x]` Done · `[ ]` Not started · `[-]` In progress / partial

Reference: [PRD](docs/PRD-Risk-Operations-Platform.md), [Technical Design](docs/Technical-Design-Risk-Operations-Platform.md).

---

## 1. Documentation

| Item | Status |
|------|--------|
| PRD (problem, users, use cases, functional/non-functional reqs, agentic, self-serve) | [x] |
| Technical Design (architecture, data flow, LLM, auth/audit, view engine) | [x] |
| Open questions / assumptions tables in PRD and tech spec | [x] |

---

## 2. Foundation & UX

| Item | Status |
|------|--------|
| Next.js app scaffold (App Router, TypeScript, Tailwind) | [x] |
| Layout with nav (Triage, Cases, Custom views; Assistant as side panel entry) | [x] |
| Assistant as side panel (open/close from nav button, flex sibling of main, below header) | [x] |
| Graceful degradation: core triage and views usable without Assistant | [x] |

---

## 3. Triage & Alert Experience

| Item | Status |
|------|--------|
| Alert list (risk tier, status, rules, account, created) with mock data | [x] |
| Alert detail page (rule hits, signal contributions, transaction summary) | [x] |
| Alert volume by rule (policy/tuning view) | [x] |
| Navigate alert → account → transactions → cases (unified view) | [-] (alert ↔ case links; real APIs TBD) |
| Replace mock data with Mercury internal APIs (alerts, accounts, transactions, rules) | [ ] |
| Explainability: “Why was this flagged?” with links to evidence | [-] (structured only; no LLM narrative yet) |

---

## 4. Assistant (LLM Experience)

| Item | Status |
|------|--------|
| Assistant UI (chat, input, send) with stub responses | [x] |
| Wire Assistant to real LLM (API route, provider) | [ ] |
| Prompt context: schemas, policies, risk signals, workflows | [ ] |
| Example flows: why flagged, top signals, similar cases, summarize for escalation | [-] (stub replies only) |
| No LLM-driven state changes; user confirms all workflow actions | [x] (design) |
| Output labeling (“AI-generated”) where used in case narrative | [x] (Assistant panel labels all assistant messages as AI-generated) |
| Audit logging: every prompt, response, user, entity ID, timestamp | [ ] |
| PII redaction/scoping in logs | [ ] |

---

## 5. Workflow Actions & Case Management

| Item | Status |
|------|--------|
| Workflow UI (assign, escalate, close, request info, disposition, rationale) | [x] (prototype; localStorage) |
| Activity / audit trail on alert detail (prototype; localStorage + mock) | [x] |
| Workflow API (persistent backend; assign, escalate, close, request info) | [ ] |
| Document decision with structured rationale + narrative | [x] (UI); backend persistence [ ] |
| Case list and case outcomes summary (incl. cases by outcome/segment) | [x] |
| Case detail page (outcome, rationale, link to alert, similar cases) | [x] |
| Partner bank escalation (handoff format, APIs TBD) | [ ] |
| All actions auditable and tied to case/alert/account | [ ] (backend audit store) |

---

## 6. Similar-Case Search

| Item | Status |
|------|--------|
| “What similar cases exist and how resolved?” (NL → filters; search with RBAC) | [-] (UI on alert and case detail by segment/rule; NL→filters TBD) |
| Similar-case results with role-appropriate detail (anonymized or full) | [-] (results shown; RBAC/anonymized TBD) |

---

## 7. Self-Serve Views & Dashboards

| Item | Status |
|------|--------|
| Custom view (tables + filters) with mock data; “Strategist-created” labeling | [x] |
| Create new view placeholder (NL input + message on Custom views page) | [x] |
| Natural language → view spec (LLM + allowlisted schema) | [ ] |
| View Engine: spec execution, allowlist, RBAC at execution time | [ ] |
| Save/view/template: versioning, diff, rollback | [ ] |
| Sharing (users/groups, revocable); audit creation/edits/shares/views | [ ] |
| Read-only generated views; no write actions from view | [x] (design) |

---

## 8. Auth, RBAC & Audit

| Item | Status |
|------|--------|
| Authentication (e.g. SSO/OIDC for internal users) | [ ] |
| RBAC (roles, permissions for alerts/cases/PII/workflow/views) | [ ] |
| Same RBAC for main app and generated views | [ ] |
| Audit log: data access, workflow actions, LLM usage, view events | [-] (Mock audit log UI on /audit; backend store TBD) |
| Dedicated audit store (append-only, retention, optional tamper evidence) | [ ] |

---

## 9. Non-Functional & Ops

| Item | Status |
|------|--------|
| Scale targets (alert/case volume, concurrent users) — TBD with ops | [ ] |
| Query latency targets for triage and deep dives | [ ] |
| Monitoring (latency, errors, audit write failures) | [ ] |
| Runbooks: LLM down, audit log failure | [ ] |
| Partner-bank-safe / sanitized views for handoffs and exams | [ ] |

---

## 10. Open / TBD (from PRD & Tech Spec)

| Item | Status |
|------|--------|
| Mercury internal API contracts and schemas | [ ] |
| Identity provider and role model | [ ] |
| LLM provider and model choice | [ ] |
| Audit log retention and WORM policy | [ ] |
| Promotion path for strategist-created views to “standard” | [ ] |

---

*Last updated: 2025-02-12 — Agent: added Audit page (mock log UI), updated section 8. See .cursor/rules/todo-status.mdc for update rules.*
