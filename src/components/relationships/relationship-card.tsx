import { RelationshipEdge } from "@/types/relationship";
import { Card } from "@/components/ui/card";
import { RelationshipStrengthIndicator } from "./relationship-strength";
import { cn } from "@/lib/cn";
import { memo } from "react";

interface RelationshipCardProps {
  relationship: RelationshipEdge;
  isSelected?: boolean;
  onClick?: (relationship: RelationshipEdge) => void;
}

export const RelationshipCard = memo(function RelationshipCard({
  relationship,
  isSelected,
  onClick,
}: RelationshipCardProps) {
  if (!relationship.sourceNode || !relationship.targetNode) return null;

  return (
    <Card
      className={cn(
        "animate-in fade-in flex cursor-pointer flex-col gap-3 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        isSelected ? "border-primary" : "border-border-subtle",
      )}
      onClick={() => onClick?.(relationship)}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-text-tertiary border-border rounded-full border bg-white/5 px-2 py-0.5 capitalize">
          {relationship.category}
        </span>
        <RelationshipStrengthIndicator strength={relationship.strength} />
      </div>

      <div className="flex flex-1 items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className="text-text-primary truncate text-sm font-semibold"
            title={relationship.sourceNode.title}
          >
            {relationship.sourceNode.title}
          </span>
          <span className="text-text-muted text-[10px]">
            {relationship.sourceNode.type}
          </span>
        </div>

        <div className="text-text-muted flex shrink-0 flex-col items-center justify-center">
          <span className="text-xs">
            {relationship.direction === "bidirectional" ? "↔" : "→"}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 text-right">
          <span
            className="text-text-primary truncate text-sm font-semibold"
            title={relationship.targetNode.title}
          >
            {relationship.targetNode.title}
          </span>
          <span className="text-text-muted text-[10px]">
            {relationship.targetNode.type}
          </span>
        </div>
      </div>
    </Card>
  );
});
