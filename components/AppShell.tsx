"use client";

import { Nav } from "@/components/Nav";
import { AssistantPanel } from "@/components/AssistantPanel";
import { FeedbackButton } from "@/components/FeedbackButton";
import { AlertProvider } from "@/lib/AlertContext";
import { AssistantProvider } from "@/lib/AssistantContext";
import { ReportProvider } from "@/lib/ReportContext";
import { useAssistantContext } from "@/lib/AssistantContext";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { assistantOpen } = useAssistantContext();
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="flex flex-1 min-h-0">
          <main
            className={`flex-1 min-w-0 overflow-auto ${assistantOpen ? "mr-[28rem]" : ""}`}
          >
            {children}
          </main>
        </div>
      </div>
      <AssistantPanel />
      <FeedbackButton />
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <AssistantProvider>
        <ReportProvider>
          <AppShellInner>{children}</AppShellInner>
        </ReportProvider>
      </AssistantProvider>
    </AlertProvider>
  );
}
