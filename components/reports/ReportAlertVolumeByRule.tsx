import Link from "next/link";
import { MOCK_ALERT_VOLUME_BY_RULE, type AlertVolumeByRuleRow } from "@/lib/mockData";

export function ReportAlertVolumeByRule() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap px-4 py-3 border-b border-border">
          <h2 className="text-sm font-medium text-[#8b9cad]">Alert volume by rule</h2>
          <Link
            href="/rules"
            className="text-sm font-medium text-brand hover:underline shrink-0"
          >
            Rules reference
          </Link>
        </div>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Rule and threshold impact; use for policy tuning and triage prioritization. &quot;% closed no action&quot; is a proxy for false positive rate.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Rule</th>
                <th className="px-4 py-2 font-medium text-right">Alerts</th>
                <th className="px-4 py-2 font-medium text-right">Closed no action</th>
                <th className="px-4 py-2 font-medium text-right">Escalated</th>
                <th className="px-4 py-2 font-medium text-right">SAR</th>
                <th className="px-4 py-2 font-medium text-right">Open</th>
                <th className="px-4 py-2 font-medium text-right">% closed no action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ALERT_VOLUME_BY_RULE.map((row: AlertVolumeByRuleRow) => (
                <tr key={row.ruleId} className="border-b border-border/50">
                  <td className="px-4 py-2 font-mono text-xs">{row.ruleName}</td>
                  <td className="px-4 py-2 text-right">{row.alertCount}</td>
                  <td className="px-4 py-2 text-right">{row.closedNoAction}</td>
                  <td className="px-4 py-2 text-right">{row.escalated}</td>
                  <td className="px-4 py-2 text-right">{row.sar}</td>
                  <td className="px-4 py-2 text-right text-[#8b9cad]">{row.open}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.pctClosedNoAction}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
