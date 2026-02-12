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

/** Case record. outcome/closedAt optional for open (created) cases; consumers show "Open" / "—" when missing. */
export interface CaseSummary {
  id: string;
  alertId: string;
  outcome?: OutcomeCode;
  closedAt?: string;
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
    ruleNames: ["TM-STRUCTURING", "TM-CASH-INTENSIVE", "TM-RAPID-MOVEMENT"],
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
  { id: "alt-005", accountId: "acc-105", accountName: "Epsilon Trading Ltd", riskTier: "medium", status: "new", ruleNames: ["TM-LARGE-SINGLE", "TM-INTL-WIRE-VELOCITY"], createdAt: "2025-02-12T07:20:00Z", segment: "ecommerce" },
  { id: "alt-006", accountId: "acc-106", accountName: "Zeta Financial Services", riskTier: "high", status: "in_review", ruleNames: ["TM-STRUCTURING"], createdAt: "2025-02-11T09:00:00Z", segment: "fintech" },
  { id: "alt-007", accountId: "acc-107", accountName: "Eta Commerce Inc", riskTier: "low", status: "closed", ruleNames: ["ONB-BENEFICIAL-OWNER"], createdAt: "2025-02-09T16:45:00Z", segment: "ecommerce" },
  { id: "alt-008", accountId: "acc-108", accountName: "Theta Payments Group", riskTier: "medium", status: "escalated", ruleNames: ["TM-CASH-INTENSIVE", "TM-LARGE-SINGLE", "TM-HIGH-RISK-JURISDICTION"], createdAt: "2025-02-11T12:30:00Z", segment: "fintech" },
  { id: "alt-009", accountId: "acc-109", accountName: "Iota Supply Chain Co", riskTier: "high", status: "new", ruleNames: ["TM-INTL-WIRE-VELOCITY", "TM-STRUCTURING"], createdAt: "2025-02-12T05:00:00Z", segment: "ecommerce" },
  { id: "alt-010", accountId: "acc-110", accountName: "Kappa Software LLC", riskTier: "medium", status: "in_review", ruleNames: ["ONB-BENEFICIAL-OWNER", "TM-LARGE-SINGLE"], createdAt: "2025-02-10T14:00:00Z", segment: "saas" },
  { id: "alt-011", accountId: "acc-111", accountName: "Lambda Export Partners", riskTier: "low", status: "new", ruleNames: ["TM-INTL-WIRE-VELOCITY"], createdAt: "2025-02-12T04:15:00Z", segment: "ecommerce" },
  { id: "alt-012", accountId: "acc-112", accountName: "Mu Ventures Inc", riskTier: "high", status: "escalated", ruleNames: ["TM-STRUCTURING", "TM-CASH-INTENSIVE"], createdAt: "2025-02-08T10:20:00Z", segment: "fintech" },
  { id: "alt-013", accountId: "acc-113", accountName: "Nu Retail Holdings", riskTier: "medium", status: "closed", ruleNames: ["TM-LARGE-SINGLE"], createdAt: "2025-02-09T08:30:00Z", segment: "ecommerce" },
  { id: "alt-014", accountId: "acc-114", accountName: "Xi Digital Wallet Co", riskTier: "high", status: "new", ruleNames: ["TM-CASH-INTENSIVE", "TM-INTL-WIRE-VELOCITY"], createdAt: "2025-02-12T03:00:00Z", segment: "fintech" },
  { id: "alt-015", accountId: "acc-115", accountName: "Omicron B2B Solutions", riskTier: "medium", status: "in_review", ruleNames: ["ONB-BENEFICIAL-OWNER", "ONB-SANCTIONS-EDGE"], createdAt: "2025-02-11T11:15:00Z", segment: "saas" },
  { id: "alt-016", accountId: "acc-116", accountName: "Pi Logistics Network", riskTier: "low", status: "new", ruleNames: ["TM-INTL-WIRE-VELOCITY", "TM-LARGE-SINGLE", "TM-RAPID-MOVEMENT"], createdAt: "2025-02-12T02:45:00Z", segment: "ecommerce" },
  { id: "alt-017", accountId: "acc-117", accountName: "Rho Capital Partners", riskTier: "high", status: "in_review", ruleNames: ["TM-STRUCTURING"], createdAt: "2025-02-10T17:00:00Z", segment: "fintech" },
  { id: "alt-018", accountId: "acc-118", accountName: "Sigma Cloud Services", riskTier: "medium", status: "closed", ruleNames: ["TM-LARGE-SINGLE", "ONB-BENEFICIAL-OWNER"], createdAt: "2025-02-08T13:30:00Z", segment: "saas" },
  { id: "alt-019", accountId: "acc-119", accountName: "Tau Manufacturing Ltd", riskTier: "low", status: "escalated", ruleNames: ["TM-INTL-WIRE-VELOCITY"], createdAt: "2025-02-11T08:00:00Z", segment: "ecommerce" },
  { id: "alt-020", accountId: "acc-120", accountName: "Upsilon Pay Inc", riskTier: "medium", status: "new", ruleNames: ["TM-CASH-INTENSIVE"], createdAt: "2025-02-12T01:30:00Z", segment: "fintech" },
  { id: "alt-021", accountId: "acc-121", accountName: "Phi Analytics Corp", riskTier: "high", status: "new", ruleNames: ["TM-STRUCTURING", "TM-LARGE-SINGLE"], createdAt: "2025-02-12T00:15:00Z", segment: "saas" },
  { id: "alt-022", accountId: "acc-122", accountName: "Chi Global Trade", riskTier: "medium", status: "in_review", ruleNames: ["TM-INTL-WIRE-VELOCITY", "TM-CASH-INTENSIVE"], createdAt: "2025-02-10T09:45:00Z", segment: "ecommerce" },
  { id: "alt-023", accountId: "acc-123", accountName: "Psi Fintech Labs", riskTier: "low", status: "closed", ruleNames: ["ONB-BENEFICIAL-OWNER", "TM-INTL-WIRE-VELOCITY", "ONB-SANCTIONS-EDGE"], createdAt: "2025-02-07T15:20:00Z", segment: "fintech" },
  { id: "alt-024", accountId: "acc-124", accountName: "Omega Enterprises", riskTier: "high", status: "escalated", ruleNames: ["TM-STRUCTURING", "TM-INTL-WIRE-VELOCITY", "TM-LARGE-SINGLE"], createdAt: "2025-02-09T07:00:00Z", segment: "ecommerce" },
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
  {
    id: "case-4",
    alertId: "alt-007",
    outcome: "approved",
    closedAt: "2025-02-10T09:00:00Z",
    segment: "ecommerce",
    rationale: "Beneficial owner verified; onboarding completed with enhanced monitoring for 90 days.",
  },
  {
    id: "case-5",
    alertId: "alt-008",
    outcome: "escalated",
    closedAt: "2025-02-11T14:00:00Z",
    segment: "fintech",
    rationale: "High-risk jurisdiction exposure and cash-intensive pattern; handed off to partner bank for decision.",
  },
  {
    id: "case-6",
    alertId: "alt-012",
    outcome: "sar",
    closedAt: "2025-02-09T11:30:00Z",
    segment: "fintech",
    rationale: "Structuring indicators and cash-intensive activity; SAR filed; account restricted pending investigation.",
  },
  {
    id: "case-7",
    alertId: "alt-013",
    outcome: "closed_no_action",
    closedAt: "2025-02-10T12:00:00Z",
    segment: "ecommerce",
    rationale: "Single large wire explained as inventory purchase; documentation on file.",
  },
  {
    id: "case-8",
    alertId: "alt-018",
    outcome: "approved",
    closedAt: "2025-02-09T15:00:00Z",
    segment: "saas",
    rationale: "Large single transaction and beneficial owner alert cleared after verification; no adverse findings.",
  },
  {
    id: "case-9",
    alertId: "alt-019",
    outcome: "escalated",
    closedAt: "2025-02-11T10:00:00Z",
    segment: "ecommerce",
    rationale: "International wire velocity to jurisdiction under review; escalated to compliance for jurisdiction reassessment.",
  },
  {
    id: "case-10",
    alertId: "alt-023",
    outcome: "closed_no_action",
    closedAt: "2025-02-08T16:00:00Z",
    segment: "fintech",
    rationale: "Beneficial owner and sanctions edge case; all clear after re-screening and source-of-funds review.",
  },
  {
    id: "case-11",
    alertId: "alt-024",
    outcome: "escalated",
    closedAt: "2025-02-09T09:00:00Z",
    segment: "ecommerce",
    rationale: "Multiple rule hits (structuring, intl wire velocity, large single); escalated to partner bank with full package.",
  },
  {
    id: "case-12",
    alertId: "alt-006",
    outcome: "denied",
    closedAt: "2025-02-11T17:30:00Z",
    segment: "fintech",
    rationale: "Structuring pattern not sufficiently explained; relationship terminated per policy.",
  },
  {
    id: "case-13",
    alertId: "alt-003",
    segment: "fintech",
    rationale: undefined,
  },
  {
    id: "case-14",
    alertId: "alt-005",
    outcome: "closed_no_action",
    closedAt: "2025-02-12T09:00:00Z",
    segment: "ecommerce",
    rationale: "Large single and intl wire velocity consistent with declared trade; closed no action.",
  },
  {
    id: "case-15",
    alertId: "alt-009",
    segment: "ecommerce",
    rationale: undefined,
  },
  {
    id: "case-16",
    alertId: "alt-010",
    outcome: "approved",
    closedAt: "2025-02-11T13:00:00Z",
    segment: "saas",
    rationale: "Beneficial owner and large single verified; account approved with standard monitoring.",
  },
  {
    id: "case-17",
    alertId: "alt-014",
    outcome: "sar",
    closedAt: "2025-02-12T04:30:00Z",
    segment: "fintech",
    rationale: "Cash-intensive and intl wire velocity; SAR filed; account frozen pending review.",
  },
  {
    id: "case-18",
    alertId: "alt-017",
    outcome: "closed_no_action",
    closedAt: "2025-02-11T11:00:00Z",
    segment: "fintech",
    rationale: "Structuring alert; pattern explained as payroll and vendor batches; no action.",
  },
  {
    id: "case-19",
    alertId: "alt-021",
    segment: "saas",
    rationale: undefined,
  },
  {
    id: "case-20",
    alertId: "alt-022",
    outcome: "approved",
    closedAt: "2025-02-10T14:00:00Z",
    segment: "ecommerce",
    rationale: "Intl wire and cash-intensive activity aligned with declared wholesale imports; approved.",
  },
];

