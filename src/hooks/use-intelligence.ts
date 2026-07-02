import { useIntelligenceContext } from "@/providers/intelligence-provider";

export function useIntelligence() {
  const { context, isLoading, refreshIntelligence } = useIntelligenceContext();

  return {
    ...context,
    isLoading,
    refreshIntelligence,
  };
}
