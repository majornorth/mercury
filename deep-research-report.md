# Risk Decision Systems and Operations at Mercury

## Executive summary

Public Mercury materials (legal terms, privacy/security disclosures, support articles, and role descriptions in job postings) reveal a risk organization that operates as a **banking-partnered fintech** with **in-house fraud + compliance teams**, a **transaction-monitoring / sanctions detection stack**, and **operational programs for ongoing due diligence and fraud investigation quality control**. citeturn25view0turn24view0turn29view1turn26view0turn15view0

The same sources strongly imply (but do not fully document) that “Risk Strategists” at Mercury sit at the intersection of **decision-engine logic (rules + thresholds + model outputs)** and **operational outcomes** (pausing onboarding, restricting accounts/transactions, escalating to partner banks, and creating regulator-ready documentation). This inference is supported by Mercury’s repeated emphasis on (a) monitoring and alerting systems, (b) “risk data + decisioning infrastructure,” (c) detailed model configuration documentation (thresholds/segments/tuning/versioning), and (d) QA/QC and calibration across internal investigators and BPO partners. citeturn28search3turn29view1turn27search0turn26view0turn25view0

Key workflow facts that are explicitly documented:

- Mercury describes onboarding risk as a multi-signal evaluation (identity + business verification, ownership/control checks, sanctions/adverse media screening, fraud signals). citeturn29view0  
- Mercury’s financial-crimes compliance function explicitly references **transaction monitoring rules/models**, **sanctions models**, **customer risk scoring**, and the need to maintain documentation of **scenarios / thresholds / segments / tuning** “and any changes … over time.” citeturn29view1  
- Mercury’s fraud operations explicitly cover account-fraud alert investigations across ACH, wires, checks, debit cards, and account-level activity, and it is building formal QC programs and calibration with BPO partners. citeturn27search0turn26view0  
- Customer-facing policy confirms account **closures** and **temporary locks** can occur for compliance and legal reasons, including missing info requests, required reviews, sanctions concerns, and legal process. citeturn15view0turn19view0  

