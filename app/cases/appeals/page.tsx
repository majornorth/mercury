"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/** Mock appeals for v4 Gap 7 placeholder. Replace with API when appeals backend exists. */
const MOCK_APPEALS = [
  { caseId: "case-001", appealReceivedAt: "2025-02-10T14:00:00Z", status: "pending_adjudication", assignee: "Risk — J. Smith", intakeBy: "Support — A. Jones" },
  { caseId: "case-003", appealReceivedAt: "2025-02-11T09:30:00Z", status: "pending_intake", assignee: "—", intakeBy: "—" },
  { caseId: "case-002", appealReceivedAt: "2025-02-08T11:00:00Z", status: "closed", assignee: "Risk — K. Lee", intakeBy: "Support — A. Jones" },
];

function statusLabel(s: string): string {
  return s.replace(/_/g, " ");
}

export default function AppealsPage() {
  const router = useRouter();
  return (
    <div>
      <p className="text-sm text-[#8b9cad] mb-4">
        Appeals pipeline with separation of duties: support intake vs risk adjudication (v4 Gap 7). Replace with live data when appeals backend is available.
      </p>

      <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Appeals (mock)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[#8b9cad]">
                <th className="px-4 py-3 font-medium">Case</th>
                <th className="px-4 py-3 font-medium">Appeal received</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Intake by</th>
                <th className="px-4 py-3 font-medium">Adjudication assignee</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_APPEALS.map((a) => (
                <tr
                  key={a.caseId}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/cases/${a.caseId}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/cases/${a.caseId}`);
                    }
                  }}
                  className="border-b border-border last:border-0 hover:bg-surface-overlay/30 cursor-pointer"
                >
                  <td className="px-4 py-3 font-mono text-[#8b9cad]">{a.caseId}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">
                    {new Date(a.appealReceivedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-white capitalize">
                    {statusLabel(a.status)}
                  </td>
                  <td className="px-4 py-3 text-[#8b9cad]">{a.intakeBy}</td>
                  <td className="px-4 py-3 text-[#8b9cad]">{a.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-[#8b9cad] border-t border-border">
          Support intake and risk adjudication are separate roles; full audit trail TBD with backend.
        </p>
      </div>
    </div>
  );
}
