import { GlassContainer } from "@/components/shared/glass-container";
import { FabricHealth } from "./fabric-health";
import { useFabric } from "@/hooks/use-fabric";
import { Button } from "@/components/ui/button";
import { memo } from "react";

export const FabricSidebar = memo(function FabricSidebar() {
  const { statistics, snapshots, refreshFabric, generateSnapshot } =
    useFabric();

  return (
    <div className="flex w-64 shrink-0 flex-col gap-6">
      <GlassContainer className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">Memory Fabric</h2>
        <p className="text-text-secondary text-sm">
          The underlying neural architecture connecting your memories.
        </p>

        <div className="mt-2 flex flex-col gap-2">
          <Button
            onClick={refreshFabric}
            variant="secondary"
            className="w-full justify-center"
          >
            Refresh Fabric
          </Button>
          <Button
            onClick={generateSnapshot}
            variant="secondary"
            className="w-full justify-center"
          >
            Generate Snapshot
          </Button>
        </div>
      </GlassContainer>

      {statistics && <FabricHealth statistics={statistics} />}

      <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
        <h3 className="text-text-secondary text-sm font-medium">
          Recent Snapshots
        </h3>
        <div className="flex flex-col gap-3">
          {snapshots.map((snap) => (
            <div
              key={snap.id}
              className="bg-bg-secondary border-border-subtle hover:border-border-hover flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{snap.date}</span>
                <span className="text-success text-xs">
                  +{snap.growthRate}%
                </span>
              </div>
              <div className="text-text-muted mt-1 flex justify-between text-xs">
                <span>{snap.totalNodes} Nodes</span>
                <span>{snap.totalEdges} Edges</span>
              </div>
            </div>
          ))}
        </div>
      </GlassContainer>
    </div>
  );
});
