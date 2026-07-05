"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ShareDialog({
  collectionId,
  onClose,
}: {
  collectionId: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleShare = async (type: "public" | "private" | "organization") => {
    setLoading(true);
    try {
      const res = await fetch("/api/exchange/share", {
        method: "POST",
        body: JSON.stringify({ collectionId, type }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        success(data.message);
        navigator.clipboard.writeText(data.link);
        success("Link copied to clipboard!");
        onClose();
      } else {
        error("Failed to generate link");
      }
    } catch {
      error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass glow-border w-full max-w-md rounded-2xl p-6"
      >
        <h2 className="text-text-primary mb-4 text-xl font-semibold">
          Share Collection
        </h2>
        <p className="text-text-secondary mb-6 text-sm">
          Choose how you want to share this memory pack. A link will be copied
          to your clipboard.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleShare("public")}
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
          >
            <h4 className="font-medium text-white">Public Link</h4>
            <p className="text-text-secondary mt-1 text-xs">
              Anyone with the link can view and import.
            </p>
          </button>
          <button
            onClick={() => handleShare("organization")}
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
          >
            <h4 className="font-medium text-white">Organization Only</h4>
            <p className="text-text-secondary mt-1 text-xs">
              Only members of your org can access.
            </p>
          </button>
          <button
            onClick={() => handleShare("private")}
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
          >
            <h4 className="font-medium text-white">Private Link</h4>
            <p className="text-text-secondary mt-1 text-xs">
              Only invited users can access.
            </p>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-white/10 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
