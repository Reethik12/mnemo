import { useMemo } from "react";
import { useKnowledgeContext } from "@/providers/knowledge-provider";
import { KnowledgeNode } from "@/types/knowledge";

export function useKnowledgeNode(nodeId: string | undefined) {
  const { graph } = useKnowledgeContext();

  const node = useMemo(() => {
    if (!nodeId) return null;
    return graph.nodes.find((n) => n.id === nodeId) || null;
  }, [graph.nodes, nodeId]);

  const connectedEdges = useMemo(() => {
    if (!nodeId) return [];
    return graph.edges.filter(
      (e) => e.sourceId === nodeId || e.targetId === nodeId,
    );
  }, [graph.edges, nodeId]);

  const connectedNodes = useMemo(() => {
    return connectedEdges
      .map((edge) => {
        const connectedId =
          edge.sourceId === nodeId ? edge.targetId : edge.sourceId;
        return graph.nodes.find((n) => n.id === connectedId);
      })
      .filter((n): n is KnowledgeNode => n !== undefined);
  }, [connectedEdges, graph.nodes, nodeId]);

  return {
    node,
    connectedEdges,
    connectedNodes,
  };
}
