"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type ReportType = "builtin" | "custom";

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  /** Only set for custom reports: the user's prompt that created the report. */
  prompt?: string;
}

const BUILT_IN_REPORTS: Report[] = [
  { id: "rule-perf-outcomes", title: "Rule performance & outcomes by segment", type: "builtin" },
  { id: "alert-volume-by-rule", title: "Alert volume by rule", type: "builtin" },
  { id: "alert-volume-by-risk-tier-status", title: "Alert volume by risk tier and status", type: "builtin" },
  { id: "case-resolution-over-time", title: "Case resolution over time", type: "builtin" },
  { id: "onboarding-referrals-by-outcome", title: "Onboarding referrals by outcome", type: "builtin" },
  { id: "time-to-triage-sla", title: "Time to triage (SLA)", type: "builtin" },
  { id: "escalations-to-partner-bank", title: "Escalations to partner bank", type: "builtin" },
  { id: "sar-filing-summary", title: "SAR filing summary", type: "builtin" },
];

const CUSTOM_REPORTS_STORAGE_KEY = "mercury-dashboard-custom-reports";
const DEFAULT_REPORT_ID = "rule-perf-outcomes";

function loadCustomReports(): Report[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_REPORTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Report[];
    return Array.isArray(parsed) ? parsed.filter((r) => r.id?.startsWith("custom-") && r.title) : [];
  } catch {
    return [];
  }
}

function saveCustomReports(reports: Report[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOM_REPORTS_STORAGE_KEY, JSON.stringify(reports));
  } catch {
    // ignore
  }
}

interface ReportContextValue {
  reports: Report[];
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  addReport: (title: string, prompt?: string) => string;
  removeReport: (id: string) => void;
}

const ReportContext = createContext<ReportContextValue | null>(null);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [customReports, setCustomReports] = useState<Report[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(DEFAULT_REPORT_ID);

  useEffect(() => {
    setCustomReports(loadCustomReports());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCustomReports(customReports);
  }, [hydrated, customReports]);

  const addReport = useCallback((title: string, prompt?: string) => {
    const id = `custom-${Date.now()}`;
    const report: Report = {
      id,
      title: title.trim() || "Custom report",
      type: "custom",
      prompt: prompt?.trim(),
    };
    setCustomReports((prev) => [...prev, report]);
    setSelectedReportId(id);
    return id;
  }, []);

  const removeReport = useCallback((id: string) => {
    if (!id.startsWith("custom-")) return;
    setCustomReports((prev) => prev.filter((r) => r.id !== id));
    setSelectedReportId((current) => (current === id ? DEFAULT_REPORT_ID : current));
  }, []);

  const reports = hydrated ? [...BUILT_IN_REPORTS, ...customReports] : BUILT_IN_REPORTS;

  return (
    <ReportContext.Provider
      value={{ reports, selectedReportId, setSelectedReportId, addReport, removeReport }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReportContext() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReportContext must be used within ReportProvider");
  return ctx;
}
