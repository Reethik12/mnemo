"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { SETTINGS_SECTIONS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple check for hash-based routing in the MVP
  const activeSection = "appearance"; // We'll keep it simple for Phase 2

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <SectionHeader
        title="Settings"
        description="Manage your application preferences and workspace configuration."
      />

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Settings Sidebar */}
        <aside className="w-full shrink-0 md:w-64">
          <nav className="flex flex-col gap-1" aria-label="Settings navigation">
            {SETTINGS_SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                  activeSection === section.id
                    ? "bg-accent-purple/10 text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5",
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md",
                    activeSection === section.id
                      ? "text-accent-purple-light"
                      : "text-text-tertiary",
                  )}
                >
                  {/* Using simplified icons for MVP */}
                  <div className="h-3 w-3 rounded-full border border-current" />
                </div>
                {section.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
