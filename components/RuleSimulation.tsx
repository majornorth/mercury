"use client";

import { useState } from "react";
import { MOCK_ALERTS } from "@/lib/mockData";
import { appendSimulationRun } from "@/lib/mockAudit";
import { CURRENT_USER_ID } from "@/lib/mockUsers";

interface RuleSimulationProps {
  ruleId: string;
  ruleName: string;
  currentThreshold?: string;
}

/** Mock simulation: project impact of changing a rule threshold (v3 Pillar 3). */
function runMockSimulation(ruleId: string, hypotheticalValue: string): {
  currentAlerts: number;
  projectedAlerts: number;
  pctChange: number;
  wouldNoLongerFire: number;
  fpProxyNote: string;
} {
  const currentAlerts = MOCK_ALERTS.filter((a) => a.ruleNames.includes(ruleId)).length;
  const num = parseFloat(hypotheticalValue.replace(/[^0-9.]/g, ""));
  const factor = Number.isFinite(num) && num > 0 ? Math.min(0.5, 1 / (1 + num * 0.05)) : 0.35;
  const reduction = 1 - factor;
  const projectedAlerts = Math.max(0, Math.round(currentAlerts * (1 - reduction)));
  const wouldNoLongerFire = currentAlerts - projectedAlerts;
  const pctChange = currentAlerts > 0 ? Math.round((wouldNoLongerFire / currentAlerts) * 100) : 0;
  const fpProxyNote =
    pctChange > 0
      ? `Close-as-no-action rate may drop ~${Math.round(pctChange * 0.8)}% (fewer alerts to close).`
      : "No change in alert volume for this scenario.";
  return {
    currentAlerts,
    projectedAlerts,
    pctChange,
    wouldNoLongerFire,
    fpProxyNote,
  };
}

export function RuleSimulation({ ruleId, ruleName, currentThreshold }: RuleSimulationProps) {
  const [hypothetical, setHypothetical] = useState("");
  const [result, setResult] = useState<ReturnType<typeof runMockSimulation> | null>(null);

  const handleRun = () => {
    const res = runMockSimulation(ruleId, hypothetical || "10");
    setResult(res);
    appendSimulationRun({
      at: new Date().toISOString(),
      actorId: CURRENT_USER_ID,
      eventType: "simulation_run",
      resourceType: "rule",
      resourceId: ruleId,
      details: `Scenario: threshold "${hypothetical || "10"}". Current alerts: ${res.currentAlerts}, projected: ${res.projectedAlerts}, ~${res.wouldNoLongerFire} would no longer fire (${res.pctChange}%).`,
    });
  };

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <h4 className="text-xs font-medium text-emerald-400/90 mb-2">Scenario simulation (v3)</h4>
      <p className="text-xs text-[#8b9cad] mb-2">
        What-if only. Run a simulation to see projected impact over recent data; apply changes in rule config separately.
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="sr-only" htmlFor={`sim-threshold-${ruleId}`}>
          Hypothetical threshold value
        </label>
        <input
          id={`sim-threshold-${ruleId}`}
          type="text"
          placeholder={currentThreshold ?? "e.g. 10"}
          value={hypothetical}
          onChange={(e) => setHypothetical(e.target.value)}
          className="rounded-md border border-border bg-surface-overlay px-2 py-1.5 text-sm text-white placeholder:text-[#6b7a8c] w-32"
        />
        <button
          type="button"
          onClick={handleRun}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
        >
          Run simulation
        </button>
      </div>
      {result && (
        <div className="mt-3 p-3 rounded-md bg-surface-overlay/70 text-xs text-[#8b9cad] space-y-1">
          <p className="text-white font-medium">Projected impact (mock, last 90d-style data)</p>
          <p>Current alerts with this rule: {result.currentAlerts} → Projected: {result.projectedAlerts}</p>
          <p>~{result.wouldNoLongerFire} would no longer fire ({result.pctChange}%). Consider whether those are acceptable to miss.</p>
          <p>{result.fpProxyNote}</p>
          <p className="pt-1 text-[#6b7a8c]">Simulation run logged to Audit.</p>
        </div>
      )}
    </div>
  );
}