Prototype review (https://mercury-rho.vercel.app/) shows a coherent “risk strategist” cockpit centered on **alerts → cases → rules → audit log** plus lightweight performance analytics (alert volume, a false-positive proxy, and investigator override rate). However, compared to documented realities (bank-partner oversight, BPO quality programs, model governance, regulatory exam readiness, and legal-order handling), the prototype lacks critical capabilities: **queue/SLAs, role-based access, evidence + comms capture, robust rule lifecycle (testing/versioning/rollback/approvals), model governance hooks, partner-bank export/reporting, and end-to-end audit-grade lineage** beyond a mock audit feed. citeturn1view0turn2view0turn2view3turn29view1turn25view0


## Publicly observable operating model and constraints

Mercury operates using a partner-bank model, with banking services provided through partner banks, and it explicitly states that those partners are subject to audits and regulatory examinations where Mercury provides “policies, procedures, and reports” for review. citeturn25view0 This matters operationally because many risk workflows are “triangular”: Mercury internal teams act quickly to protect the platform, while partner banks (and their regulators) require evidence, controls, and demonstrable governance over decisions. citeturn25view0turn30search7

Partner ecosystem and governance touchpoints appear in multiple Mercury disclosures:

- Mercury describes working with multiple FDIC-insured banks (and notes a transition away from a historical partner, while some customers may still be migrating). citeturn25view0turn24view0  
- Mercury highlights that it builds “tools and alerts that flag suspicious activity” with “best-in-class compliance and risk teams,” working hand-in-hand with engineers and partners. citeturn25view0turn24view0  
- Mercury’s Terms of Use allow suspension/termination at Mercury’s discretion (and require that customer information remain accurate; incomplete or outdated information can drive denial/suspension/closure). citeturn19view0turn20view0  

Data and automation constraints are also explicit:

- Mercury’s privacy policy states it collects identity information (including, with consent, biometric verification artifacts), receives third-party credit-report information “to make a credit decision, determine risk and fraud profiles,” and uses AI/ML for fraud detection, document verification, and other functions—but says decisions that materially affect access or rights involve “appropriate human oversight” rather than AI alone. citeturn23view0  
- Mercury’s security posture includes strong access controls (MFA), device verification, leaked-credential checks (“HIBP”), dark-web monitoring, and ACH debit authorization controls—signals that feed both *account takeover* defense and payment-fraud governance. citeturn24view0  

For account restrictions and closure/lock edge cases, Mercury explicitly names classes of triggers (e.g., restricted geography/industry, failure to respond to information requests, suspected sanctions exposure, illicit activity, and legal process). This indicates that “pause onboarding / freeze account” decisions are not purely “fraud” actions; they interleave **compliance, platform policy, customer success constraints, and legal obligations**. citeturn15view0turn19view0  

Primary external stakeholders that impose requirements on internal risk tooling:

- **Partner banks and their regulators** (regular exams; third-party risk management expectations). citeturn25view0turn30search3  
- **Law enforcement / government entities** (must submit specific legal process; Mercury reviews requests and may challenge/refuse requests that don’t meet standards). citeturn21search0turn19view0  


## Stakeholders, decision rights, and handoffs

Mercury does not publish an internal org chart for risk, but job postings and policy documents provide strong evidence for the following “operating roles” and handoffs:

**Risk strategy / decisioning owners (inferred)**  
Multiple roles describe a platform where “risk strategy” partners with engineering, compliance, and operations to translate regulatory and operational needs into decisioning systems. citeturn29view0turn29view1turn28search3 While the term “Risk Strategist” appears explicitly in the prototype UI, the public job corpus more consistently uses “risk strategy” as a collaborating function rather than a published role title; nonetheless, the operating responsibilities implied are: define decision logic, evaluate tradeoffs, monitor outcomes, and coordinate changes through engineering. citeturn1view0turn29view1turn28search3

**Fraud investigators / fraud operations analysts (observed via QC role)**  
The “Senior Account Fraud QC Investigator” role states that Mercury is building QC coverage over “account fraud alert investigations” across products and rails (ACH, wires, checks, debit cards, and account-level activity), evaluating decisioning quality, investigative depth, documentation, and SOP/policy adherence, and running calibration with internal teams and BPO partners. citeturn27search0  
This implies an upstream workflow where investigators (internal and BPO) handle alerts/cases and produce dispositions that QC audits, escalates, and feeds back into policy/training/tooling. citeturn27search0

**KYC / ongoing due diligence investigators and QC**  
Mercury’s “Ongoing Due Diligence QC Specialist” role is “laser-focused” on accuracy and quality of ODD work, including QC reviews for ICs/contractors/BPO agents, monthly QC reporting, and identifying trends/anomalies/process gaps. citeturn26view0  
This indicates that KYB/KYC is not “one-and-done onboarding” but an ongoing control environment that must sustain quality at scale, including outsourced capacity. citeturn26view0turn29view0

**Financial crimes compliance oversight and modeling/analytics**  
The “Financial Crimes Compliance Modeling & Analytics Manager” role states the BSA/AML & sanctions compliance team acts as an “oversight function” and owns transaction monitoring and sanctions models, risk scoring, alert models, and configuration documentation (thresholds/segments/tuning). citeturn29view1  
This implies governance handoffs: risk strategy/engineering can build decision systems, but compliance oversight (and model risk management) must validate, document, and demonstrate regulatory rigor. citeturn29view1turn30search1

**Risk engineering and automation**  
The “Senior Software Engineer – Risk (AI & Automation)” role describes decision systems spanning application approvals, KYC refresh, EDD, ODD, and compliance workflows, and explicitly describes “agentic AI systems” that can “investigate, decide, escalate, and learn.” citeturn29view0 This suggests that escalation paths (to humans, to compliance, to partner banks) are a first-class product requirement—not an afterthought. citeturn29view0turn25view0

**Partner-bank liaison / partnerships management**  
The “Staff Product Partnerships Manager – Mercury Bank” role describes managing “core banking, card, and regulatory partnerships,” supporting “regulatory readiness,” and communicating compliance posture and architecture to external partners. citeturn28search6 This provides a direct bridge role for escalations that are not purely “investigation” but require partner actions, contractual alignment, or exam responses. citeturn28search6turn25view0

**Legal, auditors, regulators, and customer support (touchpoints)**  
Mercury Terms and its subpoena/law enforcement policy establish that legal orders can require Mercury to hold funds/provide information, and that Mercury reviews legal requests for sufficiency and may push back. citeturn19view0turn21search0  
Customer support-facing guidance indicates Mercury may be unable to share specific closure reasons due to legal/compliance constraints—an operational reality that forces internal tooling to maintain regulator-ready rationale even when customer-facing messaging is intentionally limited. citeturn15view0

A plausible decision-authority model for “pause onboarding / restrict activity,” consistent with these sources, is:

- **Automated** actions (deny/hold/route-to-review) triggered by decision engine outputs. citeturn29view1turn29view0turn24view0  
- **Investigator** disposition authority for many alerts/cases, with QC oversight and calibration; escalations exist for partner-bank review. citeturn27search0turn26view0turn25view0  
- **Compliance** oversight and model governance for AML/sanctions detection; collaboration with model risk management. citeturn29view1turn30search1  
- **Partner banks** retain regulatory accountability as banks and subject Mercury’s program outputs to exam scrutiny. citeturn25view0turn30search3  


## Detection, decisioning, and escalation pipeline

Public descriptions point to a layered detection stack: account-security signals, onboarding identity/KYB screening, transaction monitoring / sanctions screening, and operational review queues.

A Mercury-authored description of onboarding risk explicitly lists the major signal classes: “identity and business verification,” “ownership and control checks,” “sanctions and adverse media screening,” and “fraud signals.” citeturn29view0 In parallel, Mercury’s security materials describe device verification, leaked-credential checks, dark-web monitoring, and robust ACH authorization. citeturn24view0

Mercury’s financial-crimes modeling role provides the clearest “risk decision system” semantics: transaction monitoring rules and sanctions models produce alerts; analysts tune scenarios/thresholds/segments; and documentation over time is required. citeturn29view1 This aligns with regulator expectations that monitoring-system effectiveness should reflect risk profile, transaction volume, and staffing, and that suspicious-activity monitoring must be integrated into SAR reporting workflows. citeturn30search1turn30search5

A “best-fit” conceptual pipeline combining Mercury’s public signals looks like this (diagram is analytical synthesis; names are generic):

```mermaid
flowchart LR
  A[Event streams\n(onboarding, login, payments, profile changes)] --> B[Signal enrichment\n(KYB/KYC, device, network,\nthird-party data, internal history)]
  B --> C[Decision engine\nrules + thresholds + model scores]
  C -->|low risk| D[Auto-approve / allow]
  C -->|medium risk| E[Pause + request info\n(nudge to manual review queue)]
  C -->|high risk| F[Restrict action\n(lock / hold / freeze\nper policy and legal constraints)]
  E --> G[Human review\n(ODD / fraud / fincrime ops)]
  F --> G
  G --> H[Disposition\napprove / close no action /\nescalate / deny / SAR referral]
  H --> I[Feedback loops\n(rule tuning, model monitoring,\nQC calibration, SOP updates)]
```

Concrete “pause / restrict” actions that are explicitly documented include:

- **Temporary lock** while waiting for requested information or review of activity/business details; during lock, initiation of new activity may be blocked. citeturn15view0  
- **Suspension/termination** at Mercury’s discretion, and suspension if Mercury believes an account is compromised. citeturn19view0turn20view0  
- **Holds / actions under legal orders**, including holding funds or providing information as required. citeturn19view0  

Operationally, that implies at least three escalation “lanes”:

1) **Ops escalation**: Investigator ↔ QC ↔ team lead (quality defects, training gaps, repeated false positives). citeturn27search0turn26view0  
2) **Compliance escalation**: Potential SAR / AML typology / sanctions questions / model governance issues. citeturn29view1turn30search0turn30search2  
3) **Partner-bank escalation**: Items needing bank review, bank action, or exam-ready evidence packages. citeturn25view0turn28search6  