// --- Custom report mock data (strategist-oriented analytical views) ---

/** Outcomes by segment: for cohort comparison and escalation concentration. */
export interface OutcomesBySegmentRow {
  segment: string;
  closedNoAction: number;
  escalated: number;
  sar: number;
  approved: number;
  denied: number;
  open: number;
  total: number;
}

/** Rule performance by segment: for policy/tuning (alert volume, FP proxy, escalation drive). */
export interface RulePerformanceBySegmentRow {
  ruleId: string;
  ruleName: string;
  category: "transaction_monitoring" | "onboarding";
  segment: string;
  alertCount: number;
  closedNoAction: number;
  escalated: number;
  sar: number;
  open: number;
  /** % of resolved alerts closed with no action (proxy for false positive rate). */
  pctClosedNoAction: number;
  /** Onboarding rules only. */
  approved?: number;
  denied?: number;
}

export const MOCK_OUTCOMES_BY_SEGMENT: OutcomesBySegmentRow[] = [
  { segment: "ecommerce", closedNoAction: 12, escalated: 3, sar: 1, approved: 8, denied: 2, open: 7, total: 33 },
  { segment: "saas", closedNoAction: 6, escalated: 2, sar: 0, approved: 14, denied: 1, open: 4, total: 27 },
  { segment: "fintech", closedNoAction: 4, escalated: 5, sar: 2, approved: 3, denied: 2, open: 6, total: 22 },
];

