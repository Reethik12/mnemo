import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

type StatusType = "active" | "inactive" | "coming-soon" | "beta";

interface StatusPillProps {
  status: StatusType;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────

const statusStyles: Record<StatusType, string> = {
  active: "bg-status-success/10 text-status-success border-status-success/20",
  inactive: "bg-white/5 text-text-tertiary border-border",
  "coming-soon":
    "bg-accent-purple/10 text-accent-purple-light border-accent-purple/20",
  beta: "bg-status-warning/10 text-status-warning border-status-warning/20",
};

const statusLabels: Record<StatusType, string> = {
  active: "Active",
  inactive: "Inactive",
  "coming-soon": "Coming Soon",
  beta: "Beta",
};

// ─── Component ───────────────────────────────────────

/**
 * Color-coded status indicator pill.
 */
export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-[10px] font-semibold tracking-wider uppercase",
        statusStyles[status],
        className,
      )}
      role="status"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-status-success",
          status === "inactive" && "bg-text-tertiary",
          status === "coming-soon" && "bg-accent-purple animate-pulse-glow",
          status === "beta" && "bg-status-warning",
        )}
        aria-hidden="true"
      />
      {statusLabels[status]}
    </span>
  );
}
