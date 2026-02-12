"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createCase, getCaseByAlertId } from "@/lib/caseStore";
import { MOCK_ALERT_ACTIVITY } from "@/lib/mockData";
import type { AlertStatus } from "@/lib/mockData";
import type { OutcomeCode } from "@/lib/mockData";
import { MOCK_QUEUES } from "@/lib/mockQueues";
import { CURRENT_USER_ID, getAssignableUsers, getMockUser } from "@/lib/mockUsers";

const STORAGE_KEY = "mercury-workflow";

const DISPOSITION_OPTIONS: { value: OutcomeCode; label: string }[] = [
  { value: "closed_no_action", label: "Closed no action" },
  { value: "approved", label: "Approved" },
  { value: "denied", label: "Denied" },
  { value: "escalated", label: "Escalated" },
  { value: "sar", label: "SAR filed" },
];

type RequestInfoEntry = {
  requestedAt: string;
  recipient: "customer" | "ops";
  note: string;
};

type ActivityEntry = {
  at: string;
  action: string;
  detail?: string;
};

type WorkflowState = {
  assignedTo: string | null;
  assignedQueueId?: string | null;
  status: AlertStatus;
  closedDisposition?: OutcomeCode;
  closedRationale?: string;
  requestInfo?: RequestInfoEntry[];
  activity?: ActivityEntry[];
};

/** Exported for AlertDetailView/AlertList to show queue from workflow state (v5). */
export function loadWorkflowState(alertId: string): WorkflowState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${alertId}`);
    return raw ? (JSON.parse(raw) as WorkflowState) : null;
  } catch {
    return null;
  }
}

function saveWorkflowState(alertId: string, state: WorkflowState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY}-${alertId}`, JSON.stringify(state));
  } catch {
    // ignore
  }
}

interface AlertWorkflowActionsProps {
  alertId: string;
  initialStatus: AlertStatus;
  accountName: string;
  segment?: string;
}

