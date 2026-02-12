# Mercury Risk Operations Platform

Internal operations application for **Risk Strategists** to support high-stakes decision-making during onboarding and ongoing account monitoring. The platform is agentic by default (LLM-powered assistant), includes self-serve custom tools and dashboards, and is designed for auditability, explainability, and partner-bank exam readiness.

## What it does

- **System Health** — Default landing: alert volume vs baseline, false-positive proxy, override rates, top rule contributors.
- **Alerts & Cases** — Triage alerts, drill into rule hits and signal contributions, create and manage cases, link to similar cases and case patterns.
- **Queues & SLA** — Multi-queue view, SLA summary, escalation paths (v4 placeholder).
- **Rules** — Rule reference with tradeoff impact and scenario simulation (what-if threshold changes).
- **Exports** — Evidence packages and partner-bank-safe case packet generation (v4 placeholder).
- **Audit** — Log of data access, workflow actions, LLM usage, view events (mock; v4 note on purpose and retention).
- **Assistant** — Side-panel LLM assistant for “why flagged,” similar cases, escalation drafts (stub responses; wire to real LLM TBD).
- **Reports & self-serve views** — Strategist-oriented reports and custom views (mock data; View Engine TBD).

## Docs and scope

| Doc | Description |
|-----|-------------|
| [PRD (v1)](docs/PRD-Risk-Operations-Platform.md) | Baseline: problem, users, use cases, functional/non-functional requirements, agentic and self-serve. |
| [PRD v2](docs/PRD-Risk-Operations-Platform-v2.md) | Strategist control plane: System Health default, decision lineage, counter-argument LLM, Sandbox vs Operational. |
| [PRD v3](docs/PRD-Risk-Operations-Platform-v3.md) | Signal explainability, Case Patterns, scenario simulation. |
| [PRD v4](docs/PRD-Risk-Operations-Platform-v4.md) | Operational scale & exam readiness: governance, QC/BPO, queue/SLA, exports, audit depth, customer-impact. |
| [Technical Design](docs/Technical-Design-Risk-Operations-Platform.md) | Architecture, data flow, LLM, auth/audit, view engine, v3/v4 additions. |
| [TODO.md](TODO.md) | Implementation status aligned with PRDs and tech spec. |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses mock data; replace with Mercury internal APIs and backend services per the Technical Design.

## Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- Mock data and localStorage for alerts, cases, workflow, audit (prototype)
- No real LLM or persistent backend in this repo

## Status

See [TODO.md](TODO.md) for done vs in-progress vs not started. v1–v3 UI pillars and v4 placeholder surfaces (Queues, Exports, evidence checklist, customer-impact, policy lifecycle, audit depth note, counterfactual CTA) are in place; backend integrations (APIs, RBAC, audit store, View Engine, LLM) are TBD.
