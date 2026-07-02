"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";
import { USER_MENU_ITEMS } from "@/lib/constants";
import { QuickLaunch } from "@/components";

// ─── Types ───────────────────────────────────────────

interface TopNavProps {
  title?: string;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

// ─── Component ───────────────────────────────────────

export function TopNav({
  title = "Dashboard",
  onMenuClick,
  isMobile,
}: TopNavProps) {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "flex h-[var(--topnav-height)] items-center justify-between",
          "border-border border-b px-6",
          "bg-bg-primary/80 backdrop-blur-xl",
        )}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="text-text-secondary hover:text-text-primary -ml-1 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}
          <h1 className="text-text-primary text-lg font-semibold">{title}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <div className="hidden w-64 sm:block">
            <QuickLaunch />
          </div>

          {/* Notifications */}
          <button
            onClick={() => router.push("/notifications")}
            className={cn(
              "relative rounded-lg p-2",
              "text-text-secondary hover:text-text-primary hover:bg-white/5",
              "transition-colors duration-[var(--duration-fast)]",
            )}
            aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="bg-accent-purple absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={cn(
                "flex items-center gap-2 rounded-lg p-1.5",
                "transition-colors duration-[var(--duration-fast)] hover:bg-white/5",
              )}
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
              aria-label="User menu"
            >
              <div className="bg-accent-purple/20 text-accent-purple-light flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold">
                {user?.name.charAt(0).toUpperCase() ?? "?"}
              </div>
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[var(--z-dropdown)]"
                    onClick={() => setIsUserMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ type: "tween", duration: 0.15 }}
                    className={cn(
                      "glass-strong absolute top-full right-0 z-[calc(var(--z-dropdown)+1)] mt-2",
                      "min-w-[200px] rounded-xl p-1.5",
                      "shadow-card",
                    )}
                    role="menu"
                  >
                    {/* User info */}
                    <div className="border-border mb-1.5 border-b px-3 py-2.5">
                      <p className="text-text-primary text-sm font-medium">
                        {user?.name}
                      </p>
                      <p className="text-text-tertiary text-xs">
                        {user?.email}
                      </p>
                    </div>

                    {USER_MENU_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        role="menuitem"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          if (item.action === "logout") {
                            logout();
                            router.push("/login");
                          } else if (item.href) {
                            router.push(item.href);
                          }
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm",
                          "transition-colors duration-[var(--duration-fast)]",
                          "text-text-secondary hover:text-text-primary hover:bg-white/5",
                          item.action === "logout" &&
                            "text-status-error/80 hover:text-status-error",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
