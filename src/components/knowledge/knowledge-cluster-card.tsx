import { KnowledgeCluster } from "@/types/knowledge";
import { Card } from "@/components/ui/card";
import { memo } from "react";

interface KnowledgeClusterCardProps {
  cluster: KnowledgeCluster;
}

export const KnowledgeClusterCard = memo(function KnowledgeClusterCard({
  cluster,
}: KnowledgeClusterCardProps) {
  return (
    <Card className="animate-in fade-in flex cursor-pointer flex-col gap-3 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <h4 className="text-text-primary font-semibold">{cluster.name}</h4>
        <span className="border-border text-text-tertiary inline-flex items-center rounded-full border bg-white/5 px-2 py-0.5 text-xs">
          {cluster.nodeIds.length} entities
        </span>
      </div>
      <p className="text-text-secondary line-clamp-2 text-sm">
        {cluster.description}
      </p>

      <div className="mt-auto flex items-center gap-2 pt-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: cluster.themeColor }}
        />
        <span className="text-text-muted text-xs">Knowledge Domain</span>
      </div>
    </Card>
  );
});