export const MOCK_RULE_PERFORMANCE_BY_SEGMENT: RulePerformanceBySegmentRow[] = [
  { ruleId: "TM-INTL-WIRE-VELOCITY", ruleName: "TM-INTL-WIRE-VELOCITY", category: "transaction_monitoring", segment: "ecommerce", alertCount: 14, closedNoAction: 8, escalated: 2, sar: 1, open: 3, pctClosedNoAction: 73 },
  { ruleId: "TM-INTL-WIRE-VELOCITY", ruleName: "TM-INTL-WIRE-VELOCITY", category: "transaction_monitoring", segment: "fintech", alertCount: 6, closedNoAction: 2, escalated: 3, sar: 1, open: 0, pctClosedNoAction: 33 },
  { ruleId: "TM-LARGE-SINGLE", ruleName: "TM-LARGE-SINGLE", category: "transaction_monitoring", segment: "ecommerce", alertCount: 9, closedNoAction: 5, escalated: 1, sar: 0, open: 3, pctClosedNoAction: 83 },
  { ruleId: "TM-LARGE-SINGLE", ruleName: "TM-LARGE-SINGLE", category: "transaction_monitoring", segment: "saas", alertCount: 5, closedNoAction: 3, escalated: 1, sar: 0, open: 1, pctClosedNoAction: 75 },
  { ruleId: "TM-LARGE-SINGLE", ruleName: "TM-LARGE-SINGLE", category: "transaction_monitoring", segment: "fintech", alertCount: 4, closedNoAction: 1, escalated: 2, sar: 0, open: 1, pctClosedNoAction: 33 },
  { ruleId: "TM-STRUCTURING", ruleName: "TM-STRUCTURING", category: "transaction_monitoring", segment: "ecommerce", alertCount: 3, closedNoAction: 1, escalated: 1, sar: 0, open: 1, pctClosedNoAction: 50 },
  { ruleId: "TM-STRUCTURING", ruleName: "TM-STRUCTURING", category: "transaction_monitoring", segment: "fintech", alertCount: 7, closedNoAction: 2, escalated: 3, sar: 1, open: 1, pctClosedNoAction: 33 },
  { ruleId: "TM-CASH-INTENSIVE", ruleName: "TM-CASH-INTENSIVE", category: "transaction_monitoring", segment: "fintech", alertCount: 8, closedNoAction: 2, escalated: 4, sar: 1, open: 1, pctClosedNoAction: 29 },
  { ruleId: "TM-CASH-INTENSIVE", ruleName: "TM-CASH-INTENSIVE", category: "transaction_monitoring", segment: "ecommerce", alertCount: 2, closedNoAction: 1, escalated: 0, sar: 0, open: 1, pctClosedNoAction: 100 },
  { ruleId: "ONB-BENEFICIAL-OWNER", ruleName: "ONB-BENEFICIAL-OWNER", category: "onboarding", segment: "saas", alertCount: 11, closedNoAction: 4, escalated: 2, sar: 0, approved: 3, denied: 0, open: 2, pctClosedNoAction: 44 },
  { ruleId: "ONB-BENEFICIAL-OWNER", ruleName: "ONB-BENEFICIAL-OWNER", category: "onboarding", segment: "ecommerce", alertCount: 2, closedNoAction: 0, escalated: 0, sar: 0, approved: 1, denied: 0, open: 1, pctClosedNoAction: 0 },
  { ruleId: "TM-RAPID-MOVEMENT", ruleName: "TM-RAPID-MOVEMENT", category: "transaction_monitoring", segment: "ecommerce", alertCount: 2, closedNoAction: 1, escalated: 0, sar: 0, open: 1, pctClosedNoAction: 50 },
  { ruleId: "TM-RAPID-MOVEMENT", ruleName: "TM-RAPID-MOVEMENT", category: "transaction_monitoring", segment: "fintech", alertCount: 1, closedNoAction: 0, escalated: 1, sar: 0, open: 0, pctClosedNoAction: 0 },
  { ruleId: "TM-HIGH-RISK-JURISDICTION", ruleName: "TM-HIGH-RISK-JURISDICTION", category: "transaction_monitoring", segment: "fintech", alertCount: 1, closedNoAction: 0, escalated: 1, sar: 0, open: 0, pctClosedNoAction: 0 },
  { ruleId: "ONB-SANCTIONS-EDGE", ruleName: "ONB-SANCTIONS-EDGE", category: "onboarding", segment: "saas", alertCount: 1, closedNoAction: 0, escalated: 0, sar: 0, approved: 0, denied: 0, open: 1, pctClosedNoAction: 0 },
  { ruleId: "ONB-SANCTIONS-EDGE", ruleName: "ONB-SANCTIONS-EDGE", category: "onboarding", segment: "fintech", alertCount: 1, closedNoAction: 0, escalated: 0, sar: 0, approved: 1, denied: 0, open: 0, pctClosedNoAction: 0 },
];

