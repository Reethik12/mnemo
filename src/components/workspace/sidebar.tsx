"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { SIDEBAR_SECTIONS } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";
import { SidebarItem } from "./sidebar-item";
import { SidebarSection } from "./sidebar-section";
import { WorkspaceSwitcher } from "./workspace-switcher";

// ─── Types ───────────────────────────────────────────

interface SidebarProps {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}

// ─── Component ───────────────────────────────────────

export function Sidebar({
  isExpanded,
  isMobileOpen,
  isMobile,
  onToggle,
  onCloseMobile,
}: SidebarProps) {
  const { user, logout } = useAuth();

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "border-border flex items-center border-b px-4",
          "h-[var(--topnav-height)]",
          !isExpanded && !isMobile && "justify-center px-0",
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "text-lg font-bold tracking-tight",
            !isExpanded && !isMobile && "text-base",
          )}
        >
          <span className="text-gradient">
            {isExpanded || isMobile ? "Mnemo" : "M"}
          </span>
        </Link>
      </div>

      <div className="border-border border-b">
        <WorkspaceSwitcher isExpanded={isExpanded || isMobile} />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {SIDEBAR_SECTIONS.map((section) => (
          <SidebarSection
            key={section.title}
            title={section.title}
            isExpanded={isExpanded || isMobile}
          >
            {section.items.map((item) => (
              <div key={item.id} onClick={isMobile ? onCloseMobile : undefined}>
                <SidebarItem {...item} isExpanded={isExpanded || isMobile} />
              </div>
            ))}
          </SidebarSection>
        ))}
      </div>

      {/* User area */}
      <div
        className={cn(
          "border-border border-t p-3",
          !isExpanded && !isMobile && "flex justify-center",
        )}
      >
        {(isExpanded || isMobile) && user ? (
          <div className="flex items-center gap-3">
            <div className="bg-accent-purple/20 text-accent-purple-light flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-text-primary truncate text-sm font-medium">
                {user.name}
              </p>
              <p className="text-text-tertiary truncate text-xs">
                {user.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-text-tertiary hover:text-text-secondary shrink-0 transition-colors"
              aria-label="Logout"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="bg-accent-purple/20 text-accent-purple-light mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold">
            {user?.name.charAt(0).toUpperCase() ?? "?"}
          </div>
        )}
      </div>
    </div>
  );

  // Mobile: slide-over overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[var(--z-navbar)] bg-black/50 backdrop-blur-sm"
              onClick={onCloseMobile}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "fixed top-0 left-0 z-[var(--z-modal)] h-full",
                "w-[var(--sidebar-width-expanded)]",
                "bg-bg-secondary border-border border-r",
              )}
              aria-label="Sidebar navigation"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: persistent sidebar
  return (
    <motion.aside
      animate={{
        width: isExpanded
          ? "var(--sidebar-width-expanded)"
          : "var(--sidebar-width-collapsed)",
      }}
      transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bg-bg-secondary border-border relative h-screen shrink-0 border-r",
        "overflow-hidden",
      )}
      aria-label="Sidebar navigation"
    >
      {sidebarContent}

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute top-[calc(var(--topnav-height)/2)] -right-3 z-10",
          "flex h-6 w-6 -translate-y-1/2 items-center justify-center",
          "border-border bg-bg-secondary rounded-full border",
          "text-text-tertiary hover:text-text-primary hover:bg-surface-hover",
          "transition-all duration-[var(--duration-fast)]",
        )}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={isExpanded}
      >
        <svg
          className={cn(
            "h-3 w-3 transition-transform",
            !isExpanded && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </motion.aside>
  );
}
