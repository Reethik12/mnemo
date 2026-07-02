import { MemoryNode } from "@/types/fabric";
import { Card } from "@/components/ui/card";
import { memo } from "react";
import { cn } from "@/lib/cn";

interface FabricNodeCardProps {
  node: MemoryNode;
  isSelected?: boolean;
  onClick?: (node: MemoryNode) => void;
}

export const FabricNodeCard = memo(function FabricNodeCard({
  node,
  isSelected,
  onClick,
}: FabricNodeCardProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card
      className={cn(
        "hover:border-border-hover flex cursor-pointer flex-col gap-2 p-4 transition-all",
        isSelected && "border-primary shadow-sm",
      )}
      onClick={() => onClick?.(node)}
    >
      <div className="flex items-start justify-between gap-2">
        <h4
          className="text-text-primary truncate text-sm font-medium"
          title={node.title}
        >
          {node.title}
        </h4>
        <div
          className={cn(
            "mt-1 h-2 w-2 shrink-0 rounded-full",
            getHealthColor(node.healthScore),
          )}
          title={`Health Score: ${node.healthScore}`}
        />
      </div>

      <p className="text-text-secondary line-clamp-2 text-xs">{node.excerpt}</p>

      <div className="mt-2 flex flex-wrap gap-1">
        {node.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-2 py-0.5 text-[10px]"
          >
            {tag}
          </span>
        ))}
        {node.tags.length > 2 && (
          <span className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-2 py-0.5 text-[10px]">
            +{node.tags.length - 2}
          </span>
        )}
      </div>
    </Card>
  );
});