// --- Additional strategist report mock data ---

export interface AlertVolumeByRuleRow {
  ruleId: string;
  ruleName: string;
  alertCount: number;
  closedNoAction: number;
  escalated: number;
  sar: number;
  open: number;
  pctClosedNoAction: number;
}

function aggregateRulePerformanceByRule(): AlertVolumeByRuleRow[] {
  const byRule: Record<string, AlertVolumeByRuleRow> = {};
  for (const row of MOCK_RULE_PERFORMANCE_BY_SEGMENT) {
    if (!byRule[row.ruleId]) {
      byRule[row.ruleId] = {
        ruleId: row.ruleId,
        ruleName: row.ruleName,
        alertCount: 0,
        closedNoAction: 0,
        escalated: 0,
        sar: 0,
        open: 0,
        pctClosedNoAction: 0,
      };
    }
    const r = byRule[row.ruleId];
    r.alertCount += row.alertCount;
    r.closedNoAction += row.closedNoAction;
    r.escalated += row.escalated;
    r.sar += row.sar;
    r.open += row.open;
  }
  const rows = Object.values(byRule);
  for (const r of rows) {
    const resolved = r.closedNoAction + r.escalated + r.sar;
    r.pctClosedNoAction = resolved > 0 ? Math.round((r.closedNoAction / resolved) * 100) : 0;
  }
  return rows.sort((a, b) => b.alertCount - a.alertCount);
}

export const MOCK_ALERT_VOLUME_BY_RULE: AlertVolumeByRuleRow[] = aggregateRulePerformanceByRule();

export interface AlertVolumeByRiskTierStatusRow {
  riskTier: RiskTier;
  new: number;
  in_review: number;
  escalated: number;
  closed: number;
  total: number;
}

function deriveAlertVolumeByRiskTierStatus(): AlertVolumeByRiskTierStatusRow[] {
  const counts: Record<RiskTier, Record<AlertStatus, number>> = {
    high: { new: 0, in_review: 0, escalated: 0, closed: 0 },
    medium: { new: 0, in_review: 0, escalated: 0, closed: 0 },
    low: { new: 0, in_review: 0, escalated: 0, closed: 0 },
  };
  for (const a of MOCK_ALERTS) {
    counts[a.riskTier][a.status]++;
  }
  return (["high", "medium", "low"] as const).map((riskTier) => {
    const c = counts[riskTier];
    const total = c.new + c.in_review + c.escalated + c.closed;
    return {
      riskTier,
      new: c.new,
      in_review: c.in_review,
      escalated: c.escalated,
      closed: c.closed,
      total,
    };
  });
}

