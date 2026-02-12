import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_ALERT_DETAILS, MOCK_ALERTS } from "@/lib/mockData";

export default function AlertDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const alert = MOCK_ALERT_DETAILS[id] ?? MOCK_ALERTS.find((a) => a.id === id);
  if (!alert) notFound();

  const detail = "riskScore" in alert ? alert : null;

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

        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Actions</h2>
          <p className="text-sm text-[#8b9cad]">
            Workflow actions (assign, escalate, close) will be wired to the Workflow API. This is a read-only prototype.
          </p>
        </section>
      </div>
    </div>
  );
}
