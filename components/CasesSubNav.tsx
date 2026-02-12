"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/cases", label: "List" },
  { href: "/cases/patterns", label: "Patterns" },
];

export function CasesSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 mb-6" aria-label="Cases views">
      {tabs.map(({ href, label }) => {
        const isActive = pathname === href || (href !== "/cases" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive ? "bg-surface-overlay text-white" : "text-[#8b9cad] hover:text-white hover:bg-surface-overlay/50"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
