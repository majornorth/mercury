/**
 * Placeholder data for prototype. Replace with API calls to Mercury internal systems.
 */

export type RiskTier = "high" | "medium" | "low";
export type AlertStatus = "new" | "in_review" | "escalated" | "closed";
export type OutcomeCode = "approved" | "denied" | "escalated" | "sar" | "closed_no_action";

export interface Alert {
  id: string;
  accountId: string;
  accountName: string;
  riskTier: RiskTier;
  status: AlertStatus;
  ruleNames: string[];
  createdAt: string;
  segment?: string;
}

export interface AlertDetail extends Alert {
  riskScore: number;
  signalContributions: { name: string; contribution: number; description: string }[];
  transactionSummary: { count: number; totalAmountUsd: number; lastActivity: string };
}

export interface CaseSummary {
  id: string;
  alertId: string;
  outcome: OutcomeCode;
  closedAt: string;
  segment?: string;
  rationale?: string;
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alt-001",
    accountId: "acc-101",
    accountName: "Acme Logistics LLC",
    riskTier: "high",
    status: "new",
    ruleNames: ["TM-INTL-WIRE-VELOCITY", "TM-LARGE-SINGLE"],
    createdAt: "2025-02-12T08:00:00Z",
    segment: "ecommerce",
  },
  {
    id: "alt-002",
    accountId: "acc-102",
    accountName: "Beta Holdings Inc",
    riskTier: "medium",
    status: "in_review",
    ruleNames: ["ONB-BENEFICIAL-OWNER"],
    createdAt: "2025-02-11T14:30:00Z",
    segment: "saas",
  },
  {
    id: "alt-003",
    accountId: "acc-103",
    accountName: "Gamma Payments Co",
    riskTier: "high",
    status: "new",
    ruleNames: ["TM-STRUCTURING", "TM-CASH-INTENSIVE"],
    createdAt: "2025-02-12T06:15:00Z",
    segment: "fintech",
  },
  {
    id: "alt-004",
    accountId: "acc-104",
    accountName: "Delta Imports",
    riskTier: "low",
    status: "closed",
    ruleNames: ["TM-INTL-WIRE-VELOCITY"],
    createdAt: "2025-02-10T11:00:00Z",
    segment: "ecommerce",
  },
];

export const MOCK_ALERT_DETAILS: Record<string, AlertDetail> = {
  "alt-001": {
    ...MOCK_ALERTS[0],
    riskScore: 0.87,
    signalContributions: [
      { name: "International wire velocity", contribution: 0.35, description: "3 wires to same jurisdiction in 7 days" },
      { name: "Single transaction size", contribution: 0.28, description: "Wire > $50k" },
      { name: "New account activity", contribution: 0.24, description: "High volume in first 30 days" },
    ],
    transactionSummary: { count: 12, totalAmountUsd: 184000, lastActivity: "2025-02-12T07:45:00Z" },
  },
};

/** Mock activity for alert detail when no workflow actions have been taken yet. */
export interface MockActivityEntry {
  at: string;
  action: string;
  detail?: string;
}

export const MOCK_ALERT_ACTIVITY: Record<string, MockActivityEntry[]> = {
  "alt-001": [
    { at: "2025-02-12T08:15:00Z", action: "Assigned to me" },
    { at: "2025-02-12T08:45:00Z", action: "Request info", detail: "To customer — Source of funds and business purpose for recent wires" },
    { at: "2025-02-12T09:30:00Z", action: "Escalated", detail: "Pending customer response; holding for 48h then re-review." },
  ],
  "alt-002": [
    { at: "2025-02-11T15:00:00Z", action: "Assigned to me" },
    { at: "2025-02-11T16:30:00Z", action: "Request info", detail: "To ops — Beneficial owner verification status" },
    { at: "2025-02-10T12:00:00Z", action: "Escalated", detail: "Beneficial owner structure unclear; escalated to partner bank for review." },
  ],
  "alt-003": [
    { at: "2025-02-12T06:30:00Z", action: "Assigned to me" },
  ],
  "alt-004": [
    { at: "2025-02-10T11:30:00Z", action: "Assigned to me" },
    { at: "2025-02-11T14:00:00Z", action: "Request info", detail: "To customer — Documentation for supplier payment pattern" },
    { at: "2025-02-11T16:00:00Z", action: "Closed", detail: "Closed no action — Wire pattern explained by legitimate supplier payments; no further action." },
  ],
};

export const MOCK_CASES: CaseSummary[] = [
  {
    id: "case-1",
    alertId: "alt-004",
    outcome: "closed_no_action",
    closedAt: "2025-02-11T16:00:00Z",
    segment: "ecommerce",
    rationale: "Wire pattern explained by legitimate supplier payments; no further action.",
  },
  {
    id: "case-2",
    alertId: "alt-002",
    outcome: "escalated",
    closedAt: "2025-02-10T12:00:00Z",
    segment: "saas",
    rationale: "Beneficial owner structure unclear; escalated to partner bank for review.",
  },
  {
    id: "case-3",
    alertId: "alt-001",
    outcome: "closed_no_action",
    closedAt: "2025-02-12T10:00:00Z",
    segment: "ecommerce",
    rationale: "Aligned with case-1 (same segment, TM-INTL-WIRE-VELOCITY); closed no action.",
  },
];
