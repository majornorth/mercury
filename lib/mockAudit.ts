/**
 * Mock audit log for prototype. In production, replace with dedicated audit store (append-only).
 * PRD 7.3: data access, workflow actions, LLM usage, view events.
 */

export type AuditEventType =
  | "data_access"
  | "workflow_action"
  | "llm_request"
  | "view_event";

export interface AuditEntry {
  at: string;
  actorId: string;
  eventType: AuditEventType;
  resourceType: string;
  resourceId: string;
  details?: string;
}

export const MOCK_AUDIT_ENTRIES: AuditEntry[] = [
  // 2025-02-12
  { at: "2025-02-12T14:22:00Z", actorId: "user-1", eventType: "view_event", resourceType: "view", resourceId: "view-high-risk-30d", details: "Viewed custom view" },
  { at: "2025-02-12T14:18:00Z", actorId: "user-3", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-007", details: "Request info sent" },
  { at: "2025-02-12T14:10:00Z", actorId: "user-3", eventType: "data_access", resourceType: "account", resourceId: "acc-8821", details: "Viewed account profile" },
  { at: "2025-02-12T13:55:00Z", actorId: "user-1", eventType: "llm_request", resourceType: "case", resourceId: "case-3", details: "Summarize for escalation" },
  { at: "2025-02-12T13:40:00Z", actorId: "user-2", eventType: "data_access", resourceType: "alert", resourceId: "alt-006", details: "Viewed alert detail" },
  { at: "2025-02-12T13:35:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-006", details: "Escalated to partner bank" },
  { at: "2025-02-12T12:30:00Z", actorId: "user-1", eventType: "view_event", resourceType: "view", resourceId: "view-outcomes-by-segment", details: "Viewed custom view" },
  { at: "2025-02-12T12:15:00Z", actorId: "user-2", eventType: "llm_request", resourceType: "alert", resourceId: "alt-005", details: "Top risk signals" },
  { at: "2025-02-12T12:00:00Z", actorId: "user-2", eventType: "data_access", resourceType: "case", resourceId: "case-2", details: "Viewed case detail" },
  { at: "2025-02-12T11:45:00Z", actorId: "user-3", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-003", details: "Closed — False positive" },
  { at: "2025-02-12T11:30:00Z", actorId: "user-3", eventType: "data_access", resourceType: "alert", resourceId: "alt-003", details: "Viewed alert detail" },
  { at: "2025-02-12T11:20:00Z", actorId: "user-1", eventType: "view_event", resourceType: "view", resourceId: "view-alert-volume-rule", details: "Viewed custom view" },
  { at: "2025-02-12T10:15:00Z", actorId: "user-1", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-001", details: "Assigned to me" },
  { at: "2025-02-12T10:14:00Z", actorId: "user-1", eventType: "data_access", resourceType: "alert", resourceId: "alt-001", details: "Viewed alert detail" },
  { at: "2025-02-12T09:45:00Z", actorId: "user-1", eventType: "llm_request", resourceType: "alert", resourceId: "alt-001", details: "Why was this account flagged?" },
  { at: "2025-02-12T09:30:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-004", details: "Closed — Closed no action" },
  { at: "2025-02-12T09:00:00Z", actorId: "user-2", eventType: "data_access", resourceType: "case", resourceId: "case-1", details: "Viewed case detail" },
  // 2025-02-11
  { at: "2025-02-11T16:30:00Z", actorId: "user-1", eventType: "llm_request", resourceType: "alert", resourceId: "alt-002", details: "Similar cases and resolution" },
  { at: "2025-02-11T16:00:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-002", details: "Escalated" },
  { at: "2025-02-11T15:45:00Z", actorId: "user-2", eventType: "data_access", resourceType: "account", resourceId: "acc-4412", details: "Viewed account transactions" },
  { at: "2025-02-11T15:00:00Z", actorId: "user-2", eventType: "view_event", resourceType: "view", resourceId: "view-onboarding-refs", details: "Viewed custom view" },
  { at: "2025-02-11T14:20:00Z", actorId: "user-3", eventType: "workflow_action", resourceType: "case", resourceId: "case-1", details: "Case outcome recorded — No SAR" },
  { at: "2025-02-11T14:00:00Z", actorId: "user-3", eventType: "data_access", resourceType: "case", resourceId: "case-1", details: "Viewed case detail" },
  { at: "2025-02-11T11:00:00Z", actorId: "user-1", eventType: "view_event", resourceType: "view", resourceId: "view-sar-summary", details: "Viewed custom view" },
  { at: "2025-02-11T10:30:00Z", actorId: "user-2", eventType: "data_access", resourceType: "alert", resourceId: "alt-002", details: "Viewed alert detail" },
  { at: "2025-02-11T10:15:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-002", details: "Created case from alert" },
  // 2025-02-10
  { at: "2025-02-10T17:00:00Z", actorId: "user-1", eventType: "view_event", resourceType: "view", resourceId: "view-rule-performance", details: "Viewed custom view" },
  { at: "2025-02-10T16:00:00Z", actorId: "user-3", eventType: "data_access", resourceType: "alert", resourceId: "alt-001", details: "Viewed alert detail" },
  { at: "2025-02-10T15:30:00Z", actorId: "user-1", eventType: "llm_request", resourceType: "alert", resourceId: "alt-001", details: "Explainability: why flagged" },
  { at: "2025-02-10T14:00:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-004", details: "Assigned to me" },
];