Mercury’s own automation roadmap language (“AI systems that can investigate, decide, escalate, and learn” for KYC refresh, EDD, ODD, and compliance) suggests the company is explicitly productizing these escalation mechanics rather than leaving them to ad-hoc human coordination. citeturn29view0turn23view0  


## External interfaces: partner banks, auditors, regulators, law enforcement

Mercury is explicit that its bank partners are regulated and examined, and that Mercury provides “policies, procedures, and reports” to partners and regulators for review; examinations test AML and third-party risk management among other areas. citeturn25view0 This maps directly onto the broader banking regulator consensus that banking organizations must manage third-party relationship risks through lifecycle practices (planning, due diligence, contract structuring, ongoing monitoring, termination). citeturn30search3turn30search7

From an operational-workflow standpoint, “partner-bank-safe” information sharing typically requires:

- **Sanitized exports** (only the minimum necessary PII; clear purpose limitation)  
- **Reproducible decision lineage** (why did the system flag? which rule/model? which version?)  
- **Case packets** (evidence, timeline, rationale, attachments, communications)  
- **Demonstrable controls** (RBAC, audit logs, change control, QA, calibration)  

Mercury’s own content gestures toward these needs: it describes sharing compliance/risk materials in audits/exams and emphasizes product-led security controls and SOC 2 / PCI compliance. citeturn25view0turn24view0

