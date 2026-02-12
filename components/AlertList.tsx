"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Alert, RiskTier } from "@/lib/mockData";
import { MOCK_ALERTS } from "@/lib/mockData";

const RISK_ORDER: Record<RiskTier, number> = { high: 3, medium: 2, low: 1 };

type SortKey = "alert" | "account" | "risk" | "status" | "rules" | "created";
type SortDir = "asc" | "desc";

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

function SortableTh({
  label,
  sortKey,
  currentSortKey,
  sortDir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSortKey: SortKey | null;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const isActive = currentSortKey === sortKey;
  return (
    <th
      className="px-4 py-3 font-medium cursor-pointer select-none hover:bg-surface-overlay transition-colors rounded-t min-w-0"
      onClick={(e) => {
        e.stopPropagation();
        onSort(sortKey);
      }}
      title={
        isActive
          ? `Sorted ${sortDir === "asc" ? "ascending" : "descending"}. Click to reverse.`
          : "Click to sort by this column."
      }
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive && (
          <span className="text-brand" aria-hidden>
            {sortDir === "asc" ? "↑" : "↓"}
          </span>
        )}
      </span>
    </th>
  );
}

export function AlertList() {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedAlerts = useMemo(() => {
    const list = [...MOCK_ALERTS];
    if (!sortKey) return list;
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "alert":
          cmp = a.id.localeCompare(b.id);
          break;
        case "account":
          cmp = a.accountName.localeCompare(b.accountName) || a.accountId.localeCompare(b.accountId);
          break;
        case "risk":
          cmp = RISK_ORDER[a.riskTier] - RISK_ORDER[b.riskTier];
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "rules":
          cmp = a.ruleNames.join(",").localeCompare(b.ruleNames.join(","));
          break;
        case "created":
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [sortKey, sortDir]);

  return (
    <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-overlay/50">
            <SortableTh
              label="Alert"
              sortKey="alert"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Account"
              sortKey="account"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Risk"
              sortKey="risk"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Status"
              sortKey="status"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Rules"
              sortKey="rules"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Created"
              sortKey="created"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {sortedAlerts.map((alert) => (
            <tr
              key={alert.id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/alerts/${alert.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/alerts/${alert.id}`);
                }
              }}
              className="border-b border-border/50 hover:bg-surface-overlay/30 transition-colors cursor-pointer"
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
