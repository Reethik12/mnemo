"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  title = "Something went wrong",
  message = "An unexpected error occurred while loading the workspace.",
  onRetry,
}: ErrorScreenProps) {
  return (
    <div className="bg-bg-primary flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-status-error/20 bg-status-error/5 max-w-md space-y-6 rounded-2xl border p-8 backdrop-blur-sm"
      >
        <div className="bg-status-error/10 text-status-error mx-auto flex h-16 w-16 items-center justify-center rounded-full">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-text-primary text-xl font-bold">{title}</h2>
          <p className="text-text-secondary mt-2 text-sm">{message}</p>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            className="bg-status-error hover:bg-status-error/90 shadow-status-error/20 w-full border-transparent"
          >
            Try Again
          </Button>
        )}
      </motion.div>
    </div>
  );
}
