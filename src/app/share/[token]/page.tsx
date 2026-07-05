"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

export default function ShareLandingPage() {
  const { token: _token } = useParams();
  const router = useRouter();
  const { success, error } = useToast();
  const [isRequesting, setIsRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleRequestAccess = async () => {
    setIsRequesting(true);
    try {
      const res = await fetch("/api/permissions/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: "space-work", // Mocking to a specific space for demo
          reason: "I would like access to this shared Memory Space.",
        }),
      });
      if (res.ok) {
        success("Access request sent to the owner!");
        setRequested(true);
      } else {
        error("Failed to request access");
      }
    } catch {
      error("Failed to request access");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="glass glow-border w-full max-w-md rounded-2xl p-8 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-white">
          Shared Memory Space
        </h1>
        <p className="text-text-secondary mb-8">
          You have been invited to view this Memory Space. Request access to
          view its contents.
        </p>

        {requested ? (
          <div className="rounded-xl bg-green-500/10 p-4 text-green-400">
            ✓ Request sent successfully. Waiting for approval.
          </div>
        ) : (
          <button
            onClick={handleRequestAccess}
            disabled={isRequesting}
            className="bg-accent-purple hover:bg-accent-purple-hover shadow-accent-purple/20 w-full rounded-xl py-3 font-medium text-white shadow-lg transition-colors disabled:opacity-50"
          >
            {isRequesting ? "Requesting..." : "Request Access"}
          </button>
        )}

        <button
          onClick={() => router.push("/")}
          className="text-text-secondary hover:text-text-primary mt-6 text-sm transition-colors"
        >
          Return to Home
        </button>
      </motion.div>
    </div>
  );
}
