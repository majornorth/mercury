"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMergedCases } from "@/lib/caseStore";
import { MOCK_ALERTS } from "@/lib/mockData";
import type { OutcomeCode } from "@/lib/mockData";

function outcomeLabel(code: OutcomeCode): string {
  return code.replace(/_/g, " ");
}

type SortKey = "id" | "alertId" | "account" | "outcome" | "segment" | "closedAt";
type SortDir = "asc" | "desc";

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

export function CaseList() {
  const router = useRouter();
  const alertsById = Object.fromEntries(MOCK_ALERTS.map((a) => [a.id, a]));
  const cases = getMergedCases();

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

  const sortedCases = useMemo(() => {
    const list = [...cases];
    if (!sortKey) return list;
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "id":
          cmp = a.id.localeCompare(b.id);
          break;
        case "alertId":
          cmp = a.alertId.localeCompare(b.alertId);
          break;
        case "account": {
          const nameA = alertsById[a.alertId]?.accountName ?? "";
          const nameB = alertsById[b.alertId]?.accountName ?? "";
          cmp = nameA.localeCompare(nameB) || a.alertId.localeCompare(b.alertId);
          break;
        }
        case "outcome": {
          const labelA = a.outcome != null ? outcomeLabel(a.outcome) : "Open";
          const labelB = b.outcome != null ? outcomeLabel(b.outcome) : "Open";
          cmp = labelA.localeCompare(labelB);
          break;
        }
        case "segment": {
          const segA = a.segment ?? "";
          const segB = b.segment ?? "";
          cmp = segA.localeCompare(segB);
          break;
        }
        case "closedAt":
          cmp =
            (a.closedAt != null ? new Date(a.closedAt).getTime() : 0) -
            (b.closedAt != null ? new Date(b.closedAt).getTime() : 0);
          break;
        default:
          return 0;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [cases, sortKey, sortDir, alertsById]);

  return (
    <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-overlay/50">
            <SortableTh
              label="Case"
              sortKey="id"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Alert"
              sortKey="alertId"
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
              label="Outcome"
              sortKey="outcome"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Segment"
              sortKey="segment"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <SortableTh
              label="Closed"
              sortKey="closedAt"
              currentSortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {sortedCases.map((c) => {
            const alert = alertsById[c.alertId];
            return (
              <tr
                key={c.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/cases/${c.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/cases/${c.id}`);
                  }
                }}
                className="border-b border-border/50 hover:bg-surface-overlay/30 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 font-mono text-[#8b9cad]">{c.id}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={`/alerts/${c.alertId}`}
                    className="font-mono text-brand hover:underline"
                  >
                    {c.alertId}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {alert ? (
                    <span className="text-[#8b9cad]">{alert.accountName}</span>
                  ) : (
                    <span className="text-[#8b9cad]">—</span>
                  )}
                </td>
                <td className="px-4 py-3 capitalize">
                  {c.outcome != null ? outcomeLabel(c.outcome) : "Open"}
                </td>
                <td className="px-4 py-3 text-[#8b9cad]">{c.segment ?? "—"}</td>
                <td className="px-4 py-3 text-[#8b9cad]">
                  {c.closedAt != null ? new Date(c.closedAt).toLocaleDateString() : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
