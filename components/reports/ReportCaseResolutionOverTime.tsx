import {
  MOCK_CASE_RESOLUTION_BY_PERIOD,
  type CaseResolutionByPeriodRow,
} from "@/lib/mockData";

export function ReportCaseResolutionOverTime() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Case resolution over time
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Cases closed by period with disposition breakdown. Use for operational trends and exam-ready reporting.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Period</th>
                <th className="px-4 py-2 font-medium text-right">Closed no action</th>
                <th className="px-4 py-2 font-medium text-right">Escalated</th>
                <th className="px-4 py-2 font-medium text-right">SAR</th>
                <th className="px-4 py-2 font-medium text-right">Total closed</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CASE_RESOLUTION_BY_PERIOD.map((row: CaseResolutionByPeriodRow) => (
                <tr key={row.period} className="border-b border-border/50">
                  <td className="px-4 py-2 text-[#8b9cad]">{row.period}</td>
                  <td className="px-4 py-2 text-right">{row.closedNoAction}</td>
                  <td className="px-4 py-2 text-right">{row.escalated}</td>
                  <td className="px-4 py-2 text-right">{row.sar}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.totalClosed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
