"use client";

import { useState, useMemo } from "react";
import { useAssistantContext } from "@/lib/AssistantContext";
import {
  MOCK_OUTCOMES_BY_SEGMENT,
  MOCK_RULE_PERFORMANCE_BY_SEGMENT,
  type OutcomesBySegmentRow,
  type RulePerformanceBySegmentRow,
} from "@/lib/mockData";

export default function DashboardPage() {
  const { setAssistantOpen, setAssistantIntent } = useAssistantContext();
  const [segmentFilter, setSegmentFilter] = useState<string>("");
  const [viewName] = useState("Rule performance & outcomes by segment");

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

  function handleAddReport() {
    setAssistantIntent("add_report");
    setAssistantOpen(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Your custom reports and analytical views. Add reports via the Assistant; use Alerts and Cases for triage and investigations.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-sm font-medium text-[#8b9cad]">Reports</h2>
          <button
            type="button"
            onClick={handleAddReport}
            className="rounded-lg bg-[#6ea8fe] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b9cfb] shrink-0"
          >
            Add report
          </button>
        </div>
        <p className="text-xs text-[#8b9cad] mt-2">
          Click &quot;Add report&quot; to open the Assistant and describe the custom report you want. The Assistant will generate a read-only view (allowlisted data only).
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="text-sm font-medium text-white">{viewName}</span>
          <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
            Strategist-created view · Not a system of record
          </span>
        </div>
        <p className="text-xs text-[#8b9cad] mt-2">
          Use for cohort comparison and rule threshold impact. In production, views can be exported in partner-bank-safe (sanitized) format for handoffs and exams.
        </p>
      </div>

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
    </div>
  );
}