export const MOCK_ALERT_VOLUME_BY_RISK_TIER_STATUS: AlertVolumeByRiskTierStatusRow[] =
  deriveAlertVolumeByRiskTierStatus();

export interface CaseResolutionByPeriodRow {
  period: string;
  closedNoAction: number;
  escalated: number;
  sar: number;
  totalClosed: number;
}

export const MOCK_CASE_RESOLUTION_BY_PERIOD: CaseResolutionByPeriodRow[] = [
  { period: "2025-02-04 – 2025-02-10", closedNoAction: 18, escalated: 4, sar: 1, totalClosed: 23 },
  { period: "2025-01-28 – 2025-02-03", closedNoAction: 22, escalated: 3, sar: 2, totalClosed: 27 },
  { period: "2025-01-21 – 2025-01-27", closedNoAction: 15, escalated: 5, sar: 0, totalClosed: 20 },
  { period: "2025-01-14 – 2025-01-20", closedNoAction: 20, escalated: 2, sar: 1, totalClosed: 23 },
];

export interface OnboardingReferralsByOutcomeRow {
  segment: string;
  approved: number;
  denied: number;
  escalated: number;
  open: number;
  total: number;
}

export const MOCK_ONBOARDING_REFERRALS_BY_OUTCOME: OnboardingReferralsByOutcomeRow[] = [
  { segment: "ecommerce", approved: 1, denied: 0, escalated: 0, open: 1, total: 2 },
  { segment: "saas", approved: 3, denied: 0, escalated: 2, open: 3, total: 8 },
  { segment: "fintech", approved: 1, denied: 0, escalated: 0, open: 0, total: 1 },
];

export interface TriageSlaRow {
  riskTier: RiskTier;
  medianHours: number;
  p90Hours: number;
  alertCount: number;
}

export const MOCK_TRIAGE_SLA: TriageSlaRow[] = [
  { riskTier: "high", medianHours: 4, p90Hours: 12, alertCount: 9 },
  { riskTier: "medium", medianHours: 12, p90Hours: 24, alertCount: 9 },
  { riskTier: "low", medianHours: 24, p90Hours: 48, alertCount: 6 },
];

export interface EscalationSummaryRow {
  segment: string;
  escalationCount: number;
  topRules: string[];
}

function deriveEscalationSummary(): EscalationSummaryRow[] {
  const bySegment: Record<string, { count: number; rules: Record<string, number> }> = {};
  for (const a of MOCK_ALERTS) {
    if (a.status !== "escalated") continue;
    const seg = a.segment ?? "unknown";
    if (!bySegment[seg]) bySegment[seg] = { count: 0, rules: {} };
    bySegment[seg].count++;
    for (const r of a.ruleNames) {
      bySegment[seg].rules[r] = (bySegment[seg].rules[r] ?? 0) + 1;
    }
  }
  return Object.entries(bySegment).map(([segment, { count, rules }]) => ({
    segment,
    escalationCount: count,
    topRules: Object.entries(rules)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([rule]) => rule),
  }));
}

export const MOCK_ESCALATION_SUMMARY: EscalationSummaryRow[] = deriveEscalationSummary();

export interface SarSummaryBySegmentRow {
  segment: string;
  sarCount: number;
}

export interface SarSummaryByRuleRow {
  ruleName: string;
  sarCount: number;
}

export const MOCK_SAR_SUMMARY_BY_SEGMENT: SarSummaryBySegmentRow[] = [
  { segment: "ecommerce", sarCount: 1 },
  { segment: "saas", sarCount: 0 },
  { segment: "fintech", sarCount: 2 },
];

export const MOCK_SAR_SUMMARY_BY_RULE: SarSummaryByRuleRow[] = [
  { ruleName: "TM-INTL-WIRE-VELOCITY", sarCount: 1 },
  { ruleName: "TM-STRUCTURING", sarCount: 1 },
  { ruleName: "TM-CASH-INTENSIVE", sarCount: 1 },
];

// --- High-risk accounts last 30 days (for Assistant-created report) ---

export interface HighRiskAccountRow {
  accountId: string;
  accountName: string;
  segment: string;
  riskTier: RiskTier;
  alertCount: number;
  openAlerts: number;
  lastAlertAt: string;
  topRules: string[];
  status: "new" | "in_review" | "escalated" | "closed";
}

