import { useMemo } from "react";
import { useFabricContext } from "@/providers/fabric-provider";

export function useFabricNode(nodeId: string | undefined) {
  const { fabric } = useFabricContext();

  const node = useMemo(() => {
    if (!nodeId) return null;
    return fabric.nodes.find((n) => n.id === nodeId) || null;
  }, [fabric.nodes, nodeId]);

  const connectedEdges = useMemo(() => {
    if (!nodeId) return [];
    return fabric.edges.filter(
      (e) => e.sourceId === nodeId || e.targetId === nodeId,
    );
  }, [fabric.edges, nodeId]);

  const connectedNodes = useMemo(() => {
    return connectedEdges
      .map((edge) => {
        const connectedId =
          edge.sourceId === nodeId ? edge.targetId : edge.sourceId;
        return fabric.nodes.find((n) => n.id === connectedId);
      })
      .filter((n): n is NonNullable<typeof n> => n !== undefined);
  }, [connectedEdges, fabric.nodes, nodeId]);

  return {
    node,
    connectedEdges,
    connectedNodes,
  };
}
