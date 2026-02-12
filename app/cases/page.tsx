import { CaseList } from "@/components/CaseList";
import { CaseOutcomesSummary } from "@/components/CaseOutcomesSummary";

export default function CasesPage() {
  return (
    <>
      <CaseOutcomesSummary />
      <CaseList />
    </>
  );
}