function deriveHighRiskAccountsLast30Days(): HighRiskAccountRow[] {
  const thirtyDaysAgo = "2025-01-13";
  const highRisk = MOCK_ALERTS.filter(
    (a) => a.riskTier === "high" && a.createdAt >= thirtyDaysAgo
  );
  const byAccount: Record<
    string,
    {
      accountId: string;
      accountName: string;
      segment: string;
      alerts: typeof MOCK_ALERTS;
    }
  > = {};
  for (const a of highRisk) {
    if (!byAccount[a.accountId]) {
      byAccount[a.accountId] = {
        accountId: a.accountId,
        accountName: a.accountName,
        segment: a.segment ?? "unknown",
        alerts: [],
      };
    }
    byAccount[a.accountId].alerts.push(a);
  }
  return Object.values(byAccount).map(({ accountId, accountName, segment, alerts }) => {
    const sorted = [...alerts].sort(
      (x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime()
    );
    const last = sorted[0];
    const openAlerts = alerts.filter(
      (a) => a.status === "new" || a.status === "in_review" || a.status === "escalated"
    ).length;
    const ruleCount: Record<string, number> = {};
    for (const a of alerts) {
      for (const r of a.ruleNames) {
        ruleCount[r] = (ruleCount[r] ?? 0) + 1;
      }
    }
    const topRules = Object.entries(ruleCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([rule]) => rule);
    return {
      accountId,
      accountName,
      segment,
      riskTier: "high" as const,
      alertCount: alerts.length,
      openAlerts,
      lastAlertAt: last.createdAt,
      topRules,
      status: last.status,
    };
  });
}

export const MOCK_HIGH_RISK_ACCOUNTS_LAST_30_DAYS: HighRiskAccountRow[] =
  deriveHighRiskAccountsLast30Days();

// --- System Health (v2: strategist control plane default landing) ---

export interface SystemHealthSummary {
  /** This week vs last week (or baseline). */
  alertVolumeVsBaseline: { thisWeek: number; lastWeek: number; pctChange: number };
  /** False-positive proxy: % of resolved alerts closed with no action (overall). */
  falsePositiveProxyPct: number;
  /** Investigator override rate: % of alerts where investigator overrode rule/recommendation. */
  overrideRatePct: number;
  /** Top rules by alert volume (rule id, count). */
  topRulesByVolume: { ruleId: string; ruleName: string; alertCount: number }[];
  /** Top rules by override / closed-no-action (proxy for "error" contribution). */
  topRulesByOverride: { ruleId: string; ruleName: string; overrideCount: number; pctOfResolved: number }[];
}

function deriveSystemHealthSummary(): SystemHealthSummary {
  const thisWeek = MOCK_ALERTS.filter((a) => a.createdAt >= "2025-02-10").length;
  const lastWeek = 18; // mock baseline
  const pctChange = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0;
  const totalResolved = MOCK_ALERTS.filter((a) => a.status === "closed" || a.status === "escalated").length;
  const closedNoAction = MOCK_ALERTS.filter((a) => a.status === "closed").length; // simplified: treat closed as no-action for proxy
  const falsePositiveProxyPct = totalResolved > 0 ? Math.round((closedNoAction / totalResolved) * 100) : 0;
  const overrideCount = 4; // mock: investigator overrode rule recommendation
  const overrideRatePct = totalResolved > 0 ? Math.round((overrideCount / totalResolved) * 100) : 0;
  const byRule: Record<string, number> = {};
  for (const a of MOCK_ALERTS) {
    for (const r of a.ruleNames) {
      byRule[r] = (byRule[r] ?? 0) + 1;
    }
  }
  const topRulesByVolume = Object.entries(byRule)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ruleId, alertCount]) => ({ ruleId, ruleName: ruleId, alertCount }));
  const topRulesByOverride = [
    { ruleId: "TM-INTL-WIRE-VELOCITY", ruleName: "TM-INTL-WIRE-VELOCITY", overrideCount: 2, pctOfResolved: 22 },
    { ruleId: "TM-LARGE-SINGLE", ruleName: "TM-LARGE-SINGLE", overrideCount: 1, pctOfResolved: 11 },
    { ruleId: "ONB-BENEFICIAL-OWNER", ruleName: "ONB-BENEFICIAL-OWNER", overrideCount: 1, pctOfResolved: 11 },
  ];
  return {
    alertVolumeVsBaseline: { thisWeek, lastWeek, pctChange },
    falsePositiveProxyPct,
    overrideRatePct,
    topRulesByVolume,
    topRulesByOverride,
  };
}

export const MOCK_SYSTEM_HEALTH: SystemHealthSummary = deriveSystemHealthSummary();

// --- v3 Pillar 1: Signal explainability — feature-level drivers per rule hit ---

export interface RuleHitDriver {
  featureName: string;
  value: string | number;
  thresholdOrTier: string;
  evidenceType: "transaction" | "account" | "rule";
  evidenceLabel: string;
}

