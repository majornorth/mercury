"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { AssistantPanel } from "@/components/AssistantPanel";
import { AlertProvider } from "@/lib/AlertContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <AlertProvider>
      <div className="flex flex-col min-h-screen">
        <Nav
          onToggleAssistant={() => setAssistantOpen((o) => !o)}
          assistantOpen={assistantOpen}
        />
        <div className="flex flex-1 min-h-0">
          <main className="flex-1 min-w-0 overflow-auto">{children}</main>
          <AssistantPanel
            open={assistantOpen}
            onClose={() => setAssistantOpen(false)}
          />
        </div>
      </div>
    </AlertProvider>
  );
}
