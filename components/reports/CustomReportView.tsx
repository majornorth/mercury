import type { Report } from "@/lib/ReportContext";

interface CustomReportViewProps {
  report: Report;
}

export function CustomReportView({ report }: CustomReportViewProps) {
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
