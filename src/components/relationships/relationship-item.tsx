import { RelationshipEdge } from "@/types/relationship";
import { RelationshipStrengthIndicator } from "./relationship-strength";
import { cn } from "@/lib/cn";
import { memo } from "react";

interface RelationshipItemProps {
  relationship: RelationshipEdge;
  isSelected?: boolean;
  onClick?: (relationship: RelationshipEdge) => void;
}

export const RelationshipItem = memo(function RelationshipItem({
  relationship,
  isSelected,
  onClick,
}: RelationshipItemProps) {
  if (!relationship.sourceNode || !relationship.targetNode) return null;

  return (
    <div
      className={cn(
        "border-border-subtle hover:bg-bg-secondary animate-in fade-in flex cursor-pointer items-center gap-4 border-b px-4 py-3 transition-colors duration-200 last:border-0",
        isSelected && "bg-bg-secondary",
      )}
      onClick={() => onClick?.(relationship)}
    >
      <div className="flex w-24 shrink-0 items-center gap-2">
        <span className="text-text-tertiary text-xs capitalize">
          {relationship.category}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className="text-text-primary max-w-[40%] truncate text-sm font-medium"
          title={relationship.sourceNode.title}
        >
          {relationship.sourceNode.title}
        </span>
        <span className="text-text-muted shrink-0 text-xs">
          {relationship.direction === "bidirectional" ? "↔" : "→"}
        </span>
        <span
          className="text-text-primary max-w-[40%] truncate text-sm font-medium"
          title={relationship.targetNode.title}
        >
          {relationship.targetNode.title}
        </span>
      </div>

      <div className="flex w-16 shrink-0 justify-end">
        <RelationshipStrengthIndicator strength={relationship.strength} />
      </div>
    </div>
  );
});
