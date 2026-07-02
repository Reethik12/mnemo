import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}

// ─── Component ───────────────────────────────────────

/**
 * Reusable glass-morphic container wrapper.
 * Uses the existing glass / glass-strong utilities.
 */
export function GlassContainer({
  children,
  className,
  strong = false,
}: GlassContainerProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        strong ? "glass-strong" : "glass",
        className,
      )}
    >
      {children}
    </div>
  );
}
