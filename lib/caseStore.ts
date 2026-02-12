/**
 * Client-only store for runtime-created cases (localStorage). Merged with MOCK_CASES for all reads.
 */

import { MOCK_CASES } from "@/lib/mockData";
import type { CaseSummary, OutcomeCode } from "@/lib/mockData";

const STORAGE_KEY = "mercury-created-cases";

export interface CreatedCase {
  id: string;
  alertId: string;
  outcome?: OutcomeCode;
  closedAt?: string;
  segment?: string;
  rationale?: string;
}

export function getCreatedCases(): CreatedCase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CreatedCase[]) : [];
  } catch {
    return [];
  }
}

export function getMergedCases(): (CaseSummary | CreatedCase)[] {
  return [...MOCK_CASES, ...getCreatedCases()];
}

export function getCaseByAlertId(alertId: string): (CaseSummary | CreatedCase) | null {
  return getMergedCases().find((c) => c.alertId === alertId) ?? null;
}

export function createCase(
  alertId: string,
  options?: { segment?: string }
): CreatedCase {
  const created = getCreatedCases();
  const newCase: CreatedCase = {
    id: `case-created-${Date.now()}`,
    alertId,
    segment: options?.segment,
  };
  const updated = [...created, newCase];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return newCase;
}

export function updateCase(id: string, patch: Partial<CreatedCase>): void {
  if (typeof window === "undefined") return;
  const created = getCreatedCases();
  const index = created.findIndex((c) => c.id === id);
  if (index === -1) return;
  const updated = [...created];
  updated[index] = { ...updated[index], ...patch };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
