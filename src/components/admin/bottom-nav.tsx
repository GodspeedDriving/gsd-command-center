"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const TABS = [
  { href: "/admin/today", label: "Today" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/money", label: "Money" },
  { href: "/admin/more", label: "More" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="fixed inset-x-0 bottom-0 z-10 flex border-t border-neutral-200 bg-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium",
              active ? "text-brand-blue" : "text-neutral-500",
            )}
          >
            <span
              aria-hidden
              className={clsx(
                "h-1.5 w-1.5 rounded-full",
                active ? "bg-brand-blue" : "bg-transparent",
              )}
            />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
