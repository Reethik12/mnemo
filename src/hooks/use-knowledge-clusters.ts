import { useMemo } from "react";
import { useKnowledgeContext } from "@/providers/knowledge-provider";

export function useKnowledgeClusters() {
  const { graph } = useKnowledgeContext();

  const sortedClusters = useMemo(() => {
    return [...graph.clusters].sort(
      (a, b) => b.nodeIds.length - a.nodeIds.length,
    );
  }, [graph.clusters]);

  return { clusters: sortedClusters };
}
