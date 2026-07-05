"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { MODULE_CARDS } from "@/lib/constants";
import { SpacesList } from "@/components/dashboard/permissions/SpacesList";
import { AccessRequests } from "@/components/dashboard/permissions/AccessRequests";
import { OrganizationPanel } from "@/components/dashboard/permissions/OrganizationPanel";
import { TwinDashboard } from "@/components/dashboard/permissions/TwinDashboard";
import { SecurityCenter } from "@/components/dashboard/permissions/SecurityCenter";
import { usePermissions } from "@/hooks/usePermissions";

type Tab =
  "spaces" | "requests" | "organization" | "twin-dashboard" | "security";

export default function PermissionsTwinPage() {
  const moduleData =
    MODULE_CARDS.find((m) => m.id === "permissions") || MODULE_CARDS[4];
  const [activeTab, setActiveTab] = useState<Tab>("spaces");
  const { spaces, requests, isLoading } = usePermissions();

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "spaces", label: "Memory Spaces", badge: spaces.length },
    {
      id: "requests",
      label: "Access Requests",
      badge: requests.filter((r) => r.status === "pending").length,
    },
    { id: "organization", label: "Workspace" },
    { id: "twin-dashboard", label: "Digital Twin" },
    { id: "security", label: "Security & Audit" },
  ];

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        variants={fadeInUp}
        className="relative flex flex-col items-center justify-center space-y-6 py-12 text-center"
      >
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${moduleData?.gradient || "from-purple-500 to-blue-500"} text-white shadow-lg`}
        >
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div className="max-w-2xl space-y-2">
          <h1 className="text-text-primary text-4xl font-bold tracking-tight">
            {moduleData?.title || "Memory Permissions & Digital Twin"}
          </h1>
          <p className="text-text-secondary text-lg">
            {moduleData?.description ||
              "Secure your spaces and simulate your knowledge."}
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="border-b border-white/10">
        <div className="scrollbar-hide flex gap-6 overflow-x-auto pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-accent-purple/20 text-accent-purple-light flex h-5 items-center justify-center rounded-full px-2 text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="bg-accent-purple absolute right-0 -bottom-[17px] left-0 h-[2px]"
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="min-h-[500px]">
        {activeTab === "spaces" && (
          <SpacesList spaces={spaces} isLoading={isLoading} />
        )}
        {activeTab === "requests" && (
          <AccessRequests requests={requests} isLoading={isLoading} />
        )}
        {activeTab === "organization" && <OrganizationPanel />}
        {activeTab === "twin-dashboard" && <TwinDashboard />}
        {activeTab === "security" && <SecurityCenter />}
      </motion.div>
    </motion.div>
  );
}
