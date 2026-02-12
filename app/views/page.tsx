"use client";

import { useState, useMemo } from "react";
import { MOCK_ALERTS, MOCK_CASES } from "@/lib/mockData";
import type { RiskTier } from "@/lib/mockData";

type ViewFilter = {
  riskTier?: RiskTier;
  segment?: string;
  outcome?: string;
};

export default function CustomViewsPage() {
  const [filter, setFilter] = useState<ViewFilter>({});
  const [viewName] = useState("Onboarding referrals by segment and outcome (prototype)");

  const filteredAlerts = useMemo(() => {
    return MOCK_ALERTS.filter((a) => {
      if (filter.riskTier && a.riskTier !== filter.riskTier) return false;
      if (filter.segment && a.segment !== filter.segment) return false;
      return true;
    });
  }, [filter]);

  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter((c) => {
      if (filter.outcome && c.outcome !== filter.outcome) return false;
      if (filter.segment && c.segment !== filter.segment) return false;
      return true;
    });
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Custom views</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Read-only views over alerts and outcomes. In production, views are created via natural language and the Assistant.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="text-sm font-medium text-white">{viewName}</span>
          <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
            Strategist-created view · Not a system of record
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface-elevated p-4 mb-6">
        <h2 className="text-sm font-medium text-[#8b9cad] mb-2">Filters</h2>
        <div className="flex flex-wrap gap-3">
          <select
            value={filter.riskTier ?? ""}
            onChange={(e) =>
              setFilter((f) => ({
                ...f,
                riskTier: (e.target.value || undefined) as RiskTier | undefined,
              }))
            }
            className="rounded border border-border bg-surface px-2 py-1.5 text-sm text-white"
          >
            <option value="">All risk tiers</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filter.segment ?? ""}
            onChange={(e) =>
              setFilter((f) => ({ ...f, segment: e.target.value || undefined }))
            }
            className="rounded border border-border bg-surface px-2 py-1.5 text-sm text-white"
          >
            <option value="">All segments</option>
            <option value="ecommerce">Ecommerce</option>
            <option value="saas">SaaS</option>
            <option value="fintech">Fintech</option>
          </select>
          <select
            value={filter.outcome ?? ""}
            onChange={(e) =>
              setFilter((f) => ({ ...f, outcome: e.target.value || undefined }))
            }
            className="rounded border border-border bg-surface px-2 py-1.5 text-sm text-white"
          >
            <option value="">All outcomes</option>
            <option value="closed_no_action">Closed no action</option>
            <option value="escalated">Escalated</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="sar">SAR</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
          <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
            Alerts ({filteredAlerts.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-overlay/50">
                  <th className="px-4 py-2 font-medium">Alert</th>
                  <th className="px-4 py-2 font-medium">Account</th>
                  <th className="px-4 py-2 font-medium">Risk</th>
                  <th className="px-4 py-2 font-medium">Segment</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((a) => (
                  <tr key={a.id} className="border-b border-border/50">
                    <td className="px-4 py-2 font-mono text-xs">{a.id}</td>
                    <td className="px-4 py-2">{a.accountName}</td>
                    <td className="px-4 py-2">{a.riskTier}</td>
                    <td className="px-4 py-2 text-[#8b9cad]">{a.segment ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
          <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
            Case outcomes ({filteredCases.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-overlay/50">
                  <th className="px-4 py-2 font-medium">Case</th>
                  <th className="px-4 py-2 font-medium">Alert</th>
                  <th className="px-4 py-2 font-medium">Outcome</th>
                  <th className="px-4 py-2 font-medium">Segment</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((c) => (
                  <tr key={c.id} className="border-b border-border/50">
                    <td className="px-4 py-2 font-mono text-xs">{c.id}</td>
                    <td className="px-4 py-2 font-mono text-xs">{c.alertId}</td>
                    <td className="px-4 py-2">{c.outcome.replace("_", " ")}</td>
                    <td className="px-4 py-2 text-[#8b9cad]">{c.segment ?? "—"}</td>
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
