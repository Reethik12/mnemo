import { GlassContainer } from "@/components/shared/glass-container";
import { RelationshipFilterComponent } from "./relationship-filter";
import { useRelationships } from "@/hooks/use-relationships";
import { Button } from "@/components/ui/button";
import { memo } from "react";

export const RelationshipSidebar = memo(function RelationshipSidebar() {
  const { refreshRelationships } = useRelationships();

  return (
    <div className="flex w-64 shrink-0 flex-col gap-6">
      <GlassContainer className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">Relationship Engine</h2>
        <p className="text-text-secondary text-sm">
          Analyze and explore the deep connections between your memory entities.
        </p>

        <div className="mt-2 flex flex-col gap-2">
          <Button
            onClick={refreshRelationships}
            variant="secondary"
            className="w-full justify-center"
          >
            Run Engine Analysis
          </Button>
        </div>
      </GlassContainer>

      <RelationshipFilterComponent />

      <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
        <h3 className="text-text-secondary text-sm font-medium">
          Engine Status
        </h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Entity Resolution</span>
            <span className="text-success">Active</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Context Mapping</span>
            <span className="text-primary">Processing</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Temporal Links</span>
            <span className="text-text-tertiary">Idle</span>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
});
