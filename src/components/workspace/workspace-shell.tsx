"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { CommandCenter, OfflineBanner } from "@/components";
import { MnemoAIFab } from "@/components/global/MnemoAIFab";

// ─── Types ───────────────────────────────────────────

interface WorkspaceShellProps {
  children: React.ReactNode;
  title?: string;
}

// ─── Component ───────────────────────────────────────

/**
 * Composes sidebar + top navigation + content area.
 * Handles responsive behavior and keyboard shortcuts.
 */
export function WorkspaceShell({ children, title }: WorkspaceShellProps) {
  const { isExpanded, isMobileOpen, isMobile, toggle, closeMobile } =
    useSidebar();

  // Global keyboard shortcuts
  useKeyboardShortcuts([{ key: "\\", metaKey: true, handler: toggle }]);

  return (
    <div className="bg-bg-primary flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isExpanded}
        isMobileOpen={isMobileOpen}
        isMobile={isMobile}
        onToggle={toggle}
        onCloseMobile={closeMobile}
      />

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav title={title} onMenuClick={toggle} isMobile={isMobile} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">{children}</div>
        </main>
      </div>

      <CommandCenter />
      <OfflineBanner />
      <MnemoAIFab />
    </div>
  );
}
