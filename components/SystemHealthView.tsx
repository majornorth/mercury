"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_SYSTEM_HEALTH } from "@/lib/mockData";

export function SystemHealthView() {
  const router = useRouter();
  const h = MOCK_SYSTEM_HEALTH;
  const { thisWeek, lastWeek, pctChange } = h.alertVolumeVsBaseline;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">System Health</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          How is our risk system behaving today? Drill into rules, cases, and alerts when you need detail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <section className="rounded-lg border border-border bg-surface-elevated p-4 flex flex-col">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">
            Alert volume vs baseline
          </h2>
          <p className="text-2xl font-semibold text-white">
            {thisWeek} <span className="text-lg font-normal text-[#8b9cad]">this week</span>
          </p>
          <p className="text-sm text-[#8b9cad] mt-1">
            Last week: {lastWeek} ·{" "}
            <span className={pctChange > 0 ? "text-amber-400" : pctChange < 0 ? "text-emerald-400" : "text-[#8b9cad]"}>
              {pctChange > 0 ? "+" : ""}{pctChange}%
            </span>
          </p>
          <Link href="/alerts" className="mt-auto inline-block text-sm text-brand hover:underline">
            View alerts →
          </Link>
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated p-4 flex flex-col">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">
            False-positive proxy
          </h2>
          <p className="text-2xl font-semibold text-white">{h.falsePositiveProxyPct}%</p>
          <p className="text-sm text-[#8b9cad] mt-1">
            % of resolved alerts closed with no action (proxy for FP rate)
          </p>
          <Link href="/reports" className="mt-auto inline-block text-sm text-brand hover:underline">
            Rule performance by segment →
          </Link>
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated p-4 flex flex-col">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">
            Investigator override rate
          </h2>
          <p className="text-2xl font-semibold text-white">{h.overrideRatePct}%</p>
          <p className="text-sm text-[#8b9cad] mt-1">
            Overrode rule or system recommendation
          </p>
          <Link href="/cases" className="mt-auto inline-block text-sm text-brand hover:underline">
            View cases →
          </Link>
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated p-4 flex flex-col">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">
            Top rule contributors
          </h2>
          <p className="text-sm text-[#8b9cad] mb-2">By volume and by override</p>
          <Link href="/rules" className="mt-auto inline-block text-sm text-brand hover:underline">
            Rules reference →
          </Link>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
          <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
            Top rules by alert volume
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-overlay/50">
                  <th className="px-4 py-2 font-medium">Rule</th>
                  <th className="px-4 py-2 font-medium text-right">Alerts</th>
                </tr>
              </thead>
              <tbody>
                {h.topRulesByVolume.map((row) => (
                  <tr
                    key={row.ruleId}
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/rules#${row.ruleId}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`/rules#${row.ruleId}`);
                      }
                    }}
                    className="border-b border-border/50 cursor-pointer hover:bg-surface-overlay/30"
                  >
                    <td className="px-4 py-2 font-mono text-xs text-white">{row.ruleName}</td>
                    <td className="px-4 py-2 text-right text-white">{row.alertCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-border">
            <Link href="/alerts" className="text-sm text-brand hover:underline">
              Drill into alerts →
            </Link>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden flex flex-col">
          <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
            Top rules by override / closed no action
          </h2>
          <p className="px-4 pt-2 text-xs text-[#8b9cad]">
            Rules that contribute most to investigator overrides (proxy for tuning candidates).
          </p>
          <div className="overflow-x-auto flex-1 min-h-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-overlay/50">
                  <th className="px-4 py-2 font-medium">Rule</th>
                  <th className="px-4 py-2 font-medium text-right">Overrides</th>
                  <th className="px-4 py-2 font-medium text-right">% of resolved</th>
                </tr>
              </thead>
              <tbody>
                {h.topRulesByOverride.map((row) => (
                  <tr key={row.ruleId} className="border-b border-border/50">
                    <td className="px-4 py-2 font-mono text-xs text-white">{row.ruleName}</td>
                    <td className="px-4 py-2 text-right text-white">{row.overrideCount}</td>
                    <td className="px-4 py-2 text-right text-[#8b9cad]">{row.pctOfResolved}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-border mt-auto">
            <Link href="/rules" className="text-sm text-brand hover:underline">
              Rules reference & impact →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
