"use client";

import { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useAssistantContext } from "@/lib/AssistantContext";
import { useReportContext } from "@/lib/ReportContext";
import {
  MOCK_OUTCOMES_BY_SEGMENT,
  MOCK_RULE_PERFORMANCE_BY_SEGMENT,
  type OutcomesBySegmentRow,
  type RulePerformanceBySegmentRow,
} from "@/lib/mockData";
import { ReportAlertVolumeByRule } from "@/components/reports/ReportAlertVolumeByRule";
import { ReportAlertVolumeByRiskTierStatus } from "@/components/reports/ReportAlertVolumeByRiskTierStatus";
import { ReportCaseResolutionOverTime } from "@/components/reports/ReportCaseResolutionOverTime";
import { ReportOnboardingReferralsByOutcome } from "@/components/reports/ReportOnboardingReferralsByOutcome";
import { ReportTimeToTriageSla } from "@/components/reports/ReportTimeToTriageSla";
import { ReportEscalationsToPartnerBank } from "@/components/reports/ReportEscalationsToPartnerBank";
import { ReportSarFilingSummary } from "@/components/reports/ReportSarFilingSummary";
import { ReportRecallProxy } from "@/components/reports/ReportRecallProxy";
import { ReportFraudLossChargebacks } from "@/components/reports/ReportFraudLossChargebacks";
import { CustomReportView } from "@/components/reports/CustomReportView";

