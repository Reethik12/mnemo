import { KnowledgeNode } from "@/types/knowledge";
import { Card } from "@/components/ui/card";
import { memo } from "react";
import { cn } from "@/lib/cn";

interface KnowledgeNodeCardProps {
  node: KnowledgeNode;
  isSelected?: boolean;
  onClick?: (node: KnowledgeNode) => void;
}

export const KnowledgeNodeCard = memo(function KnowledgeNodeCard({
  node,
  isSelected,
  onClick,
}: KnowledgeNodeCardProps) {
  return (
    <Card
      className={cn(
        "hover:border-border-hover animate-in fade-in zoom-in-95 flex cursor-pointer flex-col gap-2 p-4 transition-all duration-300",
        isSelected && "border-primary shadow-sm",
      )}
      onClick={() => onClick?.(node)}
    >
      <div className="flex items-start justify-between gap-2">
        <h4
          className="text-text-primary truncate text-sm font-medium"
          title={node.label}
        >
          {node.label}
        </h4>
        {node.attributes.verified && (
          <span className="text-success shrink-0" title="Verified Node">
            ✓
          </span>
        )}
      </div>

      <div className="mt-1 flex flex-wrap gap-1">
        <span className="bg-primary/10 border-primary/20 text-primary inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]">
          {node.type}
        </span>
        {node.memoryId && (
          <span className="bg-secondary/10 border-secondary/20 text-secondary inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]">
            Linked to Memory
          </span>
        )}
      </div>
    </Card>
  );
});
