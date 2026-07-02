import { useIntelligenceContext } from "@/providers/intelligence-provider";

export function useIntelligenceStatistics() {
  const { context, isLoading } = useIntelligenceContext();
  return {
    statistics: context.statistics,
    isLoading,
  };
}
