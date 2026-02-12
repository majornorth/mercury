"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CURRENT_USER_ID, getMockUser } from "@/lib/mockUsers";

const navItems = [
  { href: "/", label: "Alerts" },
  { href: "/cases", label: "Cases" },
  { href: "/rules", label: "Rules" },
  { href: "/audit", label: "Audit" },
  { href: "/views", label: "Custom reports" },
];

interface NavProps {
  onToggleAssistant: () => void;
  assistantOpen: boolean;
}

export function Nav({ onToggleAssistant, assistantOpen }: NavProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface-elevated sticky top-0 z-20">
      <div className="px-4 sm:px-6 flex items-center justify-between h-14 w-full">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight text-white">
            <img src="/images/mercury-logo.svg" alt="" className="h-7 w-auto" aria-hidden />
            Risk Ops
          </Link>
          <nav className="flex gap-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-surface-overlay text-white"
                    : "text-[#8b9cad] hover:text-white hover:bg-surface-overlay/50"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8b9cad] hidden sm:inline" title={getMockUser(CURRENT_USER_ID) ? `${getMockUser(CURRENT_USER_ID)!.name} (RBAC stub; real roles from IdP in production)` : "Current user"}>
            Role: <span className="text-white font-medium">{getMockUser(CURRENT_USER_ID)?.role ?? "—"}</span>
          </span>
          <span className="text-xs text-[#8b9cad] hidden sm:inline">Internal use only</span>
          <button
            type="button"
            onClick={onToggleAssistant}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
              assistantOpen
                ? "bg-[#6ea8fe]/20 text-[#6ea8fe] border-[#6ea8fe]/60"
                : "text-[#8b9cad] border-[#8b9cad]/30 hover:text-white hover:bg-surface-overlay hover:border-[#8b9cad]/50"
            }`}
            aria-expanded={assistantOpen}
            aria-label={assistantOpen ? "Close Assistant" : "Open Assistant"}
          >
            Assistant
          </button>
        </div>
      </div>
    </header>
  );
}
