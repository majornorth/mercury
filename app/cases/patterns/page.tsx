"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getMergedCases } from "@/lib/caseStore";
import { getCasePatternsFromCases, getCaseIdsByArchetype, type BehaviorArchetypeId } from "@/lib/mockData";

function CasePatternsContent() {
  const searchParams = useSearchParams();
  const highlightArchetype = searchParams.get("archetype") as BehaviorArchetypeId | null;
  const merged = getMergedCases();
  const patterns = getCasePatternsFromCases(merged);

  return (
    <div>
      <p className="text-sm text-[#8b9cad] mb-4">
        Cases grouped by behavior archetype. Use resolution prevalence per pattern to tune rules and thresholds.
      </p>

      <div className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-overlay/50">
              <th className="px-4 py-3 font-medium text-[#8b9cad]">Pattern</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad] text-right">Cases</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad] text-right">Closed no action %</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad] text-right">Escalated %</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad] text-right">SAR %</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad] text-right">Open</th>
              <th className="px-4 py-3 font-medium text-[#8b9cad]"></th>
            </tr>
          </thead>
          <tbody>
            {patterns.map((p) => (
              <tr
                key={p.archetypeId}
                className={`border-b border-border/50 ${highlightArchetype === p.archetypeId ? "bg-brand/10" : ""}`}
              >
                <td className="px-4 py-3 font-medium text-white">{p.label}</td>
                <td className="px-4 py-3 text-right text-white">{p.caseCount}</td>
                <td className="px-4 py-3 text-right text-[#8b9cad]">{p.pctClosedNoAction}%</td>
                <td className="px-4 py-3 text-right text-[#8b9cad]">{p.pctEscalated}%</td>
                <td className="px-4 py-3 text-right text-[#8b9cad]">{p.pctSar}%</td>
                <td className="px-4 py-3 text-right text-[#8b9cad]">{p.open}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/cases/patterns?archetype=${p.archetypeId}`}
                    className="text-brand hover:underline text-xs"
                  >
                    View cases →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {highlightArchetype && (
        <section className="mt-6 rounded-lg border border-border bg-surface-elevated p-4">
          <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Cases in this pattern</h2>
          <p className="text-xs text-[#8b9cad] mb-3">
            Same RBAC as Cases list. Drill to case detail for investigation.
          </p>
          <ul className="space-y-2">
            {getCaseIdsByArchetype(highlightArchetype, merged).map((caseId) => (
              <li key={caseId}>
                <Link href={`/cases/${caseId}`} className="text-brand hover:underline font-mono text-sm">
                  {caseId}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function CasePatternsPage() {
  return (
    <Suspense fallback={<div className="text-[#8b9cad]">Loading…</div>}>
      <CasePatternsContent />
    </Suspense>
  );
}
