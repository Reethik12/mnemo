import { SemanticCluster } from "@/types/intelligence";
import { Card } from "@/components/ui/card";
import { memo } from "react";

interface SemanticClusterCardProps {
  cluster: SemanticCluster;
}

export const SemanticClusterCard = memo(function SemanticClusterCard({
  cluster,
}: SemanticClusterCardProps) {
  return (
    <Card className="animate-in fade-in flex cursor-pointer flex-col gap-3 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <h4 className="text-text-primary text-sm font-semibold">
          {cluster.name}
        </h4>
        <span className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-2 py-0.5 text-xs">
          {cluster.memoryCount} Memories
        </span>
      </div>
      <p className="text-text-secondary line-clamp-2 text-sm">
        {cluster.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1 pt-2">
        {cluster.keywords.slice(0, 3).map((keyword, i) => (
          <span
            key={i}
            className="bg-bg-secondary border-border-subtle text-text-muted rounded border px-2 py-0.5 text-[10px]"
          >
            #{keyword}
          </span>
        ))}
      </div>
    </Card>
  );
});
