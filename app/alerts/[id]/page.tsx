import { notFound } from "next/navigation";
import { MOCK_ALERT_DETAILS, MOCK_ALERTS } from "@/lib/mockData";
import { AlertDetailView } from "@/components/AlertDetailView";
import type { AlertDetail } from "@/lib/mockData";

export default function AlertDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const alert = MOCK_ALERT_DETAILS[id] ?? MOCK_ALERTS.find((a) => a.id === id);
  if (!alert) notFound();

  const detail: AlertDetail | null = "riskScore" in alert ? alert : null;

  return <AlertDetailView alert={alert} detail={detail} />;
}
