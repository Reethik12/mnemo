import { RelationshipStrength } from "@/types/relationship";
import { cn } from "@/lib/cn";

interface RelationshipStrengthIndicatorProps {
  strength: RelationshipStrength;
  className?: string;
}

export function RelationshipStrengthIndicator({
  strength,
  className,
}: RelationshipStrengthIndicatorProps) {
  const bars = strength === "strong" ? 3 : strength === "medium" ? 2 : 1;

  return (
    <div
      className={cn("flex h-3 items-end gap-0.5", className)}
      title={`Strength: ${strength}`}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-sm transition-colors",
            i <= bars ? "bg-primary" : "bg-bg-tertiary",
            i === 1 ? "h-1.5" : i === 2 ? "h-2.5" : "h-3",
          )}
        />
      ))}
    </div>
  );
}
