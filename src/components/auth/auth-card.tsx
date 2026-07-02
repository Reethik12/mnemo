"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { scaleIn } from "@/lib/animations";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  footer?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────

export function AuthCard({
  children,
  title,
  description,
  className,
  footer,
}: AuthCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className={cn(
        "glass-strong glow-border w-full max-w-md rounded-2xl p-8",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="mb-6 inline-block text-2xl font-bold tracking-tight"
        >
          <span className="text-gradient">Mnemo</span>
        </Link>
        <h1 className="text-text-primary text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-text-tertiary mt-2 text-sm">{description}</p>
        )}
      </div>

      {/* Content */}
      {children}

      {/* Footer */}
      {footer && (
        <div className="text-text-tertiary mt-6 text-center text-sm">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
