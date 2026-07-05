"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useDigitalTwin } from "@/hooks/useDigitalTwin";

export function SecurityCenter() {
  const { security, auditLogs, isLoading } = useDigitalTwin();

  if (isLoading || !security) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="glass h-24 animate-pulse rounded-2xl bg-white/5"
            />
          ))}
        </div>
        <div className="glass h-64 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  const metrics = [
    {
      label: "Encrypted Memories",
      value: security.encryptedMemories,
      color: "text-green-400",
    },
    {
      label: "Active Sessions",
      value: security.activeSessions,
      color: "text-blue-400",
    },
    {
      label: "Shared Links",
      value: security.sharedLinks,
      color: "text-purple-400",
    },
    {
      label: "Revoked Access",
      value: security.revokedAccess,
      color: "text-red-400",
    },
    {
      label: "Pending Requests",
      value: security.pendingRequests,
      color: "text-yellow-400",
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "grant":
        return "text-green-400 bg-green-400/10";
      case "remove":
      case "forget":
        return "text-red-400 bg-red-400/10";
      case "improve":
        return "text-purple-400 bg-purple-400/10";
      case "share":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className="glass glow-border flex flex-col items-center justify-center rounded-2xl bg-white/5 p-4 text-center"
          >
            <span className="text-text-secondary text-[10px] font-medium tracking-wider uppercase">
              {metric.label}
            </span>
            <span className={`mt-1 text-2xl font-bold ${metric.color}`}>
              {metric.value}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeInUp}
        className="glass glow-border rounded-2xl bg-white/5 p-6"
      >
        <h3 className="text-text-primary mb-6 flex items-center gap-2 text-lg font-semibold">
          <svg
            className="text-accent-purple h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Audit Log
        </h3>
        <div className="space-y-4">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-white/5 p-4 transition-colors hover:bg-white/5 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium tracking-wider uppercase ${getActionColor(log.action)}`}
                >
                  {log.action}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{log.entity}</p>
                  <p className="text-text-secondary mt-0.5 text-xs">
                    {log.details}
                  </p>
                </div>
              </div>
              <div className="text-text-tertiary flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {log.actor}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {new Date(log.timestamp).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
