import { FabricStatistics as FabricStatsComp } from "./fabric-statistics";
import { FabricClusterCard } from "./fabric-cluster-card";
import { FabricNodeCard } from "./fabric-node-card";
import { useFabric } from "@/hooks/use-fabric";
import { useFabricSelection } from "@/hooks/use-fabric-selection";
import { SectionHeader } from "@/components/shared/section-header";
import { memo } from "react";

export const FabricOverview = memo(function FabricOverview() {
  const { clusters, nodes, statistics } = useFabric();
  const { selectedNode, selectNode } = useFabricSelection();

  return (
    <div className="custom-scrollbar animate-in fade-in flex flex-1 flex-col gap-8 overflow-y-auto pr-4 duration-500">
      {statistics && <FabricStatsComp statistics={statistics} />}

      <section>
        <SectionHeader
          title="Active Clusters"
          description="Groups of related memories automatically organized by the fabric"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster) => (
            <FabricClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Recent Memories"
          description="Latest nodes added to the fabric"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nodes.slice(0, 9).map((node) => (
            <FabricNodeCard
              key={node.id}
              node={node}
              isSelected={selectedNode?.id === node.id}
              onClick={selectNode}
            />
          ))}
        </div>
      </section>
    </div>
  );
});
