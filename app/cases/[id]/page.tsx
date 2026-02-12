import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_ALERTS, MOCK_CASES } from "@/lib/mockData";
import type { CaseSummary, OutcomeCode } from "@/lib/mockData";

function outcomeLabel(code: OutcomeCode): string {
  return code.replace(/_/g, " ");
}

export default function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const caseItem = MOCK_CASES.find((c) => c.id === id);
  if (!caseItem) notFound();

  const alert = MOCK_ALERTS.find((a) => a.id === caseItem.alertId);

  const similarCases = MOCK_CASES.filter(
    (c) => c.id !== caseItem.id && (() => {
      const otherAlert = MOCK_ALERTS.find((a) => a.id === c.alertId);
      if (!otherAlert || !alert) return false;
      const sameSegment = alert.segment && otherAlert.segment && alert.segment === otherAlert.segment;
      const sharedRule = alert.ruleNames.some((r) => otherAlert.ruleNames.includes(r));
      return sameSegment || sharedRule;
    })()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link
          href="/cases"
          className="text-sm text-[#8b9cad] hover:text-white mb-2 inline-block"
        >
          ← Cases
        </Link>
        <h1 className="text-xl font-semibold text-white">
          Case <span className="font-mono text-[#8b9cad]">{caseItem.id}</span>
        </h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Outcome: {outcomeLabel(caseItem.outcome)} · Closed{" "}
          {new Date(caseItem.closedAt).toLocaleString()}
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Linked alert</h2>
          <p className="text-sm">
            {alert ? (
              <>
                <Link
                  href={`/alerts/${caseItem.alertId}`}
                  className="text-[#6ea8fe] hover:underline font-medium"
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
              className="inline-block mt-2 text-sm text-[#6ea8fe] hover:underline"
            >
              Open alert detail →
            </Link>
          )}
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Outcome</h2>
          <p className="text-sm text-white capitalize">
            {outcomeLabel(caseItem.outcome)}
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
                    <Link href={`/cases/${c.id}`} className="text-[#6ea8fe] hover:underline font-medium">
                      {c.id}
                    </Link>
                    <span className="text-[#8b9cad]">
                      alert{" "}
                      <Link href={`/alerts/${c.alertId}`} className="text-[#6ea8fe] hover:underline font-mono">
                        {c.alertId}
                      </Link>
                      {otherAlert && ` · ${otherAlert.segment ?? "—"}`} · {outcomeLabel(c.outcome)}
                    </span>
                    <span className="text-[#8b9cad] text-xs">
                      closed {new Date(c.closedAt).toLocaleDateString()}
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
    </div>
  );
}
