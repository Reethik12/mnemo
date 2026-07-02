import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

type IndicatorVariant = "spinner" | "dots" | "bar";

export interface LoadingIndicatorProps {
  variant?: IndicatorVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Accessible label */
  label?: string;
}

// ─── Size Maps ───────────────────────────────────────

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

const dotSizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-3 w-3",
};

// ─── Component ───────────────────────────────────────

export function LoadingIndicator({
  variant = "spinner",
  size = "md",
  className,
  label = "Loading",
}: LoadingIndicatorProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {variant === "spinner" && (
        <svg
          className={cn("text-accent-purple animate-spin", spinnerSizes[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {variant === "dots" && (
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "bg-accent-purple rounded-full",
                "animate-bounce",
                dotSizes[size],
              )}
              style={{ animationDelay: `${i * 150}ms` }}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {variant === "bar" && (
        <div
          className={cn(
            "w-full max-w-xs overflow-hidden rounded-full",
            "bg-surface",
            size === "sm" ? "h-1" : size === "md" ? "h-1.5" : "h-2",
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              "h-full rounded-full",
              "from-accent-purple to-accent-cyan bg-gradient-to-r",
              "animate-shimmer bg-[length:200%_100%]",
            )}
            style={{ width: "40%" }}
          />
        </div>
      )}

      <span className="sr-only">{label}</span>
    </div>
  );
}
