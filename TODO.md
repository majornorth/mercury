# Mercury Risk Operations Platform — Todo List

Status key: `[x]` Done · `[ ]` Not started · `[-]` In progress / partial

Reference: [PRD](docs/PRD-Risk-Operations-Platform.md), [PRD v2 (Strategist Control Plane)](docs/PRD-Risk-Operations-Platform-v2.md), [PRD v3 (Signal Explainability, Case Patterns, Simulation)](docs/PRD-Risk-Operations-Platform-v3.md), [PRD v4 (Operational Scale & Exam Readiness)](docs/PRD-Risk-Operations-Platform-v4.md), [PRD v5 (Remaining UX & Workflow Closure)](docs/PRD-Risk-Operations-Platform-v5.md), [Technical Design](docs/Technical-Design-Risk-Operations-Platform.md).

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

## 11. v2 / Strategist-grade (PRD v2)

See [PRD v2](docs/PRD-Risk-Operations-Platform-v2.md) for the strategist control plane evolution. Work items below are derived from v2.

| Item | Status |
|------|--------|
| System Health default landing: alert volume vs baseline, false-positive proxy, override rates, top rule contributors (data + UI) | [x] |
| Decision lineage: rule/threshold/policy version and "who changed" on alerts, cases, recommendations; lineage in case view | [x] |
| Uncertainty and lineage in case view: e.g. "Signal confidence: low", "Data incomplete", decision history (e.g. rule disabled on date, override reason) | [x] |
| LLM counter-argument mode: prompts and UX for "strongest argument against", "where does this conflict with policy", "what would regulator challenge" | [x] |
| Self-serve: Sandbox vs Operational — Sandbox (private, time-boxed, labeled exploratory) vs Operational (justification, versioned, logged, shareable); blast-radius and PII labels | [x] |
| Explicit tradeoffs UI: when changing rules/thresholds, show estimated impact (e.g. false positive %, segment impact, affected customers) where feasible | [x] |

---

## 12. v3 (PRD v3)

See [PRD v3](docs/PRD-Risk-Operations-Platform-v3.md) for signal explainability, case pattern discovery, and scenario simulation.

| Item | Status |
|------|--------|
| Pillar 1: Signal explainability & root cause — drill-down from rule hit to feature drivers, behavioral pattern breakdown, traceability to evidence | [x] |
| Pillar 2: Case Patterns panel — group cases by behavior archetype, resolution prevalence per pattern, navigation pattern ↔ case list | [x] |
| Pillar 3: Decision impact forecasting — scenario simulation tied to rules (what-if threshold/param), impact metrics, simulation runs audited | [x] |

---

## 13. v4 (Operational Scale & Exam Readiness)

See [PRD v4](docs/PRD-Risk-Operations-Platform-v4.md) for governance, QC/BPO case management, queue/SLA, exports, audit depth, explainability contestability, and customer-impact workflows. Work items below are derived from v4 gaps.

| Item | Status |
|------|--------|
| **Gap 1 — Rule and model governance:** Policy lifecycle (draft → review → approval → staged deploy → rollout → rollback); immutable version artifacts; event-sourced decisioning for replay/lineage | [ ] |
| **Gap 2 — Case and QC:** Structured evidence checklist by alert type; QC module (scorecards, defect taxonomy, sampling, calibration); investigator/vendor performance views; multi-author workflows with locked sections | [ ] |
| **Gap 3 — Queue and SLA:** Multi-queue triage (rail, severity, segment, due date); SLA clocks (triage, first action, closure) and breach handling; explicit escalation paths with templated handoffs | [ ] |
| **Gap 4 — Evidence packages and exports:** Export bundles (redacted case packets); configurable redaction and field-level entitlements; export templating and audit (who, when, purpose) | [ ] |
| **Gap 5 — RBAC and audit depth:** Need-to-know RBAC; purpose-based access tagging; append-only audit store with search, retention rules, legal-hold controls; audit queries for exams and legal | [ ] |
| **Gap 6 — Explainability contestable:** Panels bound to raw evidence; confidence/uncertainty where available; counterfactual tooling with replayable data | [ ] |
| **Gap 7 — Customer-impact:** Customer-communication artifacts (templates, disclosures, response-by dates); appeals pipeline with separation of duties; remediation tracking and re-review triggers | [ ] |
| v4 UI placeholders: Queues page (mock queue/SLA and escalation paths), Exports page (mock recent exports), Export case packet CTA on Case detail | [x] |
| v4 Case detail: Evidence checklist (mock), QC stub, Customer communication & remediation stub (v4 Gaps 2, 7) | [x] |
| v4 Rules: Policy lifecycle stub (version, state, last rollout; v4 Gap 1) | [x] |
| v4 Audit: Purpose-based access and retention/legal-hold note (v4 Gap 5) | [x] |
| v4 Alert detail: Explainability contestable note + counterfactual CTA to Rules simulation (v4 Gap 6) | [x] |
| Exports page: handle caseId query param (generate-for-case CTA when arriving from case) | [x] |
| README: platform description, PRDs v1–v4, run instructions | [x] |
| v4 QC page: Cases → QC (mock scorecards, defect taxonomy, investigator/vendor performance) | [x] |
| v4 Appeals: Cases → Appeals list page + Appeals block on Case detail (intake vs adjudication) | [x] |
| v4 Rule history: /rules/history page with mock version table; Rules "View history" links to it | [x] |
| v4 Confidence on drivers: optional confidence (low/medium/high) in Root cause on Alert detail | [x] |
| v4 Queue/SLA: Queue and SLA columns on Alerts list; Queue and SLA in Alert detail header | [x] |
| v4 Audit Purpose: purpose field on audit entries; Purpose filter and Purpose column on Audit page | [x] |
| v4 Case detail: QC review block (score + defect + Submit); locked section (QC verdict); Generate case packet modal (purpose + policy); Log appeal modal; conditional Appeals block | [x] |

---

## 14. v5 (Remaining UX & Workflow Closure)

See [PRD v5](docs/PRD-Risk-Operations-Platform-v5.md) for remaining gaps from the deep-research report. Work items below are derived from v5.

| Item | Status |
|------|--------|
| **v5 Gap 1 — Case attachments:** Attachments list on case (name, type, date, uploader); Add attachment; include in export bundle when applicable; audit add/view | [x] |
| **v5 Gap 2 — Assign to queue:** Assign to queue / Route to queue from alert (queue selector); auditable; queue and SLA reflect in UI | [x] |
| **v5 Gap 3 — Escalation path and handoff:** Escalate-to selector (Partner bank, Compliance, Legal, Support); handoff checklist (configurable by path); path and checklist in audit | [x] |
| **v5 Gap 4 — Legal-hold in audit:** Legal-hold filter in audit view; Under-hold indicator on rows; no deletion of held data (v4 store) | [x] |
| **v5 Gap 5 — Rule lifecycle states:** Rule history and Rules page show staged, pending approval (and draft, approved, active, rolled_back, archived); transitions auditable | [x] |
| **v5 Gap 6 — Assistant citation-to-evidence:** Citations in assistant responses; Sources / Cited section in UI when citations exist | [x] |
| **v5 Gap 7 (optional) — Recall and fraud loss reports:** Recall (proxy) report stub; Fraud loss & chargebacks report stub | [x] |

---

*Last updated: 2025-02-12 — Feedback form uses Formspree (NEXT_PUBLIC_FORMSPREE_FORM_ID); submit sends to Formspree, which emails Jason McCoy.*
