"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllAuditEntries } from "@/lib/mockAudit";
import type { AuditEventType, AuditPurpose } from "@/lib/mockAudit";

const EVENT_LABELS: Record<AuditEventType, string> = {
  data_access: "Data access",
  workflow_action: "Workflow action",
  llm_request: "LLM request",
  view_event: "View event",
  simulation_run: "Simulation run",
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

const PURPOSE_OPTIONS: { value: "" | AuditPurpose; label: string }[] = [
  { value: "", label: "All purposes" },
  { value: "investigation", label: "Investigation" },
  { value: "qa", label: "QA" },
  { value: "exam_response", label: "Exam response" },
  { value: "other", label: "Other" },
];

function purposeLabel(p?: AuditPurpose): string {
  if (!p) return "—";
  return p === "exam_response" ? "Exam response" : p === "qa" ? "QA" : p.charAt(0).toUpperCase() + p.slice(1);
}

function getResourceHref(e: { resourceType: string; resourceId: string }): string | null {
  if (e.resourceType === "alert") return `/alerts/${e.resourceId}`;
  if (e.resourceType === "case") return `/cases/${e.resourceId}`;
  if (e.resourceType === "rule") return `/rules#${e.resourceId}`;
  return null;
}

export default function AuditPage() {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey | null>("time");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [purposeFilter, setPurposeFilter] = useState<"" | AuditPurpose>("");
  const [legalHoldFilter, setLegalHoldFilter] = useState<"" | "hold" | "no_hold">("");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const entries = useMemo(() => {
    let list = getAllAuditEntries();
    if (purposeFilter) {
      list = list.filter((e) => e.purpose === purposeFilter);
    }
    if (legalHoldFilter === "hold") {
      list = list.filter((e) => e.underLegalHold === true);
    } else if (legalHoldFilter === "no_hold") {
      list = list.filter((e) => e.underLegalHold !== true);
    }
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
  }, [sortKey, sortDir, purposeFilter, legalHoldFilter]);

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
        <div className="mt-3 rounded-lg border border-border bg-surface-elevated/80 p-3 text-xs text-[#8b9cad]">
          <strong className="text-white">v4 audit depth:</strong> Need-to-know RBAC and purpose-based access (e.g. investigation, QA, exam response) will tag access events. Append-only store with retention rules and legal-hold controls; audit queries for exams and legal requests. Backend TBD.
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="audit-purpose" className="text-sm text-[#8b9cad]">Purpose (v4):</label>
            <select
              id="audit-purpose"
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value as "" | AuditPurpose)}
              className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {PURPOSE_OPTIONS.map((o) => (
                <option key={o.value || "all"} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="audit-legal-hold" className="text-sm text-[#8b9cad]">Legal hold (v5):</label>
            <select
              id="audit-legal-hold"
              value={legalHoldFilter}
              onChange={(e) => setLegalHoldFilter(e.target.value as "" | "hold" | "no_hold")}
              className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="">All</option>
              <option value="hold">Under hold</option>
              <option value="no_hold">Not under hold</option>
            </select>
          </div>
        </div>
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
              <th className="px-4 py-3 font-medium text-[#8b9cad]">Purpose</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad]">Legal hold (v5)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => {
              const href = getResourceHref(e);
              return (
                <tr
                  key={i}
                  role={href ? "button" : undefined}
                  tabIndex={href ? 0 : undefined}
                  onClick={() => href && router.push(href)}
                  onKeyDown={(ev) => {
                    if (href && (ev.key === "Enter" || ev.key === " ")) {
                      ev.preventDefault();
                      router.push(href);
                    }
                  }}
                  className={`border-b border-border/50 hover:bg-surface-overlay/30 ${href ? "cursor-pointer" : ""}`}
                >
                  <td className="px-4 py-3 text-[#8b9cad] whitespace-nowrap">
                    {new Date(e.at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#8b9cad]">{e.actorId}</td>
                  <td className="px-4 py-3">{EVENT_LABELS[e.eventType]}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#8b9cad]">{e.resourceId}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">{e.details ?? "—"}</td>
                  <td className="px-4 py-3 text-[#8b9cad] text-xs">{purposeLabel(e.purpose)}</td>
                  <td className="px-4 py-3">
                    {e.underLegalHold ? (
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">Under hold</span>
                    ) : (
                      <span className="text-[#8b9cad] text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
