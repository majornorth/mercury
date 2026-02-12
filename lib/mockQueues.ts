/**
 * Mock queue and SLA data for v4 (Operational Scale & Exam Readiness).
 * Replace with API when queue/SLA backend is available.
 */

export interface QueueSummary {
  id: string;
  name: string;
  rail: string;
  severity: "critical" | "high" | "medium" | "low";
  count: number;
  assigned: number;
  unassigned: number;
  breachCount: number;
  slaTargetHours: number;
}

export interface SlaSummary {
  triageWithinTargetPct: number;
  firstActionWithinTargetPct: number;
  closureWithinTargetPct: number;
  totalBreachesThisWeek: number;
}

export interface EscalationPath {
  id: string;
  name: string;
  description: string;
  countThisWeek: number;
}

export const MOCK_QUEUES: QueueSummary[] = [
  { id: "q-sar", name: "SAR referral", rail: "TM / AML", severity: "critical", count: 12, assigned: 8, unassigned: 4, breachCount: 1, slaTargetHours: 72 },
  { id: "q-onb", name: "Onboarding hold", rail: "Onboarding", severity: "high", count: 28, assigned: 22, unassigned: 6, breachCount: 0, slaTargetHours: 24 },
  { id: "q-fraud", name: "Account fraud", rail: "Fraud", severity: "high", count: 45, assigned: 40, unassigned: 5, breachCount: 3, slaTargetHours: 48 },
  { id: "q-odd", name: "Ongoing due diligence", rail: "KYC/ODD", severity: "medium", count: 67, assigned: 60, unassigned: 7, breachCount: 0, slaTargetHours: 96 },
  { id: "q-tm", name: "Transaction monitoring", rail: "TM", severity: "medium", count: 120, assigned: 95, unassigned: 25, breachCount: 5, slaTargetHours: 72 },
];

export const MOCK_SLA_SUMMARY: SlaSummary = {
  triageWithinTargetPct: 94,
  firstActionWithinTargetPct: 89,
  closureWithinTargetPct: 91,
  totalBreachesThisWeek: 9,
};

export const MOCK_ESCALATION_PATHS: EscalationPath[] = [
  { id: "path-compliance", name: "Compliance", description: "SAR, AML typology, model governance", countThisWeek: 4 },
  { id: "path-partner-bank", name: "Partner bank", description: "Bank review or action required", countThisWeek: 2 },
  { id: "path-legal", name: "Legal", description: "Legal process or subpoena", countThisWeek: 0 },
  { id: "path-support", name: "Customer support", description: "Customer-facing escalation", countThisWeek: 3 },
];

/** Mock alert -> queue and SLA for v4 Gap 3 (triage surface). Replace with API. */
export type SlaStatus = "within" | "at_risk" | "breach";
export interface AlertQueueSla {
  queueName: string;
  slaStatus: SlaStatus;
  slaHoursLeft: number | null;
}
export const MOCK_ALERT_QUEUE_SLA: Record<string, AlertQueueSla> = {
  "alt-001": { queueName: "SAR referral", slaStatus: "at_risk", slaHoursLeft: 18 },
  "alt-002": { queueName: "Onboarding hold", slaStatus: "within", slaHoursLeft: 12 },
  "alt-003": { queueName: "Account fraud", slaStatus: "breach", slaHoursLeft: 0 },
  "alt-004": { queueName: "Transaction monitoring", slaStatus: "within", slaHoursLeft: 48 },
  "alt-005": { queueName: "Onboarding hold", slaStatus: "within", slaHoursLeft: 20 },
  "alt-006": { queueName: "Account fraud", slaStatus: "within", slaHoursLeft: 24 },
  "alt-007": { queueName: "ODD", slaStatus: "within", slaHoursLeft: 72 },
  "alt-008": { queueName: "SAR referral", slaStatus: "within", slaHoursLeft: 60 },
};
export function getAlertQueueSla(alertId: string): AlertQueueSla | null {
  return MOCK_ALERT_QUEUE_SLA[alertId] ?? null;
}