/** alertId -> ruleId -> drivers (why this rule fired on this alert). */
export const MOCK_RULE_HIT_DRIVERS: Record<string, Record<string, RuleHitDriver[]>> = {
  "alt-001": {
    "TM-INTL-WIRE-VELOCITY": [
      { featureName: "Wire count (7-day)", value: 5, thresholdOrTier: "≥ 3", evidenceType: "transaction", evidenceLabel: "View transactions" },
      { featureName: "Top counterparty jurisdiction", value: "Tier 2", thresholdOrTier: "Tier 2+ flags", evidenceType: "account", evidenceLabel: "Account attributes" },
    ],
    "TM-LARGE-SINGLE": [
      { featureName: "Largest wire (USD)", value: 62000, thresholdOrTier: "> 50,000", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
  },
  "alt-002": {
    "ONB-BENEFICIAL-OWNER": [
      { featureName: "Ownership depth", value: 4, thresholdOrTier: "> 3 layers", evidenceType: "account", evidenceLabel: "KYC / beneficial owner" },
      { featureName: "PEP match score", value: 0.72, thresholdOrTier: "> 0.6 review", evidenceType: "account", evidenceLabel: "Account attributes" },
    ],
  },
  "alt-003": {
    "TM-STRUCTURING": [
      { featureName: "Tx count (48h)", value: 8, thresholdOrTier: "≥ 5", evidenceType: "transaction", evidenceLabel: "View transactions" },
      { featureName: "Amount band (under $10k)", value: 7, thresholdOrTier: "≥ 4", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
    "TM-CASH-INTENSIVE": [
      { featureName: "Cash deposit 30d (USD)", value: 145000, thresholdOrTier: "> 100k", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
    "TM-RAPID-MOVEMENT": [
      { featureName: "Inbound/outbound (48h)", value: 6, thresholdOrTier: "≥ 5", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
  },
  "alt-004": {
    "TM-INTL-WIRE-VELOCITY": [
      { featureName: "Wire count (7-day)", value: 4, thresholdOrTier: "≥ 3", evidenceType: "transaction", evidenceLabel: "View transactions" },
      { featureName: "Same jurisdiction", value: "DE", thresholdOrTier: "Same in 7d", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
  },
  "alt-005": {
    "TM-LARGE-SINGLE": [
      { featureName: "Largest wire (USD)", value: 78000, thresholdOrTier: "> 50,000", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
    "TM-INTL-WIRE-VELOCITY": [
      { featureName: "Wire count (7-day)", value: 3, thresholdOrTier: "≥ 3", evidenceType: "transaction", evidenceLabel: "View transactions" },
    ],
  },
};

export function getRuleHitDrivers(alertId: string, ruleId: string): RuleHitDriver[] {
  return MOCK_RULE_HIT_DRIVERS[alertId]?.[ruleId] ?? [];
}

// --- v3 Pillar 2: Case patterns — behavior archetypes and resolution prevalence ---

export type BehaviorArchetypeId =
  | "high_velocity_intl_wires"
  | "structuring_like"
  | "high_risk_jurisdiction"
  | "large_single"
  | "beneficial_owner"
  | "cash_intensive"
  | "multi_rule_complex";

export interface CasePatternSummary {
  archetypeId: BehaviorArchetypeId;
  label: string;
  caseCount: number;
  closedNoAction: number;
  escalated: number;
  sar: number;
  approved: number;
  denied: number;
  open: number;
  pctClosedNoAction: number;
  pctEscalated: number;
  pctSar: number;
}

function getArchetypeForCase(c: CaseSummary, alert: Alert | undefined): BehaviorArchetypeId {
  if (!alert) return "multi_rule_complex";
  const rules = alert.ruleNames;
  if (rules.includes("TM-INTL-WIRE-VELOCITY") && !rules.includes("TM-STRUCTURING")) return "high_velocity_intl_wires";
  if (rules.includes("TM-STRUCTURING")) return "structuring_like";
  if (rules.includes("TM-HIGH-RISK-JURISDICTION")) return "high_risk_jurisdiction";
  if (rules.includes("TM-LARGE-SINGLE") && rules.length <= 2) return "large_single";
  if (rules.includes("ONB-BENEFICIAL-OWNER") && !rules.includes("ONB-SANCTIONS-EDGE")) return "beneficial_owner";
  if (rules.includes("TM-CASH-INTENSIVE")) return "cash_intensive";
  return "multi_rule_complex";
}

const ARCHETYPE_LABELS: Record<BehaviorArchetypeId, string> = {
  high_velocity_intl_wires: "High velocity intl wires",
  structuring_like: "Structuring-like",
  high_risk_jurisdiction: "High-risk jurisdiction exposure",
  large_single: "Large single transaction",
  beneficial_owner: "Beneficial owner / onboarding",
  cash_intensive: "Cash-intensive activity",
  multi_rule_complex: "Multi-rule / complex",
};

function deriveCasePatterns(): CasePatternSummary[] {
  const merged = [...MOCK_CASES];
  const byArchetype: Record<BehaviorArchetypeId, { caseIds: string[]; outcomes: Record<OutcomeCode | "open", number> }> = {
    high_velocity_intl_wires: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    structuring_like: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    high_risk_jurisdiction: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    large_single: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    beneficial_owner: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    cash_intensive: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    multi_rule_complex: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
  };
  for (const c of merged) {
    const alert = MOCK_ALERTS.find((a) => a.id === c.alertId);
    const arch = getArchetypeForCase(c, alert);
    byArchetype[arch].caseIds.push(c.id);
    const key = c.outcome ?? "open";
    byArchetype[arch].outcomes[key]++;
  }
  return (Object.keys(ARCHETYPE_LABELS) as BehaviorArchetypeId[]).map((archetypeId) => {
    const { caseIds, outcomes } = byArchetype[archetypeId];
    const total = caseIds.length;
    const closedNoAction = outcomes.closed_no_action;
    const escalated = outcomes.escalated;
    const sar = outcomes.sar;
    const approved = outcomes.approved;
    const denied = outcomes.denied;
    const open = outcomes.open;
    const resolved = total - open;
    return {
      archetypeId,
      label: ARCHETYPE_LABELS[archetypeId],
      caseCount: total,
      closedNoAction,
      escalated,
      sar,
      approved,
      denied,
      open,
      pctClosedNoAction: resolved > 0 ? Math.round((closedNoAction / resolved) * 100) : 0,
      pctEscalated: resolved > 0 ? Math.round((escalated / resolved) * 100) : 0,
      pctSar: resolved > 0 ? Math.round((sar / resolved) * 100) : 0,
    };
  }).filter((p) => p.caseCount > 0);
}

export const MOCK_CASE_PATTERNS: CasePatternSummary[] = deriveCasePatterns();

export function getArchetypeForCaseId(caseId: string): BehaviorArchetypeId | null {
  const c = MOCK_CASES.find((x) => x.id === caseId);
  if (!c) return null;
  const alert = MOCK_ALERTS.find((a) => a.id === c.alertId);
  return getArchetypeForCase(c, alert);
}

export function getCaseIdsByArchetype(archetypeId: BehaviorArchetypeId, caseList?: { id: string; alertId: string }[]): string[] {
  const list = caseList ?? MOCK_CASES;
  const ids: string[] = [];
  for (const c of list) {
    const alert = MOCK_ALERTS.find((a) => a.id === c.alertId);
    if (getArchetypeForCase(c as CaseSummary, alert) === archetypeId) ids.push(c.id);
  }
  return ids;
}

/** Archetype for any case given its alertId (e.g. for merged case list including runtime-created cases). */
export function getArchetypeByAlertId(alertId: string): BehaviorArchetypeId {
  const alert = MOCK_ALERTS.find((a) => a.id === alertId);
  return getArchetypeForCase({ id: "", alertId, outcome: undefined }, alert);
}

/** Compute pattern summaries from any case list (e.g. getMergedCases() for runtime-created cases). */
export function getCasePatternsFromCases(
  cases: Array<{ id: string; alertId: string; outcome?: OutcomeCode }>
): CasePatternSummary[] {
  const byArchetype: Record<BehaviorArchetypeId, { caseIds: string[]; outcomes: Record<OutcomeCode | "open", number> }> = {
    high_velocity_intl_wires: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    structuring_like: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    high_risk_jurisdiction: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    large_single: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    beneficial_owner: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    cash_intensive: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
    multi_rule_complex: { caseIds: [], outcomes: { approved: 0, denied: 0, escalated: 0, sar: 0, closed_no_action: 0, open: 0 } },
  };
  for (const c of cases) {
    const arch = getArchetypeByAlertId(c.alertId);
    byArchetype[arch].caseIds.push(c.id);
    const key = c.outcome ?? "open";
    byArchetype[arch].outcomes[key]++;
  }
  return (Object.keys(ARCHETYPE_LABELS) as BehaviorArchetypeId[]).map((archetypeId) => {
    const { caseIds, outcomes } = byArchetype[archetypeId];
    const total = caseIds.length;
    const closedNoAction = outcomes.closed_no_action;
    const escalated = outcomes.escalated;
    const sar = outcomes.sar;
    const approved = outcomes.approved;
    const denied = outcomes.denied;
    const open = outcomes.open;
    const resolved = total - open;
    return {
      archetypeId,
      label: ARCHETYPE_LABELS[archetypeId],
      caseCount: total,
      closedNoAction,
      escalated,
      sar,
      approved,
      denied,
      open,
      pctClosedNoAction: resolved > 0 ? Math.round((closedNoAction / resolved) * 100) : 0,
      pctEscalated: resolved > 0 ? Math.round((escalated / resolved) * 100) : 0,
      pctSar: resolved > 0 ? Math.round((sar / resolved) * 100) : 0,
    };
  }).filter((p) => p.caseCount > 0);
}