export function AlertWorkflowActions({
  alertId,
  initialStatus,
  accountName,
  segment,
}: AlertWorkflowActionsProps) {
  const router = useRouter();
  const relatedCase = getCaseByAlertId(alertId);
  const [state, setState] = useState<WorkflowState>(() => ({
    assignedTo: null,
    status: initialStatus,
  }));
  const [synced, setSynced] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [requestInfoModalOpen, setRequestInfoModalOpen] = useState(false);
  const [disposition, setDisposition] = useState<OutcomeCode>("closed_no_action");
  const [rationale, setRationale] = useState("");
  const [escalateNote, setEscalateNote] = useState("");
  const [escalatePath, setEscalatePath] = useState<string>("Partner bank");
  const [handoffSummary, setHandoffSummary] = useState(false);
  const [handoffRationale, setHandoffRationale] = useState(false);
  const [requestInfoRecipient, setRequestInfoRecipient] = useState<"customer" | "ops">("customer");
  const [requestInfoNote, setRequestInfoNote] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignQueueModalOpen, setAssignQueueModalOpen] = useState(false);
  const [selectedQueueId, setSelectedQueueId] = useState<string>(MOCK_QUEUES[0]?.id ?? "");

  useEffect(() => {
    const stored = loadWorkflowState(alertId);
    if (stored) {
      const normalized = { ...stored };
      if (normalized.assignedTo === "me") normalized.assignedTo = CURRENT_USER_ID;
      setState(normalized);
    } else {
      setState((s) => ({ ...s, status: initialStatus }));
    }
    setSynced(true);
  }, [alertId, initialStatus]);

  useEffect(() => {
    if (!synced) return;
    saveWorkflowState(alertId, state);
  }, [alertId, state, synced]);

  function appendActivity(action: string, detail?: string) {
    const entry: ActivityEntry = { at: new Date().toISOString(), action, detail };
    setState((s) => ({ ...s, activity: [...(s.activity ?? []), entry] }));
  }

  function assignTo(userId: string) {
    const user = getMockUser(userId);
    const label = userId === CURRENT_USER_ID ? "me" : user?.name ?? userId;
    setState((s) => ({ ...s, assignedTo: userId, status: "in_review" }));
    appendActivity("Assigned to " + (userId === CURRENT_USER_ID ? "me" : user?.name ?? userId));
    setActionMessage(userId === CURRENT_USER_ID ? "Assigned to you." : `Assigned to ${user?.name ?? userId}.`);
    setAssignModalOpen(false);
  }

  function assignToMe() {
    assignTo(CURRENT_USER_ID);
  }

  function unassign() {
    setState((s) => ({ ...s, assignedTo: null }));
    appendActivity("Unassigned");
    setActionMessage("Unassigned.");
    setAssignModalOpen(false);
  }

  function handleAssignToQueue() {
    const queue = MOCK_QUEUES.find((q) => q.id === selectedQueueId);
    const queueName = queue?.name ?? selectedQueueId;
    setState((s) => ({ ...s, assignedQueueId: selectedQueueId }));
    appendActivity("Assigned to queue", queueName);
    setActionMessage(`Routed to queue: ${queueName}. Recorded for audit.`);
    setAssignQueueModalOpen(false);
  }

  function handleEscalate() {
    const note = escalateNote.trim();
    const checklist = [
      handoffSummary && "Case summary attached",
      handoffRationale && "Rationale documented",
    ].filter(Boolean).join("; ") || "—";
    setState((s) => ({ ...s, status: "escalated" }));
    appendActivity("Escalated", [escalatePath, note, `Handoff: ${checklist}`].filter(Boolean).join(" · ") || undefined);
    setEscalateModalOpen(false);
    setEscalateNote("");
    setEscalatePath("Partner bank");
    setHandoffSummary(false);
    setHandoffRationale(false);
    setActionMessage(`Escalated to ${escalatePath}. Path and checklist recorded for audit.`);
  }

  function handleClose() {
    const label = DISPOSITION_OPTIONS.find((o) => o.value === disposition)?.label ?? disposition;
    setState((s) => ({
      ...s,
      status: "closed",
      closedDisposition: disposition,
      closedRationale: rationale.trim() || undefined,
    }));
    appendActivity("Closed", `${label}${rationale.trim() ? ` — ${rationale.trim()}` : ""}`);
    setCloseModalOpen(false);
    setDisposition("closed_no_action");
    setRationale("");
    setActionMessage(`Closed with disposition: ${label}.`);
  }

  function handleRequestInfo() {
    const recipient = requestInfoRecipient === "customer" ? "customer" : "ops";
    const note = requestInfoNote.trim();
    setState((s) => ({
      ...s,
      requestInfo: [
        ...(s.requestInfo ?? []),
        {
          requestedAt: new Date().toISOString(),
          recipient: requestInfoRecipient,
          note,
        },
      ],
    }));
    appendActivity("Request info", `To ${recipient}${note ? ` — ${note}` : ""}`);
    setRequestInfoModalOpen(false);
    setRequestInfoNote("");
    setActionMessage(`Info request sent to ${recipient}. Recorded for audit.`);
  }

  const assignedUser = getMockUser(state.assignedTo);
  const isAssignedToMe = state.assignedTo === CURRENT_USER_ID;
  const isClosed = state.status === "closed";
  const isEscalated = state.status === "escalated";
  const assignableUsers = getAssignableUsers();

  return (
    <section className="rounded-lg border border-border bg-surface-elevated p-4">
      <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Workflow actions</h2>
      {actionMessage && (
        <p className="text-sm text-brand mb-3 rounded bg-brand/10 px-2 py-1.5 border border-brand/30">
          {actionMessage}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {relatedCase ? (
          <Link
            href={`/cases/${relatedCase.id}`}
            className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-hover transition-colors inline-block"
          >
            Open case
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              const newCase = createCase(alertId, { segment });
              router.push(`/cases/${newCase.id}`);
            }}
            className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
          >
            Create case
          </button>
        )}
        {!isClosed && (
          <>
            {assignedUser ? (
              <>
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(true)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white hover:bg-surface-overlay transition-colors"
                >
                  Reassign
                </button>
                <button
                  type="button"
                  onClick={unassign}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white hover:bg-surface-overlay transition-colors"
                >
                  Unassign
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={assignToMe}
                  className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
                >
                  Assign to me
                </button>
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(true)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-white hover:bg-surface-overlay transition-colors"
                >
                  Assign to…
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setAssignQueueModalOpen(true)}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-white hover:bg-surface-overlay transition-colors"
            >
              Assign to queue
            </button>
            <button
              type="button"
              onClick={() => setEscalateModalOpen(true)}
              disabled={isEscalated}
              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Escalate
            </button>
            <button
              type="button"
              onClick={() => setRequestInfoModalOpen(true)}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-white hover:bg-surface-overlay transition-colors"
            >
              Request info
            </button>
            <button
              type="button"
              onClick={() => setCloseModalOpen(true)}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-white hover:bg-surface-overlay transition-colors"
            >
              Close
            </button>
          </>
        )}
      </div>
      {(assignedUser || state.assignedQueueId) && (
        <p className="text-xs text-[#8b9cad] mt-2">
          {assignedUser && (
            <>
              Assigned to <span className="text-white">{assignedUser.name}</span>
              <span className="text-[#6b7a8c]"> ({assignedUser.role})</span>
              {isAssignedToMe && " · Status: in review."}
            </>
          )}
          {state.assignedQueueId && (
            <>
              {assignedUser && " · "}
              Queue: <span className="text-white">{MOCK_QUEUES.find((q) => q.id === state.assignedQueueId)?.name ?? state.assignedQueueId}</span>
            </>
          )}
        </p>
      )}
      {state.closedDisposition != null && state.status === "closed" && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-[#8b9cad]">
            Disposition: <span className="text-white">{DISPOSITION_OPTIONS.find((o) => o.value === state.closedDisposition)?.label}</span>
          </p>
          {state.closedRationale && (
            <p className="text-xs text-[#8b9cad] mt-1">Rationale: {state.closedRationale}</p>
          )}
        </div>
      )}
      {state.requestInfo && state.requestInfo.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs font-medium text-[#8b9cad] mb-1">Info requests</p>
          <ul className="space-y-1">
            {state.requestInfo.map((r, i) => (
              <li key={i} className="text-xs text-[#8b9cad]">
                To {r.recipient === "customer" ? "customer" : "ops"}
                {r.note ? ` — ${r.note}` : ""} · {new Date(r.requestedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-border">
        <h3 className="text-xs font-medium text-[#8b9cad] mb-1">Activity</h3>
        {(() => {
          const displayActivity: { at: string; action: string; detail?: string }[] =
            state.activity && state.activity.length > 0
              ? state.activity
              : (MOCK_ALERT_ACTIVITY[alertId] ?? []);
          return displayActivity.length > 0 ? (
            <ul className="space-y-1.5">
              {[...displayActivity].reverse().map((entry, i) => (
                <li key={i} className="text-xs text-[#8b9cad] flex flex-wrap gap-x-2 gap-y-0.5">
                  <span className="text-white">{entry.action}</span>
                  {entry.detail && <span>{entry.detail}</span>}
                  <span className="text-[#6b7a8c]">{new Date(entry.at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#8b9cad]">No workflow activity recorded yet.</p>
          );
        })()}
      </div>

      {/* Assign to user modal */}
      {assignModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="assign-title"
        >
          <div className="rounded-lg border border-border bg-surface-elevated p-4 w-full max-w-sm shadow-xl">
            <h3 id="assign-title" className="text-sm font-semibold text-white mb-2">
              Assign alert
            </h3>
            <p className="text-xs text-[#8b9cad] mb-3">
              Assign to yourself or another user. Recorded for audit.
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => assignTo(CURRENT_USER_ID)}
                  className="w-full text-left rounded-md px-3 py-2 text-sm text-white hover:bg-surface-overlay transition-colors flex items-center justify-between"
                >
                  <span>Me ({getMockUser(CURRENT_USER_ID)?.name ?? "You"})</span>
                  <span className="text-xs text-[#8b9cad]">{getMockUser(CURRENT_USER_ID)?.role ?? ""}</span>
                </button>
              </li>
              {assignableUsers.map((u) => (
                <li key={u.id}>
                  <button
                    type="button"
                    onClick={() => assignTo(u.id)}
                    className="w-full text-left rounded-md px-3 py-2 text-sm text-white hover:bg-surface-overlay transition-colors flex items-center justify-between"
                  >
                    <span>{u.name}</span>
                    <span className="text-xs text-[#8b9cad]">{u.role}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setAssignModalOpen(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign to queue modal (v5) */}
      {assignQueueModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="assign-queue-title"
        >
          <div className="rounded-lg border border-border bg-surface-elevated p-4 w-full max-w-sm shadow-xl">
            <h3 id="assign-queue-title" className="text-sm font-semibold text-white mb-2">
              Assign to queue (v5)
            </h3>
            <p className="text-xs text-[#8b9cad] mb-3">
              Route this alert to a queue. Queue and SLA will reflect in the UI; action is auditable.
            </p>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Queue</label>
            <select
              value={selectedQueueId}
              onChange={(e) => setSelectedQueueId(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white mb-4"
            >
              {MOCK_QUEUES.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name} ({q.rail})
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAssignQueueModalOpen(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignToQueue}
                className="rounded-lg bg-brand px-3 py-1.5 text-sm text-white hover:opacity-90"
              >
                Assign to queue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Escalate modal */}
      {escalateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="escalate-title"
        >
          <div className="rounded-lg border border-border bg-surface-elevated p-4 w-full max-w-md shadow-xl">
            <h3 id="escalate-title" className="text-sm font-semibold text-white mb-2">
              Escalate alert (v5)
            </h3>
            <p className="text-xs text-[#8b9cad] mb-3">
              Select path and complete handoff checklist. Recorded in the audit log.
            </p>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Escalate to</label>
            <select
              value={escalatePath}
              onChange={(e) => setEscalatePath(e.target.value)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white mb-3"
            >
              <option>Partner bank</option>
              <option>Compliance</option>
              <option>Legal</option>
              <option>Customer support</option>
            </select>
            <p className="text-xs font-medium text-[#8b9cad] mb-1">Handoff checklist</p>
            <ul className="space-y-1.5 mb-3">
              <li className="flex items-center gap-2">
                <input type="checkbox" id="handoff-summary" checked={handoffSummary} onChange={(e) => setHandoffSummary(e.target.checked)} className="rounded border-border bg-surface text-brand" />
                <label htmlFor="handoff-summary" className="text-sm text-white">Case summary attached</label>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" id="handoff-rationale" checked={handoffRationale} onChange={(e) => setHandoffRationale(e.target.checked)} className="rounded border-border bg-surface text-brand" />
                <label htmlFor="handoff-rationale" className="text-sm text-white">Rationale documented</label>
              </li>
            </ul>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Note (optional)</label>
            <textarea
              value={escalateNote}
              onChange={(e) => setEscalateNote(e.target.value)}
              placeholder="Reason or context for escalation…"
              rows={2}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-brand resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setEscalateModalOpen(false);
                  setEscalateNote("");
                  setEscalatePath("Partner bank");
                  setHandoffSummary(false);
                  setHandoffRationale(false);
                }}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEscalate}
                className="rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1.5 text-sm font-medium hover:bg-amber-500/30"
              >
                Escalate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request info modal */}
      {requestInfoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-info-title"
        >
          <div className="rounded-lg border border-border bg-surface-elevated p-4 w-full max-w-md shadow-xl">
            <h3 id="request-info-title" className="text-sm font-semibold text-white mb-2">
              Request info
            </h3>
            <p className="text-xs text-[#8b9cad] mb-3">
              Request information from customer or ops. This will be recorded for audit.
            </p>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Recipient</label>
            <select
              value={requestInfoRecipient}
              onChange={(e) => setRequestInfoRecipient(e.target.value as "customer" | "ops")}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand mb-3"
            >
              <option value="customer">Customer</option>
              <option value="ops">Ops</option>
            </select>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">What to request (optional)</label>
            <textarea
              value={requestInfoNote}
              onChange={(e) => setRequestInfoNote(e.target.value)}
              placeholder="e.g. Source of funds, business purpose…"
              rows={3}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-brand resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setRequestInfoModalOpen(false);
                  setRequestInfoNote("");
                }}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRequestInfo}
                className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-hover"
              >
                Send request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close modal */}
      {closeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="close-title"
        >
          <div className="rounded-lg border border-border bg-surface-elevated p-4 w-full max-w-md shadow-xl">
            <h3 id="close-title" className="text-sm font-semibold text-white mb-2">
              Close alert
            </h3>
            <p className="text-xs text-[#8b9cad] mb-3">
              Document disposition and rationale for audit.
            </p>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Disposition</label>
            <select
              value={disposition}
              onChange={(e) => setDisposition(e.target.value as OutcomeCode)}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand mb-3"
            >
              {DISPOSITION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Rationale</label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Brief rationale for this disposition…"
              rows={3}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-brand resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setCloseModalOpen(false);
                  setRationale("");
                }}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-hover"
              >
                Close alert
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
