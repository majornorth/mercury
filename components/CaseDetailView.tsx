"use client";

import Link from "next/link";
import { MOCK_ALERTS } from "@/lib/mockData";
import { CaseWorkflowActions } from "@/components/CaseWorkflowActions";
import type { CaseSummary, OutcomeCode } from "@/lib/mockData";
import type { BehaviorArchetypeId } from "@/lib/mockData";

function outcomeLabel(code: OutcomeCode): string {
  return code.replace(/_/g, " ");
}

interface CaseDetailViewProps {
  caseItem: CaseSummary;
  alert: { id: string; accountName: string; accountId: string } | null;
  similarCases: CaseSummary[];
  /** v3: behavior archetype for "See pattern" link */
  patternArchetype?: BehaviorArchetypeId | null;
}

export function CaseDetailView({ caseItem, alert, similarCases, patternArchetype }: CaseDetailViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link href="/cases" className="text-sm text-[#8b9cad] hover:text-white mb-2 inline-block">
          ← Cases
        </Link>
        <h1 className="text-xl font-semibold text-white">
          Case <span className="font-mono text-[#8b9cad]">{caseItem.id}</span>
        </h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          {caseItem.outcome != null && caseItem.closedAt != null ? (
            <>
              Outcome: {outcomeLabel(caseItem.outcome)} · Closed{" "}
              {new Date(caseItem.closedAt).toLocaleString()}
            </>
          ) : (
            "Status: Open"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,minmax(18rem,22rem)] gap-6 lg:gap-8">
        <div className="space-y-6 min-w-0">
          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Decision lineage</h2>
            <p className="text-xs text-[#8b9cad] mb-2">
              Why this case was decided this way; rule and policy context; overrides and exceptions.
            </p>
            <ul className="text-sm space-y-1 text-white">
              <li><span className="text-[#8b9cad]">Policy version:</span> AML-ONB-2025-Q1</li>
              <li><span className="text-[#8b9cad]">Last logic change:</span> 2025-02-01 · J. Smith (Risk)</li>
              {caseItem.outcome === "closed_no_action" && (
                <li className="text-[#8b9cad]">Aligned with 2 similar ecommerce cases (TM-INTL-WIRE-VELOCITY) closed no action.</li>
              )}
              {caseItem.outcome === "escalated" && (
                <li className="text-[#8b9cad]">Override added during backlog surge; beneficial owner structure unclear — escalated to partner bank.</li>
              )}
            </ul>
          </section>

          <section className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
            <h2 className="text-sm font-medium text-amber-400 mb-2">Uncertainty</h2>
            <p className="text-xs text-[#8b9cad] mb-2">
              Data gaps or low-confidence signals that may affect disposition.
            </p>
            <ul className="text-sm space-y-1">
              <li className="text-amber-200">Signal confidence: low — resembles 42 previously approved cases in this segment</li>
              <li className="text-[#8b9cad]">Data incomplete: missing counterparty enrichment for 1 transaction</li>
            </ul>
          </section>

          {patternArchetype != null && (
            <section className="rounded-lg border border-border bg-surface-elevated p-4">
              <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Case pattern (v3)</h2>
              <p className="text-xs text-[#8b9cad] mb-2">
                This case belongs to a behavior archetype. View resolution prevalence for this pattern.
              </p>
              <Link
                href={`/cases/patterns?archetype=${patternArchetype}`}
                className="text-brand hover:underline text-sm"
              >
                See pattern →
              </Link>
            </section>
          )}

          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Linked alert</h2>
            <p className="text-sm">
              {alert ? (
                <>
                  <Link
                    href={`/alerts/${caseItem.alertId}`}
                    className="text-brand hover:underline font-medium"
                  >
                    {caseItem.alertId}
                  </Link>
                  <span className="text-[#8b9cad] ml-2">
                    — {alert.accountName} ({alert.accountId})
                  </span>
                </>
              ) : (
                <span className="text-[#8b9cad]">
                  Alert <span className="font-mono">{caseItem.alertId}</span>
                </span>
              )}
            </p>
            {alert && (
              <Link
                href={`/alerts/${caseItem.alertId}`}
                className="inline-block mt-2 text-sm text-brand hover:underline"
              >
                Open alert detail →
              </Link>
            )}
          </section>

          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Outcome</h2>
            <p className="text-sm text-white capitalize">
              {caseItem.outcome != null ? outcomeLabel(caseItem.outcome) : "Open"}
            </p>
            {caseItem.segment && (
              <p className="text-sm text-[#8b9cad] mt-1">Segment: {caseItem.segment}</p>
            )}
          </section>

          {caseItem.rationale && (
            <section className="rounded-lg border border-border bg-surface-elevated p-4">
              <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Rationale</h2>
              <p className="text-sm text-white">{caseItem.rationale}</p>
            </section>
          )}

          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Similar cases</h2>
            <p className="text-xs text-[#8b9cad] mb-2">
              Other cases with same segment or overlapping rules; use for disposition consistency.
            </p>
            {similarCases.length > 0 ? (
              <ul className="space-y-2">
                {similarCases.map((c) => {
                  const otherAlert = MOCK_ALERTS.find((a) => a.id === c.alertId);
                  return (
                    <li key={c.id} className="text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Link href={`/cases/${c.id}`} className="text-brand hover:underline font-medium">
                        {c.id}
                      </Link>
                      <span className="text-[#8b9cad]">
                        alert{" "}
                        <Link href={`/alerts/${c.alertId}`} className="text-brand hover:underline font-mono">
                          {c.alertId}
                        </Link>
                        {otherAlert && ` · ${otherAlert.segment ?? "—"}`} · {c.outcome != null ? outcomeLabel(c.outcome) : "Open"}
                      </span>
                      <span className="text-[#8b9cad] text-xs">
                        {c.closedAt != null ? `closed ${new Date(c.closedAt).toLocaleDateString()}` : "—"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-[#8b9cad]">
                No other cases with the same segment or overlapping rules in this dataset.
              </p>
            )}
          </section>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <CaseWorkflowActions caseId={caseItem.id} />
        </div>
      </div>
    </div>
  );
}