Law-enforcement interaction requirements are unusually explicit in Mercury’s subpoena policy. Mercury states it only shares customer Personal Data with law enforcement “as required by law or subpoena” unless the customer authorizes; each request is reviewed for legal sufficiency and Mercury may “challenge or refuse” requests that do not meet standards; and requests must be specific (identify accounts/transactions/data). citeturn21search0

These external obligations should shape internal risk tooling in three ways:

- **Evidence and retrieval**: the system must retrieve account, transaction, and decision history quickly, scoped to an exact request. citeturn21search0turn30search1  
- **Audit-grade provenance**: for any restriction/closure, there must be a defensible internal record even if customer comms are limited. citeturn15view0turn19view0  
- **Time-bounded workflows**: AML programs must meet SAR timing constraints; FinCEN guidance describes a 30-day SAR filing expectation from initial detection, with limited extension to identify a suspect (not exceeding 60 days). citeturn30search0turn30search4  


## Metrics, KPIs, and the risk-ops control surface

Mercury’s role descriptions emphasize both **effectiveness** (catch bad actors, prevent abuse) and **operational quality** (documentation, calibration, regulatory expectations), implying that Risk Strategists are optimizing multi-objective tradeoffs rather than a single metric. citeturn29view1turn27search0turn25view0

A practical KPI schema consistent with Mercury’s public signals and banking supervision expectations includes:

| Metric family | What it measures | Why it matters operationally |
|---|---|---|
| Alert volume & mix | Total alerts by rule/model, segment, rail | Queue staffing, drift detection, and capacity planning; also a proxy for “threshold too tight.” citeturn30search1turn29view1 |
| Precision / false positives | % alerts that close “no action” or are overturned by investigators | Investigator time cost + customer friction; signals tuning opportunities. citeturn27search0turn29view1 |
| Recall / false negatives (proxy) | Post-loss events (confirmed fraud), retro SARs, partner-bank findings | Undetected risk translates to losses, enforcement risk, and partner-bank tension. citeturn25view0turn30search5 |
| Time-to-triage / SLA | Mean/median and tail latency from alert creation to first action | SAR deadlines and customer-impact containment; also partner-bank SLA readiness. citeturn30search0turn25view0 |
| Disposition consistency | Outcome variance across investigators/BPO/segments | QC and calibration priority; essential for defensible governance. citeturn27search0turn26view0 |
| SAR metrics | SAR volume, cycle time, continuation cadence | Regulators expect disciplined SAR workflows and documentation. citeturn30search0turn30search5 |
| Fraud loss & chargeback/returns | Loss rate by rail, ACH returns, card disputes, wire fraud incidents | Financial and reputational cost; also informs rule priorities by rail. citeturn27search0turn24view0 |
| Onboarding funnel impact | Approval rate, referral rate, time-to-decision, drop-off after pause | Growth vs. risk tradeoff in “minutes not days” onboarding promise. citeturn29view0 |

Operational constraints to bake into workflows (supported by Mercury’s published policies/disclosures and common banking expectations):

- **Privacy & access controls**: Mercury collects sensitive identity data and states it limits access and applies safeguards; internal tools must implement least-privilege RBAC and strong auditing. citeturn23view0turn24view0  
- **Retention & legal holds**: Mercury states retention is driven by legal/accounting/reporting needs; legal orders can require holds and disclosures. citeturn23view0turn19view0turn21search0  
- **Third-party/BPO scale**: QC roles explicitly cover contractors and BPO agents, implying distributed operations that require calibration, sampling plans, defect taxonomies, and vendor performance management. citeturn27search0turn26view0  
- **Regulatory rigor on monitoring systems**: banking exam expectations emphasize monitoring systems’ fit to risk profile and adequacy of staffing and procedures. citeturn30search1turn30search5  

