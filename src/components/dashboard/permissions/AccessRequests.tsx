"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { AccessRequest } from "@/services/permissions/types";
import { usePermissions } from "@/hooks/usePermissions";
import { useState } from "react";

export function AccessRequests({
  requests,
  isLoading,
}: {
  requests: AccessRequest[];
  isLoading: boolean;
}) {
  const { respondToRequest } = usePermissions();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleResponse = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    await respondToRequest(id, action);
    setProcessingId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="glass h-24 animate-pulse rounded-2xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (requests.filter((r) => r.status === "pending").length === 0) {
    return (
      <div className="glass glow-border text-text-secondary rounded-2xl p-12 text-center">
        No pending access requests.
      </div>
    );
  }

  return (
    <motion.div variants={fadeInUp} className="space-y-4">
      {requests
        .filter((r) => r.status === "pending")
        .map((request) => (
          <div
            key={request.id}
            className="glass glow-border flex flex-col justify-between gap-6 rounded-2xl bg-white/5 p-6 transition-colors hover:bg-white/10 md:flex-row md:items-center"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 font-bold text-white shadow-lg">
                  {request.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-white">{request.userName}</h4>
                  <span className="text-text-secondary text-xs">
                    {request.userEmail}
                  </span>
                </div>
              </div>
              <p className="text-text-primary mt-2 text-sm">
                Requested access to{" "}
                <span className="text-accent-purple font-semibold">
                  &quot;{request.spaceName}&quot;
                </span>
              </p>
              <p className="text-text-secondary text-sm italic">
                &quot;{request.reason}&quot;
              </p>
            </div>

            <div className="flex gap-3 md:flex-col lg:flex-row">
              <button
                disabled={processingId === request.id}
                onClick={() => handleResponse(request.id, "reject")}
                className="flex-1 rounded-xl bg-red-500/10 px-6 py-2 font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50 lg:flex-none"
              >
                Reject
              </button>
              <button
                disabled={processingId === request.id}
                onClick={() => handleResponse(request.id, "approve")}
                className="bg-accent-purple hover:bg-accent-purple-hover shadow-accent-purple/20 flex-1 rounded-xl px-6 py-2 font-medium text-white shadow-lg transition-colors disabled:opacity-50 lg:flex-none"
              >
                {processingId === request.id ? "Processing..." : "Approve"}
              </button>
            </div>
          </div>
        ))}
    </motion.div>
  );
}
