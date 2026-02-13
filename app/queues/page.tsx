"use client";

import Link from "next/link";
import {
  MOCK_QUEUES,
  MOCK_SLA_SUMMARY,
  MOCK_ESCALATION_PATHS,
  type QueueSummary,
  type SlaSummary,
  type EscalationPath,
} from "@/lib/mockQueues";

function severityClass(s: QueueSummary["severity"]): string {
  switch (s) {
    case "critical":
      return "risk-badge-high";
    case "high":
      return "risk-badge-high";
    case "medium":
      return "risk-badge-medium";
    case "low":
      return "risk-badge-low";
    default:
      return "bg-surface-overlay text-[#8b9cad]";
  }
}

export default function QueuesPage() {
  const sla: SlaSummary = MOCK_SLA_SUMMARY;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Queues & SLA</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Multi-queue triage, SLA clocks, and escalation paths (v4 — Operational Scale & Exam Readiness). Replace with live data when backend is available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Triage within SLA</h2>
          <p className="text-2xl font-semibold text-white">{sla.triageWithinTargetPct}%</p>
          <p className="text-sm text-[#8b9cad] mt-1">Alerts triaged within target</p>
        </section>
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">First action within SLA</h2>
          <p className="text-2xl font-semibold text-white">{sla.firstActionWithinTargetPct}%</p>
          <p className="text-sm text-[#8b9cad] mt-1">First action within target</p>
        </section>
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Closure within SLA</h2>
          <p className="text-2xl font-semibold text-white">{sla.closureWithinTargetPct}%</p>
          <p className="text-sm text-[#8b9cad] mt-1">Cases closed within target</p>
        </section>
        <section className="rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-xs font-medium text-[#8b9cad] uppercase tracking-wide mb-2">Breaches this week</h2>
          <p className={`text-2xl font-semibold ${sla.totalBreachesThisWeek > 0 ? "text-amber-400" : "text-white"}`}>
            {sla.totalBreachesThisWeek}
          </p>
          <p className="text-sm text-[#8b9cad] mt-1">SLA breaches</p>
        </section>
      </div>

      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden mb-8">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Queues by rail and severity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[#8b9cad]">
                <th className="px-4 py-3 font-medium">Queue</th>
                <th className="px-4 py-3 font-medium">Rail</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Count</th>
                <th className="px-4 py-3 font-medium">Assigned / Unassigned</th>
                <th className="px-4 py-3 font-medium">Breaches</th>
                <th className="px-4 py-3 font-medium">SLA target</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUEUES.map((q) => (
                <tr key={q.id} className="border-b border-border last:border-0 hover:bg-surface-overlay/30">
                  <td className="px-4 py-3">
                    <span className="font-medium text-white">{q.name}</span>
                  </td>
                  <td className="px-4 py-3 text-[#8b9cad]">{q.rail}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${severityClass(q.severity)}`}>
                      {q.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{q.count}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">
                    {q.assigned} / <span className="text-amber-400">{q.unassigned}</span>
                  </td>
                  <td className="px-4 py-3">
                    {q.breachCount > 0 ? (
                      <span className="text-amber-400 font-medium">{q.breachCount}</span>
                    ) : (
                      <span className="text-[#8b9cad]">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#8b9cad]">{q.slaTargetHours}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-[#8b9cad] border-t border-border">
          Assignment logic and routing rules configurable per queue (v4). Drill to alerts from queue TBD.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface-elevated p-4">
        <h2 className="text-sm font-medium text-[#8b9cad] mb-3">Escalation paths</h2>
        <p className="text-xs text-[#8b9cad] mb-3">
          Explicit paths with templated handoffs (compliance, partner bank, legal, support). Count this week.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_ESCALATION_PATHS.map((path: EscalationPath) => (
            <div
              key={path.id}
              className="rounded-md border border-border bg-surface p-3"
            >
              <p className="font-medium text-white text-sm">{path.name}</p>
              <p className="text-xs text-[#8b9cad] mt-1">{path.description}</p>
              <p className="text-sm text-white mt-2">{path.countThisWeek} this week</p>
            </div>
          ))}
        </div>
        <Link href="/cases" className="inline-block mt-3 text-sm text-brand hover:underline">
          Cases →
        </Link>
      </section>
    </div>
  );
}
