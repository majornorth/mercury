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
| Layout with nav (Dashboard, Alerts, Cases, Rules, Audit; Assistant as side panel entry) | [x] |
| Assistant as side panel (open/close from nav button, flex sibling of main, below header) | [x] |
| Graceful degradation: core triage and views usable without Assistant | [x] |

---

## 3. Triage & Alert Experience

| Item | Status |
|------|--------|
| Alert list (risk tier, status, rules, account, created) with mock data; sortable column headers (hover + click, ASC/DESC, risk by tier) | [x] |
| Alert detail page (rule hits, signal contributions, transaction summary) | [x] |
| Alert volume by rule (policy/tuning view) | [x] |
| Navigate alert → account → transactions → cases (unified view) | [x] (alert ↔ case links, create case from alert; real APIs TBD) |
| Replace mock data with Mercury internal APIs (alerts, accounts, transactions, rules) | [ ] |
| Explainability: “Why was this flagged?” with links to evidence | [-] (structured + Rules reference page; rule names link to /rules; LLM narrative TBD) |

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
| Create case from alert (alert → case conversion; prototype: localStorage) | [x] |
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
| Custom reports: strategist-oriented analytical tables (outcomes by segment, rule performance by segment) | [x] |
| Dashboard: right sidebar report list with Create report and search | [x] |
| Add report button on Dashboard opens Assistant with add-report context (NL request for custom report) | [x] |
| Additional strategist reports (alert volume by rule, risk tier/status, case resolution, onboarding referrals, SLA, escalations, SAR summary) with mock data and views | [x] |
| “High-risk accounts last 30 days” report: mock data + UI; add via Assistant prompt (“create a new report for high-risk accounts last 30 days”) | [x] |
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
| RBAC (roles, permissions for alerts/cases/PII/workflow/views) | [-] (Stub: current role “Risk Strategist” in nav; real RBAC TBD) |
| Same RBAC for main app and generated views | [ ] |
| Audit log: data access, workflow actions, LLM usage, view events | [-] (Mock audit log UI on /audit; backend store TBD) |
| Dedicated audit store (append-only, retention, optional tamper evidence) | [ ] |

---

## 9. Non-Functional & Ops

| Item | Status |
|------|--------|
| Scale targets (alert/case volume, concurrent users) — TBD with ops | [-] (Placeholder: docs/NonFunctionalTargets.md) |
| Query latency targets for triage and deep dives | [-] (Placeholder: docs/NonFunctionalTargets.md) |
| Monitoring (latency, errors, audit write failures) | [ ] |
| Runbooks: LLM down, audit log failure | [x] (docs/Runbooks.md) |
| Partner-bank-safe / sanitized views for handoffs and exams | [-] (Note on Custom views; export/sanitization TBD) |

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

*Last updated: 2025-02-12 — High-risk accounts last 30 days: mock data, ReportHighRiskAccountsLast30Days UI, CustomReportView detection; Assistant “create report for …” adds report and shows table when prompt matches.*
