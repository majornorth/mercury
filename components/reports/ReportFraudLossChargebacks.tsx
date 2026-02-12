/**
 * v5 optional: Fraud loss & chargebacks report stub.
 * Segment or product level. Mock data.
 */
const MOCK_FRAUD_LOSS = [
  { segment: "ecommerce", fraudLossUsd: 12400, chargebackCount: 18, returnsCount: 4 },
  { segment: "fintech", fraudLossUsd: 8200, chargebackCount: 12, returnsCount: 2 },
  { segment: "saas", fraudLossUsd: 3100, chargebackCount: 5, returnsCount: 1 },
];

export function ReportFraudLossChargebacks() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Fraud loss & chargebacks — v5
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Fraud loss and chargeback/returns at segment level. Use for tuning and exam visibility. Mock data.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium text-right">Fraud loss (USD)</th>
                <th className="px-4 py-2 font-medium text-right">Chargebacks</th>
                <th className="px-4 py-2 font-medium text-right">Returns</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FRAUD_LOSS.map((row) => (
                <tr key={row.segment} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.segment}</td>
                  <td className="px-4 py-2 text-right font-mono">${row.fraudLossUsd.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{row.chargebackCount}</td>
                  <td className="px-4 py-2 text-right">{row.returnsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
