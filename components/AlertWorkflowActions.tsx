"use client";

import { useState, useEffect } from "react";
import { MOCK_ALERT_ACTIVITY } from "@/lib/mockData";
import type { AlertStatus } from "@/lib/mockData";
import type { OutcomeCode } from "@/lib/mockData";

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
  status: AlertStatus;
  closedDisposition?: OutcomeCode;
  closedRationale?: string;
  requestInfo?: RequestInfoEntry[];
  activity?: ActivityEntry[];
};

function loadWorkflowState(alertId: string): WorkflowState | null {
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
}

export function AlertWorkflowActions({
  alertId,
  initialStatus,
  accountName,
}: AlertWorkflowActionsProps) {
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
  const [requestInfoRecipient, setRequestInfoRecipient] = useState<"customer" | "ops">("customer");
  const [requestInfoNote, setRequestInfoNote] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadWorkflowState(alertId);
    if (stored) {
      setState(stored);
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

  function assignToMe() {
    setState((s) => ({ ...s, assignedTo: "me", status: "in_review" }));
    appendActivity("Assigned to me");
    setActionMessage("Assigned to you.");
  }

  function unassign() {
    setState((s) => ({ ...s, assignedTo: null }));
    appendActivity("Unassigned");
    setActionMessage("Unassigned.");
  }

  function handleEscalate() {
    const note = escalateNote.trim();
    setState((s) => ({ ...s, status: "escalated" }));
    appendActivity("Escalated", note || undefined);
    setEscalateModalOpen(false);
    setEscalateNote("");
    setActionMessage(note ? "Escalated. Note recorded for audit." : "Escalated to partner bank.");
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

  const isAssignedToMe = state.assignedTo === "me";
  const isClosed = state.status === "closed";
  const isEscalated = state.status === "escalated";

  return (
    <section className="rounded-lg border border-border bg-surface-elevated p-4">
      <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Workflow actions</h2>
      {actionMessage && (
        <p className="text-sm text-[#6ea8fe] mb-3 rounded bg-[#6ea8fe]/10 px-2 py-1.5 border border-[#6ea8fe]/30">
          {actionMessage}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {!isClosed && (
          <>
            {isAssignedToMe ? (
              <button
                type="button"
                onClick={unassign}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white hover:bg-surface-overlay transition-colors"
              >
                Unassign
              </button>
            ) : (
              <button
                type="button"
                onClick={assignToMe}
                className="rounded-lg bg-[#6ea8fe] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#5b9cfb] transition-colors"
              >
                Assign to me
              </button>
            )}
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
      {isAssignedToMe && (
        <p className="text-xs text-[#8b9cad] mt-2">Assigned to you. Status: in review.</p>
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
              Escalate alert
            </h3>
            <p className="text-xs text-[#8b9cad] mb-3">
              Escalate to partner bank or internal team. This will be recorded in the audit log.
            </p>
            <label className="block text-xs font-medium text-[#8b9cad] mb-1">Note (optional)</label>
            <textarea
              value={escalateNote}
              onChange={(e) => setEscalateNote(e.target.value)}
              placeholder="Reason or context for escalation…"
              rows={3}
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-[#6ea8fe] resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setEscalateModalOpen(false);
                  setEscalateNote("");
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
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6ea8fe] mb-3"
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
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-[#6ea8fe] resize-none"
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
                className="rounded-lg bg-[#6ea8fe] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#5b9cfb]"
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
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6ea8fe] mb-3"
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
              className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-[#6ea8fe] resize-none"
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
                className="rounded-lg bg-[#6ea8fe] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#5b9cfb]"
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
