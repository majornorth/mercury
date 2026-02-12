# Non-Functional Targets (Placeholder)

To be confirmed with ops and compliance. See [PRD](PRD-Risk-Operations-Platform.md) §7.1 and [Technical Design](Technical-Design-Risk-Operations-Platform.md).

---

## Scale

| Target | Placeholder | Owner |
|--------|-------------|--------|
| Alert volume | TBD with ops | Ops / Engineering |
| Case volume | TBD with ops | Ops / Engineering |
| Concurrent strategists | TBD with ops | Ops / Engineering |

---

## Query latency

| Scenario | Target | Notes |
|----------|--------|------|
| Triage list (alerts) | Sub-second | e.g. &lt;1s p95 |
| Alert/case detail | Sub-second | Single-entity fetch |
| Similar-case / cohort queries | Few seconds | e.g. &lt;5s p95; complex filters |

---

## Reliability

| Target | Placeholder |
|--------|-------------|
| Uptime (business hours) | e.g. 99.5%+ (TBD) |
| Graceful degradation | Core triage, case view, workflow actions usable without Assistant (implemented). |

---

## Audit & retention

| Target | Placeholder | Owner |
|--------|-------------|--------|
| Audit log retention | e.g. 5+ years for AML (confirm with compliance) | Compliance |
| WORM / tamper evidence | TBD | Compliance / Security |

---

*Update this document when targets are set. Last updated: 2025-02-12.*
