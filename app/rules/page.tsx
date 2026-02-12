import { RULES_REFERENCE } from "@/lib/rulesReference";

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

      <section className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Transaction monitoring</h2>
          <ul className="space-y-3">
            {byCategory.transaction_monitoring.map((r) => (
              <li key={r.id} id={r.id} className="rounded-lg border border-border bg-surface-elevated p-4 scroll-mt-4">
                <h3 className="font-mono text-sm font-medium text-white">{r.name}</h3>
                <p className="text-sm text-[#8b9cad] mt-1">{r.description}</p>
                {r.threshold && (
                  <p className="text-xs text-[#6b7a8c] mt-1">Threshold: {r.threshold}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Onboarding</h2>
          <ul className="space-y-3">
            {byCategory.onboarding.map((r) => (
              <li key={r.id} id={r.id} className="rounded-lg border border-border bg-surface-elevated p-4 scroll-mt-4">
                <h3 className="font-mono text-sm font-medium text-white">{r.name}</h3>
                <p className="text-sm text-[#8b9cad] mt-1">{r.description}</p>
                {r.threshold && (
                  <p className="text-xs text-[#6b7a8c] mt-1">Threshold: {r.threshold}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
