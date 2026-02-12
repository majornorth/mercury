import Link from "next/link";
import { MOCK_AUDIT_ENTRIES } from "@/lib/mockAudit";
import type { AuditEventType } from "@/lib/mockAudit";

const EVENT_LABELS: Record<AuditEventType, string> = {
  data_access: "Data access",
  workflow_action: "Workflow action",
  llm_request: "LLM request",
  view_event: "View event",
};

export default function AuditPage() {
  const entries = [...MOCK_AUDIT_ENTRIES].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
  );

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
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Actor</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Resource</th>
              <th className="px-4 py-3 font-medium">Details</th>
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
                    <Link href={`/alerts/${e.resourceId}`} className="text-[#6ea8fe] hover:underline font-mono text-xs">
                      {e.resourceId}
                    </Link>
                  )}
                  {e.resourceType === "case" && (
                    <Link href={`/cases/${e.resourceId}`} className="text-[#6ea8fe] hover:underline font-mono text-xs">
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
