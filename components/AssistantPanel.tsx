"use client";

import { useState, useRef, useEffect } from "react";
import { useAlertContext } from "@/lib/AlertContext";
import { useAssistantContext } from "@/lib/AssistantContext";
import { useReportContext } from "@/lib/ReportContext";

const CREATE_REPORT_INTRO =
  "You can create a custom report for your Reports page. Describe what you want in the box below (e.g. \"alert volume by segment\", \"outcomes by rule\", \"high-risk accounts last 30 days\") and I'll add it to your report list. You can then open it from the Reports page. Views use allowlisted data only and are labeled as strategist-created.";

const STUB_RESPONSES: Record<string, string> = {
  "why was this account flagged":
    "This account was flagged due to rule hits on **TM-INTL-WIRE-VELOCITY** (3 international wires to the same jurisdiction in 7 days) and **TM-LARGE-SINGLE** (single wire > $50k). Top signal contributions: International wire velocity (35%), Single transaction size (28%), New account activity (24%). You can see the full breakdown on the alert detail page.",
  "what similar cases exist":
    "Similar cases in the last 90 days: 2 ecommerce accounts with TM-INTL-WIRE-VELOCITY — one closed no action, one escalated to partner bank. 1 saas account with ONB-BENEFICIAL-OWNER — escalated. Outcomes are available on the Reports page (filter by rule and outcome).",
  "summarize this case":
    "[AI-generated draft] Account Acme Logistics LLC (acc-101) was referred for review following transaction monitoring alerts (TM-INTL-WIRE-VELOCITY, TM-LARGE-SINGLE). Risk score 0.87. Key signals: international wire velocity, single large wire, high volume in first 30 days. Pending strategist review and disposition. — *Edit and sign off before sending.*",
};

/** Match "create a/new report for X" and return the report description X, or null. */
function extractCreateReportRequest(text: string): string | null {
  const lower = text.toLowerCase().trim();
  const match = lower.match(
    /(?:create|add)\s+(?:a\s+)?(?:new\s+)?report\s+for\s+(.+)/i
  );
  if (!match) return null;
  return match[1].trim() || null;
}

function getStubResponse(
  text: string,
  currentAlert: { alertId: string; accountName: string } | null
): string {
  const lower = text.toLowerCase();
  for (const [key, value] of Object.entries(STUB_RESPONSES)) {
    if (lower.includes(key)) {
      if (key === "summarize this case" && currentAlert) {
        return `[AI-generated draft] Account **${currentAlert.accountName}** (alert ${currentAlert.alertId}) was referred for review following transaction monitoring alerts. Key signals: international wire velocity, single large wire, high volume in first 30 days. Pending strategist review and disposition. — *Edit and sign off before sending.*`;
      }
      return value;
    }
  }
  const hint = currentAlert
    ? ` I'm scoped to alert **${currentAlert.alertId}** (${currentAlert.accountName}).`
    : "";
  const addReportHint =
    lower.includes("add") && (lower.includes("report") || lower.includes("view") || lower.includes("dashboard"));
  if (addReportHint) {
    return "In production, I would create that report and add it to your Reports list. The View Engine would generate a read-only view from your description (allowlisted data only). You can refine it by asking to add filters or group by different dimensions.";
  }
  return `In production, the Assistant would use Mercury internal context (schemas, rules, policies) to answer.${hint} Try: "Why was this account flagged?", "What similar cases exist?", or "Summarize this case for partner bank escalation."`;
}

export function AssistantPanel() {
  const { currentAlert } = useAlertContext();
  const { assistantOpen, setAssistantOpen, assistantIntent, clearAssistantIntent } = useAssistantContext();
  const { addReport } = useReportContext();
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "I can help you understand why accounts were flagged, which signals drove risk scores, and how similar cases were resolved. Ask in plain language.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [createReportPending, setCreateReportPending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (assistantOpen && assistantIntent === "add_report") {
      setMessages((m) => [...m, { role: "assistant", content: CREATE_REPORT_INTRO }]);
      setCreateReportPending(true);
      clearAssistantIntent();
    }
  }, [assistantOpen, assistantIntent, clearAssistantIntent]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: userMessage }]);
    setLoading(true);

    if (createReportPending) {
      setCreateReportPending(false);
      const title = userMessage.length > 60 ? `${userMessage.slice(0, 57)}…` : userMessage;
      addReport(title, userMessage);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `I've added **"${title}"** to your Reports list. Open it from the report list on the right. In production, the View Engine would generate the read-only view from your description.`,
        },
      ]);
      setLoading(false);
      return;
    }

    const createReportDesc = extractCreateReportRequest(userMessage);
    if (createReportDesc) {
      const title =
        createReportDesc.length > 60 ? `${createReportDesc.slice(0, 57)}…` : createReportDesc;
      addReport(title, userMessage);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `I've added **"${title}"** to your Reports list. Open it from the report list on the right.`,
        },
      ]);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const response = getStubResponse(userMessage, currentAlert);
      setMessages((m) => [...m, { role: "assistant", content: response }]);
      setLoading(false);
    }, 600);
  }

  return (
    <aside
      className={`fixed flex flex-col top-14 right-0 bottom-0 border-l border-border bg-surface-elevated transition-[width] duration-200 ease-out overflow-hidden z-10 ${
        assistantOpen ? "w-[28rem]" : "w-0"
      }`}
      aria-label="Assistant"
      aria-hidden={!assistantOpen}
    >
      <div className="flex flex-col h-full min-h-0 min-w-[28rem]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <h2 className="text-sm font-semibold text-white">Assistant</h2>
          <button
            type="button"
            onClick={() => setAssistantOpen(false)}
            className="p-2 rounded-md text-[#8b9cad] hover:text-white hover:bg-surface-overlay transition-colors"
            aria-label="Close Assistant"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 pt-4 pb-3 border-b border-border shrink-0 space-y-1">
          {currentAlert && (
            <p className="text-xs text-brand">
              Viewing alert <span className="font-mono">{currentAlert.alertId}</span> ({currentAlert.accountName})
            </p>
          )}
          <p className="text-xs text-[#8b9cad]">
            Answers are for support only; final decisions are yours.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-brand/20 text-white"
                    : "bg-surface-overlay text-[#e6edf3]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <>
                    <p className="text-[10px] uppercase tracking-wide text-[#8b9cad] mb-1.5" aria-label="AI-generated">
                      AI-generated
                    </p>
                    <div className="whitespace-pre-wrap [&>strong]:font-semibold">
                      {msg.content.split("**").map((part, j) =>
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                      )}
                    </div>
                  </>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-surface-overlay rounded-lg px-3 py-2 text-sm text-[#8b9cad]">
                Thinking…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-border shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about alerts, risk scores, or similar cases…"
              className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-brand"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
}
