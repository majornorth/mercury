"use client";

import { useState, useMemo } from "react";
import {
  MOCK_OUTCOMES_BY_SEGMENT,
  MOCK_RULE_PERFORMANCE_BY_SEGMENT,
  type OutcomesBySegmentRow,
  type RulePerformanceBySegmentRow,
} from "@/lib/mockData";

export default function CustomViewsPage() {
  const [segmentFilter, setSegmentFilter] = useState<string>("");
  const [viewName] = useState("Rule performance & outcomes by segment");
  const [createViewPrompt, setCreateViewPrompt] = useState("");
  const [createViewMessage, setCreateViewMessage] = useState<string | null>(null);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Custom reports</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Read-only analytical views for policy and tuning. In production, views are created via natural language and the Assistant.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-4">
        <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Create new view</h2>
        <p className="text-xs text-[#8b9cad] mb-2">
          In production, describe the view in natural language; the Assistant and View Engine will generate a read-only view (allowlisted data only).
        </p>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={createViewPrompt}
            onChange={(e) => setCreateViewPrompt(e.target.value)}
            placeholder="e.g. Rule alert volume by segment and resolution rate"
            className="flex-1 min-w-[200px] rounded border border-border bg-surface px-3 py-2 text-sm text-white placeholder-[#6b7a8c] focus:outline-none focus:ring-1 focus:ring-[#6ea8fe]"
          />
          <button
            type="button"
            onClick={() => {
              if (createViewPrompt.trim()) {
                setCreateViewMessage("In production, the Assistant would generate this view from your description.");
              }
            }}
            className="rounded-lg bg-[#6ea8fe] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b9cfb] shrink-0"
          >
            Create view
          </button>
        </div>
        {createViewMessage && (
          <p className="text-xs text-[#6ea8fe] mt-2 rounded bg-[#6ea8fe]/10 px-2 py-1.5 border border-[#6ea8fe]/30">
            {createViewMessage}
          </p>
        )}
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
