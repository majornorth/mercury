"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/cases", label: "List" },
  { href: "/cases/patterns", label: "Patterns" },
  { href: "/cases/qc", label: "QC" },
  { href: "/cases/appeals", label: "Appeals" },
];

export function CasesSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex border-b border-[#2d3843] mb-6" aria-label="Cases views">
      {tabs.map(({ href, label }) => {
        const isActive = pathname === href || (href !== "/cases" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-[3px] -mb-px ${
              isActive
                ? "text-white border-brand"
                : "text-[#8b9cad] border-transparent hover:text-white"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
