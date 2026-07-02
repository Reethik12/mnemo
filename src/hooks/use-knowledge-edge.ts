import { useMemo } from "react";
import { useKnowledgeContext } from "@/providers/knowledge-provider";

export function useKnowledgeEdge(edgeId: string | undefined) {
  const { graph } = useKnowledgeContext();

  const edge = useMemo(() => {
    if (!edgeId) return null;
    return graph.edges.find((e) => e.id === edgeId) || null;
  }, [graph.edges, edgeId]);

  const sourceNode = useMemo(() => {
    if (!edge) return null;
    return graph.nodes.find((n) => n.id === edge.sourceId) || null;
  }, [graph.nodes, edge]);

  const targetNode = useMemo(() => {
    if (!edge) return null;
    return graph.nodes.find((n) => n.id === edge.targetId) || null;
  }, [graph.nodes, edge]);

  return { edge, sourceNode, targetNode };
}
