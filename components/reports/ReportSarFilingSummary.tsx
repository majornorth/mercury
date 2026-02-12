import {
  MOCK_SAR_SUMMARY_BY_SEGMENT,
  MOCK_SAR_SUMMARY_BY_RULE,
  type SarSummaryBySegmentRow,
  type SarSummaryByRuleRow,
} from "@/lib/mockData";

export function ReportSarFilingSummary() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          SAR filing summary by segment
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          SAR count by customer segment. Use for regulatory visibility and exam reporting.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium text-right">SAR count</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SAR_SUMMARY_BY_SEGMENT.map((row: SarSummaryBySegmentRow) => (
                <tr key={row.segment} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.segment}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.sarCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          SAR filing summary by rule
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          SAR count by rule that contributed to the filing. Use to understand which rules drive SAR outcomes.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Rule</th>
                <th className="px-4 py-2 font-medium text-right">SAR count</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SAR_SUMMARY_BY_RULE.map((row: SarSummaryByRuleRow) => (
                <tr key={row.ruleName} className="border-b border-border/50">
                  <td className="px-4 py-2 font-mono text-xs">{row.ruleName}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.sarCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
