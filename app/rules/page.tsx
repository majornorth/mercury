import { RULES_REFERENCE } from "@/lib/rulesReference";

/** Mock tradeoff impact per rule for v2 "explicit tradeoffs" UI. */
const MOCK_RULE_IMPACT: Record<string, { fpPctChange?: string; affectedSegment?: string; affectedCustomers?: number }> = {
  "TM-INTL-WIRE-VELOCITY": { fpPctChange: "+12%", affectedSegment: "ecommerce, fintech", affectedCustomers: 8 },
  "TM-LARGE-SINGLE": { fpPctChange: "+8%", affectedSegment: "all segments", affectedCustomers: 14 },
  "TM-STRUCTURING": { fpPctChange: "+5%", affectedSegment: "fintech", affectedCustomers: 3 },
  "TM-CASH-INTENSIVE": { fpPctChange: "+6%", affectedSegment: "fintech", affectedCustomers: 5 },
  "TM-RAPID-MOVEMENT": { fpPctChange: "+3%", affectedSegment: "ecommerce", affectedCustomers: 2 },
  "TM-HIGH-RISK-JURISDICTION": { fpPctChange: "+4%", affectedSegment: "fintech", affectedCustomers: 4 },
  "ONB-BENEFICIAL-OWNER": { affectedSegment: "saas, ecommerce", affectedCustomers: 6 },
  "ONB-SANCTIONS-EDGE": { affectedSegment: "fintech", affectedCustomers: 1 },
};

export default function RulesPage() {
  const byCategory = {
    transaction_monitoring: RULES_REFERENCE.filter((r) => r.category === "transaction_monitoring"),
    onboarding: RULES_REFERENCE.filter((r) => r.category === "onboarding"),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Rules reference</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Rule definitions for explainability. Links from alert rule hits point here. In production, replace with policy/rule engine data.
        </p>
      </div>

      <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 mb-6">
        <h2 className="text-sm font-medium text-amber-400 mb-2">Tradeoff impact (v2)</h2>
        <p className="text-xs text-[#8b9cad]">
          When you change a rule or threshold, the system should surface second-order effects. Below are mock estimates: false positive impact, affected segment, and active customers. Risk strategy is about owning these tradeoffs explicitly.
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Transaction monitoring</h2>
          <ul className="space-y-3">
            {byCategory.transaction_monitoring.map((r) => {
              const impact = MOCK_RULE_IMPACT[r.id];
              return (
                <li key={r.id} id={r.id} className="rounded-lg border border-border bg-surface-elevated p-4 scroll-mt-4">
                  <h3 className="font-mono text-sm font-medium text-white">{r.name}</h3>
                  <p className="text-sm text-[#8b9cad] mt-1">{r.description}</p>
                  {r.threshold && (
                    <p className="text-xs text-[#6b7a8c] mt-1">Threshold: {r.threshold}</p>
                  )}
                  {impact && (
                    <div className="mt-3 pt-3 border-t border-border/50 text-xs text-[#8b9cad]">
                      <span className="font-medium text-amber-400/90">If you change this:</span>
                      {impact.fpPctChange != null && (
                        <span className="ml-1">Estimated {impact.fpPctChange} false positives (proxy).</span>
                      )}
                      {impact.affectedSegment != null && (
                        <span className="ml-1"> Affects segment(s): {impact.affectedSegment}.</span>
                      )}
                      {impact.affectedCustomers != null && (
                        <span className="ml-1"> ~{impact.affectedCustomers} active customers.</span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Onboarding</h2>
          <ul className="space-y-3">
            {byCategory.onboarding.map((r) => {
              const impact = MOCK_RULE_IMPACT[r.id];
              return (
                <li key={r.id} id={r.id} className="rounded-lg border border-border bg-surface-elevated p-4 scroll-mt-4">
                  <h3 className="font-mono text-sm font-medium text-white">{r.name}</h3>
                  <p className="text-sm text-[#8b9cad] mt-1">{r.description}</p>
                  {r.threshold && (
                    <p className="text-xs text-[#6b7a8c] mt-1">Threshold: {r.threshold}</p>
                  )}
                  {impact && (
                    <div className="mt-3 pt-3 border-t border-border/50 text-xs text-[#8b9cad]">
                      <span className="font-medium text-amber-400/90">If you change this:</span>
                      {impact.fpPctChange != null && (
                        <span className="ml-1">Estimated {impact.fpPctChange} false positives (proxy).</span>
                      )}
                      {impact.affectedSegment != null && (
                        <span className="ml-1"> Affects segment(s): {impact.affectedSegment}.</span>
                      )}
                      {impact.affectedCustomers != null && (
                        <span className="ml-1"> ~{impact.affectedCustomers} active customers.</span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
