/**
 * v5 optional: Recall / false-negative proxy report stub.
 * Downstream outcomes, re-opens, or other proxy metrics. Mock data.
 */
const MOCK_RECALL_PROXY = [
  { segment: "ecommerce", reOpenedCases30d: 2, downstreamSar30d: 0, proxyNote: "Re-opens after close" },
  { segment: "fintech", reOpenedCases30d: 1, downstreamSar30d: 1, proxyNote: "Re-opens after close" },
  { segment: "saas", reOpenedCases30d: 0, downstreamSar30d: 0, proxyNote: "Re-opens after close" },
];

export function ReportRecallProxy() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Recall (proxy) — v5
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Proxy metrics for possible false negatives: re-opened cases, downstream SARs. Use for tuning and exam storytelling. Mock data.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium text-right">Re-opened cases (30d)</th>
                <th className="px-4 py-2 font-medium text-right">Downstream SAR (30d)</th>
                <th className="px-4 py-2 font-medium text-[#8b9cad]">Note</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECALL_PROXY.map((row) => (
                <tr key={row.segment} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.segment}</td>
                  <td className="px-4 py-2 text-right">{row.reOpenedCases30d}</td>
                  <td className="px-4 py-2 text-right">{row.downstreamSar30d}</td>
                  <td className="px-4 py-2 text-[#8b9cad] text-xs">{row.proxyNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
