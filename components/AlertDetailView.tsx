"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAlertContext } from "@/lib/AlertContext";
import { AlertWorkflowActions } from "@/components/AlertWorkflowActions";
import { createCase, getCaseByAlertId, getMergedCases } from "@/lib/caseStore";
import { MOCK_ALERTS, getRuleHitDrivers } from "@/lib/mockData";
import type { Alert, AlertDetail } from "@/lib/mockData";

interface AlertDetailViewProps {
  alert: Alert;
  detail: AlertDetail | null;
}

export function AlertDetailView({ alert, detail }: AlertDetailViewProps) {
  const router = useRouter();
  const { setCurrentAlert } = useAlertContext();
  const relatedCase = getCaseByAlertId(alert.id);

  useEffect(() => {
    setCurrentAlert({ alertId: alert.id, accountName: alert.accountName });
    return () => setCurrentAlert(null);
  }, [alert.id, alert.accountName, setCurrentAlert]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link
          href="/alerts"
          className="text-sm text-[#8b9cad] hover:text-white mb-2 inline-block"
        >
          ← Triage
        </Link>
        <h1 className="text-xl font-semibold text-white">
          {alert.accountName} <span className="font-mono text-[#8b9cad]">({alert.id})</span>
        </h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Risk: {alert.riskTier} · Status: {alert.status}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,minmax(18rem,22rem)] gap-6 lg:gap-8">
        <div className="space-y-6 min-w-0">
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Decision lineage</h2>
          <p className="text-xs text-[#8b9cad] mb-2">
            Which rules fired, which policy version was active, and who last modified the logic. Critical for audit and partner bank trust.
          </p>
          <ul className="text-sm space-y-1 text-white">
            <li><span className="text-[#8b9cad]">Rules fired:</span> {alert.ruleNames.join(", ")} (version 2025.2.1)</li>
            <li><span className="text-[#8b9cad]">Thresholds applied:</span> Per rule definition as of policy v2.4</li>
            <li><span className="text-[#8b9cad]">Policy version:</span> AML-ONB-2025-Q1</li>
            <li><span className="text-[#8b9cad]">Last logic change:</span> TM-INTL-WIRE-VELOCITY · 2025-02-01 · J. Smith (Risk)</li>
          </ul>
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Rule hits</h2>
          <ul className="list-disc list-inside text-sm">
            {alert.ruleNames.map((r) => (
              <li key={r}>
                <Link href={`/rules#${r}`} className="text-brand hover:underline font-mono">
                  {r}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#8b9cad] mt-2">
            <Link href="/rules" className="text-brand hover:underline">Rules reference</Link> for definitions and thresholds.
          </p>
        </section>

        <section className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <h2 className="text-sm font-medium text-emerald-400 mb-2">Root cause (v3)</h2>
          <p className="text-xs text-[#8b9cad] mb-3">
            Why each rule fired: feature-level drivers and links to evidence. Use for partner bank and regulator justification.
          </p>
          {alert.ruleNames.map((ruleId) => {
            const drivers = getRuleHitDrivers(alert.id, ruleId);
            return (
              <div key={ruleId} className="mb-4 last:mb-0">
                <h3 className="text-xs font-mono text-white mb-2">
                  <Link href={`/rules#${ruleId}`} className="text-brand hover:underline">{ruleId}</Link>
                </h3>
                {drivers.length > 0 ? (
                  <ul className="space-y-1.5 text-sm">
                    {drivers.map((d, i) => (
                      <li key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[#8b9cad]">
                        <span className="text-white">{d.featureName}:</span>
                        <span className="font-mono">{String(d.value)}</span>
                        <span>vs threshold {d.thresholdOrTier}</span>
                        <span className="text-xs">
                          {d.evidenceType === "rule" ? (
                            <Link href={`/rules#${ruleId}`} className="text-brand hover:underline">{d.evidenceLabel}</Link>
                          ) : d.evidenceType === "transaction" ? (
                            <Link href={`/alerts/${alert.id}#transactions`} className="text-brand hover:underline">{d.evidenceLabel}</Link>
                          ) : (
                            <Link href={`/alerts/${alert.id}#account`} className="text-brand hover:underline">{d.evidenceLabel}</Link>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#8b9cad]">Feature drivers not available for this rule on this alert (mock data).</p>
                )}
              </div>
            );
          })}
        </section>

        {detail && (
          <section className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
            <h2 className="text-sm font-medium text-amber-400 mb-2">Uncertainty</h2>
            <p className="text-xs text-[#8b9cad] mb-2">
              Explicit uncertainty markers for strategist review. Surfaces incomplete data or low-confidence signals.
            </p>
            <ul className="text-sm space-y-1">
              <li className="text-amber-200">Signal confidence: {detail.riskScore >= 0.8 ? "high" : "low"} (score {detail.riskScore})</li>
              <li className="text-[#8b9cad]">Data incomplete: counterparty enrichment pending for 1 wire</li>
            </ul>
          </section>
        )}

        {detail?.signalContributions && (
          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">
              Signal contributions (risk score {detail.riskScore})
            </h2>
            <ul className="space-y-2">
              {detail.signalContributions.map((s) => (
                <li key={s.name} className="text-sm flex justify-between gap-4">
                  <span>{s.name}</span>
                  <span className="font-mono text-[#8b9cad]">{(s.contribution * 100).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {detail?.transactionSummary && (
          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Transaction summary</h2>
            <p className="text-sm">
              {detail.transactionSummary.count} transactions · $
              {detail.transactionSummary.totalAmountUsd.toLocaleString()} total · Last activity{" "}
              {new Date(detail.transactionSummary.lastActivity).toLocaleString()}
            </p>
          </section>
        )}

        {!relatedCase ? (
          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Related case</h2>
            <p className="text-sm text-[#8b9cad] mb-2">
              Open an investigation case for this alert.
            </p>
            <button
              type="button"
              onClick={() => {
                const newCase = createCase(alert.id, { segment: alert.segment });
                router.push(`/cases/${newCase.id}`);
              }}
              className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Create case
            </button>
          </section>
        ) : (
          <section className="rounded-lg border border-border bg-surface-elevated p-4">
            <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Related case</h2>
            <p className="text-sm">
              <Link
                href={`/cases/${relatedCase.id}`}
                className="text-brand hover:underline font-medium"
              >
                {relatedCase.id}
              </Link>
              <span className="text-[#8b9cad] ml-2 capitalize">
                — {relatedCase.outcome != null ? relatedCase.outcome.replace(/_/g, " ") : "Open"}
                {relatedCase.closedAt != null
                  ? ` · closed ${new Date(relatedCase.closedAt).toLocaleDateString()}`
                  : ""}
              </span>
            </p>
            <Link
              href={`/cases/${relatedCase.id}`}
              className="inline-block mt-2 text-sm text-brand hover:underline"
            >
              Open case →
            </Link>
          </section>
        )}

        {(() => {
          const merged = getMergedCases();
          const otherCases = merged.filter((c) => c.alertId !== alert.id).filter((c) => {
            const otherAlert = MOCK_ALERTS.find((a) => a.id === c.alertId);
            if (!otherAlert) return false;
            const sameSegment = alert.segment && otherAlert.segment && alert.segment === otherAlert.segment;
            const sharedRule = alert.ruleNames.some((r) => otherAlert.ruleNames.includes(r));
            return sameSegment || sharedRule;
          });
          if (otherCases.length === 0) return null;
          return (
            <section className="rounded-lg border border-border bg-surface-elevated p-4">
              <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Similar cases</h2>
              <p className="text-xs text-[#8b9cad] mb-2">
                Other cases with same segment or overlapping rules; use for disposition consistency.
              </p>
              <ul className="space-y-2">
                {otherCases.map((c) => {
                  const otherAlert = MOCK_ALERTS.find((a) => a.id === c.alertId);
                  return (
                    <li key={c.id} className="text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Link href={`/cases/${c.id}`} className="text-brand hover:underline font-medium">
                        {c.id}
                      </Link>
                      <span className="text-[#8b9cad]">
                        alert <Link href={`/alerts/${c.alertId}`} className="text-brand hover:underline font-mono">{c.alertId}</Link>
                        {otherAlert && ` · ${otherAlert.segment ?? "—"}`} · {c.outcome != null ? c.outcome.replace(/_/g, " ") : "Open"}
                      </span>
                      <span className="text-[#8b9cad] text-xs">
                        {c.closedAt != null ? `closed ${new Date(c.closedAt).toLocaleDateString()}` : "—"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })()}
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <AlertWorkflowActions
            alertId={alert.id}
            initialStatus={alert.status}
            accountName={alert.accountName}
            segment={alert.segment}
          />
        </div>
      </div>
    </div>
  );
}
