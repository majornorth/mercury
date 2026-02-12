import { MOCK_CASES } from "@/lib/mockData";
import type { OutcomeCode } from "@/lib/mockData";

function outcomeLabel(code: OutcomeCode): string {
  return code.replace(/_/g, " ");
}

export function CaseOutcomesSummary() {
  const byOutcome: Record<string, number> = {};
  const bySegment: Record<string, number> = {};
  for (const c of MOCK_CASES) {
    byOutcome[c.outcome] = (byOutcome[c.outcome] ?? 0) + 1;
    const seg = c.segment ?? "—";
    bySegment[seg] = (bySegment[seg] ?? 0) + 1;
  }
  const outcomeEntries = Object.entries(byOutcome).sort((a, b) => b[1] - a[1]);
  const segmentEntries = Object.entries(bySegment).sort((a, b) => b[1] - a[1]);

  if (MOCK_CASES.length === 0) return null;

  return (
    <section className="rounded-lg border border-border bg-surface-elevated p-4 mb-6">
      <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Cases by outcome and segment</h2>
      <p className="text-xs text-[#8b9cad] mb-3">
        Compare cohorts for disposition consistency and policy tuning.
      </p>
      <div className="flex flex-wrap gap-6">
        <div>
          <h3 className="text-xs font-medium text-[#8b9cad] mb-1.5">By outcome</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {outcomeEntries.map(([outcome, count]) => (
              <li key={outcome} className="flex items-center gap-2">
                <span className="text-[#8b9cad] capitalize">{outcomeLabel(outcome as OutcomeCode)}</span>
                <span className="text-white font-medium">{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium text-[#8b9cad] mb-1.5">By segment</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {segmentEntries.map(([segment, count]) => (
              <li key={segment} className="flex items-center gap-2">
                <span className="text-[#8b9cad]">{segment}</span>
                <span className="text-white font-medium">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
