"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT =
  typeof process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID === "string" &&
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID.length > 0
    ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`
    : null;

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setErrorMessage("Form is not configured. Set NEXT_PUBLIC_FORMSPREE_FORM_ID.");
      setStatus("error");
      return;
    }
    const body = feedback.trim() || "(No feedback text provided)";
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          message: body,
          _subject: "Mercury prototype feedback",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setFeedback("");
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
        }, 1500);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not send. Please try again or email your feedback directly.");
    }
  }

  function handleClose() {
    setOpen(false);
    setFeedback("");
    setStatus("idle");
    setErrorMessage("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] shadow-lg hover:bg-[#252d38] transition-colors"
        aria-label="Give feedback"
      >
        <svg
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        Give feedback
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          onClick={handleClose}
        >
          <div
            className="rounded-lg border border-border bg-surface-elevated p-4 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="feedback-modal-title" className="text-sm font-semibold text-white mb-1">
              Give feedback
            </h2>
            <p className="text-xs text-[#8b9cad] mb-3">
              Feedback will be emailed to Jason McCoy and subsequently incorporated into updates to the prototype.
            </p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
                rows={4}
                disabled={status === "submitting"}
                className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-[#8b9cad] resize-y mb-4 focus:outline-none focus:ring-1 focus:ring-[var(--border)] disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Feedback"
              />
              {status === "error" && errorMessage && (
                <p className="text-xs text-red-400 mb-3" role="alert">
                  {errorMessage}
                </p>
              )}
              {status === "success" && (
                <p className="text-xs text-green-400 mb-3" role="status">
                  Thanks — your feedback has been sent.
                </p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={status === "submitting"}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-[#8b9cad] hover:text-white disabled:opacity-60"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-lg bg-brand px-3 py-1.5 text-sm text-white hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
