"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Triage" },
  { href: "/cases", label: "Cases" },
  { href: "/views", label: "Custom views" },
  { href: "/audit", label: "Audit" },
];

interface NavProps {
  onToggleAssistant: () => void;
  assistantOpen: boolean;
}

export function Nav({ onToggleAssistant, assistantOpen }: NavProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface-elevated sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-semibold text-lg tracking-tight text-white">
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
          <span className="text-xs text-[#8b9cad] hidden sm:inline">Internal use only</span>
          <button
            type="button"
            onClick={onToggleAssistant}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              assistantOpen
                ? "bg-[#6ea8fe]/20 text-[#6ea8fe]"
                : "text-[#8b9cad] hover:text-white hover:bg-surface-overlay"
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
