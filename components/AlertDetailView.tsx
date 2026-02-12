"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAlertContext } from "@/lib/AlertContext";
import { AlertWorkflowActions } from "@/components/AlertWorkflowActions";
import { MOCK_ALERTS, MOCK_CASES } from "@/lib/mockData";
import type { Alert, AlertDetail } from "@/lib/mockData";

interface AlertDetailViewProps {
  alert: Alert;
  detail: AlertDetail | null;
}

export function AlertDetailView({ alert, detail }: AlertDetailViewProps) {
  const { setCurrentAlert } = useAlertContext();

  useEffect(() => {
    setCurrentAlert({ alertId: alert.id, accountName: alert.accountName });
    return () => setCurrentAlert(null);
  }, [alert.id, alert.accountName, setCurrentAlert]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link
          href="/"
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

      <div className="space-y-6">
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Rule hits</h2>
          <ul className="list-disc list-inside text-sm">
            {alert.ruleNames.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

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

        {(() => {
          const relatedCase = MOCK_CASES.find((c) => c.alertId === alert.id);
          if (!relatedCase) return null;
          return (
            <section className="rounded-lg border border-border bg-surface-elevated p-4">
              <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Related case</h2>
              <p className="text-sm">
                <Link
                  href={`/cases/${relatedCase.id}`}
                  className="text-[#6ea8fe] hover:underline font-medium"
                >
                  {relatedCase.id}
                </Link>
                <span className="text-[#8b9cad] ml-2 capitalize">
                  — {relatedCase.outcome.replace(/_/g, " ")} · closed{" "}
                  {new Date(relatedCase.closedAt).toLocaleDateString()}
                </span>
              </p>
              <Link
                href={`/cases/${relatedCase.id}`}
                className="inline-block mt-2 text-sm text-[#6ea8fe] hover:underline"
              >
                Open case →
              </Link>
            </section>
          );
        })()}

        {(() => {
          const otherCases = MOCK_CASES.filter((c) => c.alertId !== alert.id).filter((c) => {
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
                      <Link href={`/cases/${c.id}`} className="text-[#6ea8fe] hover:underline font-medium">
                        {c.id}
                      </Link>
                      <span className="text-[#8b9cad]">
                        alert <Link href={`/alerts/${c.alertId}`} className="text-[#6ea8fe] hover:underline font-mono">{c.alertId}</Link>
                        {otherAlert && ` · ${otherAlert.segment ?? "—"}`} · {c.outcome.replace(/_/g, " ")}
                      </span>
                      <span className="text-[#8b9cad] text-xs">
                        closed {new Date(c.closedAt).toLocaleDateString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })()}

        <AlertWorkflowActions
          alertId={alert.id}
          initialStatus={alert.status}
          accountName={alert.accountName}
        />
      </div>
    </div>
  );
}
