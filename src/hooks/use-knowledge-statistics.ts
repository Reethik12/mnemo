import { useKnowledgeContext } from "@/providers/knowledge-provider";

export function useKnowledgeStatistics() {
  const { statistics, isLoading } = useKnowledgeContext();
  return { statistics, isLoading };
}
