"use client";

import { motion } from "framer-motion";
import { useNotifications } from "@/hooks/use-notifications";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassContainer } from "@/components/shared/glass-container";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markAsRead } =
    useNotifications();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <SectionHeader
        title="Notifications"
        description="Stay updated on your workspace activity."
        action={
          unreadCount > 0 && (
            <Button variant="secondary" size="sm" onClick={markAllRead}>
              Mark all read
            </Button>
          )
        }
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={
            <svg
              className="h-10 w-10"
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
          }
          title="All caught up"
          description="You don't have any new notifications."
        />
      ) : (
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {notifications.map((notif) => (
            <motion.div key={notif.id} variants={fadeInUp}>
              <GlassContainer
                className={cn(
                  "relative flex gap-4 p-5 transition-colors",
                  !notif.read && "bg-white/5",
                )}
              >
                {!notif.read && (
                  <div
                    className="bg-accent-purple absolute top-5 right-5 h-2 w-2 rounded-full"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    notif.type === "success" &&
                      "bg-status-success/10 text-status-success",
                    notif.type === "info" &&
                      "bg-status-info/10 text-status-info",
                    notif.type === "warning" &&
                      "bg-status-warning/10 text-status-warning",
                  )}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {notif.type === "success" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                    {notif.type === "info" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    )}
                    {notif.type === "warning" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2.25m0 1.5h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={cn(
                      "text-sm font-medium",
                      !notif.read ? "text-text-primary" : "text-text-secondary",
                    )}
                  >
                    {notif.title}
                  </h4>
                  <p className="text-text-tertiary mt-1 text-sm">
                    {notif.message}
                  </p>
                  <p className="text-text-tertiary/70 mt-2 text-xs">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-accent-purple-light hover:text-accent-purple shrink-0 self-center text-xs font-medium transition-colors"
                  >
                    Mark read
                  </button>
                )}
              </GlassContainer>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
