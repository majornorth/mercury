import { CaseList } from "@/components/CaseList";
import { CaseOutcomesSummary } from "@/components/CaseOutcomesSummary";

export default function CasesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Cases</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Investigation cases linked to alerts. Open a case for outcome and rationale; go to the alert for full detail.
        </p>
      </div>
      <CaseOutcomesSummary />
      <CaseList />
    </div>
  );
}
