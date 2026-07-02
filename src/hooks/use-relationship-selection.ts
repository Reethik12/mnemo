import { useRelationshipContext } from "@/providers/relationship-provider";

export function useRelationshipSelection() {
  const {
    selectedRelationship,
    setSelectedRelationship,
    selectedNodeId,
    setSelectedNodeId,
  } = useRelationshipContext();

  return {
    selectedRelationship,
    setSelectedRelationship,
    selectedNodeId,
    setSelectedNodeId,
  };
}