The prototype itself already encodes a “Risk Strategist” KPI worldview: it shows alert volume vs baseline, a false-positive proxy (share of resolved alerts closed with no action), and an investigator override rate. citeturn1view0turn3view0 This is directionally aligned with Mercury’s public focus on tuning rules/models and QC oversight. citeturn29view1turn27search0


## Prototype gaps versus real workflows and required capabilities

The prototype (Risk Ops → System Health / Reports / Alerts / Cases / Rules / Audit) is a strong skeletal concept for a strategist-oriented surface: it combines monitoring (rule volumes), workflow artifacts (alerts/cases), and governance cues (decision lineage; an audit log; and a “final decisions are yours” assistant disclaimer). citeturn1view0turn2view0turn4view0turn2view3

However, Mercury’s public signals imply real-world requirements that go beyond the prototype’s current depth—especially around **bank-partner exam readiness, BPO-scale operations, model governance, and legally constrained customer communications**. citeturn25view0turn27search0turn15view0turn29view1

### Prototype feature coverage table

(“Required” is inferred from Mercury’s published job descriptions and policies plus regulator guidance; “Prototype” is read directly from the demo pages.)

| Capability area | Prototype evidence | What real workflows require (public-signal grounded) | Gap |
|---|---|---|---|
| Alert triage list & rule breakdown | Alert table with rule hits, risk, status; “Alert volume by rule.” citeturn2view0 | Multi-queue routing (by product/rail, severity, SLA), investigator assignment logic, escalation routing to compliance/partner bank. citeturn27search0turn29view1turn25view0 | High |
| Case management & dispositions | Cases list with outcomes incl. “sar,” “escalated,” “denied,” “closed no action.” citeturn2view1turn5view2 | Evidence collection, attachments, structured narratives, standardized decision codes, and QC scoring/defect logging for each case. citeturn27search0turn26view0 | Very high |
| Decision lineage | Per-alert “policy version,” “rule versions,” last logic change. citeturn4view0turn4view1 | Tamper-resistant lineage: exact feature values/signals used, model version + calibration, rule execution traces, and reproducible replays. citeturn29view1turn30search1 | High |
| Rules reference | Human-readable rule definitions and “tradeoff impact” mock. citeturn2view2 | Full rule lifecycle: approvals, staged rollouts, A/B or shadow, backtesting/simulation, rollback, audit-grade change management, and documentation over time. citeturn29view1turn23view0 | Very high |
| Reporting views | “Outcomes by segment,” “Rule performance by segment,” export notion. citeturn3view0 | Executive/regulatory reporting, partner-bank-safe exports, SAR metrics, QA/QC metrics, vendor/BPO performance, and audit/exam packages. citeturn25view0turn27search0turn30search0 | High |
| Audit log | Shows data access, workflow actions, LLM usage, view events (mock). citeturn2view3 | Immutable audit store; RBAC; purpose-based access; retention rules; legal-hold controls; audit queries for exams and legal requests. citeturn23view0turn21search0turn19view0 | High |
| AI assistant | Embedded assistant with “counter-argument prompts” and a disclaimer. citeturn1view0turn2view0 | Guardrailed AI: citation-to-evidence, restricted data scopes, redaction, reproducibility, and policy-consistent rationale; human oversight where decisions affect access/rights. citeturn23view0turn29view0turn27search0 | Medium–high |

### Prioritized product gaps and recommended fixes

**Gap one: Production-grade rule and model governance (versioning, testing, rollout, rollback)**  
Why it’s critical: Mercury’s FCC modeling role explicitly requires documentation of scenarios/thresholds/segments/tuning “and any changes … over time,” and regulators evaluate monitoring systems’ methodology and integration into SAR workflows. citeturn29view1turn30search1turn30search5  
Recommended fix: implement a “policy lifecycle” subsystem:
- Draft → review → approval (with sign-offs) → staged deployment (shadow / limited traffic) → full rollout → rollback.  
- Immutable version artifacts linking: rule code/config, model version, feature schema, and decision outputs.  
Implementation consideration: treat decisioning as **event-sourced** (store inputs + outputs) to support replay and lineage; use feature flags for safe rollout; and maintain “effective date” mappings for investigations.

