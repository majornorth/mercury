/**
 * Mock rules reference for explainability. In production, replace with policy/rule engine data.
 * Used for "links to evidence" (PRD 6.2).
 */

export interface RuleDefinition {
  id: string;
  name: string;
  category: "transaction_monitoring" | "onboarding";
  description: string;
  threshold?: string;
}

export const RULES_REFERENCE: RuleDefinition[] = [
  {
    id: "TM-INTL-WIRE-VELOCITY",
    name: "TM-INTL-WIRE-VELOCITY",
    category: "transaction_monitoring",
    description: "International wire velocity: multiple wires to the same jurisdiction within a short window.",
    threshold: "e.g. 3+ wires to same jurisdiction in 7 days",
  },
  {
    id: "TM-LARGE-SINGLE",
    name: "TM-LARGE-SINGLE",
    category: "transaction_monitoring",
    description: "Single large wire above threshold.",
    threshold: "e.g. wire > $50k",
  },
  {
    id: "TM-STRUCTURING",
    name: "TM-STRUCTURING",
    category: "transaction_monitoring",
    description: "Pattern suggestive of structuring (breaking transactions to avoid reporting thresholds).",
    threshold: "Volume and frequency patterns",
  },
  {
    id: "TM-CASH-INTENSIVE",
    name: "TM-CASH-INTENSIVE",
    category: "transaction_monitoring",
    description: "Cash-intensive business activity or deposit patterns.",
    threshold: "Segment and volume",
  },
  {
    id: "TM-RAPID-MOVEMENT",
    name: "TM-RAPID-MOVEMENT",
    category: "transaction_monitoring",
    description: "Rapid movement of funds in and out of account in a short period (round-tripping, layering).",
    threshold: "e.g. 5+ inbound/outbound in 48 hours",
  },
  {
    id: "TM-HIGH-RISK-JURISDICTION",
    name: "TM-HIGH-RISK-JURISDICTION",
    category: "transaction_monitoring",
    description: "Transaction counterparty or flow involves high-risk jurisdiction per internal list.",
    threshold: "Jurisdiction list + amount thresholds",
  },
  {
    id: "ONB-BENEFICIAL-OWNER",
    name: "ONB-BENEFICIAL-OWNER",
    category: "onboarding",
    description: "Beneficial ownership structure unclear or requires review (e.g. complex ownership, PEP).",
    threshold: "Policy-based",
  },
  {
    id: "ONB-SANCTIONS-EDGE",
    name: "ONB-SANCTIONS-EDGE",
    category: "onboarding",
    description: "Potential sanctions list match or close match requiring manual review (e.g. name, entity type).",
    threshold: "Match score and list source",
  },
];
