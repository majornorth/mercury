"use client";

import Link from "next/link";

/** Mock policy/rule version history for v4 Gap 1. Replace with API when governance backend exists. */
const MOCK_VERSION_HISTORY = [
  { versionId: "AML-ONB-2025-Q1", state: "active", effectiveDate: "2025-02-01", changedBy: "J. Smith (Risk)", note: "Full rollout" },
  { versionId: "AML-ONB-2024-Q4", state: "rolled_back", effectiveDate: "2024-11-15", changedBy: "K. Lee (Compliance)", note: "Rolled back 2025-02-01" },
  { versionId: "AML-ONB-2024-Q3", state: "archived", effectiveDate: "2024-08-01", changedBy: "J. Smith (Risk)", note: "Replaced by Q4" },
];

export default function RuleHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link href="/rules" className="text-sm text-[#8b9cad] hover:text-white mb-2 inline-block">
          ← Rules reference
        </Link>
        <h1 className="text-xl font-semibold text-white">Policy / rule version history</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Draft → review → approval → staged deploy → rollout → rollback. Immutable version artifacts for lineage (v4 Gap 1). Mock data.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-overlay/50 text-left text-[#8b9cad]">
              <th className="px-4 py-3 font-medium">Version</th>
              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 font-medium">Effective date</th>
              <th className="px-4 py-3 font-medium">Changed by</th>
              <th className="px-4 py-3 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_VERSION_HISTORY.map((row) => (
              <tr key={row.versionId} className="border-b border-border/50 hover:bg-surface-overlay/30">
                <td className="px-4 py-3 font-mono text-white">{row.versionId}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                    row.state === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                    row.state === "rolled_back" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
                    "bg-surface-overlay text-[#8b9cad]"
                  }`}>
                    {row.state.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#8b9cad]">{row.effectiveDate}</td>
                <td className="px-4 py-3 text-white">{row.changedBy}</td>
                <td className="px-4 py-3 text-[#8b9cad]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-2 text-xs text-[#8b9cad] border-t border-border">
          Rollback and staged deploy are first-class transitions; backend TBD.
        </p>
      </div>
    </div>
  );
}
