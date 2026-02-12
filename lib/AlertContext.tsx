"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type AlertContextValue = { alertId: string; accountName: string } | null;

const AlertContext = createContext<{
  currentAlert: AlertContextValue;
  setCurrentAlert: (alert: AlertContextValue) => void;
}>({
  currentAlert: null,
  setCurrentAlert: () => {},
});

export function AlertProvider({ children }: { children: ReactNode }) {
  const [currentAlert, setCurrentAlert] = useState<AlertContextValue>(null);
  return (
    <AlertContext.Provider value={{ currentAlert, setCurrentAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
