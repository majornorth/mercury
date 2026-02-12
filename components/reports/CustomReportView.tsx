import type { Report } from "@/lib/ReportContext";
import { ReportHighRiskAccountsLast30Days } from "./ReportHighRiskAccountsLast30Days";

/** Detect if the report request is for "high-risk accounts last 30 days" so we can render the dedicated view. */
function isHighRiskAccountsLast30Days(report: Report): boolean {
  const text = [report.title, report.prompt].filter(Boolean).join(" ").toLowerCase();
  return (
    (text.includes("high-risk") || text.includes("high risk")) &&
    (text.includes("30 days") || text.includes("last 30"))
  );
}

interface CustomReportViewProps {
  report: Report;
}

export function CustomReportView({ report }: CustomReportViewProps) {
  if (isHighRiskAccountsLast30Days(report)) {
    return <ReportHighRiskAccountsLast30Days />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden p-6">
        <p className="text-sm text-[#8b9cad] mb-4">
          This report was created from your request. Report content will appear here when the View Engine is connected.
        </p>
        {report.prompt && (
          <div className="rounded border border-border bg-surface p-4">
            <p className="text-xs font-medium text-[#8b9cad] mb-2">Your request</p>
            <p className="text-sm text-white whitespace-pre-wrap">"{report.prompt}"</p>
          </div>
        )}
      </section>
    </div>
  );
}
