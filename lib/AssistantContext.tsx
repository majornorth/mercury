"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type AssistantIntent = "default" | "add_report";

interface AssistantContextValue {
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  assistantIntent: AssistantIntent;
  setAssistantIntent: (intent: AssistantIntent) => void;
  clearAssistantIntent: () => void;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantIntent, setAssistantIntent] = useState<AssistantIntent>("default");
  const clearAssistantIntent = useCallback(() => setAssistantIntent("default"), []);

  return (
    <AssistantContext.Provider
      value={{
        assistantOpen,
        setAssistantOpen,
        assistantIntent,
        setAssistantIntent,
        clearAssistantIntent,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistantContext() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistantContext must be used within AssistantProvider");
  return ctx;
}
