"use client";

/** Mock QC data for v4 Gap 2 placeholder. Replace with API when QC backend exists. */
const MOCK_QC_SCORECARD = {
  casesScoredThisWeek: 42,
  samplingRatePct: 10,
  defectRatePct: 8,
  calibrationSessionsThisMonth: 3,
};

const MOCK_DEFECT_TAXONOMY = [
  { id: "doc-gap", label: "Documentation gap", count: 12, severity: "medium" },
  { id: "logic-error", label: "Logic error", count: 5, severity: "high" },
  { id: "policy-deviation", label: "Policy deviation", count: 3, severity: "high" },
  { id: "incomplete-review", label: "Incomplete review", count: 8, severity: "medium" },
  { id: "timing", label: "Timing / SLA", count: 2, severity: "low" },
];

const MOCK_INVESTIGATOR_PERF = [
  { id: "inv-1", name: "Internal — Team A", type: "internal", volume: 120, defectRatePct: 4, calibrationScore: 92 },
  { id: "inv-2", name: "Internal — Team B", type: "internal", volume: 95, defectRatePct: 7, calibrationScore: 88 },
  { id: "bpo-1", name: "BPO — Vendor X", type: "vendor", volume: 200, defectRatePct: 11, calibrationScore: 85 },
  { id: "bpo-2", name: "BPO — Vendor Y", type: "vendor", volume: 80, defectRatePct: 6, calibrationScore: 90 },
];

export default function QCPage() {
  return (
    <div>
      <p className="text-sm text-[#8b9cad] mb-4">
        Quality control: scorecards, defect taxonomy, sampling, calibration, and investigator/vendor performance (v4 Gap 2). Replace with live data when QC backend is available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Cases scored this week</h2>
          <p className="text-2xl font-semibold text-white">{MOCK_QC_SCORECARD.casesScoredThisWeek}</p>
        </section>
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Sampling rate</h2>
          <p className="text-2xl font-semibold text-white">{MOCK_QC_SCORECARD.samplingRatePct}%</p>
        </section>
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Defect rate</h2>
          <p className="text-2xl font-semibold text-white">{MOCK_QC_SCORECARD.defectRatePct}%</p>
        </section>
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Calibration sessions (month)</h2>
          <p className="text-2xl font-semibold text-white">{MOCK_QC_SCORECARD.calibrationSessionsThisMonth}</p>
        </section>
      </div>

      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden mb-6">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Defect taxonomy (mock)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[#8b9cad]">
                <th className="px-4 py-3 font-medium">Defect type</th>
                <th className="px-4 py-3 font-medium">Count</th>
                <th className="px-4 py-3 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DEFECT_TAXONOMY.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-surface-overlay/30">
                  <td className="px-4 py-3 text-white">{d.label}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">{d.count}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                      d.severity === "high" ? "risk-badge-high" : d.severity === "medium" ? "risk-badge-medium" : "risk-badge-low"
                    }`}>
                      {d.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Investigator & vendor performance (mock)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[#8b9cad]">
                <th className="px-4 py-3 font-medium">Investigator / Vendor</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">Volume</th>
                <th className="px-4 py-3 font-medium text-right">Defect rate</th>
                <th className="px-4 py-3 font-medium text-right">Calibration score</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVESTIGATOR_PERF.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-overlay/30">
                  <td className="px-4 py-3 text-white">{r.name}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">{r.type}</td>
                  <td className="px-4 py-3 text-right text-white">{r.volume}</td>
                  <td className="px-4 py-3 text-right text-[#8b9cad]">{r.defectRatePct}%</td>
                  <td className="px-4 py-3 text-right text-white">{r.calibrationScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-[#8b9cad] border-t border-border">
          Used for training, capacity, and vendor management. Backend TBD.
        </p>
      </section>
    </div>
  );
}
