"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MOCK_AUDIT_ENTRIES } from "@/lib/mockAudit";
import type { AuditEventType } from "@/lib/mockAudit";

const EVENT_LABELS: Record<AuditEventType, string> = {
  data_access: "Data access",
  workflow_action: "Workflow action",
  llm_request: "LLM request",
  view_event: "View event",
};

type SortKey = "time" | "actor" | "event" | "resource" | "details";
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

export default function AuditPage() {
  const [sortKey, setSortKey] = useState<SortKey | null>("time");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const entries = useMemo(() => {
    const list = [...MOCK_AUDIT_ENTRIES];
    if (!sortKey) return list;
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "time":
          cmp = new Date(a.at).getTime() - new Date(b.at).getTime();
          break;
        case "actor":
          cmp = a.actorId.localeCompare(b.actorId);
          break;
        case "event":
          cmp = EVENT_LABELS[a.eventType].localeCompare(EVENT_LABELS[b.eventType]);
          break;
        case "resource":
          cmp =
            a.resourceType.localeCompare(b.resourceType) ||
            a.resourceId.localeCompare(b.resourceId);
          break;
        case "details":
          cmp = (a.details ?? "").localeCompare(b.details ?? "");
          break;
        default:
          return 0;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [sortKey, sortDir]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Audit log</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Data access, workflow actions, LLM usage, and view events. In production, stored in a dedicated append-only audit store with retention.
        </p>
        <p className="text-xs text-[#8b9cad] mt-2 rounded bg-surface-overlay/50 px-2 py-1.5 inline-block">
          System status: Operational (mock). In production, this would reflect real health checks.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-overlay/50">
              <SortableTh
                label="Time"
                sortKey="time"
                currentSortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortableTh
                label="Actor"
                sortKey="actor"
                currentSortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortableTh
                label="Event"
                sortKey="event"
                currentSortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortableTh
                label="Resource"
                sortKey="resource"
                currentSortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortableTh
                label="Details"
                sortKey="details"
                currentSortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-surface-overlay/30">
                <td className="px-4 py-3 text-[#8b9cad] whitespace-nowrap">
                  {new Date(e.at).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#8b9cad]">{e.actorId}</td>
                <td className="px-4 py-3">{EVENT_LABELS[e.eventType]}</td>
                <td className="px-4 py-3">
                  {e.resourceType === "alert" && (
                    <Link href={`/alerts/${e.resourceId}`} className="text-brand hover:underline font-mono text-xs">
                      {e.resourceId}
                    </Link>
                  )}
                  {e.resourceType === "case" && (
                    <Link href={`/cases/${e.resourceId}`} className="text-brand hover:underline font-mono text-xs">
                      {e.resourceId}
                    </Link>
                  )}
                  {e.resourceType !== "alert" && e.resourceType !== "case" && (
                    <span className="font-mono text-xs text-[#8b9cad]">{e.resourceId}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#8b9cad]">{e.details ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