**Gap two: Case management that matches QC + BPO-scale reality**  
Why it’s critical: Mercury is explicitly running QC programs for both account fraud investigations and ongoing due diligence across ICs, contractors, and BPO agents, including scorecards, defect severity, sampling, calibration, and trend reporting. citeturn27search0turn26view0  
Recommended fix: expand “case” into a system of record:
- Structured evidence checklist by alert type (KYB/ODD, account fraud, TM/sanctions).  
- QC module: scorecards, defect taxonomy, sampling plans, calibration sessions, investigator/vendor performance dashboards.  
Implementation consideration: cases should support “multi-author” workflows (investigator, QC reviewer, compliance reviewer) with locked sections and audit trails.

**Gap three: Queueing, SLAs, and escalation routing as first-class primitives**  
Why it’s critical: Mercury must operate within SAR timelines (30/60-day requirements) and within partner-bank exam expectations, while also executing “minutes not days” onboarding. citeturn30search0turn25view0turn29view0  
Recommended fix: introduce a workflow orchestration layer:
- Multi-queue triage (by rail, severity, customer segment, due date).  
- SLA clocks (triage, first action, closure) and breach handling.  
- Explicit escalation paths: compliance, partner bank, legal, and customer support (templated handoffs).

**Gap four: Evidence packages and “partner-bank-safe” exports**  
Why it’s critical: Mercury states it provides policies/procedures/reports to partners and regulators in audits/exams, and its subpoena policy demands specificity and efficient retrieval. citeturn25view0turn21search0  
Recommended fix: “export bundles”:
- One-click generation of redacted case packets (timeline, rationale, flagged rules/models, supporting docs).  
- Configurable redaction policies and field-level entitlements.  
Implementation consideration: build an export templating engine with deterministic rendering and logging (who exported what, when, and why).

**Gap five: RBAC, purpose limitation, and immutable audit logging**  
Why it’s critical: Mercury collects sensitive identity and (optionally) biometric information and emphasizes security safeguards; legal orders can require holds and disclosures. citeturn23view0turn19view0turn21search0  
Recommended fix:
- Role-based access with “need-to-know” scopes (e.g., fraud investigator vs ODD vs compliance vs support).  
- Purpose-based access tagging (investigation vs QA vs exam response).  
- Append-only audit store with search and retention/hold controls.

**Gap six: Explainability that is genuinely reviewable and contestable**  
Why it’s critical: Mercury’s privacy commitments note that it does not rely on AI alone for decisions that materially affect access/rights and requires human oversight; QC roles require assessing decisioning quality and documentation. citeturn23view0turn27search0  
Recommended fix:
- “Explainability panels” that bind each hit to raw evidence (transactions, entity resolution, screening matches), including confidence and uncertainty fields.  
- Counterfactual tooling for strategists (“if threshold changed, which customers/alerts would move?”) grounded in replayable data, not estimates.

**Gap seven: Customer-impact workflow (appeals, remediations, and constrained communications)**  
Why it’s critical: Mercury notes it may not share specific closure reasons due to legal/compliance constraints and describes temporary locks pending information requests/reviews. citeturn15view0  
Recommended fix:
- Customer-communication artifacts (templates, required disclosures, timers for response-by dates).  
- Appeals pipeline with separation-of-duties (support intake vs risk adjudication).  
- Remediation tracking (documents requested/received, steps completed, re-review triggers).

### Entities referenced

Mercury’s operating model and external obligations involve partner banks and regulators, including entity["company","Choice Financial Group","fargo, nd, us"], entity["company","Column N.A.","san francisco, ca, us"], and (historically and for some customers) entity["company","Evolve Bank & Trust","memphis, tn, us"]. citeturn25view0turn24view0 Partner-banking oversight includes examinations by bodies such as the entity["organization","Federal Deposit Insurance Corporation","us bank deposit insurer"], the entity["organization","Office of the Comptroller of the Currency","us bank regulator"], and the entity["organization","Board of Governors of the Federal Reserve System","us central bank regulator"]. citeturn25view0turn30search3 Financial-crime reporting and sanctions touchpoints include entity["organization","Financial Crimes Enforcement Network","us treasury bureau"] SAR guidance and entity["organization","Office of Foreign Assets Control","us treasury sanctions office"] screening expectations. citeturn30search0turn30search2