"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GlassContainer } from "@/components/shared/glass-container";
import { ComingSoonBadge } from "@/components/shared/coming-soon-badge";
import { Button } from "@/components/ui/button";
import { TeamDashboard } from "@/components/team/team-dashboard";
import { useWorkspace } from "@/hooks/use-workspace";
import { cn } from "@/lib/cn";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "appearance" | "notifications" | "team"
  >("appearance");
  const { activeWorkspace } = useWorkspace();

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Navigation tabs */}
      <div className="flex gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab("appearance")}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "appearance"
              ? "bg-accent-purple/10 border-accent-purple/20 text-white"
              : "text-text-secondary border-transparent hover:text-white",
          )}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "notifications"
              ? "bg-accent-purple/10 border-accent-purple/20 text-white"
              : "text-text-secondary border-transparent hover:text-white",
          )}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "team"
              ? "bg-accent-purple/10 border-accent-purple/20 text-white"
              : "text-text-secondary border-transparent hover:text-white",
          )}
        >
          Team & Workspace
        </button>
      </div>

      {activeTab === "appearance" && (
        <motion.div variants={fadeInUp}>
          <GlassContainer className="space-y-6">
            <div className="border-border border-b pb-4">
              <h3 className="text-text-primary text-lg font-semibold">
                Appearance
              </h3>
              <p className="text-text-tertiary text-sm">
                Customize how Mnemo looks.
              </p>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-text-primary font-medium">Theme</p>
                <p className="text-text-tertiary text-sm">
                  Select your preferred color theme.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-sm">Dark</span>
                <ComingSoonBadge label="Light Mode Soon" />
              </div>
            </div>
          </GlassContainer>
        </motion.div>
      )}

      {activeTab === "notifications" && (
        <motion.div variants={fadeInUp}>
          <GlassContainer className="space-y-6">
            <div className="border-border border-b pb-4">
              <h3 className="text-text-primary text-lg font-semibold">
                Notifications
              </h3>
              <p className="text-text-tertiary text-sm">
                Manage your notification preferences.
              </p>
            </div>

            <div className="space-y-4">
              {["Email updates", "Push notifications", "Weekly digest"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="text-text-primary font-medium">{item}</p>
                    <div className="bg-accent-purple relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors">
                      <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </GlassContainer>
        </motion.div>
      )}

      {activeTab === "team" && activeWorkspace && (
        <motion.div variants={fadeInUp}>
          <TeamDashboard workspaceId={activeWorkspace.id} />
        </motion.div>
      )}

      {/* Danger Zone only in Appearance to avoid cluttering */}
      {activeTab === "appearance" && (
        <motion.div variants={fadeInUp}>
          <GlassContainer className="space-y-6">
            <div className="border-border border-b pb-4">
              <h3 className="text-text-primary text-status-error text-lg font-semibold">
                Danger Zone
              </h3>
              <p className="text-text-tertiary text-sm">
                Irreversible account actions.
              </p>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-text-primary font-medium">Delete Account</p>
                <p className="text-text-tertiary text-sm">
                  Permanently remove all your data.
                </p>
              </div>
              <Button
                variant="secondary"
                className="text-status-error border-status-error/20 hover:bg-status-error/10 hover:border-status-error/30"
              >
                Delete Account
              </Button>
            </div>
          </GlassContainer>
        </motion.div>
      )}
    </motion.div>
  );
}
