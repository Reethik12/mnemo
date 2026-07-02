import { cn } from "@/lib/cn";

// ─── Component ───────────────────────────────────────

interface ComingSoonBadgeProps {
  className?: string;
  label?: string;
}

/**
 * Animated "Coming Soon" pill badge with subtle pulse glow.
 */
export function ComingSoonBadge({
  className,
  label = "Coming Soon",
}: ComingSoonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5",
        "rounded-full text-[10px] font-semibold tracking-wider uppercase",
        "bg-accent-purple/10 text-accent-purple-light",
        "border-accent-purple/20 border",
        className,
      )}
    >
      <span
        className="bg-accent-purple animate-pulse-glow h-1.5 w-1.5 rounded-full"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
