import {
  MOCK_ONBOARDING_REFERRALS_BY_OUTCOME,
  type OnboardingReferralsByOutcomeRow,
} from "@/lib/mockData";

export function ReportOnboardingReferralsByOutcome() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface-elevated overflow-hidden">
        <h2 className="px-4 py-3 border-b border-border text-sm font-medium text-[#8b9cad]">
          Onboarding referrals by outcome
        </h2>
        <p className="px-4 pt-2 text-xs text-[#8b9cad]">
          KYC/onboarding referral outcomes by customer segment. Use to see where approvals, denials, and escalations concentrate.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-overlay/50">
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium text-right">Approved</th>
                <th className="px-4 py-2 font-medium text-right">Denied</th>
                <th className="px-4 py-2 font-medium text-right">Escalated</th>
                <th className="px-4 py-2 font-medium text-right">Open</th>
                <th className="px-4 py-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ONBOARDING_REFERRALS_BY_OUTCOME.map((row: OnboardingReferralsByOutcomeRow) => (
                <tr key={row.segment} className="border-b border-border/50">
                  <td className="px-4 py-2 font-medium capitalize">{row.segment}</td>
                  <td className="px-4 py-2 text-right">{row.approved}</td>
                  <td className="px-4 py-2 text-right">{row.denied}</td>
                  <td className="px-4 py-2 text-right">{row.escalated}</td>
                  <td className="px-4 py-2 text-right text-[#8b9cad]">{row.open}</td>
                  <td className="px-4 py-2 text-right font-medium">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
