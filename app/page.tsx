"use client";

import { useState, useMemo } from "react";
import { useAssistantContext } from "@/lib/AssistantContext";
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

const INITIAL_REPORTS: { id: string; title: string }[] = [
  { id: "rule-perf-outcomes", title: "Rule performance & outcomes by segment" },
  { id: "alert-volume-by-rule", title: "Alert volume by rule" },
  { id: "alert-volume-by-risk-tier-status", title: "Alert volume by risk tier and status" },
  { id: "case-resolution-over-time", title: "Case resolution over time" },
  { id: "onboarding-referrals-by-outcome", title: "Onboarding referrals by outcome" },
  { id: "time-to-triage-sla", title: "Time to triage (SLA)" },
  { id: "escalations-to-partner-bank", title: "Escalations to partner bank" },
  { id: "sar-filing-summary", title: "SAR filing summary" },
];

export default function DashboardPage() {
  const { setAssistantOpen, setAssistantIntent } = useAssistantContext();
  const [reports] = useState(INITIAL_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    INITIAL_REPORTS[0]?.id ?? null
  );
  const [reportSearch, setReportSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>("");

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
    <div className="flex gap-6 px-4 sm:px-6 py-8 max-w-[1600px] mx-auto">
      {/* Left column: main content */}
      <div className="min-w-0 flex-1">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
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
                  Strategist-created view · Not a system of record
                </span>
              </div>
              <p className="text-xs text-[#8b9cad] mt-2">
                {showRulePerfReport
                  ? "Use for cohort comparison and rule threshold impact. In production, views can be exported in partner-bank-safe (sanitized) format for handoffs and exams."
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
              <button
                key={report.id}
                type="button"
                onClick={() => setSelectedReportId(report.id)}
                className={`text-left px-3 py-2 rounded text-sm w-full transition-colors ${
                  selectedReportId === report.id
                    ? "bg-brand/20 text-brand"
                    : "text-[#8b9cad] hover:bg-surface-elevated hover:text-white"
                }`}
              >
                {report.title}
              </button>
            ))
          )}
        </nav>
      </aside>
    </div>
  );
}
