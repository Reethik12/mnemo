import { useRelationshipContext } from "@/providers/relationship-provider";

export function useRelationshipStatistics() {
  const { statistics, isLoading } = useRelationshipContext();
  return { statistics, isLoading };
}
