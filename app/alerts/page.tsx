import { AlertList } from "@/components/AlertList";
import { AlertVolumeByRule } from "@/components/AlertVolumeByRule";

export default function TriagePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Alert triage</h1>
        <p className="text-sm text-[#8b9cad] mt-1">
          Review and prioritize alerts. Open an alert for explainability and actions.
        </p>
      </div>
      <AlertVolumeByRule />
      <AlertList />
    </div>
  );
}
