import { MOCK_TRIAGE_SLA, type TriageSlaRow } from "@/lib/mockData";

export function ReportTimeToTriageSla() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Time to triage (SLA)
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Median and P90 hours from alert creation to first action, by risk tier. Use to monitor triage SLAs and capacity.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Risk tier</th>
                <th className="px-4 py-2 font-medium text-right">Median (hours)</th>
                <th className="px-4 py-2 font-medium text-right">P90 (hours)</th>
                <th className="px-4 py-2 font-medium text-right">Alert count</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRIAGE_SLA.map((row: TriageSlaRow) => (
                <tr key={row.riskTier} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.riskTier}</td>
                  <td className="px-4 py-2 text-right">{row.medianHours}</td>
                  <td className="px-4 py-2 text-right">{row.p90Hours}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.alertCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
