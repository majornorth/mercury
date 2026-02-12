"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getMergedCases } from "@/lib/caseStore";
import { MOCK_ALERTS } from "@/lib/mockData";
import { CaseDetailView } from "@/components/CaseDetailView";
import type { CaseSummary } from "@/lib/mockData";

export function CaseDetailPageClient() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  if (!id) notFound();

  const merged = getMergedCases();
  const caseItem = merged.find((c) => c.id === id) ?? null;
  if (!caseItem) notFound();

  const alert = MOCK_ALERTS.find((a) => a.id === caseItem.alertId);
  const currentAlert = alert
    ? { id: alert.id, accountName: alert.accountName, accountId: alert.accountId }
    : null;

  const similarCases = merged.filter((c) => {
    if (c.id === caseItem.id) return false;
    const otherAlert = MOCK_ALERTS.find((a) => a.id === c.alertId);
    if (!otherAlert || !alert) return false;
    const sameSegment =
      alert.segment && otherAlert.segment && alert.segment === otherAlert.segment;
    const sharedRule = alert.ruleNames.some((r) => otherAlert.ruleNames.includes(r));
    return sameSegment || sharedRule;
  }) as CaseSummary[];

  return (
    <CaseDetailView
      caseItem={caseItem as CaseSummary}
      alert={currentAlert}
      similarCases={similarCases}
    />
  );
}
