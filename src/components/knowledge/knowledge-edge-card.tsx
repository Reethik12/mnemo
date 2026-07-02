import { KnowledgeEdge } from "@/types/knowledge";
import { Card } from "@/components/ui/card";
import { memo } from "react";
import { cn } from "@/lib/cn";
import { useKnowledgeEdge } from "@/hooks/use-knowledge-edge";

interface KnowledgeEdgeCardProps {
  edge: KnowledgeEdge;
  isSelected?: boolean;
  onClick?: (edge: KnowledgeEdge) => void;
}

export const KnowledgeEdgeCard = memo(function KnowledgeEdgeCard({
  edge,
  isSelected,
  onClick,
}: KnowledgeEdgeCardProps) {
  const { sourceNode, targetNode } = useKnowledgeEdge(edge.id);

  if (!sourceNode || !targetNode) return null;

  return (
    <Card
      className={cn(
        "hover:border-border-hover animate-in fade-in flex cursor-pointer flex-col gap-2 p-4 transition-all duration-300",
        isSelected && "border-primary shadow-sm",
      )}
      onClick={() => onClick?.(edge)}
    >
      <div className="flex items-center gap-2 text-sm">
        <span
          className="text-text-primary max-w-[40%] truncate font-medium"
          title={sourceNode.label}
        >
          {sourceNode.label}
        </span>
        <span className="text-text-muted shrink-0">→</span>
        <span
          className="text-text-primary max-w-[40%] truncate font-medium"
          title={targetNode.label}
        >
          {targetNode.label}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-2 py-0.5 text-[10px] capitalize">
          {edge.relationship.replace("_", " ")}
        </span>
        <span className="text-text-muted text-xs">
          Strength: {edge.strength}
        </span>
      </div>
    </Card>
  );
});
