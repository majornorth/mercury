"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMergedCases } from "@/lib/caseStore";
import { MOCK_ALERTS } from "@/lib/mockData";
import type { OutcomeCode } from "@/lib/mockData";

function outcomeLabel(code: OutcomeCode): string {
  return code.replace(/_/g, " ");
}

export function CaseList() {
  const router = useRouter();
  const alertsById = Object.fromEntries(MOCK_ALERTS.map((a) => [a.id, a]));
  const cases = getMergedCases();

  return (
    <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-overlay/50">
            <th className="px-4 py-3 font-medium">Case</th>
            <th className="px-4 py-3 font-medium">Alert</th>
            <th className="px-4 py-3 font-medium">Account</th>
            <th className="px-4 py-3 font-medium">Outcome</th>
            <th className="px-4 py-3 font-medium">Segment</th>
            <th className="px-4 py-3 font-medium">Closed</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => {
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
