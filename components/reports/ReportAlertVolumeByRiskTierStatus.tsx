import {
  MOCK_ALERT_VOLUME_BY_RISK_TIER_STATUS,
  type AlertVolumeByRiskTierStatusRow,
} from "@/lib/mockData";

export function ReportAlertVolumeByRiskTierStatus() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Alert volume by risk tier and status
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Workload visibility for triage: counts by risk tier and workflow status. Use to balance assignment and meet SLAs.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Risk tier</th>
                <th className="px-4 py-2 font-medium text-right">New</th>
                <th className="px-4 py-2 font-medium text-right">In review</th>
                <th className="px-4 py-2 font-medium text-right">Escalated</th>
                <th className="px-4 py-2 font-medium text-right">Closed</th>
                <th className="px-4 py-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ALERT_VOLUME_BY_RISK_TIER_STATUS.map((row: AlertVolumeByRiskTierStatusRow) => (
                <tr key={row.riskTier} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.riskTier}</td>
                  <td className="px-4 py-2 text-right">{row.new}</td>
                  <td className="px-4 py-2 text-right">{row.in_review}</td>
                  <td className="px-4 py-2 text-right">{row.escalated}</td>
                  <td className="px-4 py-2 text-right">{row.closed}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
