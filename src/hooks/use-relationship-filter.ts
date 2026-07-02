import { useRelationshipContext } from "@/providers/relationship-provider";

export function useRelationshipFilter() {
  const { filters, setFilters } = useRelationshipContext();
  return { filters, setFilters };
}
