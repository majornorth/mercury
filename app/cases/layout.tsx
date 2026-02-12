import { CasesSubNav } from "@/components/CasesSubNav";

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-white">Cases</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Investigation cases and pattern view. List view for case work; Patterns for behavior archetypes and resolution prevalence.
        </p>
      </div>
      <CasesSubNav />
      {children}
    </div>
  );
}
