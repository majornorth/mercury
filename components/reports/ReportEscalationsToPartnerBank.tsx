import {
  MOCK_ESCALATION_SUMMARY,
  type EscalationSummaryRow,
} from "@/lib/mockData";

export function ReportEscalationsToPartnerBank() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Escalations to partner bank
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Count of escalated alerts by segment and top contributing rules. Use for partner handoffs and exam visibility.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium text-right">Escalation count</th>
                <th className="px-4 py-2 font-medium">Top rules</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ESCALATION_SUMMARY.map((row: EscalationSummaryRow) => (
                <tr key={row.segment} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.segment}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.escalationCount}</td>
                  <td className="px-4 py-2 font-mono text-xs text-[#8b9cad]">
                    {row.topRules.join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
