import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rectangle" | "card";
  /** Width in any CSS unit */
  width?: string | number;
  /** Height in any CSS unit */
  height?: string | number;
}

// ─── Component ───────────────────────────────────────

const variantStyles = {
  text: "h-4 w-full rounded",
  circle: "rounded-full",
  rectangle: "rounded-lg",
  card: "h-48 w-full rounded-xl",
} as const;

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-[length:200%_100%]",
        "from-surface via-surface-hover to-surface bg-gradient-to-r",
        variantStyles[variant],
        className,
      )}
      style={{ width, height }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
