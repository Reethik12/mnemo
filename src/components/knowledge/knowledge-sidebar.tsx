import { GlassContainer } from "@/components/shared/glass-container";
import { KnowledgeHealth } from "./knowledge-health";
import { useKnowledge } from "@/hooks/use-knowledge";
import { Button } from "@/components/ui/button";
import { memo } from "react";

export const KnowledgeSidebar = memo(function KnowledgeSidebar() {
  const { statistics, refreshGraph } = useKnowledge();

  return (
    <div className="flex w-64 shrink-0 flex-col gap-6">
      <GlassContainer className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">Knowledge Graph</h2>
        <p className="text-text-secondary text-sm">
          The structural mapping of your memory entities and their
          relationships.
        </p>

        <div className="mt-2 flex flex-col gap-2">
          <Button
            onClick={refreshGraph}
            variant="secondary"
            className="w-full justify-center"
          >
            Sync Graph
          </Button>
        </div>
      </GlassContainer>

      {statistics && <KnowledgeHealth statistics={statistics} />}

      <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
        <h3 className="text-text-secondary text-sm font-medium">
          Graph Engine
        </h3>

        <div className="flex flex-col gap-3">
          <div className="bg-bg-secondary border-border-subtle flex flex-col gap-1 rounded-lg border p-3">
            <span className="text-sm font-medium">Auto-Clustering</span>
            <span className="text-text-muted text-xs">Active</span>
          </div>
          <div className="bg-bg-secondary border-border-subtle flex flex-col gap-1 rounded-lg border p-3">
            <span className="text-sm font-medium">Semantic Links</span>
            <span className="text-text-muted text-xs">Processing...</span>
          </div>
          <div className="bg-bg-secondary border-border-subtle flex flex-col gap-1 rounded-lg border p-3">
            <span className="text-sm font-medium">Inference Engine</span>
            <span className="text-text-muted text-xs">Idle</span>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
});
