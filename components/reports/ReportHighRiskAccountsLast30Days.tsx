import Link from "next/link";
import {
  MOCK_HIGH_RISK_ACCOUNTS_LAST_30_DAYS,
  type HighRiskAccountRow,
} from "@/lib/mockData";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadge(status: HighRiskAccountRow["status"]) {
  const styles: Record<HighRiskAccountRow["status"], string> = {
    new: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    in_review: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    escalated: "bg-red-500/20 text-red-400 border-red-500/40",
    closed: "bg-[#8b9cad]/20 text-[#8b9cad] border-[#8b9cad]/40",
  };
  const label =
    status === "in_review" ? "In review" : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${styles[status]}`}
    >
      {label}
    </span>
  );
}

export function ReportHighRiskAccountsLast30Days() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap px-4 py-3 border-b border-border">
          <h2 className="text-sm font-medium text-[#8b9cad]">
            High-risk accounts (last 30 days)
          </h2>
          <Link
            href="/alerts"
            className="text-sm font-medium text-brand hover:underline shrink-0"
          >
            View all alerts
          </Link>
        </div>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          Accounts with risk tier High that had at least one alert in the last 30 days. Use for
          prioritization and cohort review.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Account</th>
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium text-right">Alerts (30d)</th>
                <th className="px-4 py-2 font-medium text-right">Open</th>
                <th className="px-4 py-2 font-medium">Last alert</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Top rules</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HIGH_RISK_ACCOUNTS_LAST_30_DAYS.map((row: HighRiskAccountRow) => (
                <tr key={row.accountId} className="border-b border-border/50">
                  <td className="px-4 py-2">
                    <Link
                      href={`/alerts?account=${row.accountId}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {row.accountName}
                    </Link>
                    <span className="ml-1.5 font-mono text-xs text-[#8b9cad]">
                      {row.accountId}
                    </span>
                  </td>
                  <td className="px-4 py-2 capitalize text-[#8b9cad]">{row.segment}</td>
                  <td className="px-4 py-2 text-right">{row.alertCount}</td>
                  <td className="px-4 py-2 text-right">{row.openAlerts}</td>
                  <td className="px-4 py-2 text-[#8b9cad]">{formatDate(row.lastAlertAt)}</td>
                  <td className="px-4 py-2">{statusBadge(row.status)}</td>
                  <td className="px-4 py-2 font-mono text-xs text-[#8b9cad]">
                    {row.topRules.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