export default function ReportsPage() {
  const { setAssistantOpen, setAssistantIntent } = useAssistantContext();
  const { reports, selectedReportId, setSelectedReportId, removeReport } = useReportContext();
  const [reportSearch, setReportSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (menuOpenId === null) {
      setMenuPosition(null);
      return;
    }
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const menuWidth = 128;
    setMenuPosition({
      top: rect.bottom + 2,
      left: Math.max(8, rect.right - menuWidth),
    });
  }, [menuOpenId]);

  useEffect(() => {
    if (menuOpenId === null) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setMenuOpenId(null);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpenId]);

  const filteredReports = useMemo(() => {
    if (!reportSearch.trim()) return reports;
    const q = reportSearch.trim().toLowerCase();
    return reports.filter((r) => r.title.toLowerCase().includes(q));
  }, [reports, reportSearch]);

  const filteredOutcomes = useMemo(() => {
    return MOCK_OUTCOMES_BY_SEGMENT.filter((row) =>
      segmentFilter ? row.segment === segmentFilter : true
    );
  }, [segmentFilter]);

  const filteredRulePerf = useMemo(() => {
    return MOCK_RULE_PERFORMANCE_BY_SEGMENT.filter((row) =>
      segmentFilter ? row.segment === segmentFilter : true
    );
  }, [segmentFilter]);

  function handleCreateReport() {
    setAssistantIntent("add_report");
    setAssistantOpen(true);
  }

  const selectedReport = reports.find((r) => r.id === selectedReportId);
  const showRulePerfReport = selectedReportId === "rule-perf-outcomes";

  return (
    <div className="flex gap-6 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      {/* Left column: main content */}
      <div className="min-w-0 flex-1">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Reports</h1>
          <p className="text-sm text-[#8b9cad] mt-1">
            Your custom reports and analytical views. Create reports via the Assistant; use Alerts and Cases for triage and investigations.
          </p>
        </div>

        {!selectedReport ? (
          <div className="rounded-lg border border-border bg-surface-elevated p-8 text-center">
            <p className="text-sm text-[#8b9cad]">
              Select a report from the list to view it here.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-sm font-medium text-white">{selectedReport.title}</span>
                <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  {selectedReport.type === "custom"
                    ? selectedReport.mode === "operational"
                      ? "Operational · Versioned, logged, shareable"
                      : "Exploratory (Sandbox) · This view cannot be shared"
                    : "Strategist-created view · Not a system of record"}
                </span>
              </div>
              {selectedReport.type === "custom" && selectedReport.touchesPii && (
                <p className="text-xs text-amber-400 mt-2">
                  This query touches regulated PII fields. Use per RBAC and audit policy.
                </p>
              )}
              <p className="text-xs text-[#8b9cad] mt-2">
                {showRulePerfReport
                  ? "Use for cohort comparison and rule threshold impact. In production, views can be exported in partner-bank-safe (sanitized) format for handoffs and exams."
                  : selectedReport.type === "custom"
                    ? "Sandbox views are private and time-boxed; operational views require justification and are auditable."
                    : "Strategist-created analytical view. In production, views can be exported in partner-bank-safe (sanitized) format for handoffs and exams."}
              </p>
            </div>

            {showRulePerfReport && (
              <>
                <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-6">
                  <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Filters</h2>
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={segmentFilter}
                      onChange={(e) => setSegmentFilter(e.target.value)}
                      className="rounded border border-border bg-surface px-2 py-1.5 text-sm text-white"
                    >
                      <option value="">All segments</option>
                      <option value="ecommerce">Ecommerce</option>
                      <option value="saas">SaaS</option>
                      <option value="fintech">Fintech</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
                    <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
                      Outcomes by segment
                    </h2>
                    <p className="px-4 pt-2 text-xs text-[#8b9cad]">
                      Case and referral outcomes by customer segment. Use to see where escalations and SARs concentrate.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-border bg-surface-overlay/50">
                            <th className="px-4 py-2 font-medium">Segment</th>
                            <th className="px-4 py-2 font-medium text-right">Closed no action</th>
                            <th className="px-4 py-2 font-medium text-right">Escalated</th>
                            <th className="px-4 py-2 font-medium text-right">SAR</th>
                            <th className="px-4 py-2 font-medium text-right">Approved</th>
                            <th className="px-4 py-2 font-medium text-right">Denied</th>
                            <th className="px-4 py-2 font-medium text-right">Open</th>
                            <th className="px-4 py-2 font-medium text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOutcomes.map((row: OutcomesBySegmentRow) => (
                            <tr key={row.segment} className="border-b border-border/50">
                              <td className="px-4 py-2 font-medium capitalize">{row.segment}</td>
                              <td className="px-4 py-2 text-right">{row.closedNoAction}</td>
                              <td className="px-4 py-2 text-right">{row.escalated}</td>
                              <td className="px-4 py-2 text-right">{row.sar}</td>
                              <td className="px-4 py-2 text-right">{row.approved}</td>
                              <td className="px-4 py-2 text-right">{row.denied}</td>
                              <td className="px-4 py-2 text-right text-[#8b9cad]">{row.open}</td>
                              <td className="px-4 py-2 text-right font-medium">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
                    <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
                      Rule performance by segment
                    </h2>
                    <p className="px-4 pt-2 text-xs text-[#8b9cad]">
                      Alert volume and resolution mix per rule and segment. &quot;% closed no action&quot; is a proxy for false positive rate; use for threshold tuning.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-border bg-surface-overlay/50">
                            <th className="px-4 py-2 font-medium">Rule</th>
                            <th className="px-4 py-2 font-medium">Segment</th>
                            <th className="px-4 py-2 font-medium text-right">Alerts</th>
                            <th className="px-4 py-2 font-medium text-right">Closed no action</th>
                            <th className="px-4 py-2 font-medium text-right">Escalated</th>
                            <th className="px-4 py-2 font-medium text-right">SAR</th>
                            <th className="px-4 py-2 font-medium text-right">Open</th>
                            <th className="px-4 py-2 font-medium text-right">% closed no action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRulePerf.map((row: RulePerformanceBySegmentRow, i: number) => (
                            <tr key={`${row.ruleId}-${row.segment}-${i}`} className="border-b border-border/50">
                              <td className="px-4 py-2 font-mono text-xs">{row.ruleName}</td>
                              <td className="px-4 py-2 capitalize text-[#8b9cad]">{row.segment}</td>
                              <td className="px-4 py-2 text-right">{row.alertCount}</td>
                              <td className="px-4 py-2 text-right">{row.closedNoAction}</td>
                              <td className="px-4 py-2 text-right">{row.escalated}</td>
                              <td className="px-4 py-2 text-right">{row.sar}</td>
                              <td className="px-4 py-2 text-right text-[#8b9cad]">{row.open}</td>
                              <td className="px-4 py-2 text-right font-medium">{row.pctClosedNoAction}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </>
            )}
            {selectedReportId === "alert-volume-by-rule" && <ReportAlertVolumeByRule />}
            {selectedReportId === "alert-volume-by-risk-tier-status" && (
              <ReportAlertVolumeByRiskTierStatus />
            )}
            {selectedReportId === "case-resolution-over-time" && (
              <ReportCaseResolutionOverTime />
            )}
            {selectedReportId === "onboarding-referrals-by-outcome" && (
              <ReportOnboardingReferralsByOutcome />
            )}
            {selectedReportId === "time-to-triage-sla" && <ReportTimeToTriageSla />}
            {selectedReportId === "escalations-to-partner-bank" && (
              <ReportEscalationsToPartnerBank />
            )}
            {selectedReportId === "sar-filing-summary" && <ReportSarFilingSummary />}
            {selectedReportId === "recall-proxy" && <ReportRecallProxy />}
            {selectedReportId === "fraud-loss-chargebacks" && <ReportFraudLossChargebacks />}
            {selectedReport?.type === "custom" && (
              <CustomReportView report={selectedReport} />
            )}
          </>
        )}
      </div>

      {/* Right sidebar: report list */}
      <aside className="w-64 shrink-0 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCreateReport}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover w-full"
        >
          Create report
        </button>
        <input
          type="search"
          placeholder="Search reports..."
          value={reportSearch}
          onChange={(e) => setReportSearch(e.target.value)}
          className="rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-[#8b9cad] w-full"
          aria-label="Filter reports"
        />
        <nav className="flex flex-col gap-0.5 overflow-y-auto min-h-0">
          {filteredReports.length === 0 ? (
            <p className="text-xs text-[#8b9cad] py-2">
              {reportSearch.trim() ? "No reports match your search." : "No reports yet."}
            </p>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className={`group flex items-center gap-1 rounded text-sm w-full min-w-0 ${
                  selectedReportId === report.id
                    ? "bg-brand/20 text-brand"
                    : "text-[#8b9cad] hover:bg-surface-elevated hover:text-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedReportId(report.id)}
                  className="flex-1 text-left px-3 py-2 rounded truncate transition-colors min-w-0"
                >
                  {report.title}
                </button>
                {report.type === "custom" && (
                  <div className="relative shrink-0 pr-1">
                    <button
                      ref={menuOpenId === report.id ? triggerRef : undefined}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId((prev) => (prev === report.id ? null : report.id));
                      }}
                      className="p-1.5 rounded text-[#8b9cad] opacity-0 group-hover:opacity-100 hover:bg-surface-overlay hover:text-white transition-opacity"
                      aria-label="Report options"
                      aria-expanded={menuOpenId === report.id}
                      aria-haspopup="true"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
                        <circle cx="8" cy="3" r="1.25" />
                        <circle cx="8" cy="8" r="1.25" />
                        <circle cx="8" cy="13" r="1.25" />
                      </svg>
                    </button>
                    {menuOpenId === report.id &&
                      menuPosition &&
                      typeof document !== "undefined" &&
                      createPortal(
                        <div
                          ref={menuRef}
                          className="fixed z-[100] py-1 min-w-[8rem] rounded-md border border-border bg-surface-elevated shadow-lg"
                          style={{ top: menuPosition.top, left: menuPosition.left }}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeReport(report.id);
                              setMenuOpenId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-surface-overlay rounded"
                          >
                            Delete
                          </button>
                        </div>,
                        document.body
                      )}
                  </div>
                )}
              </div>
            ))
          )}
        </nav>
      </aside>
    </div>
  );
}
