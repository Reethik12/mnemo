import { cn } from "@/lib/cn";

// ─── Component ───────────────────────────────────────

interface AuthDividerProps {
  text?: string;
  className?: string;
}

export function AuthDivider({
  text = "or continue with",
  className,
}: AuthDividerProps) {
  return (
    <div className={cn("relative my-6", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="border-border w-full border-t" />
      </div>
      <div className="relative flex justify-center">
        <span className="text-text-tertiary bg-bg-primary px-3 text-xs tracking-wider uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}
