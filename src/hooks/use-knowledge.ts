import { useKnowledgeContext } from "@/providers/knowledge-provider";

export function useKnowledge() {
  const {
    graph,
    statistics,
    isLoading,
    refreshGraph,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
  } = useKnowledgeContext();

  return {
    nodes: graph.nodes,
    edges: graph.edges,
    clusters: graph.clusters,
    insights: graph.insights,
    statistics,
    isLoading,
    refreshGraph,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
  };
}
