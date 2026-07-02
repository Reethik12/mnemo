"use client";

import { FabricOverview } from "@/components/fabric/fabric-overview";
import { FabricSidebar } from "@/components/fabric/fabric-sidebar";
import { FabricDetails } from "@/components/fabric/fabric-details";
import { useFabricSelection } from "@/hooks/use-fabric-selection";
import { useFabric } from "@/hooks/use-fabric";
import { FabricLoading } from "@/components/fabric/fabric-loading";

export default function FabricPage() {
  const { isLoading } = useFabric();
  const { selectedNode } = useFabricSelection();

  if (isLoading) {
    return <FabricLoading />;
  }

  return (
    <div className="flex h-full w-full gap-6">
      <FabricSidebar />
      <FabricOverview />
      {selectedNode && (
        <div className="w-80 shrink-0">
          <FabricDetails node={selectedNode} />
        </div>
      )}
    </div>
  );
}
