"use client";

import Link from "next/link";
import type { Alert } from "@/lib/mockData";
import { MOCK_ALERTS } from "@/lib/mockData";

function RiskBadge({ tier }: { tier: Alert["riskTier"] }) {
  const classes =
    tier === "high"
      ? "risk-badge-high"
      : tier === "medium"
        ? "risk-badge-medium"
        : "risk-badge-low";
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded ${classes}`}>
      {tier}
    </span>
  );
}

function StatusBadge({ status }: { status: Alert["status"] }) {
  return (
    <span className="text-xs text-[#8b9cad] bg-surface-overlay px-2 py-0.5 rounded">
      {status.replace("_", " ")}
    </span>
  );
}

export function AlertList() {
  return (
    <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-overlay/50">
            <th className="px-4 py-3 font-medium">Alert</th>
            <th className="px-4 py-3 font-medium">Account</th>
            <th className="px-4 py-3 font-medium">Risk</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Rules</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 w-20" />
          </tr>
        </thead>
        <tbody>
          {MOCK_ALERTS.map((alert) => (
            <tr
              key={alert.id}
              className="border-b border-border/50 hover:bg-surface-overlay/30 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-[#8b9cad]">{alert.id}</td>
              <td className="px-4 py-3">
                <span className="font-medium">{alert.accountName}</span>
                <span className="text-[#8b9cad] ml-1 font-mono text-xs">
                  {alert.accountId}
                </span>
              </td>
              <td className="px-4 py-3">
                <RiskBadge tier={alert.riskTier} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={alert.status} />
              </td>
              <td className="px-4 py-3 text-[#8b9cad]">
                {alert.ruleNames.join(", ")}
              </td>
              <td className="px-4 py-3 text-[#8b9cad]">
                {new Date(alert.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/alerts/${alert.id}`}
                  className="text-[#6ea8fe] hover:underline text-xs font-medium"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
