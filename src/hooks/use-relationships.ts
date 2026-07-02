import { useRelationshipContext } from "@/providers/relationship-provider";

export function useRelationships() {
  const {
    relationships,
    filteredRelationships,
    groupedRelationships,
    clusters,
    snapshots,
    isLoading,
    refreshRelationships,
  } = useRelationshipContext();

  return {
    relationships,
    filteredRelationships,
    groupedRelationships,
    clusters,
    snapshots,
    isLoading,
    refreshRelationships,
  };
}
