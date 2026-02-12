import Link from "next/link";
import { MOCK_ALERTS } from "@/lib/mockData";

export function AlertVolumeByRule() {
  const byRule: Record<string, number> = {};
  for (const alert of MOCK_ALERTS) {
    for (const rule of alert.ruleNames) {
      byRule[rule] = (byRule[rule] ?? 0) + 1;
    }
  }
  const entries = Object.entries(byRule).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) return null;

  return (
    <section className="rounded-lg border border-border bg-surface-elevated p-4 mb-6">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h2 className="text-sm font-medium text-[#8b9cad]">Alert volume by rule</h2>
        <Link
          href="/rules"
          className="text-sm font-medium text-brand hover:underline shrink-0"
        >
          Rules reference
        </Link>
      </div>
      <p className="text-xs text-[#8b9cad] mb-3">
        Rule and threshold impact; use for policy tuning and triage prioritization.
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {entries.map(([rule, count]) => (
          <li key={rule} className="flex items-center gap-2">
            <span className="font-mono text-[#8b9cad]">{rule}</span>
            <span className="text-white font-medium">{count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
