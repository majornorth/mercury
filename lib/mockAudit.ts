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
  { at: "2025-02-12T10:15:00Z", actorId: "user-1", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-001", details: "Assigned to me" },
  { at: "2025-02-12T10:14:00Z", actorId: "user-1", eventType: "data_access", resourceType: "alert", resourceId: "alt-001", details: "Viewed alert detail" },
  { at: "2025-02-12T09:45:00Z", actorId: "user-1", eventType: "llm_request", resourceType: "alert", resourceId: "alt-001", details: "Why was this account flagged?" },
  { at: "2025-02-12T09:30:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-004", details: "Closed — Closed no action" },
  { at: "2025-02-12T09:00:00Z", actorId: "user-2", eventType: "data_access", resourceType: "case", resourceId: "case-1", details: "Viewed case detail" },
  { at: "2025-02-11T16:00:00Z", actorId: "user-2", eventType: "workflow_action", resourceType: "alert", resourceId: "alt-002", details: "Escalated" },
  { at: "2025-02-11T15:00:00Z", actorId: "user-2", eventType: "view_event", resourceType: "view", resourceId: "view-onboarding-refs", details: "Viewed custom view" },
];
