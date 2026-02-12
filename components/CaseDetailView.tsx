"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_ALERTS } from "@/lib/mockData";
import { CaseWorkflowActions } from "@/components/CaseWorkflowActions";
import type { CaseSummary, OutcomeCode } from "@/lib/mockData";
import type { BehaviorArchetypeId } from "@/lib/mockData";

function outcomeLabel(code: OutcomeCode): string {
  return code.replace(/_/g, " ");
}

/** Cases that have an appeal in mock data (v4 conditional Appeals block). */
const CASES_WITH_APPEAL = new Set(["case-001", "case-003"]);

interface CaseDetailViewProps {
  caseItem: CaseSummary;
  alert: { id: string; accountName: string; accountId: string } | null;
  similarCases: CaseSummary[];
  /** v3: behavior archetype for "See pattern" link */
  patternArchetype?: BehaviorArchetypeId | null;
}

export function CaseDetailView({ caseItem, alert, similarCases, patternArchetype }: CaseDetailViewProps) {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [appealLogged, setAppealLogged] = useState(false);
  const [qcSubmitted, setQcSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const hasAppeal = CASES_WITH_APPEAL.has(caseItem.id) || appealLogged;

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

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
        {toastMessage && (
          <div className="mt-2 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-3 py-2 text-sm text-emerald-200">
            {toastMessage}
          </div>
        )}
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

          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Evidence checklist (v4)</h2>
            <p className="text-xs text-[#8b9cad] mb-3">
              Structured evidence by alert type; QC uses this for scorecards and defect taxonomy.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-white">KYB / identity doc</span>
                <span className="text-[#8b9cad] text-xs">Collected</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-white">Transaction list</span>
                <span className="text-[#8b9cad] text-xs">Collected</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500" aria-hidden />
                <span className="text-white">Screening result</span>
                <span className="text-[#8b9cad] text-xs">Pending</span>
              </li>
            </ul>
            <section className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-[#8b9cad] mb-2">QC verdict (v4 multi-author)</p>
              <p className="text-xs text-amber-400">Locked by K. Lee (QC) · 2025-02-11</p>
            </section>
            <section className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-[#8b9cad] mb-2">Score this case (mock)</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <label className="flex items-center gap-1.5">
                  <span className="text-[#8b9cad]">Documentation:</span>
                  <select className="rounded border border-border bg-surface px-2 py-1 text-white text-xs">
                    <option>Pass</option>
                    <option>Fail</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="text-[#8b9cad]">Logic:</span>
                  <select className="rounded border border-border bg-surface px-2 py-1 text-white text-xs">
                    <option>Pass</option>
                    <option>Fail</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="text-[#8b9cad]">Defect:</span>
                  <select className="rounded border border-border bg-surface px-2 py-1 text-white text-xs">
                    <option>None</option>
                    <option>Documentation gap</option>
                    <option>Policy deviation</option>
                  </select>
                </label>
              </div>
              <button
                type="button"
                onClick={() => { setQcSubmitted(true); setToastMessage("QC score submitted (mock)"); }}
                disabled={qcSubmitted}
                className="mt-2 rounded-md bg-brand px-2 py-1 text-xs text-white hover:opacity-90 disabled:opacity-50"
              >
                {qcSubmitted ? "Submitted" : "Submit for QC"}
              </button>
            </section>
          </section>

          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Customer communication & remediation (v4)</h2>
            <p className="text-xs text-[#8b9cad] mb-3">
              Templates, response-by dates, remediation tracking, appeals. Internal rationale is retained for exam.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-white">
                <span className="text-[#8b9cad]">Template used:</span> Info request — standard
              </p>
              <p className="text-white">
                <span className="text-[#8b9cad]">Response by:</span> 2025-02-19
              </p>
              <p className="text-[#8b9cad]">Remediation: 2 requested, 1 received. Re-review when complete.</p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Appeals (v4)</h2>
            <p className="text-xs text-[#8b9cad] mb-3">
              Separation of duties: support intake vs risk adjudication. Status and audit trail for exam.
            </p>
            {hasAppeal ? (
              <div className="space-y-2 text-sm">
                {appealLogged ? (
                  <p className="text-emerald-300">Appeal logged (mock) — Pending intake.</p>
                ) : (
                  <>
                    <p className="text-white">
                      <span className="text-[#8b9cad]">Appeal received:</span> 2025-02-10 · <span className="text-[#8b9cad]">Status:</span> Pending risk adjudication
                    </p>
                    <p className="text-[#8b9cad]">Intake: Support — A. Jones · Adjudication: Risk — J. Smith (assigned)</p>
                  </>
                )}
                <Link href="/cases/appeals" className="inline-block mt-2 text-sm text-brand hover:underline">
                  View all appeals →
                </Link>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p className="text-[#8b9cad]">No appeal recorded.</p>
                <button
                  type="button"
                  onClick={() => setAppealModalOpen(true)}
                  className="rounded-md border border-brand/50 px-2 py-1 text-xs text-brand hover:bg-brand/10"
                >
                  Log appeal
                </button>
              </div>
            )}
          </section>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
          <CaseWorkflowActions caseId={caseItem.id} />
          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Evidence package (v4)</h2>
            <p className="text-xs text-[#8b9cad] mb-3">
              Generate a redacted case packet for partner bank, exam, or legal. Export is audited.
            </p>
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-brand/50 text-brand text-sm font-medium hover:bg-brand/10"
            >
              Generate case packet
            </button>
          </section>
        </div>
      </div>

      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" aria-labelledby="export-modal-title">
          <div className="rounded-lg border border-border bg-surface-elevated p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 id="export-modal-title" className="text-sm font-medium text-white mb-4">Generate case packet</h2>
            <div className="space-y-3 text-sm">
              <label className="block">
                <span className="text-[#8b9cad] block mb-1">Purpose</span>
                <select className="w-full rounded border border-border bg-surface px-3 py-2 text-white">
                  <option>Partner bank handoff</option>
                  <option>Exam response</option>
                  <option>Legal</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[#8b9cad] block mb-1">Policy</span>
                <select className="w-full rounded border border-border bg-surface px-3 py-2 text-white">
                  <option>partner-bank-safe</option>
                  <option>exam</option>
                </select>
              </label>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => { setExportModalOpen(false); setToastMessage("Export created (mock)"); }}
                className="rounded-md bg-brand px-3 py-1.5 text-sm text-white hover:opacity-90"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:bg-surface-overlay"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {appealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" aria-labelledby="appeal-modal-title">
          <div className="rounded-lg border border-border bg-surface-elevated p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 id="appeal-modal-title" className="text-sm font-medium text-white mb-4">Log appeal</h2>
            <div className="space-y-3 text-sm">
              <label className="block">
                <span className="text-[#8b9cad] block mb-1">Appeal date</span>
                <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="w-full rounded border border-border bg-surface px-3 py-2 text-white" />
              </label>
              <label className="block">
                <span className="text-[#8b9cad] block mb-1">Intake by (Support)</span>
                <input type="text" placeholder="e.g. Support — A. Jones" className="w-full rounded border border-border bg-surface px-3 py-2 text-white placeholder:text-[#6b7a8c]" />
              </label>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => { setAppealModalOpen(false); setAppealLogged(true); setToastMessage("Appeal logged (mock)"); }}
                className="rounded-md bg-brand px-3 py-1.5 text-sm text-white hover:opacity-90"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setAppealModalOpen(false)}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:bg-surface-overlay"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
