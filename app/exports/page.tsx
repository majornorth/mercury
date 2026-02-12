"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/** Mock recent exports for v4 placeholder. Replace with API when export service exists. */
const MOCK_RECENT_EXPORTS = [
  { id: "exp-1", caseId: "case-001", purpose: "Partner bank handoff", createdAt: "2025-02-12T10:00:00Z", policy: "partner-bank-safe" },
  { id: "exp-2", caseId: "case-003", purpose: "Exam response", createdAt: "2025-02-11T15:30:00Z", policy: "exam" },
  { id: "exp-3", caseId: "case-002", purpose: "Partner bank handoff", createdAt: "2025-02-10T09:00:00Z", policy: "partner-bank-safe" },
];

function ExportsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Evidence packages & exports</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Generate redacted case packets for partner bank, exam, or legal. All exports are audited (who, when, purpose). v4 — Operational Scale & Exam Readiness.
        </p>
      </div>

      {caseId && (
        <section className="rounded-lg border border-brand/40 bg-brand/5 p-4 mb-6">
          <h2 className="text-sm font-medium text-brand mb-2">Generate packet for this case</h2>
          <p className="text-sm text-white mb-3">
            You came from case <span className="font-mono">{caseId}</span>. Generate a redacted case packet (partner-bank-safe or exam policy).
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/cases/${caseId}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-white text-sm font-medium hover:opacity-90"
            >
              Open case {caseId} →
            </Link>
            <span className="text-xs text-[#8b9cad] self-center">(Export action from case page when backend is ready)</span>
          </div>
        </section>
      )}

      <section className="rounded-lg border border-border bg-surface-elevated p-6 mb-8">
        <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Generate case packet</h2>
        <p className="text-sm text-white mb-4">
          From a case detail page, use <strong>Export case packet</strong> to create a redacted bundle (timeline, rationale, rules/models, supporting docs) with a chosen policy (e.g. partner-bank-safe, exam).
        </p>
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-white text-sm font-medium hover:opacity-90"
        >
          Open cases to export
        </Link>
      </section>

      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Recent exports (mock)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[#8b9cad]">
                <th className="px-4 py-3 font-medium">Export ID</th>
                <th className="px-4 py-3 font-medium">Case</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Policy</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT_EXPORTS.map((exp) => (
                <tr
                  key={exp.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/cases/${exp.caseId}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/cases/${exp.caseId}`);
                    }
                  }}
                  className="border-b border-border last:border-0 hover:bg-surface-overlay/30 cursor-pointer"
                >
                  <td className="px-4 py-3 font-mono text-white">{exp.id}</td>
                  <td className="px-4 py-3 font-mono text-[#8b9cad]">{exp.caseId}</td>
                  <td className="px-4 py-3 text-white">{exp.purpose}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">{exp.policy}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">
                    {new Date(exp.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-[#8b9cad] border-t border-border">
          Export service and audit (who exported what, when, why) will be implemented with v4 backend.
        </p>
      </section>
    </div>
  );
}

export default function ExportsPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-[#8b9cad]">Loading…</div>}>
      <ExportsContent />
    </Suspense>
  );
}
