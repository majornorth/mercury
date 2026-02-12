# Risk Operations Platform — Runbooks

Operational procedures for incident response. See [Technical Design](Technical-Design-Risk-Operations-Platform.md) §8.

---

## 1. LLM / Assistant down

**Symptom:** Assistant panel errors, timeouts, or provider unavailable.

**Impact:** Strategists cannot get LLM-generated explanations, similar-case narrative, or escalation drafts. Core triage, alert detail (rule hits, signals, transaction summary), workflow actions, and custom views remain usable.

**Procedure:**

1. **Verify:** Confirm Assistant API or provider is failing (check status page, logs, or a test prompt).
2. **Communicate:** Notify ops/strategists that the Assistant is degraded. Core workflows (triage, case view, assign/escalate/close) are unchanged.
3. **Degrade gracefully:** The app is designed to work without the Assistant:
   - Alert detail shows structured explainability (rule hits, signal contributions) without narrative.
   - Workflow actions (assign, escalate, close, request info) are deterministic and do not depend on the LLM.
4. **Monitor:** Track provider/API recovery. Re-enable or fix Assistant when available.
5. **Post-incident:** Log incident; consider retry/backoff or fallback provider if recurring.

---

## 2. Audit log backlog or failure

**Symptom:** Audit log write failures, backlog, or store unavailable.

**Impact:** New events (data access, workflow actions, LLM usage, view events) may not be persisted. Compliance and exam readiness depend on a complete audit trail.

**Procedure:**

1. **Verify:** Confirm audit store or write path is failing (monitoring, error rate, disk/quotas).
2. **Prioritize log durability:** Per tech design, prioritize audit log write over non-critical features if resources are constrained.
3. **Avoid dropping writes:** Buffer or queue audit events if the store is temporarily unavailable; flush when the store is back. Do not silently drop.
4. **Communicate:** Notify compliance/security and ops. Document the gap (time range, event types) for potential remediation or disclosure.
5. **Restore store:** Fix storage, retention, or permissions. Backfill from buffers if applicable.
6. **Post-incident:** Review retention and WORM policy; confirm no silent drops; update monitoring/alerting.

---

## 3. Promotion path: strategist-created view → “standard”

**Context:** Per PRD §11.3, strategist-created views are by default personal or team-scoped. Promoting a view to “standard” (productized, supported) requires governance.

**Procedure (placeholder; define with compliance and product):**

1. **Request:** Strategist or team requests promotion (e.g. via ticket or workflow).
2. **Compliance + product review:** Review view definition, data scope, and use case for policy and supportability.
3. **Approve or decline:** Document decision; if approved, hand off to engineering for product release path.
4. **Document:** Record promotion in runbooks or governance doc; update view metadata to “standard” where applicable.

---

*Last updated: 2025-02-12. Expand with environment-specific contacts, links, and commands as the platform is deployed.*
